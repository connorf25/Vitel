<script>
import axios from 'axios';
import hasher from 'object-hash';
import {merge} from 'lodash-es';

/**
* Axios wrapper
*
* @param {Object} [config] Base config to merge into axios.defaults
*
* @url https://github.com/axios/axios#example
*
* @example Load the HTTP module with a sane baseUrl + credential headers
* import HttpService from '@momsfriendly/vitel/services/http';
* app.service('$http', HttpService, {
*   debug: true, // Enable debugging if you want more verbosity
*   config: {
*     baseURL: 'http://localhost:8080',
*     withCredentials: true,
*   },
* });
*
* @example Make a GET request and process the (array'd) document body)
* vm.$http.get('/api/widgets')
*   .then(({data}) => data)
*
* @example Make a complex request
* vm.$http.request({
*   method: 'PUT',
*   headers: {'My Custom Header': 123},
*   params: {id: 123},
*   data: {someData: 'someValue'},
* })
*/
export default {
	name: '$http',
	data() { return {
		/**
		* Axios instance we're wrapping
		* @type {Axios}
		*/
		axios: axios.create(),

		/**
		* Hash->request lookup for requests being made against their resolving promise
		* @type {Object<Promise>}
		*/
		throttles: {},
	}},
	props: {
		config: {type: Object},
	},
	methods: {
		delete(...args) { return this.axios.delete(...args) },
		get(...args) { return this.axios.get(...args) },
		head(...args) { return this.axios.head(...args) },
		options(...args) { return this.axios.options(...args) },
		patch(...args) { return this.axios.patch(...args) },
		post(...args) { return this.axios.post(...args) },
		put(...args) { return this.axios.put(...args) },
		request(...args) { return this.axios.request(...args) },

		/**
		* Similar to a regular Axios.request() except that incoming requests are throttled if they match a given hash + expiry period
		*
		* @param {AxiosRequest} [config] The request to make
		* @param {String} [config.hashMethod='url'] How to hash the response. ENUM: 'url', 'query', 'request', 'custom'
		* @param {*} [config.hash] Precomputed hash if using `{hashMethod:'custom'}`
		* @param {String} [config.cachePrefix='http-'] Prefix to use when stashing HTTP cache responses
		*
		* @returns {Promise<AxiosResponse>} Either the regular resolved AxiosResponse or the existing value by hash
		*/
		throttle(config) {
			if (typeof config != 'object') throw new Error(`$http.throttle only accepts an AxiosRequest object "${typeof config}" given`);

			let hashMethod = config.hashMethod || 'url';
			let hash =
				hashMethod == 'url' ? hasher(config.url)
				: hashMethod == 'query' ? hasher({url: config.url, params: config.params, data: config.data})
				: hashMethod == 'request' ? hasher(config)
				: hashMethod == 'custom' && typeof config.hash == 'string' && /^\w+$/.test(config.hash) ? config.hash // Given a hash and it looks valid
				: hashMethod == 'custom' ? hasher(config.hash) // Don't trust it, run via hash() instead
				: (()=> { throw new Error(`Invalid $http.throttle hashMethod "${hashMethod}"`) })()

			let reqPrefix = `${config.method || 'GET'} ${config.url} ~ HASH[${hash}]`;
			if (this.throttles[hash]) { // Already making the request?
				// Request is already being made - return the pending promise;
				this.debug(reqPrefix, 'Reuse pending request');
				return this.throttles[hash];
			} else if (this.$cache?.get) { // $cache service is available - ask that
				return this.$cache.get((config.cachePrefix ?? 'http-') + hash, null)
					.then(val => {
						if (val !== null) { // Cache returned a value - use it
							return val;
						} else {
							this.debug(reqPrefix, 'Make fresh throttled request - no $cache value available');
							return this.throttles[hash] = this.axios.request(config)
								.finally(()=> { // Resolved - remove from pending list
									delete this.throttles[hash];
								})
						}
					})
			} else { // Give up and make the request as-is
				this.debug(reqPrefix, 'Make fresh throttled request');
				return this.throttles[hash] = this.axios.request(config)
					.finally(()=> { // Resolved - remove from pending list
						delete this.throttles[hash];
					})
			}
		},
	},


	/**
	* Vitel service wrapper in case this component is called as a function (e.g. `vm.$http()`)
	*/
	call(...args) {
		return this.axios.request(...args);
	},
	created() {
		// Make Axios request JSON by default
		this.axios.defaults.headers.common.Accept = 'application/json';

		// Set base config if we are given one
		if (this.config) {
			this.debug('Using config', this.config);
			merge(this.axios.defaults, this.config);
		}

		// Make Axios encode using jQueries parameter serializer to keep Monoxide happy
		/* FIXME: Not sure if this is used these days - MC 2023-09-19
		this.axios.defaults.paramsSerializer = params =>
			$.param(params)
				.replace(/\bq=(.+)\b/g, p => p.replace(/%3A/g, ':')) // Allow `q=` to contain ':' tags
		*/

		// Add request debugging if enabled
		this.debug(()=> {
			this.axios.interceptors.request.use(
				config => {
					this.debug('Request', config);
				},
				error => {
					this.debug('Request error', error);
				},
			)
		});


		// Monkey patch Axios so that any error response gets correctly decoded rather than weird stuff like 'Server returned a 403 code'
		this.axios.interceptors.response.use(
			response => response,
			error => {
				if (!error.response || !error.response.status) {
					return Promise.reject(error);
				} else if (error.response && error.response.data) {
					return Promise.reject(error.response.data);
				} else {
					return Promise.reject(error.response);
				}
			},
		);
	},
}
</script>
