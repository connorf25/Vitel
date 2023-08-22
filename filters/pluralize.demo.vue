<script>
import pluralize from './pluralize.js';

/**
* Demo for the Pluralize filter function
* @param {Array<String>} value The value to format
* @param {String} [prefix=''] Optional prefix to apply to the output or a complex object to pass to @momsfriendlydevco/formatters/pluralize
* @param {String} [suffix=''] Optional suffix to apply to the output or a complex object to pass to @momsfriendlydevco/formatters/pluralize
* @param {String} [valueIfZero] Optional overriding return if the numeric value is zero
*/
export default {
	props: {
		value: {type: [Number, String], required: true},
		prefix: {type: [String, Object]},
		suffix: {type: [String, Object]},
		valueIfZero: {type: String},
	},
	computed: {
		options() { return {
			prefix: this.prefix,
			suffix: this.suffix,
			valueIfZero: this.valueIfZero,
		}},
	},
	methods: {
		pluralize,
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
			{{pluralize(value, options)}}
		</p>
	</div>
</template>
