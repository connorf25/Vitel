import {createApp} from 'vue';

/**
* Mount a component object as a singleton VueComponent, returning the result
*
* Component specs can request the prop `app` which will be populated with the current app instance.
*
* @param {Object|VueComponent} component The component specification to use as a service
* @param {Object} options Additional options to mutate behaviour
* @param {VueApp} options.app The global Vue App to mount against, only relevent if `global` is truthy
* @param {Boolean} [options.global=true] Setup the service as globally available by adding it to the prototype object accessible to all Vue components, requires `options.app`
* @param {String} [options.name] Overriding name to use for the service, otherwise the services own name will be used
* @param {Boolean} [options.debug=false] Activate the services debuging - any calls to `vm.debug()` will be shown on the console instead of being disguarded
* @param {Function} [options.debugLogger] Actual worker function to output data, defaults to `console.log` with a prefix for the service name
* @param {Boolean} [options.wrapCall=true] If the component exposes a `call` method, wrap the output in a proxy which retoutes any function-like call to it, otherwise the return is a regular VueComponent
* @param {Boolean} [options.wrapCreated=true] If the component exposes a `created` method, add `{data: {ready: Boolean}, methods: {promise: Function<Promise>}}` helpers
* @param {Object} [options.extend] Optional extensions to mixin to the existing service component, mainly used internally
* @param {Object} [options.props] Props to populate the loaded service
* @param {Boolean} [options.autoProps=true] If `options.props` is empty, pick all properties from options that arn't any of the settings listed there
* @param {Boolean} [options.copyGlobals=true] Copy any given `options.app` global inherited properties into the new service App instance
* @param {Boolean} [options.force=false] Skip silently if the service is already declared
* @param {Function} [options.onLoad] Optional function, called as `(service)` when the service has been loaded (but may not yet be ready). Called before any `created` event fires
* @param {Function} [options.onReady] Optional function, called as `(service)` when the service has signalled it is ready. Called at the very last stage of the lifecycle
*
* @returns {VueComponent} A singleton VueComponent
*/
export default function Service(component, options) {
	let defaults = {
		app: null,
		global: true,
		name: component.name,
		debug: false,
		debugLogger(...msg) {
			console.info(`[%c${settings.name}]`, 'font-weight:bold', ...msg);
		},
		wrapCall: true,
		wrapCreated: true,
		extend: {
			data: {},
			props: {},
			methods: {},
			mixins: [],
			created: null,
			render: ()=> null, // No-op rendering wrapper
		},
		props: {},
		autoProps: true,
		copyGlobals: true,
		force: false,
		onLoad: null,
		onReady: null,
	};
	let settings = {
		...defaults,
		...options,
		extend: { // Need to deep populate extend or bits go missing
			...defaults.extend,
			...options.extend,
		},
	};

	// Settings sanity checks {{{
	if (!component.name) throw new Error('All Vitel service components must specifiy a name');
		if (!/^\$[_\w]+$/i.test(component.name)) throw new Error('Service names must start with a dollar symbol + contain A-Z + "_" symbols');

	if (!settings.app) throw new Error('Cannot resolve global Vue App instance');
	if (!settings.name) throw new Error('Cannot determine usable name for service');
	// }}}

	// Skip creation if service already exists (if !settings.force) {{{
	if (!settings.force && settings.app && settings.global && settings.app.config.globalProperties[settings.name])
		return settings.app.config.globalProperties[settings.name];
	// }}}

	// Wrap .created() -> ready + promise() (if settings.wrapCreated()) {{{
	if (!component.methods) component.methods = {}; // Create method stub if its absent

	if (settings.wrapCreated && component.created) {
		// Extend .data export with {ready:Boolean}
		settings.extend.data.ready = false;

		// Wrap existing created() lifecycle hook into a promise which creates a Defer promise + sets `ready` when done
		let promisePending;
		let originalCreateCB = component.created;
		component.created = function ServiceCreated() {
			return promisePending = Promise.resolve()
				.then(()=> settings.onLoad && settings.onLoad.call(this, this))
				.then(()=> originalCreateCB && originalCreateCB.call(this))
				.then(()=> settings.extend.created && settings.extend.created.call(this))
				.then(()=> settings.onReady && settings.onReady.call(this, this))
				.catch(e => {
					console.warn('Service', settings.name, 'threw while being created:', e);
					throw e;
				})
				.finally(()=> this.ready = true)
		};

		component.methods.promise = function ServicePromise() {
			if (promisePending) {
				return promisePending;
			} else {
				return new Promise((resolve, reject) =>
					setTimeout(()=> {
						if (promisePending) resolve(promisePending);
						reject(`Unable to find loading promise for service "${settings.name}" - it should have loaded by now`);
					}, 100)
				)
			}
		};
	} else { // If disabled add dummy wrappers for {ready:Boolean, promise()}
		settings.extend.data.ready = true;

		if (!component.methods.promise)
			settings.extend.methods.promise = ()=> Promise.resolve();
	}
	// }}}

	// Add methods.debug {{{
	component.methods.debug = settings.debug
		? (...msg) => msg.length == 1 && typeof msg[0] == 'function'
			? Promise.resolve(msg[0]) // Given function - resolve it then output (if returns anything)
				.then(payload => payload ?? settings.debugLogger(payload))
			: settings.debugLogger(...msg) // Called debug(...stuff)
		: () => {};
	// }}}

	// Create fake mounting DOM element {{{
	let mountEl = document.createElement('div');
	mountEl.id = component.name;
	document.body.appendChild(mountEl);
	// }}}

	// Apply settings.extend.data {{{
	if (settings.extend.data && Object.keys(settings.extend.data).length > 0) {
		let existingData = (component.data && component.data.call(this)) || {};
		component.data = function() { // Wrap existing data function return in an outer funciton which adds our extensions
			return {
				...existingData, // Mix-in existing data (if any)
				...settings.extend.data, // Add our mixins
			};
		};
	}
	// }}}
	// Apply settings.extend.methods {{{
	if (settings.extend.methods && Object.keys(settings.extend.methods).length > 0) {
		component.methods = {
			...component.methods, // Copy existing methods
			...settings.extend.methods, // Add our mixins
		};
	}
	// }}}
	// Apply settings.extend.mixin {{{
	if (settings.extend.mixins && settings.extend.mixins.length > 0) {
		component.mixins = [
			...component.mixins ?? [],
			...settings.extend.mixins,
		];
	}
	// }}}
	// Apply settings.extend.{render} {{{
	['render']
		.filter(key => settings.extend[key] && !component[key]) // No handler set and we have one to provide
		.forEach(key => component[key] = settings.extend[key]);
	// }}}
	// Compute props + Apply settings.props {{{
	let props =
		Object.keys(settings.props).length > 0 ? settings.props // Use provided props
		: settings.autoProps ? (() => { // Extract not-specific keys from options and use those
			let defaultKeys = new Set(Object.keys(defaults));

			return Object.fromEntries(
				Object.entries(settings).filter(([key]) => !defaultKeys.has(key))
			);
		})()
		: {};

	// Glue settings.props + app object to component props
	props = {
		...props,
		...settings.props,
		app: settings.app, // Optional subscription to the app object if the component requests it
	};
	// }}}

	// Create a Vue app and intialize it against the above DOM element {{{
	// Create base VueApp
	let serviceApp = createApp(component, props)

	// Relink globalProperties to inherit services (if settings.copyGlobals)
	if (settings.app && settings.copyGlobals) {
		serviceApp.config.globalProperties = settings.app.config.globalProperties; // Inherit the same globals
	}

	// NOTE: mounting a VueApp transforms it into a Root level component so any
	//       mutation of the app (e.g. setting globalProperties) has to occur before this
	let serviceComponent = serviceApp.mount(mountEl);

	if (settings.wrapCall && component.call) {
		let vueComponent = serviceComponent; // Create backup of original

		// Return Proxy<Function> which reroutes sub-key access to the original component
		serviceComponent = new Proxy(component.call, {
			get(target, prop) {
				return vueComponent[prop];
			},
			set(target, prop, val) {
				vueComponent[prop] = val;
			},
			has(target, key) {
				return Object.hasOwn(vueComponent, key);
			},
			apply(target, context, args) {
				return component.call.apply(vueComponent, args);
			},
		});
	}
	// }}}

	// Add as a global service (if settings.app && settings.global) {{{
	if (settings.app && settings.global) {
		settings.app.config.globalProperties[settings.name] = serviceComponent;
	}
	// }}}

	// Add registered component to $services && $services.services {{{
	if (settings.app && settings.app.config.globalProperties.$services)
		settings.app.config.globalProperties.$services[settings.name] = settings.app.config.globalProperties.$services.services[settings.name] = serviceComponent;
	// }}}

	return serviceComponent;
}
