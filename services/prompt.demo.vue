<script>
import PromptHandler from './prompt-handler.vue';

export default {
	components: {
		PromptHandler,
	},
}
</script>

<template>
	<div>
		<prompt-handler/>
		<div class="card mb-2">
			<div class="card-header">Prompts</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="$prompt.dialog({body: 'Hello World'})" class="list-group-item list-group-item-action">
						$prompt.dialog({body: 'Hello World'})
					</a>
					<a @click="$prompt.dialog({body: '<strong>Hello</strong> World', isHtml: true})" class="list-group-item list-group-item-action">
						$prompt.dialog({body: '&lt;strong&gt;Hello&lt;/strong&gt; World', isHtml: true})
					</a>
					<a @click="$prompt.dialog({component: 'placeholder', componentProps: {text: 'A model!'}})" class="list-group-item list-group-item-action">
						$prompt.dialog({component: 'placeholder', componentProps: {text: 'A model!'}})
					</a>
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
