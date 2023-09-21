<script>
export default {
	computed: {
		hankoState() { return {
			ready: this.$hanko.ready,
			state: this.$hanko.state,
			isLoggedIn: this.$hanko.isLoggedIn,
			hasPasskeys: this.$hanko.hasPasskeys,
			user: this.$hanko.user,
		}},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">Hanko Auth</div>
			<div class="card-body">
				<p>A Vue wrapper around the <a href="https://hanko.io" target="_blank">Hanko.io</a> platform to provide basic auth and user information</p>
				<div class="list-group">
					<a
						@click="$hanko.promise()"
						class="list-group-item list-group-item-action"
					>$hanko.promise()</a>
					<a
						@click="$hanko.refresh()"
						class="list-group-item list-group-item-action"
					>$hanko.refresh()</a>
					<a
						@click="$hanko.logout()"
						class="list-group-item list-group-item-action"
					>$hanko.logout()</a>
				</div>
			</div>
		</div>
		<div class="card mb-2">
			<div class="card-header">Hanko State</div>
			<div class="card-body">
				<p>
					State: <pre>{{hankoState}}</pre>
				</p>
			</div>
		</div>
		<div class="card mb-2">
			<div class="card-header">Hanko Login Example</div>
			<div class="card-body">
				<div class="alert alert-info">
					NOTE: This will only work if this domain is associated with a Hanko account and the URL has been provided in the module settings
				</div>
				<hanko-auth lang="en"/>
			</div>
		</div>
	</div>
</template>

<style>
.list-group-item-action {
	cursor: pointer;
}
</style>
