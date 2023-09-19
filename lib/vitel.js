import Filter from './filter.js';
import Service from './service.js';
import Services from '../services/services.vue';

/**
* Install various Vitel extensions against a Vue App
*
* @param {VueApp} app The Vuew app instance to install against (provided by Vue if using `app.use()`)
* @param {Object} [options] Additional options to mutate behaviour
* @param {Boolean} [options.appFilter=true] Install the `app.filter()` utility loader
*
* @param {Boolean} [options.appService=true] Install the `app.service()` utility loader
* @param {Boolean} [options.registerService=true] Register the meta `vm.$service` service
* @param {Object} [options.$serviceProps] Optional properties to pass to the main $service service
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
		appFilter: true,
		appService: true,
		registerService: true,
		$serviceProps: {},
		...options,
	};

	// Add app.filter() helper {{{
	if (settings.appFilter) {
		app.filter = function AppFilter(name, cb) {
			if (!cb) { // Asking for filter rather than defining
				return app.config.globalProperties.$filters[name];
			} else { // Assume defining filter
				Filter(cb, {
					app,
					name,
				});
			}
		};
	}
	// }}}

	// Add app.service() helper {{{
	if (settings.appService) {
		app.service = function AppService(name, component, options) {
			if (!component) { // Asking for service rather than defining
				return app.config.globalProperties[name];
			} else { // Assume defining service
				Service(component, {
					app,
					name,
					...options,
					...settings.$serviceProps,
				});
			}
		};
	}
	// }}}

	// Load $services meta service (if settings.registerServices) {{{
	if (settings.registerService) {
		Service(Services, {
			app,
			name: '$services',
			global: true,
		});
	}
	// }}}
}
