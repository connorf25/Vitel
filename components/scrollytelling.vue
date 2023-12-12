<script>
/**
* Main <scrollytelling/> component
*
* @provides {VueComponent} st This parent <scrollytelling/> component
*
* @property {String} [startAt] DOM selection matcher to align to at the start - mainly used for debugging
*/
export default {
	provide() { return {
		st: this,
	}},
	data() { return {
		/**
		* The current stage position
		*
		* @typeDef {Position}
		* @property {Float} float Position within the entire stage expressed as a float percentage (0 to 1)
		* @property {Number} percent Position within the entire stage expressed as a natural percentage (0 - 100)
		* @property {Number} absolute The raw absolute offset (usually pixels)
		*/
		position: {
			float: 0,
			percent: 0,
			absolute: 0,
		},


		/**
		* Lookup collection for all <scrollytelling-item/> children
		* @type {Array<VueComponent>}
		*/
		children: [],


		/**
		* The calculated <scrollytelling-item/> with the most claim to being focused
		* @type {Object}
		* @property {DOMRect} rect The display rectangle on the screen
		* @property {Number} exposure The percentage exposure of screen vs element
		* @property {DOMElement} el The DOM element for the item
		*/
		focusedItem: null,
	}},
	props: {
		startAt: String,
	},
	methods: {
		/**
		* Called by child items to register their presence within this stage
		*/
		register(component) {
			this.children.push(component);
		},


		/**
		* Set the new position (as a percentage offset) and arrange the stage
		*
		* @param {Object} position.float The new position expressed as a floating point percent (0 to 1)
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		setPosition(position) {
			if (!position.float) throw new Error('Incoming position must be an object containing a `float` key');
			let positionRounded = Math.round(position);

			if (positionRounded == this.position.percent) return; // Avoid setting the same position we're already
			if (position < 0 || position > 1) throw new Error('Position must be a float between 0 - 1');

			this.position = {
				float: position,
				percent: Math.round(position),
				absolute: position,
			};
			this.$el.style.setProperty('--storytelling-position-offset', `${this.position.percent}s`);
			this.$el.style.setProperty('--storytelling-position-delay', `-${this.position.percent}s`);

			// Calculate the focusedItem from the available child items
			let childItems = Array.from(this.$el.querySelectorAll('.scrollytelling-item'));
			let $elRect = this.$el.getBoundingClientRect();
			this.focusedItem = childItems
				.map(child => {
					let childRect = child.getBoundingClientRect();
					let viewableHeight = Math.min(childRect.bottom, $elRect.bottom) - Math.max(childRect.top, $elRect.top);
					return {
						el: child,
						rect: childRect,
						exposure: viewableHeight <= 0
							? 0 // Child is completely off-canvas
							: (viewableHeight / (childRect.bottom - childRect.top)) * 100
					};
				})
				.reduce((bestCandidate, candidate) => // Determine best child with largest claim to screen space
					candidate.exposure > 0 && (!bestCandidate || candidate.exposure > bestCandidate.exposure)
						? candidate
						: bestCandidate
				, null)

			console.log('Focused Item', this.focusedItem && this.focusedItem.el.id);

			if (this.focusedItem) {
				let itemComponent = this.focusedItem.el.$vueComponent;
				itemComponent.innerPosition.absolute = 0 - this.focusedItem.rect.top;
				itemComponent.innerPosition.float = itemComponent.innerPosition.absolute / itemComponent.lifetime;
				itemComponent.innerPosition.percent = Math.round(itemComponent.innerPosition.float * 100);
				console.log('INNER POS', this.focusedItem.el.$vueComponent.innerPosition);
			}

			// Add '.focused' class to childItem with best claim + remove it from others
			childItems.forEach(childItem =>
				childItem.classList.toggle('focused', childItem == this.focusedItem.el)
			);
		},


		/**
		* DOM level function to attach to the scroll event
		* @param {Event} [e] The scroll event data
		*/
		domScrollListener() {
			let floatOffset = this.$el.scrollTop / (this.$el.scrollHeight - this.$el.clientHeight);
			if (floatOffset > 1) floatOffset = 1; // Clamp to max

			this.setPosition({float: floatOffset});
		},
	},
	mounted() {
		this.$el.addEventListener('scroll', this.domScrollListener, {passive: true});

		// Set up watcher + jump to starting position
		this.$nextTick()
			.then(()=> this.$watch('startAt', v => {
				let domEl = document.querySelector(v);
				if (!domEl) throw new Error(`Cannot locate DOM element "${v}" to use it as a starting position`);
				domEl.scrollIntoView();
			}, {immediate: true}))
		},
}
</script>

<template>
	<div class="scrollytelling">
		<slot/>
	</div>
</template>

<style lang="scss">
.scrollytelling {
	margin: 0;
	padding: 0;

	/* .scrollytelling should be the scroll component {{{ */
	height: 500px;
	overflow-y: scroll;
	overflow-x: hidden;
	/* }}} */

	/* Add snapping guides for sub-items that require it */
	scroll-snap-type: y mandatory;

	& > * {
		animation-play-state: paused;
		animation-iteration-count: 1;
		animation-delay: var(--storytelling-position-delay);
		animation-duration: 100s;
		animation-timing-function: linear;
	}
}
</style>
