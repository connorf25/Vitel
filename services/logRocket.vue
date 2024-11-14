<script>
import {omit} from 'lodash-es';
import {injectScript} from '#utils/inject';

/**
* LogRocket handling service
*/
export default {
	name: '$logRocket',
	data() { return {

		/**
		* Whether LogRocket is used in this session
		* Determined at boot + calls to refresh()
		* @type {Boolean}
		*/
		enabled: false,

	}},
	props: {

		/**
		* Whether to trigger `refresh()` when created automatically
		*
		* @type {Boolean}
		*/
		autoLoad: {type: Boolean, default: true},


		/**
		* The LogRocket Project string that identifies this instance
		*
		* @type {String}
		*/
		project: {type: String, required: true},


		/**
		* Custom async callback to determine if we should actually inject LogRocket
		* Override this function if you are using selective LR monitoring
		* Should return a boolean true if injection is required
		* Defaults to always injecting
		*
		* @type {Function}
		*/
		shouldInject: {type: Function, default: ()=> ()=> true},


		/**
		* Function used to update LogRockets user information
		* This should set up a watcher, emit listener or other Vue function to eventually call the identify function
		*
		* Called as `(updateIdentify:Function)` which should eventually be called with a user identity
		*
		* @type {Function}
		*
		* @example Watch a Vue binding and update the user info when it succeeds
		* {
		*  identify(updateIdentity) {
		*    this.$watch('$auth.user', ()=> updateIdentity(this.$auth.user), {immediate: true})
		*  }
		* }
		*/
		identify: {type: Function},
	},
	methods: {

		/**
		* Optionally inject the LogRocket service if the user has it enabled
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		refresh() {
			return Promise.resolve()
				.then(()=> {
					if (window.LogRocket) {
						this.debug('LogRocket already present');
						throw 'DISABLED';
					}
				})
				.then(()=> this.shouldInject.call(this))
				.then(result => this.enabled = !! result)
				.then(()=> { // If enabled - inject LogRocket
					if (!this.enabled) throw 'DISABLED';

					return Promise.resolve()
						.then(()=> injectScript('https://cdn.lr-ingest.io/LogRocket.min.js', {
							crossOrigin: 'anonymous',
						}))
						.then(()=> window.LogRocket || Promise.reject('Expected LogRocket to load but its not present! Adblock?'))
						.then(()=> window.LogRocket.init(this.project)) // Bootstrap Logrocket for the first time
						.then(()=> this.identify && this.identify.call(this, this.updateIdentify)) // Run the identify() callback if its specified
				})
				.catch(e => {
					if (e === 'DISABLED') {
						// Pass
					} else if (/ERR_BLOCKED_BY_CLIENT/.test(e.toString())) {
						console.warn('LogRocket failed to load - likely due to AdBlocker');
						this.enabled = false;
					} else if (/Session quota exceeded/.test(e.toString())) {
						console.warn('LogRocket disabled - session quota exceeded');
						this.enabled = false;
					} else {
						throw e;
					}
				})
		},

		/**
		* Update what LogRocket knows about this user
		* This is really just a wrapper around `window.LogRocket.identify()`
		* Note that the `id` is extracted from `data.id`
		*
		* @param {Object} ident Extended user data, if omitted no action is taken
		* @param {String} ident.id The user ID to identify by, must be specified
		*/
		updateIdentity(ident) {
			if (!ident) return; // Falsy ident - skip

			if (!ident.id) throw new Error('Return object of LogRocket.$props.identify() should contain at least `{id:String}`');

			// If we got here we have a valid identity - extract the ID + glue the rest in as misc data
			return window.LogRocket.identify(ident.id, { // Tell LogRocket about who is logged in
				...omit(ident, 'id'),
			});
		},

	},
	created() {
		return this.refresh();
	},
}
</script>
