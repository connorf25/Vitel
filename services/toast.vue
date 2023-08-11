<script>
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
			position: toast.POSITION.BOTTOM_RIGHT,
			theme: 'auto',
		});
	}


	$toast.toast = function notifyToast(text, options) {
		toast(text, options);
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
			.then(res => toast.update(toastId, {
				...(typeof res == 'string' && {
					render: res,
				}),
				autoClose: true,
				closeOnClick: true,
				closeButton: true,
				isLoading: false,
				type: 'success',
			}))
			.catch(res => toast.update(toastId, {
				...(res?.toString && {
					render: res.toString(),
				}),
				autoClose: true,
				closeOnClick: true,
				closeButton: true,
				isLoading: false,
				type: 'error',
			}))
	}


	//
	// Register as global singleton service
	app.config.globalProperties.$toast = $toast;

	$toast.init();
}
</script>
