/**
* Run a callback function multiple times until it succeeds
*
* @param {Function} [cb] The async callback function to try, can run multiple times if needed
*
* @param {Object} [options] Additional options to mutate behaviour
* @param {Number} [options.retries=10] The number of times to rerun the function before giving up
* @param {Number} [options.retryDelay=150] Delay between retries in milliseconds
* @param {Function} [options.onRetry] Async function to call as `(tryCount:Number)` on each fail
*
* @returns {Promise<*>} The eventual async response from a successful callback run
*/
export default function retry(cb, options) {
	let settings = {
		retries: 10,
		retryDelay: 150,
		onRetry: (tryCount, maxTries) => {}, // eslint-disable-line
		onFail: (tryCount, maxTries) => { throw new Error('Failed') }, // eslint-disable-line
		...options,
	};

	return new Promise((resolve, reject) => {
		let tryCount = 0;
		let tryCallback = ()=> Promise.resolve()
			.then(()=> cb())
			.then(result => resolve(result))
			.catch(()=> {
				if (++tryCount < settings.tries) {
					return Promise.resolve()
						.then(()=> settings.onRetry(tryCount, settings.retries))
						.then(()=> setTimeout(tryCallback, settings.retryDelay))
				} else {
					return Promise.resolve()
						.then(()=> settings.onFail(tryCount, settings.retries))
						.catch(reject)
				}
			})

		// Kick off initial loop
		tryCallback();
	});
}
