<script>
import Scrollytelling from './scrollytelling.vue';
import ScrollytellingItem from './scrollytelling-item.vue';
import ScrollytellingTimeline from './scrollytelling-timeline.vue';

export default {
	components: {
		Scrollytelling,
		ScrollytellingItem,
		ScrollytellingTimeline,
	},
}
</script>

<template>
	<scrollytelling>
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

			<!-- General timeline display -->
			<scrollytelling-timeline
				position="bottom"
			/>
		</template>
	</scrollytelling>
</template>
