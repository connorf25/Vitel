<script>
import startCase from './startCase.js';

/**
* Demo for the StartCase filter function
* @param {Array<String>} value The value to format
*/
export default {
	props: {
		value: Number,
	},
	computed: {
		options() { return {
			locale: this.locale,
			currency: this.currency,
		}},
	},
	methods: {
		startCase,
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
			Output:
			{{startCase(value)}}
		</p>
	</div>
</template>
