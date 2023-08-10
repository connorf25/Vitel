<script>
/**
* Simple date view which displays a relative time, if its practical
*
* @param {String|Date|Number} value Date to parse + display
* @param {String} [display='auto'] How to display the value. ENUM: 'auto', 'relative', 'date'
* @param {String} [locale] The locale to use when rendering formatted dates, defaults to the `navigator.language`
* @param {String} [localeDateStyle='short'] How to render dates. ENUM: 'full', 'long', 'medium', 'short'
* @param {String} [localeTimeStyle='full'] How to render dates. ENUM: 'full', 'long', 'medium', 'short'
* @param {String} [timezone] Which timezone the provided date is relative to, defaults to parsing the timezone from the Intl options
* @param {Number} [relativeCutoff] Time in milliseconds, beyond which we render full dates rather than relative times
* @param {Array<Object>} [relativeUnits] Table of units broken down from least -> most to parse relative times
* @param {String} [relativeUnitNow='just now'] How to refer to current dates
* @param {String} [relativeUnitTimes] How to refer to times in the past and future
*/
export default {
	props: {
		value: {
			type: [Date, String, Number],
			required: true,
		},
		display: {
			type: String,
			required: true,
			validator: v => ['auto', 'relative', 'date'].includes(v),
		},
		locale: {
			type: String,
			required: true,
			default: ()=> navigator.language,
		},
		localeDateStyle: {
			type: String,
			required: true,
			default: 'short',
			validator: v => ['full', 'long', 'medium', 'short'].includes(v),
		},
		localeTimeStyle: {
			type: String,
			required: true,
			default: 'long',
			validator: v => ['full', 'long', 'medium', 'short'].includes(v),
		},
		timezone: {
			type: String,
			required: true,
			default: ()=> Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		relativeCutoff: {
			type: Number,
			default: 1000 * 60 * 60 * 24, //~ 24 hours
		},
		relativeUnits: {
			type: Array,
			required: true,
			default: ()=> [
				{name: ' second', value: 1000, max: 50, single: 'a second' },
				{name: ' minute', value: 60000, max: 50, single: 'a minute' },
				{name: ' hour', value: 3600000, max: 22, single: 'an hour' },
				{name: ' day', value: 86400000, max: 6, single: 'a day' },
				{name: ' week', value: 604800000, max: 3.5, single: 'a week' },
				{name: ' month', value: 2592000000, max: 11, single: 'a month' },
				{name: ' year', value: 31536000000, max: Infinity, single: 'a year' }
			],
		},
		relativeUnitNow: {
			type: String,
			required: true,
			default: 'just now',
		},
		relativeUnitTimes: {
			type: Array,
			required: true,
			default: ()=> ['ago', 'from now'],
			validator: v => v.length == 2,
		},
	},
	computed: {
		/**
		* Return a human readable date based on the input `$props.value`
		* @returns {String} The human readable version of the date
		*/
		dateString() {
			let diff = Math.abs(Date.now() - this.valueParsed.getTime());
			console.log('DIFF IS', {
				diffTarget: Date.now(),
				diffValue: this.valueParsed.getTime(),
				diff,
			});

			if (diff <= this.relativeCutoff) { // Use relative display
				return this.relativeDate;
			} else { // Use Intl formatter
				return this.formattedDate;
			}
		},


		/**
		* Parse the input value into a valid Date object
		*/
		valueParsed() {
			if (this.value instanceof Date) { // Already a Date
				return this.value;
			} else { // Number OR string - assume JS parsable date OR epoch
				return new Date(this.value);
			}
		},


		/**
		* Returns the relative date
		*
		* @see https://github.com/brams-dev/friendly-time/blob/master/index.js
		* @returns {String} Relative time string from/to today
		*/
		relativeDate() {
			/* eslint-ignore vue/return-in-computed-property */
			let diff = Date.now() - this.valueParsed.getTime();

			let future = diff < 0;
			diff = Math.abs(diff);

			if (!future && diff < 10000) return this.relativeUnitNow;

			var suffix = future ? ' ' + this.relativeUnitTimes[1] : ' ' + this.relativeUnitTimes[0];
			for (let i = 0; i < this.relativeUnits.length; i++) {
				let unit = this.relativeUnits[i];

				if (diff <= unit.max * unit.value) {
					let t = Math.round(diff / unit.value);
					return t === 1
						? unit.single + suffix
						: t + unit.name + 's' + suffix;
				}
			}
		},


		/**
		* Returns the formatted, full date
		*
		* @returns {String} Formatted date using available options
		*/
		formattedDate() {
			return new Intl.DateTimeFormat(this.locale, {
				dateStyle: this.localeDateStyle,
				timeStyle: this.localeTimeStyle,
				timeZone: 'Australia/Sydney'
			}).format(this.valueParsed);
		},
	},
}
</script>

<template>
	<div class="date">
		{{dateString}}
	</div>
</template>
