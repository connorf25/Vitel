<script>
/**
* Generic "This is loading" notification flex-block
* Note that this doesn't have any outer structure like a card
*
* @param {String} [text='Loading...'] Optional text to display, set to `false` to disable
* @param {String} [size='md'] Size to draw the element, ENUM: 'md', 'lg', 'xl'
*/
export default {
	props: {
		text: {type: [String, Boolean], default: 'Loading...'},
		size: {type: String, default: 'md'},
	},
}
</script>

<template>
	<div class="loading-spinner" :class="`size-${size}`">
		<div class="fingerprint-spinner">
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
			<div class="spinner-ring"/>
		</div>
		<div v-if="text">
			{{text}}
		</div>
	</div>
</template>

<style lang="scss">
.loading-spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	min-width: 300px;
	user-select: none;

	&.size-lg {scale: 2}
	&.size-xl {scale: 3}

	/* Fingerprint spinner CSS - taken from https://epic-spinners.epicmax.co/ */
	& .fingerprint-spinner, .fingerprint-spinner * {
		box-sizing: border-box;
	}

	& .fingerprint-spinner {
		height: 64px;
		width: 64px;
		padding: 2px;
		overflow: hidden;
		position: relative;
		margin: 0 8px;
		scale: 0.8;

		& .spinner-ring {
			position: absolute;
			border-radius: 50%;
			border: 2px solid transparent;
			border-top-color: var(--accent);
			animation: fingerprint-spinner-animation 1500ms cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
			margin: auto;
			bottom: 0;
			left: 0;
			right: 0;
			top: 0;

			&:nth-child(1) {
				height: calc(60px / 9 + 0 * 60px / 9);
				width: calc(60px / 9 + 0 * 60px / 9);
				animation-delay: calc(50ms * 1);
			}

			&:nth-child(2) {
				height: calc(60px / 9 + 1 * 60px / 9);
				width: calc(60px / 9 + 1 * 60px / 9);
				animation-delay: calc(50ms * 2);
			}

			&:nth-child(3) {
				height: calc(60px / 9 + 2 * 60px / 9);
				width: calc(60px / 9 + 2 * 60px / 9);
				animation-delay: calc(50ms * 3);
			}

			&:nth-child(4) {
				height: calc(60px / 9 + 3 * 60px / 9);
				width: calc(60px / 9 + 3 * 60px / 9);
				animation-delay: calc(50ms * 4);
			}

			&:nth-child(5) {
				height: calc(60px / 9 + 4 * 60px / 9);
				width: calc(60px / 9 + 4 * 60px / 9);
				animation-delay: calc(50ms * 5);
			}

			&:nth-child(6) {
				height: calc(60px / 9 + 5 * 60px / 9);
				width: calc(60px / 9 + 5 * 60px / 9);
				animation-delay: calc(50ms * 6);
			}

			&:nth-child(7) {
				height: calc(60px / 9 + 6 * 60px / 9);
				width: calc(60px / 9 + 6 * 60px / 9);
				animation-delay: calc(50ms * 7);
			}

			&:nth-child(8) {
				height: calc(60px / 9 + 7 * 60px / 9);
				width: calc(60px / 9 + 7 * 60px / 9);
				animation-delay: calc(50ms * 8);
			}

			&:nth-child(9) {
				height: calc(60px / 9 + 8 * 60px / 9);
				width: calc(60px / 9 + 8 * 60px / 9);
				animation-delay: calc(50ms * 9);
			}
		}
	}

	@keyframes fingerprint-spinner-animation {
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
