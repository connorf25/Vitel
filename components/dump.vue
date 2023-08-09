<script>
/**
* Basic data dumping + JSON formatting as a Vue component
*
* @param {Object|Array} value The value to output
*/
/* eslint-disable vue/html-indent */
export default {
	props: {
		value: {type: [Object, Array]},
	},
}
</script>

<template>
<pre>{{value}}</pre>
</template>
