import Vue3Toasity, {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


/**
* Global $events service
* This module is really just a wrapped version of eventemitter3
*
* Available on all Vue models as `vm.$events`
*/
export default function(app) {
	let $toast = {};


	$toast.init = function notifyInit() {
		app.use(Vue3Toasity, {
			hideProgressBar: true,
			progressStyle: {
				background: 'var(--bs-primary)',
			},
			position: toast.POSITION.BOTTOM_RIGHT,
			theme: 'auto',
		});
	}


	/**
	* Bind each method against given options
	* e.g. `$toast.create` -> `toast(text, {type: 'default'})`
	*
	* @param {String} text The toast message to show
	* @param {Object} [options] Additional options to mutate behaviour
	* @see https://vue3-toastify.js-bridge.com/api/toast.html
	*/
	Object.entries({
		create: {type: 'default'},
		success: {type: 'success'},
		warn: {type: 'warning'},
		warning: {type: 'warning'},
		error: {type: 'error'},
	}).forEach(([method, methodOptions]) =>
		$toast[method] = (text, options) => toast(text, {
			...methodOptions,
			...options,
		})
	);


	/**
	* Create a toast which shows a loading progress spinner
	* @param {String} text The text to display
	* @param {Object} [options] Additional options
	* @returns {String} The toast ID associated with the created item
	*/
	$toast.loading = toast.loading.bind(toast);


	/**
	* Update an existing toast by its ID
	* @param {String} id The toast ID to update (returned by the toast creation function)
	* @param {String} [text] The text to update to
	* @param {Object} [options] Additional options to update
	*/
	$toast.update = function toastUpdate(id, text, options) {
		// Argument mangling {{{
		if (typeof text == 'object') { // Omitted text
			[text, options] = [null, text];
		}
		// }}}
		toast.update(id, {
			...(text && {render: text}),
			...(options.progress && {hideProgressBar: false}), // Re-enable progress bar when we're setting some kind of progress
			...options,
		});
	}


	/**
	* Utility function to mark a pending toast as disamissable but not immediately remove it
	* This inherits the ability to close on click + a timeout
	* @param {String} id The toast ID to mark as closable
	* @param {Object} [options] Additional update options to merge with the toasts settings (works the same was as `update()`
	*/
	$toast.closable = function toastClosable(id, options) {
		toast.update(id, {
			autoClose: true,
			closeOnClick: true,
			closeButton: true,
			...options,
		});
	}


	/*
	* Immediately remove a toast by its ID
	* @param {String} id The toast ID to dismiss
	*/
	$toast.close = function toastClose(id) {
		toast.remove(id);
	}


	/**
	* Wrap a promise in a notification
	* @param {String} text The toast message to show
	* @param {Object} [options] Additional options for the toast
	* @param {Promise} promise The promise to wait on
	*/
	$toast.promise = function notifyPromise(text, options, promise) {
		// Argument mangling {
		if (options instanceof Promise || options.then) { // No options given
			[options, promise] = [{}, options];
		}
		// }}}

		let toastId = toast.loading(text, {
			closeOnClick: false,
			closeButton: false,
			...options,
		});
		promise
			.then(res => toast.closable(toastId, {
				...(typeof res == 'string' && {
					render: res,
				}),
				isLoading: false,
				type: 'success',
			}))
			.catch(res => toast.closable(toastId, {
				...(res?.toString && {
					render: res.toString(),
				}),
				isLoading: false,
				type: 'error',
			}))
	}


	//
	// Register as global singleton service
	app.config.globalProperties.$toast = $toast;

	$toast.init();
}
