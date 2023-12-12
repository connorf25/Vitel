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
		* The position offset of the stage as a percentage
		* @type {Number}
		*/
		position: this.positionStart,


		/**
		* Lookup collection for all <scrollytelling-item/> children
		*/
		children: [],
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
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		setPosition(position) {
			if (position == this.position) return console.log('Avoid redundent position navigation', this.position);
			if (position < 0 || position > 100) throw new Error('Position must be between 0 - 100');

			this.position = position;
			this.$el.style.setProperty('--storytelling-position-offset', `${this.position}s`);
			this.$el.style.setProperty('--storytelling-position-delay', `-${this.position}s`);
		},


		/**
		* DOM level function to attach to the scroll event
		* @param {Event} [e] The scroll event data
		*/
		domScrollListener() {
			let floatOffset = this.$el.scrollTop / (this.$el.scrollHeight - this.$el.clientHeight);
			if (floatOffset > 1) floatOffset = 1; // Clamp to max
			let positionRounded = Math.round(floatOffset * 100, 0);

			this.setPosition(positionRounded);
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
		<slot :position="position"/>
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
