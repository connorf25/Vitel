import Service from './service.js';
import Services from '../services/services.vue';

/**
* Install various Vitel extensions against a Vue App
*
* @param {VueApp} app The Vuew app instance to install against (provided by Vue if using `app.use()`)
* @param {Object} [options] Additional options to mutate behaviour
* @param {Boolean} [options.appService=true] Install the `app.service()` utility loader
* @param {Boolean} [options.registerService=true] Register the meta `vm.$service` service
*
* @example Install against a Vue app
* import {createApp} from 'vue'
* import App from './App.vue';
* import Vitel from '@momsfriendlydevco/vitel';
* let app = createApp(App);
* app.use(Vitel);
*/
export default function VitelInstall(app, options) {
	let settings = {
		appService: true,
		registerService: true,
		...options,
	};

	// Add app.service() helper {{{
	if (settings.appService) {
		app.service = function AppService(name, component, options) {
			console.log('DEBUG APP.SERVICE', [name, component, options], 'with', {app});
			Service(component, {
				app,
				name,
				...options,
			});
		};
	}
	// }}}

	// Load $services meta service (if settings.loadServices) {{{
	if (settings.registerService) {
		let $services = Service(Services, {
			app,
			name: '$services',
			global: true,
		});

		// Kludge to ensure that this.$services is always available, even early in the bootstrap order
		app.mixin({
			beforeCreate() {
				console.log('GLUE', {$services})
				this.$services = $services;
			},
		});
	}
	// }}}

	console.log('DONE VITELINSTALL');
}
