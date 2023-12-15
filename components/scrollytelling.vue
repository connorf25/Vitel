<script>
import {Position} from './scrollytelling.utils.js';

/**
* Main <scrollytelling/> component
*
* @provides {VueComponent} st This parent <scrollytelling/> component
*
* @property {String} [startAt] DOM selection matcher to align to at the start - mainly used for debugging
* @property {Boolean} [debug=false] Whether to show various debugging information
* @property {Number} [scrollRate=0.5] Multiplier of milliseconds to scroll-pixels. e.g. On a high-end desktop PC the animation loop fires every 16ms which will scroll half as many pixels
*/
export default {
	provide() { return {
		st: this,
	}},
	data() { return {
		/**
		* The current stage position
		*
		* @type {Position}
		* @property {Float} float Position within the entire stage expressed as a float percentage (0 to 1)
		* @property {Number} percent Position within the entire stage expressed as a natural percentage (0 - 100)
		* @property {Number} absolute The raw absolute offset (usually pixels)
		* @property {Number} max Maxmimum absolute value
		*/
		position: new Position({max: 0, absolute: 0}),


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


		/**
		* The state of the animation
		* ENUM: 'manual' Human needs to scroll to play, 'playing' Animation is auto-playing, 'restart' Board needs restarting
		* @type {String}
		*/
		status: 'manual',


		/**
		* Whether the stage is currently auto-playing
		* @type {Boolean}
		*/
		playing: false,


		/**
		* Timer handle auto-scrolling (if `playing=true`)
		* Created by requestAnimationFrame() in a loop while auto-playing
		* @type {Handle}
		*/
		playTimer: null,
	}},
	props: {
		startAt: {type: String},
		debug: {type: Boolean, default: false},
		scrollRate: {type: Number, default: 0.5},
	},
	methods: {
		/**
		* Called by child items to register their presence within this stage
		*/
		register(component) {
			this.children.push(component);
		},


		setPlaying(newStatus) {
			// DEBUG: This needs to do things
			this.playing = newStatus;
			if (newStatus) {
				let lastStamp = performance.now();
				let queueFrame = timestamp => {
					let elapsed = timestamp - lastStamp;
					lastStamp = timestamp;

					let newAbsolute = this.position.absolute + (elapsed * this.scrollRate);
					if (newAbsolute >= this.position.max) { // Next step would move us equal / past the end
						console.log('End of play scope - pausing', {newAbsolute, max: this.position.max});
						this.setPosition({absolute: this.position.max}, {scrollTo: true});
						this.setPlaying(false); // Disable playback
					} else {
						this.setPosition({absolute: newAbsolute}, {scrollTo: true});
					}

					if (this.playing)
						this.playTimer = requestAnimationFrame(queueFrame);
				};
				this.playTimer = requestAnimationFrame(queueFrame);
			} else if (!newStatus && this.playTimer) {
				cancelAnimationFrame(this.playTimer);
			}
		},


		/**
		* Set the new position (as a percentage offset) and arrange the stage
		*
		* @param {Position|Object} rawPosition New position (or POJO of the same) to set this stage to
		*
		* @param {Object} [options] Additional optionst to mutate behaviour
		* @param {Boolean} [options.pause=false] After setting the position also reset the play state
		* @param {Boolean} [options.scrollTo=false] Also set the document scroll
		* @param {Boolean} [options.animateScrollTo=false] Animate when setting document scroll
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		setPosition(rawPosition, options) {
			let settings = {
				scrollTo: false,
				animateScrollTo: false,
				pause: false,
				...options,
			};

			let position = new Position({
				max: this.position.max, // Use previous max if we have one
				...rawPosition,
			});
			if (
				position.absolute == this.position.absolute
				&& position.max == this.position.max
			) return; // Avoid setting the same position we're already at

			this.position = position;

			if (settings.scrollTo) {
				this.$el.scrollTo({
					top: this.position.absolute,
					behavior: settings.animateScrollTo ? 'smooth' : 'instant',
				});
			}

			if (settings.pause && this.playing) this.setPlaying(false);

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

			if (this.focusedItem) {
				let itemComponent = this.focusedItem.el.$vueComponent;
				itemComponent.innerPosition = new Position({
					max: itemComponent.lifetime,
					absolute: 0 - this.focusedItem.rect.top,
				});
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
			this.setPosition({
				max: this.$el.scrollHeight - this.$el.clientHeight,
				absolute: this.$el.scrollTop,
			}, {
				scrollTo: false, // We're already reacting to scroll, dont get into a loop
			});
		},
	},
	mounted() {
		// Listen for scroll events to update the position
		this.$el.addEventListener('scroll', this.domScrollListener, {passive: true});

		// Set up watcher + jump to starting position
		this.$nextTick()
			.then(()=> this.setPosition({ // Prime initial position + set max
				absolute: 0,
				max: this.$el.scrollHeight - this.$el.clientHeight,
			}, {scrollTo: false}))
			.then(()=> this.$watch('startAt', v => {
				if (!v) return; // Nothing to jump to
				let domEl = document.querySelector(v);
				if (!domEl) throw new Error(`Cannot locate DOM element "${v}" to use it as a starting position`);
				domEl.scrollIntoView();
			}, {immediate: true}))
	},
}
</script>

<template>
	<div class="scrollytelling">
		<teleport to="body">
			<div v-if="debug" id="scrollytelling-debug" class="card">
				<table>
					<tr><td>Focus:</td><td>{{focusedItem ? focusedItem.el.id : 'NONE'}}</td></tr>
					<tr><td colspan="2"><hr/></td></tr>
					<tr><td>Position (Float):</td><td>{{position.float}}</td></tr>
					<tr><td>Position (%):</td><td>{{position.percent}}%</td></tr>
					<tr><td>Position (Abs):</td><td>{{position.absolute}}</td></tr>
					<tr><td>Position (Max):</td><td>{{position.max}}</td></tr>
				</table>
			</div>
		</teleport>
		<slot/>
	</div>
</template>

<style lang="scss">
/* Debugging area {{{ */
#scrollytelling-debug {
	position: fixed;
	top: 10px;
	right: 10px;
	max-width: 200px;
	overflow: hidden;

	background: #FFF;
	border: 1px solid #CCC;
	padding: 5px;

	& td {
		white-space: nowrap;
	}

	& td:first-child {
		text-align: right;
	}
}
/* }}} */

.scrollytelling {
	margin: 0;
	padding: 0;
	user-select: none;

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
