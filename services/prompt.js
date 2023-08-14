import {reactive} from 'vue';

/**
* Global $prompt service
*
* Available on all Vue models as `vm.$prompt`
*/
export default function(app) {
	let $prompt = reactive({});

	/**
	* Current prompt stack if displaying multiple prompts
	* @type {Array<Object>} $prompt.dialog options object per item from 0 (lowest) to highest
	*/
	$prompt.stack = [];


	/**
	* <prompt-handler/> VueComponent when it has registered itself
	* @type {VueComponent}
	*/
	$prompt.handler;


	/**
	* Display a modal dialog with various customizations
	* This is the main $prompt worker - all the other $prompt.* functions are really just wrappers for this function
	* Requires `<prompt-handler/>` (`./services/prompt-handler.vue`) to be installed as a component somewhere in the root DOM of the body object
	*
	* @param {Object} options Options object to create the dialog from
	* @param {String} [options.id] Optional ID to identify this dialog, must be DOM compatible. Allocated automatically if omitted
	* @param {String} [options.title] Dialog title to display
	* @param {String} [options.body] Simple body text to display
	* @param {Boolean} [options.keyboard=true] Whether keyboard interaction should be allowed to dismiss the dialog
	* @param {Boolean} [options.backdrop=true] Show a faded backdrop behind the model
	* @param {String} [options.dialogClose='reject'] Operation to perform when the dialog is dismissed via close or keyboard interaction. ENUM: 'resolve', 'reject'
	* @param {Boolean} [options.stack=false] Allow model stacking. If false all other models are closed before showing this one
	* @param {BootstrapModel} [options.modelEl] The DOM element representing the mode, allocated during creation
	* @param {DOMElement} [options.modelBS] The Bootstrap Model instance, allocated during creation
	* @param {Promise} [options.promise] Pending promise representing this model instance, allocated during creation
	* @param {Function} [options.promiseResolve] Function to resolve the pending promise
	* @param {Function} [options.promiseReject] Function to reject the pending promise
	*
	* @returns {Promise} A promise which will resolve / reject based on the dialog config
	*/
	$prompt.dialog = function promptDialog(options) {
		let settings = {
			id: null, // FIXME: Auto-allocated ID for this prompt, needed when stacking
			title: 'Question',
			body: '',
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

		return $prompt.handler.push(settings)
			.then(()=> settings.promise = new Promise((resolve, reject) => {
				settings.promiseResolve = resolve;
				settings.promiseReject = reject;
			}))
	}


	/**
	* Close the top-most model in the stack with an optional promise response
	* @param {Boolean} [success=true] Whether the modal was closed successfully
	* @param {*} [payload] Optional payload for the resolving promise
	* @returns {Promise} A promise which resolves when the dialog has closed
	*/
	$prompt.close = function promptClose(success = true, payload) {
		console.info('$prompt.close', {success, payload});
		return $prompt.handler.pop(success, payload);
	}


	// Register as global singleton service
	app.config.globalProperties.$prompt = $prompt;
}
