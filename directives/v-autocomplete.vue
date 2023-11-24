<script>
import Dropdown from 'bootstrap/js/dist/dropdown';
import {debounce, sortBy} from 'lodash-es';
import RegExpEscape from '#utils/regexpEscape';

/**
* Add an autocomplete element to a regular `<input/>` element with minimal DOM / Vue interruptions
*
* @param {Object} options Configuration options
* @param {Array|Function} [options.options] Options to populate (if a simple array), otherwise this can be an async function which can return an array OR an AxiosRequest which will return the options to display
* @param {Function} [options.change] Event fired when the user makes a selection. Called as `(option)`
*
* @param {String} [options.query] The initial query to use, if omitted uses the value of the element
* @param {Boolean} [options.filter=false] Apply a client-side filter to the input options. This is only useful if the options function doesnt filter the options itself
* @param {Boolean|String|Array<String>} [options.filter=false] Apply a client-side filter to optionsif a literal `true` value. If a non-boolean this indicates the options field(s) to sort by
* @param {Function} [options.label] Function to extract the display label from individual options. Defaults to using the literal string value of the option. Called as `(option)`
* @param {Function} [options.labelHighlighter] Curryable function used to return the label highlighter. Called as `(query)`. Expected to return a function which highlights subsequent option labels.
* @param {String} [options.labelHighlightTag='strong'] HTML tag to use when highlighting matches if using the default `options.labelHightlighter`
* @param {Function} [options.labelEmpty] Function to rreturn a prompt when no options match. Called as `(query)`
* @param {Object} [options.dropdown] Dropdown options passed to `Boostrap.dropdown()` to create the dropdown aspect of the autocomplete
* @param {Object<Function>} [options.events] Event mapping of event handlers for the source element. Each is mapped as a passive event listener
* @param {Object<Function>} [options.keyHandlers] Key handler mapping for anything triggering a key event.
*/
let updateAutocomplete = function updateAutocomplete(el, binding) {
	if (!el.parentElement) return console.log('Cannot render yet - no parent element');

	let settings = {
		options: [],
		query: null,
		filter: false,
		sort: false,
		label: option => option,
		labelHighlighter(query) {
			let highlightReplacer = query
				? new RegExp(
					'('
					+ query
						.trim()
						.split(/\s/)
						.map(part => RegExpEscape(part))
						.join('|')
					+ ')'
				, 'gi')
				: null;

			let highlightTagJoiner = new RegExp(`<\/${settings.labelHighlightTag}>(\\s+)<${settings.labelHighlightTag}>`, 'g');

			return label => highlightReplacer
				? label
					.replace(highlightReplacer, `<${settings.labelHighlightTag}>$1</${settings.labelHighlightTag}>`)
					.replace(highlightTagJoiner, '$1') // Join words seperated by spaces only
				: label;
		},
		labelHighlightTag: 'strong',
		labelEmpty: query => `<em>No matching results for "${query}"</em>`,
		dropdown: {
			autoClose: false,
			popperConfig: {
				placement: 'bottom-start',
			},
		},
		events: {
			async input(e) {
				console.log('INPUT', e);
				settings.query = e.target.value;
				await methods.refreshOptions();
				await methods.toggleDropdown(true);
			},
			async click(e) {
				console.log('CLICK', e);
				await methods.toggleDropdown(true);
			},
			async keyup(e) {
				if (settings.keyHandlers[e.key]) {
					console.log('KEY HANDLER', e.key);
					await settings.keyHandlers[e.key]();
				}
			},
		},
		keyHandlers: {
			async ArrowDown() {
				if (++state.highlighted >= state.options.length)
					state.highlighted = 0;

				await methods.renderOptions();
				await methods.toggleDropdown(true);
			},
			async ArrowUp() {
				if (--state.highlighted < 0)
					state.highlighted = state.options.length - 1;

				await methods.renderOptions();
				await methods.toggleDropdown(true);
			},
			async Escape() {
				await methods.toggleDropdown(false);
			},
			async Enter() {
				await methods.select();
			},
		},
		change(v) {
			console.log("Change event called from v-autocomplete but no 'change' function to receieve it");
		},
		...(
			typeof binding.value == 'function' || Array.isArray(binding.value) ? {options: binding.value} // Given an array or function - use it raw
			: typeof binding.value == 'object' ? binding.value // Given an object - assume its an options structure
			: {} // Assume no options for everything else
		),
	};

	let state = {
		options: null, // Computed options to render
		dropdownMenuEl: null,
		dropdownMenuBS: null,
		highlighted: 0, // Currently highlighted option, if any
	};

	let methods = {
		/**
		* Fetch options from async + update `state.options`
		* @async
		*/
		refreshOptions() {
			return Promise.resolve()
				.then(()=> {
					if (Array.isArray(settings.options)) { // Raw array? Just use that
						return settings.options;
					} else if (typeof settings.options == 'function') { // Function? Run that and see what we get
						return Promise.resolve()
							.then(()=> settings.options(settings.query))
							.then(res => {
								if (Array.isArray(res)) { // Got back array - use as is
									return res;
								} else if (typeof res == 'object') { // Got back object - assume its an Axios request
									return this.$http.request(res)
										.then(({data}) => data)
								} else {
									throw new Error('Unknown async response type `options` - expected an Array or AxiosRequest');
								}
							})
					} else {
						throw new Error('Unknown data type for `options` - expected an Array or Function');
					}
				})
				// Apply client-side filtering (if settings.filter) {{{
				.then(options => {
					if (settings.filter) { // Apply client-side filtering?
						let optionFilterRE = new RegExp(
							'('
							+ settings.query
								.trim()
								.split(/\s/)
								.map(word => RegExpEscape(word))
								.join('|')
							+ ')'
						, 'gi')

						return options
							.filter(option => optionFilterRE.test(settings.label(option)))
					} else {
						return options;
					}
				})
				// }}}
				// Apply client-side sorting (if settings.sort) {{{
				.then(options => {
					if (settings.sort === true) {
						return sortBy(options, opt => settings.label(opt));
					} else if (settings.sort) {
						return sortBy(options, settings.sort);
					} else {
						return options;
					}
				})
				// }}}
				.then(options => state.options = options || [])
				.then(()=> methods.renderOptions());
		},

		/**
		* Render the contents of `state.options`
		* @access private
		*/
		async renderOptions() {
			if (!Array.isArray(state.options)) await methods.refreshOptions();

			let highlighter = settings.labelHighlighter(settings.query);

			if (state.options.length == 0) {
				let emptyDropdownItem = document.createElement('div');
				emptyDropdownItem.classList.add('dropdown-header');
				emptyDropdownItem.innerHTML = settings.labelEmpty(settings.query);
				state.dropdownMenuEl.replaceChildren(emptyDropdownItem);
			} else {
				state.dropdownMenuEl.replaceChildren(...state.options.map((op, opIndex) => {
						let dropdownItem = document.createElement('a');
						dropdownItem.classList.add('dropdown-item');
						dropdownItem.classList.toggle('active', opIndex == state.highlighted);
						dropdownItem.innerHTML = highlighter(settings.label(op));
						dropdownItem.addEventListener('click', ()=> methods.select(opIndex));
						return dropdownItem;
					})
				);
			}
		},

		toggleDropdown(toggleState = 'toggle') {
			return state.dropdownMenuBS[
				toggleState === true ? 'show'
				: toggleState === false ? 'hide'
				: 'toggle'
			]();
		},


		/**
		* Select either the currently highlighted item OR an item by its index
		*
		* @param {Number} [index] Optional index to select, if omitted the currently active item is used
		*/
		async select(index) {
			console.log('SELECT!', index);
			if (index !== undefined) state.highlighted = index;
			await methods.toggleDropdown(false);
			console.log('SETTING OPTION', state.options[state.highlighted]);
			await settings.change(state.options[state.highlighted]);
		},
	};

	console.log('Update autocomplete', {el, binding, settings});

	// Create missing dropdown element + add bindings (if needed) {{{
	state.dropdownMenuEl = el.parentElement.querySelector('.dropdown-menu');
	if (!state.dropdownMenuEl) { // This node has a parent?
		state.dropdownMenuEl = document.createElement('div');
		state.dropdownMenuEl.classList.add('dropdown-menu');
		el.after(state.dropdownMenuEl);

		Object.entries(settings.events)
			.forEach(([key, val]) => el.addEventListener(key, val, {passive: true}));
	}

	if (!state.dropdownMenuBS)
		state.dropdownMenuBS = new Dropdown(el, settings.dropdown);
	// }}}

	// Set initial state, if not already
	if (settings.query === null)
		settings.query = el.value;

	// Trigger options refresh in background
	methods.refreshOptions();
};

export default {
	mounted: updateAutocomplete,
	updated: updateAutocomplete,
}
</script>
