<script>
/**
* Scrollytelling component which animates in/out HTML content
*
* @param {String} position Positioning. ENUM: 'left' - take up 50% of the left side of the screen, 'right' - take up 50% of the right side of the screen
*/
export default {
	props: {
		position: {
			type: String,
			validate: v => ['left', 'right'].includes(v),
			required: true,
		},
	},
}
</script>

<template>
	<div
		class="scrollytelling-animate"
		:class="[
			`position-${position}`,
		]"
	>
		<slot/>
	</div>
</template>

<style lang="scss">
.scrollytelling-animate {
	position: absolute;

	&.position-left {
		top: 20px;
		bottom: 20px;
		left: 20px;
		width: 50%;
	}

	&.position-right {
		top: 20px;
		bottom: 20px;
		right: 20px;
		width: 50%;
	}
}
</style>
