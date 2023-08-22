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
		* Pipeline stages can be named functions, function callbacks or an array with a key=>options setup (like Eslint config)
		*
		* @param {*} value Initial value to use
		* @param {String|Array|Function} pipeline... Stages of a pipeline. Each step can be a function to pipe the current value through or a named filter
		* @returns {*} The final output of the pipeline
		*
		* @example Pipe a number down a formatting pipeline
		* $filters.pipe(123456789, 'number') //~ formated number
		*
		* @example Combine multiple filters with options
		* $filters.pipe(2, 'currency', ['pluralize', '[dollar|dollars]']) //~ '2 dollars'
		*/
		pipe(value, ...pipeline) {
			return pipeline.reduce((acc, cb) => {
				if (typeof cb == 'string') {
					if (!this[cb]) throw new Error(`Unknown filter name "${cb}"`);
					return this[cb](acc);
				} else if (typeof cb == 'function') {
					return cb(acc);
				} else if (Array.isArray(cb)) {
					let [filter, options] = cb;
					if (!this[filter]) throw new Error(`Unknown filter name "${filter}"`);
					return this[filter](acc, options);
				} else {
					throw new Error('Unknown pipeline stage type. Must be a string, array or function');
				}
			}, value);
		}
	},
}
</script>
