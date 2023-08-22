import Service from './service.js';
import FiltersService from '../services/filters.vue';

/**
* Mount a function as a Vue@2-like filter within Vue3 / Vite projects
*
* This creates the `vm.$filters` service (if its not already present) and adds the given function as a named filter
*
* @param {Function} cb Callback to register as a filter
* @param {Object} options Additional options to mutate behaviour
* @param {Boolean} [options.global=true] Setup the filter as globally available by adding it to the `$filter` service
* @param {String} [options.name] Name to use for the filter
*/
export default function Filter(cb, options) {
	let settings = {
		app: null,
		name: null,
		...options,
	};

	// Settings sanity checks {{{
	if (!settings.name) throw new Error('All Vitel filters must specifiy a name');
		if (!/^[_\w]+$/i.test(settings.name)) throw new Error(`Filter names must only contain A-Z + "_" symbols, got "${settings.name}"`);

	if (!settings.app) throw new Error('Filter `app` must be specified');
	// }}}

	// Register $filters if its not already present
	let $filters = Service(FiltersService, {
		app: settings.app,
	});

	$filters[settings.name] = $filters.filters[settings.name] = cb;
}
