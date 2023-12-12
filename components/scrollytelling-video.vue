<script>
import ScrollyTellingItem from './scrollytelling-item.vue';

/**
* Scrollytelling component which displays a video
* This component will automatically preload the video and bias the lifetime of this scrollytelling-item by its duration
*/
export default {
	extends: ScrollyTellingItem,
	props: {
		url: {
			type: String,
			required: true,
		},
	},
	methods: {
		/**
		* Called by the DOM when we know how long the video duration is going to be
		* @param {Evenet} e DOM event
		*/
		domDurationChange(e) {
			console.log('DEBUG: Duration-Change', e.target.duration);
			this.setLifetime(Math.ceil(e.target.duration * 1000));
		},
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
		<video
			controlslist="nodownload nofullscreen noremoteplayback"
			disablepictureinpicture
			disableremoteplayback
			muted
			preload="auto"
			:src="url"
			@durationchange="domDurationChange"
		/>
	</div>
</template>
