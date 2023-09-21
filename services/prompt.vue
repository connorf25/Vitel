<script>
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
		* Indicator that a modal is open
		* @returns {Boolean} Boolean indicating if at least one modal is present
		*/
		isOpen() {
			return this.stack.length > 0;
		},
	},
	methods: {
		/**
		* Generic debug function
		* Overload this with something that shows output if needed
		* @param {*} [msg...] Output message to display
		*/
		debug(...msg) { // eslint-disable-line no-unused-vars
			// Uncomment the following line to show debugging information
			// console.info('$prompt', ...msg);
		},


		/**
		* Display a modal dialog with various customizations
		* This is the main this worker - all the other this.* functions are really just wrappers for this function
		* Requires `<prompt-handler/>` (`./services/prompt-handler.vue`) to be installed as a component somewhere in the root DOM of the body object
		*
		* @param {Object} options Options object to create the dialog from
		* @param {String} [options.title] Dialog title to display
		* @param {String} [options.body] Simple body text to display
		* @param {String|Object} [options.component] Vue component name or definition to display after the body text
		* @param {Object} [options.componentProps] Property values to pass when initializing the component
		* @param {Object} [options.componentEvents] Event mappings to pass when initializing the component
		* @param {Boolean} [options.stack=false] Allow model stacking. If false all other models are closed before showing this one
		*
		* @param {Boolean} [options.keyboard=true] Whether keyboard interaction should be allowed to dismiss the dialog
		* @param {Boolean} [options.backdrop=true] Show a faded backdrop behind the model
		*
		* @param {String} [options.dialogClose='reject'] Operation to perform when the dialog is dismissed via close or keyboard interaction. ENUM: 'resolve', 'reject'
		*
		* @param {String} [options.id] Optional ID to identify this dialog, must be DOM compatible. Allocated automatically if omitted
		* @param {BootstrapModel} [options.modelEl] The DOM element representing the mode, allocated during creation
		* @param {DOMElement} [options.modelBS] The Bootstrap Model instance, allocated during creation
		* @param {Promise} [options.promise] Pending promise representing this model instance, allocated during creation
		* @param {Function} [options.promiseResolve] Function to resolve the pending promise
		* @param {Function} [options.promiseReject] Function to reject the pending promise
		*
		* @returns {Promise} A promise which will resolve / reject based on the dialog config
		*/
		dialog(options) {
			let settings = {
				id: null, // FIXME: Auto-allocated ID for this prompt, needed when stacking
				title: 'Question',
				body: '',
				isHtml: false,
				component: null,
				componentProps: {},
				keyboard: true,
				backdrop: true,
				dialogClose: 'reject',
				stack: false,
				modelEl: null, // Eventual DOM element for the model
				modelBS: null, // Eventual Bootstrap Model instance
				promise: null,
				promiseResolve: null,
				promiseReject: null,
				...options,
			};

			return Promise.resolve()
				.then(()=> {
					if (!settings.stack) { // Close all existing dialogs first
						this.debug('.dialog()', 'Closing all dialogs due to no-stacking option');

						// Close all dialogs from highest to lowest, waiting on each
						return this.stack.toReversed().reduce((acc, dialog) => {
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
}
</script>
