<script>
import Service from '../lib/service.js';

export default {
	name: '$services',
	data() { return {
		/**
		* Object lookup of all loaded services
		* @type {Object}
		*/
		services: {},
	}},
	props: {
		/**
		* The main VueApp object
		* @type {VueApp}
		*/
		app: {type: Object, required: true},


		/**
		* Warn if we end up waiting longer than this time in milliseconds for a `resolve()` operation to conclude
		* @type {Number}
		*/
		timeout: {type: Number, default: 0},
	},
	methods: {
		/**
		* Wait for all services to signal they are ready - loading any specified if necessary
		* Services can be either a named of a service or a VueComponent
		*
		* A ready state is the execution of any and all init() functions and setting `{ready:true}` for each
		* @param {String} service... Service names to wait for
		* @returns {Promise} A promise when all named/specified services have become ready
		*/
		require(...services) {
			return Promise.all(
				services
					.map(service => { // Either find existing service or load it
						if (typeof service == 'string' && this.services[service]) {
							return this.services[service];
						} else if (typeof service == 'object' && service.name && this.services[service]) { // Given VueComponent spec - but we already know it
							return this.services[service];
						} else if (typeof service == 'object') { // Assume VueComponent spec that needs loading
							return  Service(service, {
								app: this.app,
							});
						} else {
							throw new Error(`Unknown service "${service}" - is it loaded?`);
						}
					})
					.filter(Boolean)
					.map(service => { // Return the promise which checks its ready
						if (this.timeout == 0) { // Not bothering with a timeout?
							return service.promise();
						} else { // Glue a timeout and warn if it doesn't resolve
							let timeoutHandle = setInterval(()=> {
								console.log('Still waiting for', service.$options.name, 'to finish');
							}, this.timeout);

							return service.promise()
								.finally(()=> clearTimeout(timeoutHandle));
						}
					})
			);
		},
	},
}
</script>
