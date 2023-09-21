<script>
import axios from 'axios';

/**
* Axios wrapper
*
* @param {String} [baseUrl] Optional base URL to apply to all requests
*
* @url https://github.com/axios/axios#example
*
* @example Make a GET request and process the (array'd) document body)
* vm.$http.get('/api/widgets')
*   .then(({data}) => data)
*
* @example Make a complex request
* vm.$http({
*   method: 'PUT',
*   headers: {'My Custom Header': 123},
*   params: {id: 123},
*   data: {someData: 'someValue'},
* })
*/
export default {
	name: '$http',
	data() { return {
		axios: axios.create(),
	}},
	methods: {
		delete(...args) { return this.axios.delete(...args) },
		get(...args) { return this.axios.get(...args) },
		head(...args) { return this.axios.head(...args) },
		options(...args) { return this.axios.options(...args) },
		patch(...args) { return this.axios.patch(...args) },
		post(...args) { return this.axios.post(...args) },
		put(...args) { return this.axios.put(...args) },
		request(...args) { return this.axios.request(...args) }
	},
	props: {
		baseUrl: {type: String},
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

		// Set baseURL if we have one
		if (this.baseUrl) this.axios.defaults.baseURL = this.baseUrl;

		// Make Axios encode using jQueries parameter serializer to keep Monoxide happy
		/* FIXME: Not sure if this is used these days - MC 2023-09-19
		this.axios.defaults.paramsSerializer = params =>
			$.param(params)
				.replace(/\bq=(.+)\b/g, p => p.replace(/%3A/g, ':')) // Allow `q=` to contain ':' tags
		*/

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
