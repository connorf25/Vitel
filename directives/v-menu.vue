<script>
import {createPopper} from '@popperjs/core';
import {nextTick} from 'vue';

/**
* Context-menu or popup-menu directive to easily add menus to things
* Displays a Bootstrap-like context menu on given events
*
* @param {Object|String} [options] Options for the v-menu directive, if a string the value of `options.selector` is assumed, if an array `options.items` is assumed
* @param {String} [options.selector] Query selector to find and reuse an existing page element
* @param {Array<MenuItem>} [options.items] Collection of menu items to dynamically create
* @param {Boolean} [options.prevent=true] Stop event default handler when interacting
* @param {Boolean} [options.stop=true] Stop event bubbling when interacting
* @param {String} [options.placement='top-start'] Where to position the menu, relative to the current element
* @param {Object} [options.popperConfig] Overriding options to pass to Popper when positioning the menu
* @param {String} [options.classHide='d-none'] Initial class(es) to apply to the menu (if selector is specified), this directive will wait one tick before trying to apply this
* @param {String} [options.classShow='d-block'] Class(es) to apply to the menu when it is shown (if a selector is specified)
* @param {String} [options.event='contextmenu'] Event to trap
* @param {Object} [options.context] Context to pass to callback functions like `options.onClick` or `options.items.show`, defaults to the directive instance (usually the parent VueComponent of the element)
*
* @param {Function} [options.filter] Async function called before any action to decide whether to act, if this function resolves exactly to a boolean `false` no action is taken. Called as `(context:Object)`
* @param {Function} [options.before] Async function to call before opening the context menu. Called as `(context:Object)`
* @param {Function} [options.beforeClose] Async function to call when the context menu has closed. Called as `(context:Object)`
* @param {Function} [options.close] Async function to call when the context menu has closed. Called as `(context:Object)`
*
* @param [modifiers.click] If specified imples `{event: 'click'}` i.e. trap clicks instead of right clicks
*/
export default {
	created(el, binding) {
		let settings = {
			selector: null,
			items: [],
			prevent: true,
			stop: true,
			placement: 'top-start',
			popperConfig: {},
			classHide: 'd-none',
			classShow: 'd-block',
			event: 'contextmenu',
			context: binding.instance,
			filter: ()=> true,
			before: ()=> {},
			beforeClose: ()=> {},
			close: ()=> {},
			...(
				typeof binding.value == 'string' ? {selector: binding.value} // String - populate `selector`
				: Array.isArray(binding.value) ? {items: binding.value} // Array - Populate `items`
				: binding.value // Assume its more options
			),
		};
		// Argument processing {{{
		if (binding.modifiers.click) settings.event = 'click';
		if (settings.selector && settings.items.length > 0) throw new Error('v-menu - specifying `selector` + `items` is contradictory, choose one or the other');
		// }}}

		// Hide menu if we have a classHide
		if (settings.selector && settings.classHide) {
			nextTick().then(()=> { // As outer template has probably not rendered yet, wait one tick before trying to hide the menu
				let menu = document.querySelector(settings.selector);
				if (!menu) throw new Error(`Unable to locate contextmenu selector "${settings.selector}" - after wating one tick`);
				menu.classList.add(settings.classHide);
			});
		}

		el.addEventListener(settings.event, async (e) => {
			if (await settings.filter.call(settings.context, settings.context) === false) return;

			if (settings.prevent) e.preventDefault();
			if (settings.stop) e.stopPropagation();

			let menu; // Eventual DOMElement for the menu to display

			// Menu disposal + cleanup function
			let close = async ()=> {
				if (!menuInstance) return; // Menu already disposed of
				await settings.beforeClose(settings.context, settings.context);
				menu.classList.add(settings.classHide);
				menu.classList.remove(settings.classShow);
				menuInstance.destroy();
				menuInstance = null;
				await settings.close(settings.context, settings.context);
			};

			if (settings.selector) { // Point to existing menu
				menu = document.querySelector(settings.selector);
				if (!menu) throw new Error(`Unable to locate contextmenu selector "${settings.selector}"`);
				menu.addEventListener('click', close, {once: true});
			} else if (settings.items) { // Create menu dynamically
				menu = document.createElement('div');
				menu.classList.add('dropdown-menu');
				settings.items
					.filter(item =>
						!item.show ? true // Unspecified - assume true
						: typeof item.show == 'function' ? item.show.call(settings.context) // Func - run it and accept the result
						: item.show // Accept the raw value
					)
					.forEach(item => {
						if (item === '-') { // Assume this item is a divider
							let menuDivider = document.createElement('div');
							menuDivider.classList.add('dropdown-divider');
							menu.append(menuDivider);
						} else { // Assume everything else is a menu item
							let menuItem = document.createElement('a');
							menuItem.classList.add('dropdown-item');

							if (menuItem.icon) {
								let menuIcon = document.createItem('i');
								menuIcon.classList.add(menuItem.icon);
								menuItem.prepend(menuIcon);
							}

							menuItem.innerText = item.title;

							if (item.onClick) menuItem.addEventListener('click', async ()=> {
								await close();
								return item.onClick.call(settings.context);
							});

							menu.append(menuItem);
						}
					});
				document.body.append(menu);
			} else {
				throw new Error('Unable to determine behaviour for v-menu');
			}

			await settings.before(settings.context, settings.context);

			menu.classList.remove(settings.classHide);
			menu.classList.add(settings.classShow);
			let menuInstance = createPopper(el, menu, {
				placement: settings.placement,
				...settings.popperConfig,
			});
		});
	},
}

/**
* Individual menu item
* @class {MenuItem}
* @property {String} title The text to display for a menu item
* @property {String} [icon] Optional icon class to prepend to the item
* @property {Boolean|Function} [show] Whether to show the item. If a function this is called with the default context
* @property {Function} [onClick] Click handler when selecting the given item
*/
</script>
