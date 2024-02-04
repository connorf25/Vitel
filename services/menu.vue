<script>
import {createPopper as Popper} from '@popperjs/core';

/**
* Global $menu service
*
* Available on all Vue models as `vm.$menu`
*/
export default {
	name: '$menu',
	data() { return {
		/**
		* ID tracker to ensure all menu IDs are unique
		*/
		nextId: 1,


		/**
		* Lookup for MenuIDs to their Bootstrap.Dropdown handles
		* Each key is the DOMID -> Object
		* @type {Object}
		* @property {Popper} popper Popper instance associated with the ID
		*/
		dropdowns: {},


		/**
		* Backdrop DOM element
		* @type {DOMElement}
		*/
		backdropEl: null,
	}},
	methods: {
		/**
		* @define DropdownItem
		* @description A single dropdown-menu item
		* @type {Object|String} Either a POJO defining behaiour or a single '-' string to define a divider
		*
		* @property {String} [text] The title text to display
		* @property {String} [html] The HTML text to display instead of a regular escaped text string
		* @property {String} [class='dropdown-item'] Class(es) to apply to each menu-item
		* @property {String} [icon] Optional icon class to include as a prefix icon for each menu item
		* @property {Function} [handler] The callback to run when selected
		* @property {Object} [context] Context with which to call the handler function. Defaults to the VueRoot element
		* @property {Boolean} [autoClose] Overriding option to change autoClose behaviour for this item
		*/

		/**
		* Open a context menu against a given DOM element
		* This function is really just a utility all-in-one for create() + attach() + toggle()
		*
		* @param {Object} options Additional options to mutate behaviour
		* @param {DOMElement|String} options.el The DOM element to attach to, can be a DOM Element or querySelector string
		* @param {Array<DropdownItem>} options.items Dropdown items to show
		* @param {String} [options.placement='bottom'] Where to position the dropdown in relation to the target
		* @param {Boolean} [options.show=true] Whether to actually show the element or just prepare it
		* @param {Boolean} [options.autoClose=true] Whether to close the menu after any click
		* @param {'close'|'ignore'|false} [options.backdrop='close'] Set up a backdrop to handle off-item clicks to auto-close the menu. ENUM: 'close' (close the menu if clicking on the backdrop), 'ignore' (ignore interacting with the backdrop, false (dont use a backdrop)
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async open(options) {
			let settings = {
				el: null,
				items: [],
				placement: 'bottom',
				show: true,
				autoClose: true,
				backdrop: 'close',
				...options,
			};
			if (!settings.el) throw new Error('No `el` element or query selector specified');

			let menuId = this.create({
				items: settings.items,
				placement: settings.placement,
				autoClose: settings.autoClose,
				backdrop: settings.backdrop,
			});

			// Attach to reference target
			await this.attach(menuId, settings.el);

			// Show the menu
			this.toggle(menuId, settings.show);
		},


		/**
		* Creates a menu returning its unique ID
		*
		* @param {Object} options Additional options to mutate behaviour
		* @param {Array<DropdownItem>} options.items Dropdown items to show
		* @param {String} [options.id] The ID of the dropdown menu to create, if omitted a unique ID is generated
		* @param {String} [options.placement='bottom'] Where to position the dropdown in relation to the target
		* @param {Boolean} [options.autoClose=true] Whether to close the menu after any click
		* @param {'close'|'ignore'|false} [options.backdrop='close'] Set up a backdrop to handle off-item clicks to auto-close the menu. ENUM: 'close' (close the menu if clicking on the backdrop), 'ignore' (ignore interacting with the backdrop, false (dont use a backdrop)
		*
		* @returns {String} The Unique DOM ID of the created menu (includes the '#' prefix)
		*/
		create(options) {
			let settings = {
				id: `menu-${this.nextId++}`,
				items: [],
				placement: 'bottom',
				autoClose: true,
				backdrop: 'close',
				...options,
			};
			let menuId = `#${settings.id}`;

			// Construct basic menu skeleton
			let dropdownMenu = document.createElement('div');
			dropdownMenu.id = settings.id;
			dropdownMenu.classList.add('dropdown-menu', 'menu-service');
			document.body.appendChild(dropdownMenu);

			// Create reference to the new menu
			this.dropdowns[menuId] = {
				menu: dropdownMenu,
				autoClose: settings.autoClose,
				backdrop: settings.backdrop,
				placement: settings.placement,
				popper: null, // Allocated during attach()
			};

			// Update menu items
			this.updateItems(menuId, settings.items);

			return menuId;
		},


		/**
		* Replace menu items within a menu
		*
		* @param {Array<DropdownItem>} items Dropdown items to update
		*/
		updateItems(menuId, items) {
			if (!this.dropdowns[menuId]) throw new Error(`No Dropdown exists for ID "${menuId}"`);

			this.dropdowns[menuId].menu.replaceChildren(...items.flatMap(item => {
				if (item === '-') {
					let divider = document.createElement('div');
					divider.classList.add('dropdown-divider');
					return divider;
				} else {
					let dropdownItem = document.createElement('a');
					dropdownItem.classList.add(item.class || 'dropdown-item');

					if (item.html) {
						dropdownItem.innerHTML = item.html;
					} else if (item.text) {
						dropdownItem.innerText = item.text;
					} else {
						dropdownItem.innerHTML = '&nbsp;';
					}

					if (item.icon) {
						let dropdownIcon = document.createElement('i');
						dropdownIcon.classList.add(item.icon);
						dropdownIcon.append(dropdownIcon);
					}

					if (item.handler) {
						dropdownItem.addEventListener('click', ()=> {
							if (item.autoClose ?? this.dropdowns[menuId].autoClose) this.toggle(menuId, false);
							item.handler.call(item.context || this.$root)
						});
					}

					return dropdownItem;
				}
			}));
		},


		/**
		* Move the dropdown-target (by its menu ID) to another element
		*
		* @param {String} menuId The menuID containing the target to place
		* @param {DOMElement|String} el The element to move the target to, or its selector
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async attach(menuId, el) {
			if (!this.dropdowns[menuId]) throw new Error(`No Dropdown exists for ID "${menuId}"`);

			let targetEl = typeof el == 'string' ? document.body.querySelector(el) : el;

			if (this.dropdowns[menuId].popper) { // Popper already exists - move its reference
				await this.dropdowns[menuId].popper.setOptions({
					reference: targetEl,
				});
			} else { // No popper allocated yet
				this.dropdowns[menuId].popper = Popper(targetEl, this.dropdowns[menuId].menu, {
					placement: this.dropdowns[menuId].placement,
				});
			}
		},


		/**
		* Toggle the open status of a previously created menu by its ID
		*
		* @param {String} menuId The menuID to toggle
		* @param {Boolean|'toggle'} [status='toggle'] Whether to toggle or force the state of the menu
		*/
		toggle(menuId, state = 'toggle') {
			if (!this.dropdowns[menuId]) throw new Error(`No Dropdown object present for ID "${menuId}"`);

			let showMenu = state == 'toggle'
				? !this.dropdowns[menuId].menu.has('open')
				: state;

			this.dropdowns[menuId].menu.classList.toggle('open', showMenu);

			// Handle backdrop display
			if (this.dropdowns[menuId].backdrop !== false) {
				this.backdropEl.classList.toggle('open', showMenu);
			}
		},


		/**
		* Close one or all open menus
		*
		* @param {String} menuId The menuID to close
		*/
		close(menuId) {
			if (menuId) return this.toggle(menuId);

			Object.keys(this.dropdowns)
				.forEach(menuId => this.toggle(menuId, false));
		},
	},
	created() {
		// Inject backdrop
		this.backdropEl = document.createElement('div');
		this.backdropEl.classList.add('menu-service-backdrop');
		this.backdropEl.addEventListener('click', ()=> this.close());
		document.body.appendChild(this.backdropEl);

		// Inject style helpers
		let menuStyle = document.createElement('style');
		menuStyle.innerText = [
			'.menu-service.dropdown-menu {',
				'user-select: none;',
				'display: none;',
			'}',
			'.menu-service.dropdown-menu.open {',
				'display: block;',
			'}',
			'.menu-service.dropdown-menu a.dropdown-item {',
				'cursor: pointer;',
			'}',
			'.menu-service-backdrop {',
				'display: none;',
				'position: fixed;',
				'z-index: 1000;',
				'top: 0px;',
				'left: 0px;',
				'right: 0px;',
				'bottom: 0px;',
				'background: #000;',
				'opacity: 0.1;',
			'}',
			'.menu-service-backdrop.open {',
				'display: block;',
			'}',
		].join('\n');
		document.body.appendChild(menuStyle);
	},
}
</script>
