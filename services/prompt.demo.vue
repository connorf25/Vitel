<script>
import promptHandler from './prompt-handler.vue';

export default {
	components: {
		promptHandler,
	},
}
</script>

<template>
	<div>
		<prompt-handler/>
		<div class="card mb-2">
			<div class="card-header">Simple prompts</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="$prompt.dialog({body: 'Hello World'})" class="list-group-item list-group-item-action">$prompt.dialog({body: 'Hello World'})</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.list-group-item-action {
	cursor: pointer;
}
</style>
