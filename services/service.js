import {createApp} from 'vue';

/**
* Mount a VueComponent as a singleton, returning the result
*
* @param {Object|VueComponent} component The component specification to use as a service
* @param {Object} options Additional options to mutate behaviour
* @param {VueApp} options.app The global Vue App to mount against, only relevent if `global` is truthy
* @param {Boolean} [options.global=true] Setup the service as globally available by adding it to the prototype object accessible to all Vue components, requires `options.app`
* @param {String} [options.name] Overriding name to use for the service, otherwise the services own name will be used
* @param {Boolean} [options.wrapInit=true] If the component provides an `init` method, add `{data: {ready: Boolean}, methods: {promise: Function<Promise>}}` helpers
* @param {Boolean} [options.init=true] Run the init function if one is present
*/
export default function(component, options) {
	let settings = {
		app: null,
		global: true,
		name: component.name,
		wrapInit: true,
		init: true,
		...options,
	};

	// Settings sanity checks {{{
	if (!component.name) throw new Error('All Vitel service components must specifiy a name');

	if (!settings.app) throw new Error('Cannot resolve global Vue App instance');
	if (!settings.name) throw new Error('Cannot determine usable name for service');
	// }}}

	// Wrap .init() -> ready + promise() (if settings.wrapInit()) {{{
	if (settings.wrapInit && component.methods.init) {
		// Extend .data export with {ready:Boolean}
		component.data = ()=> ({ready: false, ...(component.data && component.data())});

		// Extend .methods with {promise:Function<Promise>}
		component.methods.promise = function promise() {
			if (this.init.promise) return this.init.promise; // Promise already pending

			return this.init.promise = Promise.resolve(this.init())
				.finally(()=> this.ready = true)
		};
	}
	// }}}

	// Create fake mounting DOM element {{{
	let mountEl = document.createElement('div');
	mountEl.id = component.name;
	document.body.appendChild(mountEl);
	// }}}

	// Create a Vue app and intialize it against the above DOM element {{{
	let service = createApp({
		render: ()=> null, // No-op rendering wrapper
		...component,
	}).mount(mountEl);
	// }}}

	// Add as a global service (if settings.app && settings.global) {{{
	if (settings.app && settings.global)
		settings.app.config.globalProperties[settings.name] = service;
	// }}}

	return service;
}
