<script>
import {startCase} from 'lodash-es';

/**
* Vitel Prompt service
*/
export default {
	name: '$prompt',
	data() { return {
		/**
		* Current prompt stack if displaying multiple prompts
		* @type {Array<Object>} this.dialog options object per item from 0 (lowest) to highest
		*/
		stack: [],

		/**
		* <prompt-handler/> VueComponent when it has registered itself
		* @type {VueComponent}
		*/
		handler: null,
	}},
	computed: {
		/**
		* The currently active prompt settings (if any)
		* Taken as the last item in `stack`
		* @returns {Object}
		*/
		active() {
			return this.stack.at(-1);
		},


		/**
		* Indicator that a modal is open
		* @returns {Boolean} Boolean indicating if at least one modal is present
		*/
		isOpen() {
			return this.stack.length > 0;
		},
	},
	methods: {
		/**
		* Display a modal dialog with various customizations
		* This is the main this worker - all the other this.* functions are really just wrappers for this function
		* Requires `<prompt-handler/>` (`./services/prompt-handler.vue`) to be installed as a component somewhere in the root DOM of the body object
		*
		* @param {Object} options Options object to create the dialog from
		* @param {String} [options.title] Dialog title to display
		* @param {String} [options.body] Simple body text to display
		* @param {Boolean} [options.isHtml=false] Indicate that the body text should be rendered as HTML content
		* @param {String} [options.modalClass] Optional class to add to the `.modal-content` element
		* @param {String} [options.modalDialogClass] Optional class to add to the outer `.modal-dialog` element
		* @param {String|Object} [options.component] Vue component name or definition to display after the body text
		* @param {Object} [options.componentProps] Property values to pass when initializing the component
		* @param {Object} [options.componentEvents] Event mappings to pass when initializing the component
		* @param {Boolean} [options.stack=false] Allow model stacking. If false all other models are closed before showing this one
		*
		* @param {Boolean} [options.closable=true] If falsy implies `{closeButton: false, keyboard: false}`
		* @param {Boolean} [options.closeButton=true] Show a dialog close button in the title @FIXME: Not-implemented
		* @param {Boolean} [options.keyboard=true] Whether keyboard interaction should be allowed to dismiss the dialog
		* @param {Boolean} [options.backdrop=true] Show a faded backdrop behind the model
		*
		* @param {String} [options.dialogClose='reject'] Operation to perform when the dialog is dismissed via close or keyboard interaction. ENUM: 'resolve', 'reject'
		*
		* @param {Array<Object|String>} [options.buttons] Button mappings to display in modal footer (or omit to disable). Entries can also be shorthand strings such as 'ok', 'cancel'
		* @param {String} [options.buttons.title] The text to display on the button
		* @param {String} [options.buttons.class='btn btn-light'] The button class to apply (default is 'btn btn-success' for buttons that resolve, 'btn btn-danger' for ones that reject and 'btn btn-default' otherwise)
		* @param {String} [options.buttons.icon] Optional icon to show on the button
		* @param {Function|String} [options.buttons.click] Function to run when the button is clicked or 'resolve', 'reject'. If a function this is called as `(component:VueComponent, buttonSpec:Object)`
		*
		* @param {String} [options.id] Optional ID to identify this dialog, must be DOM compatible. Allocated automatically if omitted
		* @param {BootstrapModel} [options.modelEl] The DOM element representing the mode, allocated during creation
		* @param {DOMElement} [options.modelBS] The Bootstrap Model instance, allocated during creation
		* @param {String} [options.autoListen='change'] Listen for the specified event and accept its payload as the resolve value. Useful to map a components 'change' emitter to the final value of the $prompt.dialog() output
		* @param {*} [options.payloadResolve] Optional payload to resolve with (see also: `autoListen`)
		* @param {*} [options.payloadReject] Optional payload to reject with
		*
		* @param {Promise} [options.promise] Pending promise representing this model instance, allocated during creation
		* @param {Function} [options.promiseResolve] Function to resolve the pending promise
		* @param {Function} [options.promiseReject] Function to reject the pending promise
		*
		* @returns {Promise<*>} A promise which will resolve / reject based on the dialog config. NOTE: If the component triggers the 'change' event the payload of the promise on resolve with be the last given value, otherwise resolves with the payload called with `$prompt.close(isResvoled:Boolean, payload:*)`
		*/
		dialog(options) {
			let $prompt = this;
			let settings = {
				id: null, // FIXME: Auto-allocated ID for this prompt, needed when stacking
				title: 'Question',
				body: '',
				isHtml: false,
				modalClass: '',
				modalDialogClass: '',
				component: null,
				componentProps: {},
				closable: true,
				closeButton: true,
				keyboard: true,
				backdrop: true,
				dialogClose: 'reject',
				buttons: null,
				stack: false,
				modelEl: null, // Eventual DOM element for the model
				modelBS: null, // Eventual Bootstrap Model instance
				autoListen: 'change',
				payloadResolve: undefined,
				payloadReject: undefined,
				promise: null,
				promiseResolve: null,
				promiseReject: null,
				...options,
			};

			// Settings mangling {{{
			// Shorthand setters {{{
			if (!settings.closable)
				Object.assign(settings, {
					closeButton: false,
					keyboard: false,
				});
			// }}}

			// Remap button shorthands {{{
			if (settings.buttons) {
				settings.buttons = settings.buttons.map(b =>
					typeof b == 'object' ? b // Already an object definition
					: ['accept', 'close', 'confirm', 'ok', 'save'].includes(b) ? {
						click: 'resolve',
						class: 'btn btn-success',
						icon: 'fas fa-check',
						title: startCase(b),
					}
					: ['cancel'].includes(b) ? {
						click: 'reject',
						class: 'btn btn-danger',
						icon: 'fas fa-times',
						title: startCase(b),
					}
					: ['back'].includes(b) ? {
						click: 'reject',
						class: 'btn btn-light',
						icon: 'fas fa-arrow-left',
						title: startCase(b),
					}
					: ['-'].includes(b) ? { // Dividers
						class: 'd-block flex-grow-1',
						title: '',
					}
					: (()=> {
						throw new Error(`Unknown button shorthand "${b}"`);
					})()
				);
			}
			// }}}

			// Add listener `autoListen` {{{
			if (
				settings.autoListen
				&& settings.component
				&& !settings.componentEvents?.change
			) {
				this.debug(`Enabling @${settings.autoListen} event listener for $prompt component`);
				settings.componentEvents = {
					[settings.autoListen](payload) {
						if (payload && payload instanceof Event) return; // Ignore pure-event objects which may have bubbled up from JS / nested Vue event emitters

						$prompt.debug(`Set resolve payload from @${settings.autoListen}`, {payload});
						settings.payloadResolve = payload;
					},
					...settings.componentEvents,
				};
			}

			// }}}
			// }}}

			return Promise.resolve()
				.then(()=> {
					if (!settings.stack) { // Close all existing dialogs first
						this.debug('.dialog()', 'Closing all dialogs due to no-stacking option');

						// Close all dialogs from highest to lowest, waiting on each
						return [...this.stack].reverse().reduce((acc, dialog) => {
							this.dialog('Close (no-stacking)', dialog.id);
							return this.close(false, 'CLOSE-NOSTACKING');
						}, Promise.resolve())
					}
				})
				.then(()=> this.handler.push(settings))
				.then(()=> settings.promise = new Promise((resolve, reject) => {
					settings.promiseResolve = resolve;
					settings.promiseReject = reject;
				}))
		},


		/**
		* Close the top-most model in the stack with an optional promise response
		* @param {Boolean} [success=true] Whether the modal was closed successfully
		* @param {*} [payload] Optional payload for the resolving promise
		* @returns {Promise} A promise which resolves when the dialog has closed
		*/
		close(success = true, payload) {
			// Glue in payload if not provided
			if (
				payload === undefined
				&& this.active?.[success ? 'payloadResolve' : 'payloadReject'] !== undefined
			) {
				payload = this.active?.[success ? 'payloadResolve' : 'payloadReject'];
			}

			this.debug('.close()', {success, payload});
			return this.handler.pop(success, payload);
		},


		/**
		* Like close but doesn't throw if no modal is open anyway
		* Designed to be called by the router when moving between routes which can show prompts
		* i.e. this function just dismisses all open modals
		* @returns {Boolean} True if any modals were dismissed
		*/
		closeIfOpen(success = false, payload) {
			if (!this.isOpen) return false;
			this.debug('.closeIfOpen()', {success, payload});
			return this.handler.pop(success, payload)
				.then(()=> true);
		},
	},
	created() {
		if (import.meta.env.DEV) { // Check for <prompt-hanlder/> if in dev mode
			setTimeout(()=> {
				if (!this.handler)
					console.error('<prompt-handler/> not present or it hasnt regierested itself - check you have this component in the top-level of your app');
			}, 500);
		}
	},
}
</script>
