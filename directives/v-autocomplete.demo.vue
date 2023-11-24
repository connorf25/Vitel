<script>
import autocomplete from '#directives/v-autocomplete';

export default {
	directives: {
		autocomplete,
	},
	data() { return {
		value: '',
	}},
	props: {
		settings: {type: Object, required: true}, // Settings passed to v-autocomplete
	},
}
</script>

<template>
	<form>
		<div class="form-floating mb-3">
			<input
				id="exampleAutocomplete"
				v-model="value"
				v-autocomplete="{
					...settings,
					change: v => value = v,
				}"
				type="text"
				class="form-control"
				placeholder="Select something from the list..."
			/>
			<label for="exampleAutocomplete" class="form-label">Example input</label>
		</div>
		<p v-if="value">Raw value: <code class="border rounded p-1">{{value}}</code></p>
	</form>
</template>
