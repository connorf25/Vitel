<script>
import jsonMarkup from 'json-markup';

/**
* Basic data dumping + JSON formatting as a Vue component
*
* @param {Object|Array} value The value to output
* @param {Boolean} [highlight=true] Whether to highlight the output
*/
export default {
	props: {
		highlight: {type: Boolean, default: true},
		value: {type: [Object, Array]},
	},
	methods: {
		markup: jsonMarkup,
	},
}
</script>

<template>
	<div class="dump">
		<pre v-if="!highlight">{{value}}</pre>
		<div v-else v-html="markup(value)"/>
	</div>
</template>

<style lang="scss">
.dump {
	& .json-markup {
		line-height: 17px;
		font-size: 13px;
		font-family: monospace;
		white-space: pre;
	}

	& .json-markup-key {
		font-weight: bold;
	}

	& .json-markup-bool {
		color: firebrick;
	}

	& .json-markup-string {
		color: green;
	}

	& .json-markup-null {
		color: gray;
	}

	& .json-markup-number {
		color: blue;
	}
}
</style>
