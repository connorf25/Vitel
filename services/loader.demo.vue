<script>
export default {
	methods: {
		testLoader(options) {
			this.$loader.start(options);
			setTimeout(()=> this.$loader.stop(), 3000);
		},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">$loader methods</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="testLoader()" class="list-group-item list-group-item-action">$toast.start() (for 3 seconds)</a>
					<a @click="testLoader({caption: 'Doing something'})" class="list-group-item list-group-item-action">$toast.start({caption: 'Doing something'}) (for 3 seconds)</a>
					<a @click="$loader.start()" class="list-group-item list-group-item-action">$toast.start() (lock UI)</a>
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
