<script>
/**
* Vitel $filters service
*
* Available on all Vue models as `vm.$filters`
*/
export default {
	name: '$filters',
	data() { return {
		/**
		* Lookup of loaded filters by name
		* These are also added to the root VueComponent if loaded via `Filter`
		* @type {Object<Function>}
		*/
		filters: {},
	}},
	methods: {
		/**
		* Pipe values down a chain of filters, returning the eventual output
		* @param {*} value Initial value to use
		* @param {Function|String} pipeline... Stages of a pipeline. Each step can be a function to pipe the current value through or a named filter
		*/
		pipe(value, ...pipeline) {
			return pipeline.reduce((acc, cb) => {
				if (typeof cb == 'string') {
					if (!this[cb]) throw new Error(`Unknown filter name "${cb}"`);
					return this[cb](acc);
				} else if (typeof cb == 'function') {
					return cb(acc);
				} else {
					throw new Error('Unknown pipeline stage');
				}
			}, value);
		}
	},
}
</script>
