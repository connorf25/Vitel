<script>
import createKindeClient from '@kinde-oss/kinde-auth-pkce-js';

/**
* Global $authKinde service
* Available on all Vue models as `vm.$authKinde` (unless renamed)
*/
export default {
	name: '$authKinde',
	data() { return {
		/**
		* Kinde instance used to track the user state
		*/
		kinde: null,


		/**
		* Current auth state
		* ENUM: 'loading', 'guest', 'user'
		* @type {String}
		*/
		state: 'loading',


		/**
		* Indicates the loading state of the $authKinde module
		* This only indicates if the state has settled, NOT if the user is logged in
		* @type {Boolean}
		*/
		ready: false,


		/**
		* Indicates the if the current user is valid and is logged in
		* @type {Boolean}
		*/
		isLoggedIn: false,


		/**
		* The currently logged in user data (if any)
		* @type {Object|null}
		*/
		user: null,
	}},
	props: {
		/**
		* Non-secret Kinde client ID to use
		* @type {String}
		*/
		clientId: {type: String, required: true},


		/**
		* Authentication domain to register with
		* @type {String}
		*/
		domain: {type: String, required: true},


		/**
		* If set, bypass Kinde auth and assume this as the logged in email addres
		* @type {String}
		*/
		bypassEmail: {type: String, requried: true},


		/**
		* If `bypassEmail` is set assume this as the user ID
		* @type {String}
		*/
		bypassId: {type: String, default: '00000000-0000-dead-beef-000000000000'},


		/**
		* Async callback triggered before a refresh occurs
		* Called as `()` with this service as its context. this function is not expected to return a response
		* @type {Function}
		*/
		onRefresh: {type: Function, default: ()=> ()=> {}},


		/**
		* Async callback triggered after an update cycle
		* This can be used to hook into the user fetcher and further decorate the fetched data
		* Called as `(user:Object|null)` with this service as its context. This function is not expected to return a response
		* @type {Function}
		*/
		onUpdate: {type: Function, default: ()=> ()=> {}},


		/**
		* Force using local storage instead of Cookies
		* @type {Boolean}
		*/
		forceLocalStorage: {type: Boolean, default: false},


		/**
		* Try to restore an existing login on boot
		* @type {Boolean}
		*/
		autoRestoreLogin: {type: Boolean, default: true},
	},
	methods: {
		/**
		* Reloads local state from this.$authKinde
		* This is an internal function to be called whenever Kinde messages that its state has changed
		*
		* @param {Object} [newState] The incoming new user state
		*
		* @emits $kinde:change When the current user changes in any way
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		refresh(newState) {
			return Promise.resolve()
				.then(()=> this.onRefresh.call(this))
				.then(()=> { // Get new user state
					if (this.bypassEmail) { // Bypass Kinde on dev instances
						this.debug('Bypassing login');
						return {
							id: this.bypassId, // UUID-a-like for basic auth trickery
							email: this.bypassEmail,
						};
					} else if (newState) { // Being given our new user
						return newState;
					} else { // Assume no user / blank / logged out
						return null;
					}
				})
				.then(async (rawUser) => { // Call optional onUpdate promise which is allowed to decorate the raw user before we use it
					await this.onUpdate.call(this, rawUser);
					return rawUser;
				})
				.then(user => { // Populate everything based on the given rawUser
					if (!user) { // No user - logout
						this.isLoggedIn = false;
						this.state = 'guest';
						this.user = null;
						this.debug('Auth change to guest access');
						this.$events.emit('$kinde:change');
					} else { // User has state - login
						this.isLoggedIn = true;
						this.state = 'user';
						this.user = user;
						this.debug('Auth change', this.user);
					}
					this.$events.emit('$kinde:change');
				});
		},


		/**
		* Try and register the user
		*
		* @returns {Promise} A promise which resolves when the operation has completed, although since this usually leads to a Kinde screen the original doc is often destroyed
		*/
		login() {
			return this.promise()
				.then(()=> this.kinde.login());
		},


		/**
		* Try and register a new user
		*
		* @returns {Promise} A promise which resolves when the operation has completed, although since this usually leads to a Kinde screen the original doc is often destroyed
		*/
		signup() {
			return this.promise()
				.then(()=> this.bypassEmail && Promise.reject('Cannot trigger signup process if using bypassEmail'))
				.then(()=> this.kinde.register());
		},


		/**
		* Try and logout of the current session
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		logout() {
			return this.promise()
				.then(()=> this.bypassEmail && Promise.reject('Cannot logout if using bypassEmail'))
				.then(()=> this.kinde.logout());
		},


		/**
		* Utility function to be used in the VueComponent.created() lifecycle hook which checks the user is logged in
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.silent=false] Disable all other options and just redirect
		* @param {String} [options.notify='You need to be logged in to do that'] Message to show if the user is not logged in
		* @param {String} [options.throw='User is not logged in'] Contents of thrown Error on fail, set to falsy to skip
		* @param {String} [options.redirect='/'] Path to redirect to on fail, set to falsy to skip
		*
		* @returns {Promise} A promise which will try to verify the user, if it can OR throw
		*/
		requireLogin(options) {
			let settings = {
				silent: false,
				notify: 'You need to be logged in to do that',
				throw: 'User is not logged in',
				redirect: '/login',
				...options,
			};

			return this.promise()
				.then(()=> this.isLoggedIn || Promise.reject('NOLOGIN'))
				.catch(e => {
					if (e === 'NOLOGIN') {
						if (!settings.silent && settings.notify) this.$toast.create(settings.toast);
						if (settings.redirect) this.$router.push(settings.redirect);
						if (!settings.silent && settings.throw) throw new Error(settings.throw);
					}
				})
		},


		/**
		* Attempt to restore a login, if one is already present
		* This function is auto-executed if `$props.autoRestoreLogin=true`
		*
		* @returns {Promise} A promise which will try to restore an active user login, if one exists
		*/
		restoreLogin() {
			return Promise.resolve()
				.then(()=> this.kinde.getUserProfile())
				.then(state => this.refresh(state))
				.catch(e => {
					console.warn('Error when restoring login:', e);
				})
		},
	},
	created() {
		return this.$services.require('$events')
			.then(()=> {
				if (this.bypassEmail) {
					// Bypass Login - this should only occur on local dev instances
					this.debug('Bypassing auth with email', this.bypassEmail);
					return this.refresh();
				} else {

					return Promise.resolve()
						.then(()=> createKindeClient({ // Create Kinde handler
							client_id: this.clientId,
							domain: this.domain,
							redirect_uri: window.location.origin,
							on_redirect_callback: this.refresh,
							...(this.forceLocalStorage && {
								is_dangerously_use_local_storage: true,
							}),
						}))
						.then(instance => this.kinde = instance)
						.then(()=> this.autoRestoreLogin && this.restoreLogin())
						.catch(this.$toast.catch)
				}
			})
	},
}
</script>
