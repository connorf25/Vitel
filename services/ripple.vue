<script>
/**
* Apply a ripple effect to various page elements
*
* This is based on [the original CSS-Tricks example](https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/)
* with some additional hacks
*/
export default {
	name: '$ripple',
	props: {
		/**
		* Only apply the effect to anything matching this CSS expression
		*
		* @type {String}
		*/
		classes: {type: String, default: '.btn, .clickable, .list-group-item-action'},


		/**
		* Skip adding the effect to anything matching this CSS expression
		*
		* @type {String}
		*/
		classesIgnore: {type: String, default: '.no-ripple'},
	},
	methods: {
		/**
		* Create a ripple effect around an event target
		* This function ignores all class matchers
		*
		* @param {Event} e DOM event which triggers the ripple
		*/
		ripple(e) {
			let target = e.target;

			// Create a ripple-box - a container within the same elements parent
			let rippleBox = document.createElement('div');
			rippleBox.classList.add('ripple-box');
			rippleBox.style.left = `${target.offsetLeft}px`;
			rippleBox.style.top = `${target.offsetTop}px`;
			rippleBox.style.width = `${target.offsetWidth}px`;
			rippleBox.style.height = `${target.offsetHeight}px`;

			// Create ripple DOM element
			let ripple = document.createElement('div');
			let radius = Math.max(target.clientWidth, target.clientHeight);
			let diameter = radius / 2;
			ripple.classList.add('ripple');
			ripple.style.left = `${e.offsetX - diameter}px`;
			ripple.style.top = `${e.offsetY - diameter}px`;
			ripple.style.width = ripple.style.height = `${radius}px`;
			rippleBox.appendChild(ripple);

			// Append everything to parent of current target
			target.parentElement.appendChild(rippleBox);

			// Clean up ripple effect circle when animated
			ripple.addEventListener('animationend', ()=> target.removeChild(rippleBox));
		},


		/**
		* React to DOM click events, calling `ripple()` for anything that matches the class expressions
		*
		* @param {Event} e DOM event which triggers the ripple
		*/
		domClickListner(e) {
			if (
				e.target.classList.contains('ripple-effect') // Already had ripple applied
				|| !e.target.matches(this.classes) // Not in the CSS matcher of candidates
				|| e.target.matches(this.classesIgnore) // In the CSS matcher of abort candidates
			) return;

			this.ripple(e);
		},
	},
	created() {
		// Global click listener + binding
		document.addEventListener('click', this.domClickListner);
	},
}
</script>

<style lang="scss">
.ripple-box {
	position: absolute;
	overflow: hidden;
	pointer-events: none;

	& .ripple {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		background-color: rgba(255, 255, 255, 0.7);
		animation: ripple 0.6s ease-out;
	}
}

@keyframes ripple {
	to {
		transform: scale(4);
		opacity: 0;
	}
}
</style>
