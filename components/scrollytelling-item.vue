<script>
/**
* Sub-item of a <scrollytelling/> component
*
* @provides {VueComponent} stItem This <scrollytelling-item/> component
* @injects {VueComponent} st The parent <scrollytelling/> component
*
* @property {String} [position='screen'] How to position the item
* @property {String} life Main in-focus point of the item expressed as a percentage of the timeline in the form `${from%}-${to%}`
* @property {String} [transition='snap'] Transition to use for the item
*/
export default {
	inject: ['st'],
	provide() { return {
		stItem: this,
	}},
	data() { return {
		/**
		* Calculated scroll position within this item, based on the parent scroll + lifetime
		* @type {Number} Offset in ticks (usually milliseconds)
		*/
		innerPosition: 0,

		/**
		* Number of life units this component is expected to hang around
		* Calculated automatically by <scrollytelling-video/> etc.
		* Use setLifetime() to populate
		* @type {Number} Time in ticks (usually milliseconds)
		*/
		lifetime: 0,
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
	methods: {
		/**
		* Set the lifetime of a component based on some dynamic criteria like the video length
		* @param {Number} lifetime Lifetime in milliseconds to allow this component to live
		*/
		setLifetime(lifetime) {
			console.log('DEBUG: <scrollytelling-item/> setLifetime', lifetime);
			this.lifetime = lifetime;
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

		<div
			v-if="lifetime > 0"
			class="lifetime-padding"
			:style="`height: ${lifetime}px`"
		>
			Padding: {{lifetime}}
		</div>
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

	/* .lifetime-padding {{{ */
	& .lifetime-padding {
		display: block;
		width: 100%;
		background: #0FF;
	}
	/* }}} */
}
</style>
