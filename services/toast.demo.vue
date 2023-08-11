<script>
export default {
	data() { return {
		toastId: null,
	}},
	methods: {
		testNotifyPromise(isOk = true) {
			let myPromise = new Promise((resolve, reject) => {
				setTimeout(()=> { // Queue on next tick to avoid myPromise not being ready yet
					this.$toast.promise('Waiting 3 seconds...', myPromise)
				});
				setTimeout(()=> isOk ? resolve('Yey!') : reject('Oops!'), 3000);
			});
		},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">Simple toasts</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="$toast.create('Hello World')" class="list-group-item list-group-item-action">$toast.create('Hello World')</a>
					<a @click="$toast.success('Success!')" class="list-group-item list-group-item-action">$toast.success('Success!')</a>
					<a @click="$toast.warn('Warn!')" class="list-group-item list-group-item-action">$toast.warn('Warn!')</a>
					<a @click="$toast.error('Error!')" class="list-group-item list-group-item-action">$toast.error('Error!')</a>
				</div>
			</div>
		</div>
		<div class="card mb-2">
			<div class="card-header">Promisables</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="testNotifyPromise(true)" class="list-group-item list-group-item-action">$toast.promise('Waiting 3 seconds', PromiseThatResolves)</a>
					<a @click="testNotifyPromise(false)" class="list-group-item list-group-item-action">$toast.promise('Waiting 3 seconds', PromiseThatRejects)</a>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header">Update by ID</div>
			<div class="card-body">
				<div class="list-group">
					<a @click="toastId = $toast.loading('Foo')" class="list-group-item list-group-item-action">let toastId = $toast.loading('Foo')</a>
					<a @click="$toast.update(toastId, 'Bar')" class="list-group-item list-group-item-action">$toast.update(toastId, 'Bar')</a>
					<a @click="$toast.update(toastId, 'Baz', {isLoading: false, type: 'warning'})" class="list-group-item list-group-item-action">$toast.update(toastId, 'Baz', {isLoading: false, type: 'warning'})</a>
					<a @click="$toast.update(toastId, {isLoading: false, type: 'success'})" class="list-group-item list-group-item-action">$toast.update(toastId, {isLoading: false, type: 'success'})</a>
					<a @click="$toast.closable(toastId)" class="list-group-item list-group-item-action">$toast.closable(toastId)</a>
					<a @click="$toast.close(toastId)" class="list-group-item list-group-item-action">$toast.close(toastId)</a>
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
