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
				id="slide-1"
				position="screen"
				class="bg-white"
			/>

			<!-- Slide 2 - blue background -->
			<scrollytelling-item
				id="slide-2"
				position="screen"
				class="bg-blue"
			/>

			<!-- Slide 3 - yellow background -->
			<scrollytelling-item
				id="slide-3"
				position="screen"
				class="bg-yellow"
			/>

			<!-- Slide 4 - Video garden path example -->
			<!-- Videos used from https://gooey.ai/animation-generator/examples/ -->
			<scrollytelling-item
				id="slide-4"
				position="screen"
			>
				<scrollytelling-video
					url="https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/ea6bd022-a62b-11ed-b0a8-02420a0001c9/gooey.ai%20text%20to%20animation%20-%200%20a%20lush%20garden%20in%20...remely%20detailed%20face%20full%20body%203d%20realism%20render.mp4"
				/>
			</scrollytelling-item>

			<!-- Slide 5 - Video city example -->
			<scrollytelling-item
				id="slide-5"
				position="screen"
			>
				<scrollytelling-video
					url="https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/cc19bb48-bd82-11ed-a0b0-02420a000113/gooey.ai%20animation%20%5Bframe%200%20prompt%20a%20wide%20angle%20...oto%20of%20a%20busy%20street%20in%20Warsaw%20Poland%204k%208k%20UHD%5D.mp4"
				/>
			</scrollytelling-item>

			<!-- General timeline display -->
			<scrollytelling-timeline position="bottom"/>
		</template>
	</scrollytelling>
</template>
