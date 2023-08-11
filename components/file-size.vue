<script>
/**
* Display file-sizes in a human readable format
*
* @param {String|Number} value The file-size to display & format
* @param {String} [locale] The locale to use when rendering formatted dates, defaults to the `navigator.language`
* @param {Array<Object>} [units] Table of units broken down from least -> most to format file sizes
* @param {Number} [decimalsMin=0] Minimum number of decimal places to display
* @param {Number} [decimalsMax=2] Maximum number of decimal places to display
*/
export default {
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
		locale: {
			type: String,
			default: ()=> navigator.language,
		},
		units: {
			type: Array,
			default: ()=> [
				{name: 'bytes', suffix: '', min: 0, max: 1024},
				{name: 'killobytes', suffix: 'kb', min: Math.pow(1024, 1), max: Math.pow(1024, 2)},
				{name: 'megabytes', suffix: 'mb', min: Math.pow(1024, 2), max: Math.pow(1024, 3)},
				{name: 'gigabytes', suffix: 'gb', min: Math.pow(1024, 3), max: Math.pow(1024, 4)},
				{name: 'terabytes', suffix: 'tb', min: Math.pow(1024, 4), max: Math.pow(1024, 5)},
				{name: 'petabytes', suffix: 'pb', min: Math.pow(1024, 5), max: Math.pow(1024, 6)},
				{name: 'exabytes', suffix: 'eb', min: Math.pow(1024, 6), max: Math.pow(1024, 7)},
				{name: 'zettabytes', suffix: 'zb', min: Math.pow(1024, 7), max: Math.pow(1024, 8)},
				{name: 'yottabytes', suffix: 'yb', min: Math.pow(1024, 8), max: Math.pow(1024, 9)},
			],
		},
		decimalsMin: {
			type: Number,
			default: 0,
		},
		decimalsMax: {
			type: Number,
			default: 2,
		},
	},
	computed: {
		/**
		* Format the incoming value into a huamn readable string
		* @returns {String} Human readable version of the input `value`
		*/
		displayValue() {
			let value = +this.value;
			let unit = this.units.find(u => value >= u.min && value < u.max);

			if (unit) {
				value = (value / unit.min);
			} else {
				unit = this.units[0];
			}

			return new Intl.NumberFormat(this.locale, {
				minimumFractionDigits: this.decimalsMin,
				maximumFractionDigits: this.decimalsMax,
			}).format(value)
				+ ' ' + unit.suffix;
		},
	},
}
</script>

<template>
	<div class="file-size">
		{{displayValue}}
	</div>
</template>
