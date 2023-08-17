<script>
export default {
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
				<pre>$service: {{servicesState}}</pre>
			</div>
		</div>
	</div>
</template>
