<script>
/**
* Sub-item of a <scrollytelling/> component
*
* NOTE: Don't use this component directly - its meant to be a class prototype
*
* @injects {VueComponent} st The parent <scrollytelling/> component
*
* @property {String} [position='screen'] How to position the item
* @property {String} life Main in-focus point of the item expressed as a percentage of the timeline in the form `${from%}-${to%}`
* @property {String} [transition='snap'] Transition to use for the item
*/
export default {
	inject: ['st'],
	data() { return {
		/**
		* Number of life units this component is expected to hang around
		* Calculated automatically by <scrollytelling-video/> etc.
		* Use setLifetime() to populate
		*/
		lifetime: null,
	}},
	props: {
		position: {
			type: String,
			validate: v => [
				'screen',
				'screen-snap',
				'inline',
			].includes(v),
			default: 'screen',
		},
		life: {
			type: String,
			validate: v => /^(\d+)-(\d+)$/.test(v),
		},
		transition: {
			type: String,
			default: 'snap',
			validate: v => [
				'snap',
			].includes(v),
		},
	},
	computed: {
		/**
		* Computed version of `$props.life` as an object
		* @returns {Object}
		* @property {Number} start The primary starting point of the item
		* @propertY {Number} end The primary ending point of the item
		*/
		presence() {
			let out = /^(?<start>\d+)-(?<end>\d+)$/.exec(this.life);
			out.start = parseFloat(out.start);
			out.end = parseFloat(out.end);
			return out;
		},
	},
	methods: {
		/**
		* Set the lifetime of a component based on some dynamic criteria like the video length
		* @param {Number} lifetime Lifetime in milliseconds to allow this component to live
		*/
		setLifetime(lifetime) {
			console.log('DEBUG: <scrollytelling-item/> setLifetime', lifetime);
		},

		/**
		* Sets the location of this item based on its properties
		*/
		place() {
			this.classes = [
				// Toggle classes#alive|no-alive
				...(this.st.position >= this.presence.start && this.st.position <= this.presence.end
					? 'alive'
					: 'no-alive'
				),
			];
		},
	},
	mounted() {
		this.st.register(this); // Register this child with parent
	},
}
</script>

<template>
	<div
		class="scrollytelling-item"
		:class="[
			`position-${position}`,
			`transition-${transition}`,
		]"
	>
		<slot/>
	</div>
</template>

<style lang="scss">
.scrollytelling .scrollytelling-item {
	/* Positions: .position-* {{{ */
	&.position-screen, &.position-screen-snap {
		display: flex;
		width: 100%;
		height: 100%;
		border: 1px dashed blue;
	}

	&.position-screen-snap {
		scroll-snap-align: start;
	}
	/* }}} */

	/* Transitions {{{ */

	/* .transition-snap - Item only shows when alive {{{*/
	& .transition-snap {
		display: none;
		&.alive {display: flex}
	}
	/* }}}

	/* }}} */
}
</style>
