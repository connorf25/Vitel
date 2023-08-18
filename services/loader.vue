<script>
import {getCurrentInstance} from "vue"

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
		* Object lookup of active loaders by ID
		*/
		loaders: new Set(),
	}},
	props: {
		/**
		* Main VueApp instance to decorate
		* @type {VueApp}
		*/
		app: {type: Object, required: true},
	},
	methods: {
		/**
		* Inject all resources needed by the global loader
		*/
		init() {
			// Relies on the src/components/shared/loading.vue script to be loaded for most of its styling
			let loaderDialog = document.createElement('div');
			loaderDialog.id = 'global-loader';
			loaderDialog.innerHTML = [
				'<div class="loading-spinner">',
					'<div class="fingerprint-spinner">',
						'<div class="spinner-ring"></div>'.repeat(9),
					'</div>',
					'<div>Loading...</div>',
				'</div>',
			].join('\n');
			document.body.appendChild(loaderDialog);

			let loaderStyle = document.createElement('style');
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

			// Glue $loader as a wrapped version of $start / $stop into each component - this is a kludge to provide vm._uid when calling those functions
			let $mainLoader = this;
			this.app.mixin({
				created() {
					let vm = this;
					this.$loader = {
						...this.$mainLoader,
						start(id) {
							return $mainLoader.start(id || vm.$.uid);
						},
						stop(id) {
							return $mainLoader.stop(id || vm.$.uid);
						},
					};
				},
			});
		},


		/**
		* Queue up a loader by a given ID (or if possible use the parent VueComponent ._uid)
		* A wrapped version of this function is added to each VueComponent which provides the `component._uid` field as the ID by default
		*
		* @param {String} [id='global'] The unique ID of the loader to start
		*/
		start(id = 'global') {
			this.loaders.add(id);
			this.refresh();
		},


		/**
		* Remove a loader from the set, updating the overall status
		* A wrapped version of this function is added to each VueComponent which provides the `component._uid` field as the ID by default
		*
		* @param {String} [id='global'] The unique ID of the loader to stop
		*/
		stop(id='global') {
			this.loaders.delete(id);
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
}
</script>
