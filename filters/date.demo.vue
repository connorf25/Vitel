<script>
import dateFilter from './date.js';

/**
* Demo for the Date filter function
* @param {Array<String>} value The value to format
*/
export default {
	props: {
		value: Number,

		locale: {type: Number, default: ()=> Intl.DateTimeFormat().resolvedOptions().locale},
		display: {type: String, default: 'date'},
		localeDateStyle: {type: String, default: 'medium'},
		localeTimeStyle: {type: String, default: 'short'},
		timezone: {type: String, default: ()=> Intl.DateTimeFormat().resolvedOptions().timeZone},
		relativeCutoff: {type: Number, default: ()=> 1000 * 60 * 60 * 24}, //~ 24 hours
		relativeUnits: {type: Array, default: ()=> [
			{name: ' second', value: 1000, max: 50, single: 'a second' },
			{name: ' minute', value: 60000, max: 50, single: 'a minute' },
			{name: ' hour', value: 3600000, max: 22, single: 'an hour' },
			{name: ' day', value: 86400000, max: 6, single: 'a day' },
			{name: ' week', value: 604800000, max: 3.5, single: 'a week' },
			{name: ' month', value: 2592000000, max: 11, single: 'a month' },
			{name: ' year', value: 31536000000, max: Infinity, single: 'a year' }
		]},
		relativeUnitNow: {type: String, default: 'just now'},
		relativeUnitPast: {type: String, default: 'ago'},
		relativeUnitFuture: {type: String, default: 'from now'},
	},
	computed: {
		options() { return {
			locale: this.locale,
			display: this.display,
			localeDateStyle: this.localeDateStyle,
			localeTimeStyle: this.localeTimeStyle,
			timezone: this.timezone,
			relativeCutoff: this.relativeCutoff,
			relativeUnits: this.relativeUnits,
			relativeUnitNow: this.relativeUnitNow,
			relativeUnitPast: this.relativeUnitPast,
			relativeUnitFuture: this.relativeUnitFuture,
		}},
	},
	methods: {
		dateFilter,
	},
}
</script>

<template>
	<div>
		<p>
			Given value:
			<pre>{{value}}</pre>
		</p>
		<p>
			Given options:
			<pre>{{options}}</pre>
		</p>
		<p>
			Output:
			{{dateFilter(value, options)}}
		</p>
	</div>
</template>
