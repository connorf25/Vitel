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
						if (typeof service == 'string') {
							return this.services[service];
						} else if (typeof service == 'object' && service.name && this.services[service]) { // Given VueComponent spec - but we already know it
							return this.services[service];
						} else if (typeof service == 'object') { // Assume VueComponent spec that needs loading
							return  Service(service, {
								app: this.app,
							});
						}
					})
					.map(service => service.promise()) // Return the promise which checks its ready
			);
		},
	},
}
</script>
