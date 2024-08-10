/**
* Format a raw / string / JS-epoch date into a human readable value
*
* @param {String|Date|Number} value Date to parse + display
*
* @param {String|Date} [options] Options to mutate behaviour
* @param {String} [options.display='date'] How to display the value. ENUM: 'auto', 'relative', 'date'
* @param {String} [options.locale=Intl.DateTimeFormat().resolvedOptions().locale] The locale to use when rendering formatted dates, defaults to the `navigator.language`
* @param {String} [options.localeDateStyle='medium'] How to render dates. ENUM: 'full', 'long', 'medium', 'short'
* @param {String} [options.localeTimeStyle='short'] How to render dates. ENUM: 'full', 'long', 'medium', 'short'
* @param {String} [options.timezone=Intl.DateTimeFormat().resolvedOptions().timeZone] Which timezone the provided date is relative to, defaults to parsing the timezone from the Intl options
* @param {Number} [options.relativeCutoff=24h] Time in milliseconds, beyond which we render full dates rather than relative times, defaults to 24 hours
* @param {Array<Object>} [options.relativeUnits] Table of units broken down from least -> most to parse relative times
* @param {String} [options.relativeUnitNow='just now'] How to refer to current dates
* @param {String} [options.relativeUnitPast='ago'] Suffix to use for dates in the past
* @param {String} [options.relativeUnitFuture='from now'] Suffix to use for dates in the future
*
* @returns {String} A formatted date output
*/
export default function(value, options) {
	let settings = {
		locale: Intl.DateTimeFormat().resolvedOptions().locale,
		display: 'date',
		localeDateStyle: 'medium',
		localeTimeStyle: 'short',
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		relativeCutoff: 1000 * 60 * 60 * 24, //~ 24 hours
		relativeUnits: [
			{name: ' second', value: 1000, max: 50, single: 'a second' },
			{name: ' minute', value: 60000, max: 50, single: 'a minute' },
			{name: ' hour', value: 3600000, max: 22, single: 'an hour' },
			{name: ' day', value: 86400000, max: 6, single: 'a day' },
			{name: ' week', value: 604800000, max: 3.5, single: 'a week' },
			{name: ' month', value: 2592000000, max: 11, single: 'a month' },
			{name: ' year', value: 31536000000, max: Infinity, single: 'a year' }
		],
		relativeUnitNow: 'just now',
		relativeUnitPast: 'ago',
		relativeUnitFuture: 'from now',
		...options,
	};

	let valueParsed = value instanceof Date ? value : new Date(value)
	let diff = Math.abs(Date.now() - valueParsed.getTime());

	if (settings.display == 'auto') {
		if (diff <= settings.relativeCutoff) { // Use relative display
			return dateRelative(valueParsed, settings);
		} else { // Use Intl formatter
			return dateFormatted(valueParsed, settings);
		}
	} else if (settings.display == 'relative') {
		return dateRelative(valueParsed, settings);
	} else {
		return dateFormatted(valueParsed, settings);
	}
}


/**
* Format a date, relative to now
* This is the internal worker for the main function and assumes the date and settings have already been parsed
*
* @private
* @param {Date} date The input date to format
* @param {Object} settings Additional settings to format the date
* @returns {String} THe relative date string
*/
export function dateRelative(date, settings) {
	let diff = Date.now() - date.getTime();

	let future = diff < 0;
	diff = Math.abs(diff);

	if (!future && diff < 10000) return settings.relativeUnitNow;

	let suffix = future ? ' ' + settings.relativeUnitFuture : ' ' + settings.relativeUnitPast;
	for (let i = 0; i < settings.relativeUnits.length; i++) {
		let unit = settings.relativeUnits[i];

		if (diff <= unit.max * unit.value) {
			let t = Math.round(diff / unit.value);
			return t === 1
				? unit.single + suffix
				: t + unit.name + 's' + suffix;
		}
	}
}


/**
* Format an absolute date
* This is the internal worker for the main function and assumes the date and settings have already been parsed
*
* @private
* @param {Date} date The input date to format
* @param {Object} settings Additional settings to format the date
* @returns {String} The formatted absolute date
*/
export function dateFormatted(date, settings) {
	return new Intl.DateTimeFormat(settings.locale, {
		dateStyle: settings.localeDateStyle,
		timeStyle: settings.localeTimeStyle,
		timeZone: settings.timezone,
	}).format(date);
}
