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
				<p><a href="https://axios-http.com/docs/intro" target="_blank">Axios</a> wrapper for Vue</p>
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
		<div class="card mb-2">
			<div class="card-header">$http.throttle(request)</div>
			<div class="card-body">
				<p>Axios requests + combine duplicate request + local caching. This method follows these rules:
					<ol>
						<li>Hash the current request based on `hashMethod` (defaults to `url`)</li>
						<li>Using the hash, if the request is currently being made - return that pending promise</li>
						<li>Using the hash, if the <code>$cache</code> service is present and the request has been made recently and has not expired - reuse that response</li>
						<li>If none of the above matches - make a fresh request</li>
					</ol>
				</p>
				<div class="list-group">
					<a
						@click="
							mockRequest('throttle', {url: '/api/test/delayed'});
							mockRequest('throttle', {url: '/api/test/delayed'});
							mockRequest('throttle', {url: '/api/test/delayed'});
						"
						class="list-group-item list-group-item-action"
					>
						$http.throttle({url: '/api/test/delayed'}) x 3
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
