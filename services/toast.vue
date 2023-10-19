<script>
import Vue3Toasity, {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


/**
* Vitel Toast service
*/
export default {
	name: '$toast',
	props: {
		/**
		* Main VueApp instance to decorate
		* @type {VueApp}
		*/
		app: {type: Object, required: true},
	},
	methods: {
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
				...(options?.progress && {hideProgressBar: false}), // Re-enable progress bar when we're setting some kind of progress
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
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.retry=3] How many times to try and close a potencially not-active-yet toast
		* @param {Number} [options.retryDelay=200] Delay between retries
		*/
		close(id, options) {
			let settings = {
				retry: 3,
				retryDelay: 200,
				...options,
			};

			if (!toast.isActive(id)) {
				if (settings.retry > 0) { // Can retry
					setTimeout(()=> this.close(id, {...settings, retry: settings.retry-1}), settings.retryDelay);
				} else {
					console.warn('Asked to close non-existant toast', id);
				}
			} else {
				toast.remove(id);
			}
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
				.catch(res => {
					console.warn('$toast.promisify() wrapped worker threw', res);
					this.closable(toastId, {
						...(res?.toString && {
							render: res.toString(),
						}),
						isLoading: false,
						type: 'error',
					})
				})
		},


		/**
		* Try to inteligently work out what to show when catching errors
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {String} [options.generic="An error has occured"] Generic error text
		* @param {Array<*>} [options.ignore] Optional arguments to ignore silently, defaults to 'cancel' + 'SKIP'
		*
		* @example Perform a server action and show errors if any
		* this.$http.get('/api/something/complicated') // Make web request
		*   .catch(this.$toast.catch) // Handle all error output
		*/
		catch(obj, options) {
			let settings = {
				generic: 'An error has occured',
				ignore: ['cancel', 'SKIP'],
				...options,
			};
			console.warn('$toast.catch(', obj, ')');
			if (settings.ignore.includes(obj)) return; // Silently ignore anything in the ignore list

			return this.error(
				obj === undefined ? settings.generic
				: typeof obj == 'string' ? obj
				: obj instanceof Error ? obj.toString().replace(/^Error: /, '')
				: obj.error ? obj.error
				: obj.err && typeof obj.err == 'string' ? obj.err
				: obj?.data && typeof obj.data == 'string' ? obj.data
				: obj?.data?.errmsg && typeof obj.data.errmsg == 'string' ? obj.data.errmsg
				: obj?.data?.error && typeof obj.data.error == 'string' ? obj.data.error
				: obj?.data?.err && typeof obj.data.err == 'string' ? obj.data.err
				: obj?.data?.statusText && typeof obj.data.statusText == 'string' ? obj.data.statusText
				: obj?.status === -1 ? 'Server connection failed'
				: typeof obj == 'function' && obj.toString() !== '[object Object]' ? obj.toString()
				: settings.generic
			, options);
		},
	},
	created() {
		this.app.use(Vue3Toasity, {
			hideProgressBar: true,
			progressStyle: {
				background: 'var(--bs-primary)',
			},
			position: toast.POSITION.BOTTOM_RIGHT,
			theme: 'auto',
		});


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
