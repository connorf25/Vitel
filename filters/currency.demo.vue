<script>
import currencyFilter from './currency.js';

/**
* Demo for the Currency filter function
* @param {Array<String>} value The value to format
* @param {String} [locale=Intl.DateTimeFormat().resolvedOptions().locale] Locale to format to
* @param {String} [currency='AUD'] Three letter upper-case currency format to use
*/
export default {
	props: {
		value: Number,
		locale: String,
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
