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
		* Function to optionally return additional context information about the session
		* This funciton is expected to return either falsy or an object with at least `{id:String}` with optional additional fields
		*
		* @type {Function}
		*/
		identify: {type: Function, default: ()=> ()=> false},

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
						.then(()=> this.identify.call(this))
						.then(ident => {
							if (!ident) return; // Falsy ident - skip

							if (!ident.id) throw new Error('Return object of LogRocket.$props.identify() should contain at least `{id:String}`');

							// If we got here we have a valid identity - extract the ID + glue the rest in as misc data
							return window.LogRocket.identify(ident.id, { // Tell LogRocket about who is logged in
								...omit(ident, 'id'),
							});
						})
				})
				.catch(e => {
					if (e === 'DISABLED') {
						// Pass
					} else if (/ERR_BLOCKED_BY_CLIENT/.test(e.toString())) {
						console.warn('LogRocket failed to load - likely due to AdBlocker');
					} else {
						throw e;
					}
				})
		},

	},
	created() {
		return this.refresh();
	},
}
</script>
