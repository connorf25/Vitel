<script>
export default {
	computed: {
		kindeState() { return {
			ready: this.$kinde.ready,
			state: this.$kinde.state,
			isLoggedIn: this.$kinde.isLoggedIn,
			user: this.$kinde.user,
		}},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">Kinde Auth</div>
			<div class="card-body">
				<p>A Vue wrapper around the <a href="https://kinde.io" target="_blank">Kinde.com</a> platform to provide basic auth and user information</p>
				<div class="list-group">
					<a
						@click="$kinde.promise()"
						class="list-group-item list-group-item-action"
					>$kinde.promise()</a>
					<a
						@click="$kinde.login()"
						class="list-group-item list-group-item-action"
					>$kinde.login()</a>
					<a
						@click="$kinde.signup()"
						class="list-group-item list-group-item-action"
					>$kinde.signup()</a>
					<a
						@click="$kinde.refresh()"
						class="list-group-item list-group-item-action"
					>$kinde.refresh()</a>
					<a
						@click="$kinde.logout()"
						class="list-group-item list-group-item-action"
					>$kinde.logout()</a>
				</div>
			</div>
		</div>
		<div class="card mb-2">
			<div class="card-header">Kinde State</div>
			<div class="card-body">
				<p>
					State: <pre>{{kindeState}}</pre>
				</p>
			</div>
		</div>
	</div>
</template>

<style>
.list-group-item-action {
	cursor: pointer;
}
</style>
