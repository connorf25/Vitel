<script>
export default {
	inject: ['st'],
	props: {
		position: {
			type: String,
			validate: v => ['top', 'bottom', 'left', 'right'].includes(v),
			default: 'bottom',
		},
	},
}
</script>

<template>
	<div
		class="scrollytelling-timeline"
		:class="[`position-${position}`]"
	>
		<div
			class="position-indicator"
			:style="`${position == 'top' || position == 'bottom' ? 'width': 'height'}: ${st.position}%`"
		/>
	</div>
</template>

<style lang="scss">
.scrollytelling .scrollytelling-timeline {
	background: #777;
	color: #FFF;
	font-size: 10px;
	border-radius: 5px;
	overflow: hidden;

	& .position-indicator {
		position: absolute;
		left: 0px;
		top: 0px;
		height: 100%;
		width: 100%;
		background: #333;
		border: 1px solid #000;
	}

	&.position-top, &.position-bottom {
		position: fixed;
		left: 0px;
		right: 0px;
		height: 10px;

		& .position-indicator {
			width: 0px;
		}
	}
	&.position-top { top: 0px }
	&.position-bottom { bottom: 0px }

	&.position-left, &.position-right {
		position: fixed;
		top: 0px;
		bottom: 0px;
		width: 10px;

		& .position-indicator {
			height: 0px;
		}
	}
	&.position-left { left: 0px }
	&.position-right { right: 0px }
}
</style>
