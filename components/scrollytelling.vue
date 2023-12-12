<script>
/**
* Main <scrollytelling/> component
*
* @provides {VueComponent} st This parent <scrollytelling/> component
*
* @property {Number} [positionStart=0] Starting point (as a percentage) of the stage
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
		positionStart: {type: Number, default: 0},
	},
	methods: {
		/**
		* Called by child items to register their presence within this stage
		*/
		register(component) {
			this.children.push(component);
		},


		/**
		* Set the new position (as a pecerntage offset) and arrange the stage
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		setPosition(position) {
			if (position == this.position) return console.log('Avoid redundent position navigation', this.position);
			if (position < 0 || position > 100) throw new Error('Position must be between 0 - 100');

			this.position = position;
			this.$el.style.setProperty('--storytelling-position-offset', `${this.position}s`);
			this.$el.style.setProperty('--storytelling-position-delay', `-${this.position}s`);

			return;
			return Promise.all(this.children.map(child =>
				child.place()
			));
		},


		/**
		* DOM level function to attach to the scroll event
		* @param {Event} [e] The scroll event data
		*/
		domScrollListener() {
			let percentOffset = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
			if (percentOffset > 1) percentOffset = 1; // Clamp to max

			console.log('SCROLL', {
				percentOffset,
				winInnerHeight: window.innerHeight,
				docClientHeight: window.document.body.clientHeight,
				offsetTop: window.document.body.offsetTop,
				pageYOffset: window.pageYOffset,
				scrollHeight: document.body.scrollHeight,
			});

			let positionRounded = Math.round(percentOffset * 100, 0);

			this.setPosition(positionRounded);
		},
	},
	mounted() {
		window.addEventListener('scroll', this.domScrollListener, {passive: true});
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.domScrollListener);
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

	scroll-snap-type: y mandatory;

	& > * {
		animation-play-state: paused;
		animation-iteration-count: 1;
		animation-delay: var(--storytelling-position-delay);
		animation-duration: 100s;
		animation-timing-function: linear;
	}

	& .st-timeline-horiz {
		display: flex;
		width: 1%;
		background: var(--bs-blue);

		position: fixed;
		left: 0px;
		top: 0px;
		width: 10px;
		height: 100%;

		animation-name: fill-vert;

		@keyframes fill-vert {
			from { height: 0% };
			to { height: 100% };
		}
	}
}
</style>
