<script>
import list from './list.js';

/**
* Demo for the List filter function
* @param {Array<String>} value The value to format
* @param {String} [pick] Optional field within a collection to pick the text value from if the input is a collection
* @param {Number} [max=0] Maximum number of items before truncating
* @param {String} [maxText=":X items"] Text to use if the number of items is sgreater than `options.max`. Specify `:X` to replace the value array length
* @param {String} [conjoin='and'] How to conjoin. Either 'and' or 'or'
* @param {Object} [formatter] Formatter to use, defaults to Intl.ListFormat using the the settings here
*/
export default {
	props: {
		value: Array,
		pick: String,
		max: {type: Number, default: 0},
		maxText: {type: String, default: ':X items'},
		conjoin: {type: String, default: 'and'},
		formatter: Function
	},
	computed: {
		options() { return {
			pick: this.pick,
			max: this.max,
			maxText: this.maxText,
			conjoin: this.conjoin,
			formatter: this.formater,
		}},
	},
	methods: {
		list,
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
			{{list(value, options)}}
		</p>
	</div>
</template>
