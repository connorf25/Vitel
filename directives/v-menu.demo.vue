<script>
export default {
}
</script>

<template>
	<div>

		<teleport to="body">
			<div id="myDropdown" class="dropdown-menu">
				<a @click="$toast.success('Foo!')" class="dropdown-item">Foo</a>
				<a @click="$toast.success('Bar!')" class="dropdown-item">Bar</a>
				<div class="dropdown-divider"/>
				<a @click="$toast.success('Baz!')" class="dropdown-item">Baz</a>
			</div>
		</teleport>

		<div class="card">
			<div class="card-body d-flex justify-content-between">
				<a v-menu="'#myDropdown'" class="btn btn-light">
					Right click me
					<div class="text-muted">Selector for existing menu</div>
				</a>
				<a
					v-menu="[
						{title: 'Item #1', onClick: ()=> $toast.success('Item #1!')},
						{title: 'Item #2', onClick: ()=> $toast.success('Item #2!')},
						'-',
						{title: 'Item #3', onClick: ()=> $toast.success('Item #3!')},
					]"
					class="btn btn-light"
				>
					Right click me
					<div class="text-muted">Dynamic menu contents</div>
				</a>
				<a v-menu.click="'#myDropdown'" class="btn btn-light">
					LEFT click me
					<div class="text-muted">Selector for existing menu</div>
				</a>
			</div>
		</div>

	</div>
</template>
