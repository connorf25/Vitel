<script>
import {register as hankoRegister} from '@teamhanko/hanko-elements';
import {en as hankoLangEn} from '@teamhanko/hanko-elements/i18n/en';
import EventsService from './events.vue';

/**
* Global $hanko service
* Available on all Vue models as `vm.$hanko`
*
* @param {VueApp} Main app instance to install against
* @param {Object} options Additional options to mutate behaviour
* @param {String} options.accountUrl The Hanko account URL to register against
* @param {String} [options.bypassEmail] If specified bypass Hanko auth completely and assume the user is logged in as this email address, obviously only for use in dev systems
* @param {String|Null} [options.installAs='$hanko'] Service name to provide
*
* @example Simple .vue SFC login component
* (Within scrtip tag):
* export default {
* 	methods: {
*     redirectAfterLogin() {
*       this.$router.replace({path: '/'});
*     },
*   },
*   created() {
*     return this.this.promise()
*       .then(()=> this.this.isLoggedIn && Promise.reject('ALREADY-LOGGED-IN'))
*       .catch(e => {
*         if (e === 'ALREADY-LOGGED-IN') {
*           return this.redirectAfterLogin();
*         } else {
*           throw e;
*         }
*       })
*   },
* }
*
* (Within template tag):
*  <div class="center">
*    <div class="card">
*      <div class="card-header">Login / Signup</div>
*      <div class="card-body">
*        <hanko-auth @onAuthFlowCompleted="redirectAfterLogin" lang="en"/>
*      </div>
*    </div>
*  </div>
*
*
* @example Simple .vue SFC logout component
* (Within script tag):
* export default {
*   mounted() {
*     return this.this.requireLogin({silent: true})
*       .then(()=> this.this.logout())
*       .finally(()=> this.$router.replace('/'))
*   },
*   render: ()=> {}, // eslint-disable-line vue/require-render-return
* }
*/
export default {
	name: '$authHanko',
	data() { return {
		/**
		* Hanko instance used to track the user state
		*/
		hanko: null,


		/**
		* Current auth state
		* ENUM: 'loading', 'guest', 'user'
		* @type {String}
		*/
		state: 'loading',


		/**
		* Indicates the loading state of the $hanko module
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
		* Indicates if the user has Passkeys to manage via Hanko
		* Can be false if social login was used or auth was bypassed
		* @type {Boolean}
		*/
		hasPasskeys: false,


		/**
		* The currently logged in user data (if any)
		* @type {Object|null}
		*/
		user: null,
	}},
	props: {
		/**
		* Main VueApp instance to decorate
		* @type {VueApp}
		*/
		app: {type: Object, required: true},


		/**
		* Hanko site URL to verify against
		* @type {String}
		*/
		accountUrl: {type: String, required: true},


		/**
		* If set, bypass Hanko auth and assume this as the logged in email addres
		* @type {String}
		*/
		bypassEmail: {type: String, requried: true},


		/**
		* If `bypassEmail` is set assume this as the user ID
		* @type {String}
		*/
		bypassId: {type: String, default: '00000000-0000-dead-beef-000000000000'},
	},
	methods: {
		/**
		* Reloads local state from this.hanko
		* This is an internal function to be called whenever Hanko messages that its state has changed
		* @fires $hanko:change When the current user changes in any way
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		refresh() {
			if (!this.bypassEmail) { // Bypass hanko on dev instances
				this.isLoggedIn = true;
				this.state = 'user';
				this.user = {
					id: this.bypassId, // UUID-a-like for basic auth trickery
					email: this.bypassEmail,
				};
				app.services.$events.emit('$hanko:change');
			} else if (this.hanko.session.isValid()) {
				return this.hanko.user.getCurrent()
					.then(res => {
						this.isLoggedIn = true;
						this.state = 'user';
						this.user = res;
						this.hasPasskeys = true;
					})
					.then(()=> this.$events.emit('$hanko:change'))
			} else {
				this.isLoggedIn = false;
				this.state = 'guest';
				this.user = null;
				this.$events.emit('$hanko:change');
			}
		},


		/**
		* Try and logout of the current session
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		logout() {
			return this.promise()
				.then(()=> this.hanko.user.logout());
		},


		/**
		* Utility function to be used in the VueComponent.created() lifecycle hook which checks the user is logged in
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.silent=false] Disable all other options and just redirect
		* @param {String} [options.notify='You need to be logged in to do that'] Message to show if the user is not logged in
		* @param {String} [options.throw='User is not logged in'] Contents of thrown Error on fail, set to falsy to skip
		* @param {String} [options.redirect='/'] Path to redirect to on fail, set to falsy to skip
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
						if (!settings.silent && settings.notify) app.services.$toast.create(settings.toast);
						if (settings.redirect) this.$router.push(settings.redirect);
						if (!settings.silent && settings.throw) throw new Error(settings.throw);
					}
				})
		},
	},
	created() {
		return this.$services.load(EventsService)
			.then(()=> {
				if (this.bypassEmail) {
					// Bypass Hanko - this should only occur on local dev instances
					return this.refresh();
				} else {
					return hankoRegister(this.accountUrl, {
						translations: {en: hankoLangEn},
						fallbackLanguage: 'en',
						storageKey: 'auth',
					})
					.then(({hanko}) => this.hanko = hanko)
					// Setup event listeners {{{
					.then(()=> {
						this.hanko.onUserLoggedOut(this.refresh);
						this.hanko.onSessionExpired(this.refresh);
						this.hanko.onUserDeleted(this.refresh);
						this.hanko.onSessionCreated(this.refresh);
						return this.refresh();
					})
					// }}}
				}
			})
	},
}
</script>
