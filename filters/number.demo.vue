<script>
import number from './number.js';

/**
* Demo for the Number filter function
* @param {Array<String>} value The value to format
* @param {String} [locale=Intl.DateTimeFormat().resolvedOptions().locale] Locale to format to
* @param {Boolean|String} [currency=false] Either enable currency mode (defaults to `'AUD'`) or specify a three letter upper-case currency format to use
*/
export default {
	props: {
		value: Number,
		locale: String,
		currency: {type: [Boolean, String], default: false},
	},
	computed: {
		options() { return {
			locale: this.locale,
			currency: this.currency,
		}},
	},
	methods: {
		number,
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
			{{number(value, options)}}
		</p>
	</div>
</template>
