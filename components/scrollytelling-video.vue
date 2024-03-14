<script>
/**
* Scrollytelling component which displays a video
* This component will automatically preload the video and bias the lifetime of this scrollytelling-item by its duration
*
* @param {String} [syncMethod='playForward'] How to keep the video position in sync. ENUM: 'setPosition' set the video position with no compensation, 'playForward' attempt to play from the previous position to the new one
* @param {String} url The URL to play as a video
*/
export default {
	inject: ['stItem'],
	data() { return {
		/**
		* Optional position to pause at in seconds
		* Used in the `playForward` sync method to stop the video when it reaches this position
		* @type {Number}
		*/
		stopPosition: null,
	}},
	props: {
		syncMethod: {
			type: String,
			validate: v => ['setPosition', 'playForward'].includes(v),
			default: 'playForward',
		},
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


		/**
		* Called by the DOM when the video position updates
		* @param {Evenet} e DOM event
		*/
		domTimeUpdate(e) {
			if (e.target.currentTime >= this.stopPosition) { // Reached a stop point
				this.$refs.videoEl.pause()
			}
		},
	},
	mounted() {
		this.$watch('stItem.innerPosition.absolute', (newOffset, oldOffset) => {
			if (this.syncMethod == 'playForward' && oldOffset != null && newOffset > oldOffset) {
				this.stopPosition = newOffset / 1000;
				this.$refs.videoEl.play();
			} else {
				let newPosition = newOffset / 1000; // Absolute position is in milliseconds and <video/> takes seconds
				this.$refs.videoEl.currentTime = newPosition;
			}
		}, {immediate: true});
	},
}
</script>

<template>
	<div class="scrollytelling-video">
		<video
			ref="videoEl"
			controlslist="nodownload nofullscreen noremoteplayback"
			disablepictureinpicture
			disableremoteplayback
			muted
			preload="auto"
			:src="url"
			@durationchange="domDurationChange"
			@timeupdate="domTimeUpdate"
		/>
	</div>
</template>

<style lang="scss">
.scrollytelling-video, .scrollytelling-video > video {
	width: 100%;
	height: 100%;
}
</style>
