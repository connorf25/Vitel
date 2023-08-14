/**
* Nicely format a number to a given locale
*
* @param {value} value The input value to format
* @param {Object} [options] Additional options to vary output
* @param {String} [options.locale='en-AU'] Locale to format to
* @param {Boolean|String} [options.currency=false] Either enable currency mode (defaults to `'AUD'`) or specify a three letter upper-case currency format to use
* @returns {String} Human readable number
*/
export default function(value, options) {
	var settings = {
		locale: 'en-AU',
		currency: false,
		...options,
	};

	return new Intl.NumberFormat(settings.locale, {
		...(
			settings.currency === true ? {style: 'currency', currency: 'AUD'}
			: typeof settings.currency == 'string' ? {style: 'currency', currency: settings.currency}
			: {}
		),
	}).format(value)
}
