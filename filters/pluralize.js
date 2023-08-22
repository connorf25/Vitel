import pluralize from '@momsfriendlydevco/formatters/pluralize';

/**
* Take an input number (can be already formatted) and format or pluralize it based on various rules
*
* NOTE: This function relies the input value already being formatted
*
* @param {String|Number} value The input value to process
* @param {Object|String} [options] Additional options to mutate behaviour, if a string is given its assumed to be the `suffix` option
* @param {Function} [options.parser] Parser to apply if the value is not numeric
* @param {String} [options.prefix=''] Optional prefix to apply to the output
* @param {String} [options.suffix=''] Optional suffix to apply to the output
* @param {String} [options.valueIfZero] Optional overriding return if the numeric value is zero
*
* @returns {String} A human readable string with correct prefix/suffixes applied
*/
export default function(value, options) {
	let settings = {
		parser: v => v.replace(/[^\d\.]+/g, ''),
		prefix: null,
		suffix: null,
		valueIfZero: null,
		...(typeof options == 'string' ? {suffix: options} : options),
	};

	let numericVal = typeof value == 'number' ? value : settings.parser(value);

	// Return zero response (if settings.valueIfZero)
	if (numericVal == 0 && settings.valueIfZero) return settings.valueIfZero;

	let prefixOptions = convertToPluralizeOptions(settings.prefix);
	let suffixOptions = convertToPluralizeOptions(settings.suffix);

	console.log('DO PLURALIZE', {
		numericVal,
		prefixOptions,
		suffixOptions,
	});

	return [
		!prefixOptions ? null
		: typeof prefixOptions == 'string' ? prefixOptions
		: pluralize(numericVal, prefixOptions),

		value,

		!suffixOptions ? null
		: typeof suffixOptions == 'string' ? suffixOptions
		: pluralize(numericVal, suffixOptions),
	].filter(Boolean).join(' ');
}

function convertToPluralizeOptions(input) {
	let match;
	if (typeof input == 'object') { // Already a complex object
		return input;
	} else if ((typeof input == 'string') && (match = /\[(?<singular>.*?)\|(?<plural>.*?)\]/.exec(input)?.groups)) { // Looks like the `[singular|plural]` format
		return {singular: match.singular, plural: match.plural};
	} else if (!input) {
		return '';
	} else { // Assume literal string
		return input;
	}
}
