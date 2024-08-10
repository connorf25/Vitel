/**
* Various utilities to dynamically inject page content
*/



/**
* Dynamically inject a script tag into a document and Promise when it will be evaluated
*
* @param {String} url The Script URL to dynamically inject
* @param {String} [options.type='text/javascript'] Mime-type to inject the script as
* @param {Boolean} [options.async=false] Inject the script asyncronously
* @param {String} [options.crossOrigin] Optional cross-origin specification
*
* @returns {Promise} A promise which will resolve when the script has loaded + executed
*/
export function injectScript(url, options) {
	return new Promise((resolve, reject) => {
		let settings = {
			async: false,
			type: 'text/javascript',
			...options,
		};

		let scriptEl = document.createElement('script');
		scriptEl.type = settings.type;
		scriptEl.src = url;
		if (settings.async) scriptEl.async = true;
		if (settings.crossOrigin) scriptEl.setAttribute('crosssorigin', settings.crossOrigin);

		// Attach promise callbacks
		scriptEl.onload = ()=> resolve();
		scriptEl.onerror = e => {
			if (e?.type == 'error' && e?.eventPhase == 2) { // Detect possible blocking attempts at element injection
				reject('ERR_BLOCKED_BY_CLIENT');
			} else {
				reject(e);
			}
		}

		document.querySelector('head').appendChild(scriptEl);
	});
}


export default {
	injectScript,
}
