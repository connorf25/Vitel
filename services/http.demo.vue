<script>
export default {
	data() { return {
		isError: false,
		response: null,
	}},
	methods: {
		mockRequest(method, req) {
			return (method
				? this.$http[method](req)
				: this.$http(req)
			)
				.then(res => {
					this.isError = false;
					this.response = res
				})
				.catch(e => {
					this.isError = true;
					this.response = e;
				});
		},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">$http</div>
			<div class="card-body">
				<div class="list-group">
					<a
						@click="mockRequest('get', '/api/test/200')"
						class="list-group-item list-group-item-action"
					>
						$http.get('/api/test/200')
					</a>
					<a
						@click="mockRequest('get', '/api/test/400')"
						class="list-group-item list-group-item-action"
					>
						$http.get('/api/test/400')
					</a>
					<a
						@click="mockRequest('get', '/api/fake/users')"
						class="list-group-item list-group-item-action"
					>
						$http.get('/api/fake/users')
					</a>
					<a
						@click="mockRequest(null, {method: 'GET', url: '/api/test/200'})"
						class="list-group-item list-group-item-action"
					>
						$http({method: 'GET', url: '/api/test/200'})
					</a>
				</div>
			</div>
			<div v-if="response" class="card-body">
				<div class="alert" :class="isError ? 'alert-warning' : 'alert-success'">
					<pre>{{isError ? 'Error response' : 'Response'}}: {{response}}</pre>
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
