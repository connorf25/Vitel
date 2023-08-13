/**
* Nicely format an array to a string based on simple criteria
* @param {Array|Array<Object>} value The input values to format
* @param {Object} [options] Additional options to vary output
* @param {String} [options.pick] Optional field within a collection to pick the text value from if the input is a collection
* @param {Number} [options.max=0] Maximum number of items before truncating
* @param {String} [options.maxText=":X items"] Text to use if the number of items is sgreater than `options.max`. Specify `:X` to replace the value array length
* @param {String} [options.conjoin='and'] How to conjoin. Either 'and' or 'or'
* @param {Object} [options.formatter] Formatter to use, defaults to Intl.ListFormat using the the settings here
* @returns {stinrg} Human readable string
*/
export default function(value, options) {
	var settings = {
		formatter: null,
		pick: null,
		max: 0,
		maxText: ':X items',
		conjoin: 'and',
		...options,
	};

	if (!settings.formatter)
		settings.formatter = new Intl.ListFormat('en', {
			style: 'long',
			type: settings.conjoin == 'and' ? 'conjunction' : 'disjunction',
		});

	if (settings.max > 0 && value.length > settings.max) { // Over the max number of items?
		return settings.maxText.replace(':X', value.length);
	} else { // Regular list formatting
		return settings.formatter.format(
			(typeof settings.pick == 'string' && Array.isArray(value) && value.every(v => v[settings.pick])) // Use pick if specified + its a collection value
				? value.map(v => v[settings.pick])
				: value
		);
	}
}
