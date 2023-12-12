<script>
/**
* Scrollytelling component which displays a video
* This component will automatically preload the video and bias the lifetime of this scrollytelling-item by its duration
*/
export default {
	inject: ['stItem'],
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
			this.stItem.setLifetime(Math.ceil(e.target.duration * 1000));
		},
	},
	mounted() {
		this.$watch('stItem.innerPosition.absolute', (v)=> {
			let pos = v / 1000; // Absolute position is in milliseconds and <video/> takes seconds
			console.log('SET VIDEO POSITION', pos);
			this.$refs.videoEl.currentTime = pos;
		}, {immediate: true});
	},
}
</script>

<template>
	<div>
		<video
			ref="videoEl"
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
