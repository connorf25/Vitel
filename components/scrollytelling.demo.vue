<script>
import Scrollytelling from './scrollytelling.vue';
import ScrollytellingItem from './scrollytelling-item.vue';
import ScrollytellingTimeline from './scrollytelling-timeline.vue';
import ScrollytellingVideo from './scrollytelling-video.vue';

export default {
	components: {
		Scrollytelling,
		ScrollytellingItem,
		ScrollytellingTimeline,
		ScrollytellingVideo,
	},
}
</script>

<template>
	<scrollytelling
		start-at="#slide-4"
	>
		<template #default>
			<!-- Slide 1 - white background -->
			<scrollytelling-item
				position="screen-snap"
				class="bg-white"
			/>

			<!-- Slide 2 - blue background -->
			<scrollytelling-item
				position="screen-snap"
				class="bg-blue"
			/>

			<!-- Slide 3 - yellow background -->
			<scrollytelling-item
				position="screen-snap"
				class="bg-yellow"
			/>

			<!-- Slide 4 - Video example -->
			<scrollytelling-item
				id="slide-4"
				position="screen-snap"
			>
				<scrollytelling-video
					url="https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/ea6bd022-a62b-11ed-b0a8-02420a0001c9/gooey.ai%20text%20to%20animation%20-%200%20a%20lush%20garden%20in%20...remely%20detailed%20face%20full%20body%203d%20realism%20render.mp4#t=0.001"
				/>
			</scrollytelling-item>

			<!-- General timeline display -->
			<scrollytelling-timeline
				position="bottom"
			/>
		</template>
	</scrollytelling>
</template>
