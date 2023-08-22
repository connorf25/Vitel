<script>
import Events from './events.vue'; // eslint-disable-line no-unused-vars

export default {
	data() { return {
		Events, // Stubs to dynamically load for the demo
	}},
	computed: {
		servicesState() {
			return {
				services: Object.fromEntries( // Convert to a nicer layout so we don't upset the Vue JSON renderer
					Object.entries(this.$services.services)
						.map(([key]) => [key, `[${key} service]`])
				),
			};
		},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">$services.services</div>
			<div class="card-body">
				<pre>$services: {{servicesState}}</pre>
			</div>
		</div>
		<div class="card mb-2">
			<div class="card-header">$services.require() for loading other services</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="$services.require(Events)" class="list-group-item list-group-item-action">$services.require(Events)</a>
				</div>
			</div>
		</div>
	</div>
</template>
