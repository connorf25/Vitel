<script>
import Vue3Toasity, {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


/**
* Vitel Toast service
*/
export default {
	name: '$toast',
	methods: {
		/**
		* Boot the toast functionality, setting defaults
		*/
		init() {
			app.use(Vue3Toasity, {
				hideProgressBar: true,
				progressStyle: {
					background: 'var(--bs-primary)',
				},
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: 'auto',
			});
		},


		/**
		* Create a toast which shows a loading progress spinner
		* @param {String} text The text to display
		* @param {Object} [options] Additional options
		* @returns {String} The toast ID associated with the created item
		*/
		loading(text, options) {
			return toast.loading(text, options);
		},


		/**
		* Update an existing toast by its ID
		* @param {String} id The toast ID to update (returned by the toast creation function)
		* @param {String} [text] The text to update to
		* @param {Object} [options] Additional options to update
		*/
		update(id, text, options) {
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
		},


		/**
		* Utility function to mark a pending toast as dismissable but not immediately remove it
		* This inherits the ability to close on click + a timeout
		* @param {String} id The toast ID to mark as closable
		* @param {Object} [options] Additional update options to merge with the toasts settings (works the same was as `update()`
		*/
		closable(id, options) {
			toast.update(id, {
				autoClose: true,
				closeOnClick: true,
				closeButton: true,
				...options,
			});
		},


		/*
		* Immediately remove a toast by its ID
		* @param {String} id The toast ID to dismiss
		*/
		close(id) {
			toast.remove(id);
		},


		/**
		* Wrap a promise in a notification
		* @param {String} text The toast message to show
		* @param {Object} [options] Additional options for the toast
		* @param {Promise} promise The promise to wait on
		*/
		promisify(text, options, promise) {
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

			return Promise.resolve(promise)
				.then(res => this.closable(toastId, {
					...(typeof res == 'string' && {
						render: res,
					}),
					isLoading: false,
					type: 'success',
				}))
				.catch(res => this.closable(toastId, {
					...(res?.toString && {
						render: res.toString(),
					}),
					isLoading: false,
					type: 'error',
				}))
		},
	},
	created() {
		/**
		* Bind each method against given options
		* e.g. `this.create` -> `toast(text, {type: 'default'})`
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
			this[method] = (text, options) => toast(text, {
				...methodOptions,
				...options,
			})
		);
	},
}
</script>
