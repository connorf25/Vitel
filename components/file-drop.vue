<script>
/**
* Drop-or-upload file handling component
* This component acts as a Vue-like drop-in replacement for the regular `<input type="file"/>` HTML input
*
* @param {Boolean} [global=true] If true, this component will install itself so that any dropped file on the entire document context is handled
* @param {String} [globalSelector="body"] Query selector to pick the parent level item to show the global dropper
* @param {Boolean} [multiple=false] Accept mutliple files
* @param {String} [accept] Optional HTML accept criteria. This is a CSV of file extentions mixed with MIME types. e.g. '.txt,.mp4,image/*'
*
* @emits change Emitted when a files are selected. Emited as `(files:FileList)`
*
* @slot [prompt] Prompt text to display
*
* @example Prompt for a file upload
* <file-drop @change="handleUpload($event)">
*   <template #prompt>
*     Upload a file or drop a file here
*   </template>
* </file-drop>
*/
export default {
	data() { return {
		globalEl: null, // global drop element if we have one

		// Static function bindings so we can use {add,remove}EventListener()
		eventGlobalDragLeave: this.showGlobalDropable.bind(this, 'hide'),
	}},
	props: {
		global: {type: Boolean, default: false},
		globalSelector: {type: String, default: 'body'},
		multiple: {type: Boolean, default: true},
		accept: {type: String},
	},
	methods: {
		/**
		* Prompt the user to select a file(s) based on the component settings + optional overrides
		*
		* @param {Object} [options] Additional options if overriding the component properties
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		select(options) {
			let settings = {
				multiple: this.multiple,
				accept: this.accept,
				...options,
			};

			return new Promise((resolve, reject) => {
				// Create outer, hidden wrapper
				let wrapper = document.createElement('div');
				wrapper.classList.add('d-none');
				document.body.append(wrapper);

				// Create inner input file element we fake interaction with
				let fileControl = document.createElement('input');
				fileControl.type = 'file';
				if (settings.multiple) fileControl.multiple = true;
				if (settings.accept) fileControl.accept = settings.accept;
				wrapper.append(fileControl);
				fileControl.addEventListener('change', e => {
					if (e.target.files.length > 0) {
						resolve(e.target.files);
					} else {
						reject('CANCEL');
					}
					wrapper.remove();
				});
				fileControl.addEventListener('cancel', ()=> {
					wrapper.remove();
					reject();
				});
				fileControl.click();
			})
				.then(files => {
					this.showGlobalDropable('hide');
					this.$emit('change', files);
				})
		},


		/**
		* Process a drop event
		* @param {Event} e Event to handle
		*/
		dragDrop(e) {
			e.stopPropagation();
			e.preventDefault();
			this.showGlobalDropable('hide');
			this.$emit('change', e.dataTransfer.files);
		},


		/**
		* Process a drag-over event
		* @param {Event} e Event to handle
		*/
		dragOver(e) {
			e.preventDefault();
			this.showGlobalDropable('show');
		},


		/**
		* Process a drag-leve event
		*/
		dragLeave() {
			this.showGlobalDropable('hide');
		},


		/**
		* Toggle whether to show the global file drop area
		* @param {'show'|'hide'|'create'|'destroy'} [method=true] Whether to show the droppable area
		*/
		showGlobalDropable(method) {
			let globalParent = document.querySelector(this.globalSelector);

			switch (method) {
				case 'show':
					if (!this.globalEl) this.showGlobalDropable('create'); // Doesn't exist yet - create it
					this.globalEl.classList.add('active');
					break;
				case 'hide':
					this.globalEl.classList.remove('active');
					break;
				case 'toggle':
					if (!this.globalEl) this.showGlobalDropable('create'); // Doesn't exist yet - create it
					this.globalEl.classList.toggle('active');
					break;
				case 'create':
					if (!globalParent) throw new Error(`Unable to find file-drop#globalSelector "${this.globalSelector}"`);

					// Bind listener events to parent
					globalParent.addEventListener('dragover', this.dragOver);
					globalParent.addEventListener('drop', this.dragDrop);

					// Create global element
					this.globalEl = document.createElement('div');
					this.globalEl.classList.add('file-drop-global');
					this.globalEl.innerHTML = [
						'<i class="fas fa-file-arrow-up"></i>',
						'<div>Drop files to upload</div>',
					].join('\n');

					this.globalEl.addEventListener('mousemove', ()=> this.showGlobalDropable('hide')); // Counts as the user moving the mouse but not dragging
					this.globalEl.addEventListener('dragleave', this.dragLeave);
					this.globalEl.addEventListener('drop', this.dragDrop);

					globalParent.append(this.globalEl);
					break;
				case 'destroy':
					if (!this.globalEl) return; // Already non-existant

					// Remove event listener
					globalParent.removeEventListener('dragover', this.dragOver);
					globalParent.removeEventListener('drop', this.dragDrop);

					this.globalEl.remove();
					this.globalEl = null;
					break;
				default:
					throw new Error(`Unsupported showGlobalDropable() method: "${method}"`);
			}
		},
	},
	mounted() {
		this.$el.addEventListener('drop', e => this.selectFromEvent(e));
		this.$el.addEventListener('dragover', ()=> this.$el.classList.add('dropping'));
		this.$el.addEventListener('dragleave', ()=> this.$el.classList.add('dropping'));
	},
	watch: {
		global: {
			immediate: true,
			handler() {
				this.showGlobalDropable(this.global ? 'create' : 'destroy');
			},
		},
	},
}
</script>

<template>
	<div
		class="file-drop"
		@click="select"
	>
		<slot name="prompt">
			<a>Select a file</a> or drag-and-drop a file here.
		</slot>
	</div>
</template>

<style lang="scss">
.file-drop {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 30px 10px;
	gap: 5px;

	border: 2px dashed #DDD;

	cursor: pointer;
	transition: all 0.2s ease-out;

	&:hover, &.dropping {
		background: #EEE;
		border-color: rgba(var(--bs-link-color-rgb));
	}

	& a {
		color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1)) !important;
	}
}

.file-drop-global {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	z-index: 999999;
	cursor: grabbing;

	background: #FFF;
	border: 10px dashed rgba(var(--bs-link-color-rgb));
	color: rgba(var(--bs-link-color-rgb));
	opacity: 0.7;

	display: none; /* Override with &.active */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: xx-large;

	&.active {
		display: flex;
	}

	& > * {
		margin: 5px;
	}
}
</style>
