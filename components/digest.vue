<script>
/**
* Simple component which either fetches a single point of data from the server and displays it OR allows a slot wrapper for the fetched data
* This component also has automatic lazy loading - the component only fetches data when its actually visible rather than triggering on page load
*
* @param {String|Object} [url] The URL or AxiosRequest to fetch data (instead of specifying `collection` + `id`)
* @param {String} [field="title"] Field to display the title of, if using slots specify "*" to populate `data` with the raw data object
* @param {Function|String} [filter] Optional function filter or named Vue filter to run the result through before outputting
* @param {String} [label] Use this label before fetching a remote one, if specifed the entity is treated as valid (including valid class and icon)
* @param {Boolean} [lazy=true] If true, fetching will be defered until the element is actually shown within the content area
* @param {String} [lazyParents='#content, #main, body'] jQuery compatible string listing the intersection parents to probe for when lazy==true, the first one found is assumed to be the parent
* @param {String} [lazyParentsDisable='.modal'] jQuery compatible string which, if matched disables lazy loading (defaults to inside modals by default)
* @param {String} [classValid] Apply this class to the element if the returned value is truthy
* @param {String} [classInvalid] Apply this class to the element if the return value is falsy
* @param {String|function} [textValid] Either overriding text to display if the element is valid, or a function to call with the server response which returns the mangled output
* @param {String|function} [textInvalid] As with `textValid` this is either overriding text or a function to mangle a server response
* @param {String} [iconValid] Optional icon to display next to the context when loaded
* @param {String} [iconInvalid] Optional icon to display next to the `textInvalid` text when an error occurs
* @param {Boolean} [ignoreErrors=false] Ignore all thrown errors, if false they will be routed into this.$toast.catch
* @param {String} [hashMethod='urlField] How to cache the digest result, see the `$http.throttle` function for more info
* @param {*} [hash] Optional pre-computed hash if using `{hashMethod:'custom'}`
* @param {*} [httpWrapper='throttle'] Key within `$http` to use when making requests. ENUM: 'request', 'throttle'
*
* @slot [loading] What to display when loading - defaults to a FA5 loading spinner. Bindings are `{config}`
* @slot [display] What to display when data is loaded. Bindings are `{config, data, displayContent}`
*
* @example Pull in a full data record and template the responses
* <digest
*   field="*"
*   :url="`/api/widgets/${input.file}`"
* >
*   <template #loading>
*     <i class="far fa-spinner fa-spin"/>
*     Loading widget information...
*   </template>
*   <template #display="{data: widget}">
*     <strong class="d-block">{{widget.title}}</strong>
*     <small class="d-block">{{widget.description}}</small>
*   </template>
* </digest>
*/
export default {
	data() { return {
		data: undefined,
		displayContent: '',
		displayClass: undefined,
		isLazy: false,
		loading: true,
		useLabel: true, // Whether to display the $props.label content if its present, set to false on incomming events or overrides
	}},
	props: {
		url: {type: [Object, String], required: true},
		field: {type: String, default: "title"},
		filter: {type: [Function, String]},
		label: {type: String},
		lazy: {type: Boolean, default: true},
		lazyParents: {type: String, default: '#content, #main, body'},
		lazyParentsDisable: {type: String, default: '.modal'},
		classValid: {type: String},
		classInvalid: {type: String},
		textValid: {type: [String, Function]},
		textInvalid: {type: [String, Function]},
		iconValid: {type: String},
		iconInvalid: {type: String},
		ignoreErrors: {type: Boolean, default: false},
		hashMethod: {type: String, defualt: 'url+field', validator: v => ['url', 'url+field', 'request', 'custom'].includes(v)},
		hash: {type: String},
		httpWrapper: {type: String, default: 'throttle'},
	},
	methods: {
		refresh() {
			this.loading = true;
			if (this.useLabel && this.label) { // Use label instead of fetching remote?
				this.displayContent = this.label;
				this.displayIcon = this.iconValid;
				this.loading = false;
			} else { // Fetch remote data
				return this.$http[this.httpWrapper]({
					method: 'GET',
					url: this.url,
					hashMethod: this.hashMethod,
				})
					.then(({data}) => { // Reduce to requested field if specified
						if (this.field && data[this.field] !== undefined) {
							return data[this.field];
						} else if (this.field) {
							console.trace(`Data from URL ${this.url} does not contain field "${this.field}"`, data);
						} else {
							return data;
						}
					})
					.then(value => {
						this.data = value;
						this.displayContent = typeof this.textValid == 'string' ? this.textValid
							: typeof this.textValid == 'function' ? this.textValid(value)
							: value;

						if (this.filter) {
							if (_.isFunction(this.filter)) {
								this.displayContent = this.filter(this.displayContent) // As func(v)
							} else if (_.isString(this.filter)) {
								var filter = this.$filters[this.filter];
								if (!filter) throw new Error(`Unknown filter "${this.filter}" specified in <digest filter/>`);
								this.displayContent = filter(this.displayContent); // As named filter
							} else {
								throw new Error(`Unknown filter type specified in <digest filter/>`)
							}
						}

						this.displayIcon = this.iconValid;
						if (this.classValid) this.displayClass = this.classValid;
					})
					.catch(err => {
						this.displayContent = typeof this.textInvalid == 'string' ? this.textInvalid
							: typeof this.textInvalid == 'function' ? this.textInvalid(err)
							: err.statusText ? err.statusText
							: err;
						this.displayIcon = this.iconInvalid;
						if (this.classInvalid) this.displayClass = this.classInvalid;
						if (!this.ignoreErrors) this.$toast.catch(err);
					})
					.finally(()=> this.loading = false)
			}
		},
	},
	mounted() {
		// Check we can use Lazy observing
		if (this.$el.closest(this.lazyParentsDisable)) this.isLazy = false;

		// Bind an interesection observer to fire a callback when the element appears on screen {{{
		if (this.isLazy) {
			var intersectionObserver = new IntersectionObserver(()=> {
				this.refresh();
				intersectionObserver.disconnect();
				intersectionObserver = null;
			}, {
				root: this.$el.closest(this.lazyParents),
				rootMargin: '100px',
				threshold: 0.1,
			});
			intersectionObserver.observe(this.$el);
		} else {
			this.refresh();
		}
		// }}}
	},
	watch: {
		url() { // Update when URL changes
			this.refresh();
		},
	},
};
</script>

<template>
	<div class="digest">
		<slot
			v-if="loading"
			name="loading"
			:config="$props"
		>
			<i class="fas fa-spinner fa-spin"/>
		</slot>
		<slot
			v-else
			name="display"
			:config="$props"
			:data="data"
			:displayContent="displayContent"
		>
			<div :class="displayClass">
				<i v-if="displayIcon" :class="displayIcon"/>
				{{displayContent}}
			</div>
		</slot>
	</div>
</template>
