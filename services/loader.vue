<script>
/**
* Global $loader service
*
* NOTE: $start() / $stop() are also wrapped within a mixin
*
* Available on all Vue models as `vm.$loader`
*/
export default {
	name: '$loader',
	data() { return {
		/**
		* Global loading state
		* @type {Boolean}
		*/
		isLoading: false,


		/**
		* Most recent loading caption to display
		* @type {String}
		*/
		caption: null,


		/**
		* Object lookup of active loaders by ID
		*/
		loaders: new Set(),


		/**
		* DOM element for the main loading wrapper
		* @type {DOMElement}
		*/
		loadingEl: null,
	}},
	props: {
		/**
		* Main VueApp instance to decorate
		* @type {VueApp}
		*/
		app: {type: Object, required: true},


		/**
		* Default loading caption
		* @type {String}
		*/
		defaultCaption: {type: String, default: 'Loading...'},
	},
	methods: {
		/**
		* Queue up a loader by a given ID (or if possible use the parent VueComponent ._uid)
		* A wrapped version of this function is added to each VueComponent which provides the `component._uid` field as the ID by default
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {String} [options.id='global'] ID to uniquely identify the loader in order to stack them
		*/
		start(options) {
			let settings = {
				id: 'global',
				caption: '',
				...options,
			};

			this.loaders.add(settings.id);
			this.refresh();
			if (settings.caption) this.updateCaption(settings.caption);
		},


		/**
		* Set the active loader caption
		* @param {String} [caption] The caption to set or falsy to disable
		*/
		updateCaption(caption) {
			this.loadingEl.querySelector('.loading-caption').innerText = caption || this.defaultCaption;
		},


		/**
		* Remove a loader from the set, updating the overall status
		* A wrapped version of this function is added to each VueComponent which provides the `component._uid` field as the ID by default
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {String} [options.id='global'] ID to uniquely identify the loader in order to stack them
		*/
		stop(options) {
			let settings = {
				id: 'global',
				...options,
			};
			this.loaders.delete(settings.id);
			this.refresh();
		},


		/**
		* Refresh the overall loading state based on `$loader.loaders`
		*/
		refresh() {
			this.isLoading = this.loaders.size > 0;

			document.body.classList.toggle('loading', this.isLoading);
		},
	},
	created() {
		// Inject generic loader UI into the top level body element {{{
		this.loadingEl = document.createElement('div');
		this.loadingEl.id = 'global-loader';
		this.loadingEl.innerHTML = [
			'<div class="loading-spinner">',
				'<div class="fingerprint-spinner">',
					'<div class="spinner-ring"></div>'.repeat(9),
				'</div>',
				'<div class="loading-caption">Loading...</div>',
			'</div>',
		].join('\n');
		document.body.appendChild(this.loadingEl);

		let loaderStyle = document.createElement('style');
		// FIXME: New lines are being included as "<br>"
		loaderStyle.innerText = [
			'body:not(.loading) #global-loader {',
				'display: none;',
			'}',
			'body.loading #global-loader {',
				'display: flex;',
			'}',
			'#global-loader {',
				'display: flex;',
				'align-items: center;',
				'justify-content: center;',
				'position: fixed;',
				'top: 0px;',
				'right: 0px;',
				'bottom: 0px;',
				'left: var(--sidebar-width);',
				'z-index: 1;',
				'background: var(--bs-body-bg);',

				'position: fixed;',
				'top: 0px;',
				'left: 0px;',
				'bottom: 0px;',
				'right: 0px;',
			'}',
		].join('\n');
		document.body.appendChild(loaderStyle);
		// }}}

		// Glue $loader as a wrapped version of $start / $stop into each component - this is a kludge to provide vm._uid when calling those functions
		let $mainLoader = this;
		this.app.mixin({
			created() {
				let vm = this;
				this.$loader = {
					...this.$mainLoader,
					start(caption) {
						return $mainLoader.start({id: vm.$.uid, caption});
					},
					stop(id) {
						return $mainLoader.stop({id: id || vm.$.uid});
					},
				};
			},
		});
	},
}
</script>
