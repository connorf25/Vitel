<script>
export default {
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">$events</div>
			<div class="card-body">
				<p>A universal event emitter buffer using <a href="https://github.com/developit/mitt" target="_blank">Mitt</a>.</p>
				<div class="list-group">
					<a @click="$events.emit('customEvent', {payload: true})" class="list-group-item list-group-item-action">$events.emit('customEvent', {payload: true})</a>
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
