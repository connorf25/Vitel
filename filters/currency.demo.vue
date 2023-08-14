<script>
import currencyFilter from './currency.js';

/**
* Demo for the Currency filter function
* @param {Array<String>} value The value to format
* @param {String} [locale='en-AU'] Locale to format to
* @param {Boolean|String} [currency=false] Either enable currency mode (defaults to `'AUD'`) or specify a three letter upper-case currency format to use
*/
export default {
	props: {
		value: Number,
		locale: {type: String, default: 'en-AU'},
		currency: {type: String, default: 'AUD'},
	},
	computed: {
		options() { return {
			locale: this.locale,
			currency: this.currency,
		}},
	},
	methods: {
		currencyFilter,
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
			{{currencyFilter(value, options)}}
		</p>
	</div>
</template>
