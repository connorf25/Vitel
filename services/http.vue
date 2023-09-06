<script>
import axios from 'axios';

/**
* Axios wrapper
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
		delete: axios.delete,
		get: axios.get,
		head: axios.head,
		options: axios.options,
		patch: axios.patch,
		post: axios.post,
		put: axios.put,
		request: axios.request,
	}},
	created() {
		// Make Axios request JSON by default
		axios.defaults.headers.common.Accept = 'application/json';

		// Make Axios encode using jQueries parameter serializer to keep Monoxide happy
		axios.defaults.paramsSerializer = params =>
			$.param(params)
				.replace(/\bq=(.+)\b/g, p => p.replace(/%3A/g, ':')) // Allow `q=` to contain ':' tags

		// Monkey patch Axios so that any error response gets correctly decoded rather than weird stuff like 'Server returned a 403 code'
		axios.interceptors.response.use(
			response => response,
			error => {
				if (!error.response || !error.response.status) { // Recommended method to catch network errors as per https://github.com/axios/axios/issues/383#issuecomment-234079506
					return Promise.reject('Network error');
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
