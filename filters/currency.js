/**
* Nicely format a currency to a given locale
*
* @param {value} value The input value to format
* @param {Object} [options] Additional options to vary output
* @param {String} [options.locale=Intl.DateTimeFormat().resolvedOptions().locale] Locale to format to
* @param {String} [options.currency='AUD'] Three letter upper-case currency format to use
* @returns {String} Human readable currency value
*/
export default function(value, options) {
	var settings = {
		locale: Intl.DateTimeFormat().resolvedOptions().locale,
		currency: 'AUD',
		...options,
	};

	return new Intl.NumberFormat(settings.locale, {
		style: 'currency',
		currency: settings.currency,
	}).format(value)
}
