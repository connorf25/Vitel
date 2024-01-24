<script>
export default {
	methods: {
		testMenu(options) {
			this.$menu.open({
				el: this.$refs.menuTarget,
				items: [
					{text: 'Foo', handler: ()=> this.$toast.success('You clicked Foo!')},
					{text: 'Bar', handler: ()=> this.$toast.warning('You clicked Bar!')},
					'-',
					{text: 'Baz', handler: ()=> this.$toast.error('You clicked Baz!')},
				],
				...options,
			});
		},
	},
}
</script>

<template>
	<div>
		<div class="card mb-2">
			<div class="card-header">$loader methods</div>
			<div class="card-body">
				<p>General Bootstrap-style Menu handler.</p>
				<p>Suitable for generic menu objects or context-menus against elements.</p>
				<div class="d-flex justify-content-center align-items-center" style="height: 150px">
					<button
						ref="menuTarget"
						@contextmenu.prevent="testMenu()"
						class="btn btn-light"
					>
						Context menu target<br/>
						<span class="text-muted">(right click this)</span>
					</button>
				</div>
				<div class="list-group">
					<a
						@click="testMenu()"
						class="list-group-item list-group-item-action"
					>$menu.open({el: $refs.menuTarget, items: [...]})})</a>
				</div>
				<div class="list-group">
					<a
						ref="listMenu"
						@click="testMenu({el: $refs.listMenu, placement: 'bottom-start'})"
						class="list-group-item list-group-item-action"
					>$menu.open({el: $refs.listMenu, placement: 'bottom-start', items: [...]})})</a>
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
