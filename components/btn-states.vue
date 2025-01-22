<script>
/**
* A button which acts as a multiple toggler
*
* @emits change Emitted as `(value:*)` with the current state value when the state changes
*/
export default {
	emits: ['change'],
	data() { return {
		/**
		* The current state index
		* @type {Number}
		*/
		state: 0,
	}},
	props: {
		/**
		* Initial value of the button
		* Will match to the fist $props.states[].value
		* @type {*}
		*/
		value: null, // i.e. "Any"


		/**
		* Defaults to apply in all cases before overriding per-state
		* @see states
		* @type {Object}
		*/
		defaults: {type: Object, default: ()=> ({
			value: 0,
		})},


		/**
		* State definition overrides
		* @type {Array<Object>}
		*
		* @property {String} [class] Optional button classes to apply when in this state
		* @property {String} [icon] Optional icon to display when in this state
		* @property {String} [text] Optional text to display when in this state
		* @property {*} [value] Value to emit when changing to this state
		* @property {String|Object} [tooltip] Optional tooltip string / object to bind
		*/
		states: {type: Array, default: ()=> [
			{
				class: 'btn-primary',
				icon: 'far fa-circle',
				text: 'Off',
				value: false,
			},
			{
				class: 'btn-primary',
				icon: 'far fa-circle-check',
				text: 'On',
				value: true,
			},
		]},
	},
	computed: {
		/**
		* Returns the currently active state from $props.states
		* @returns {Object}
		*/
		activeState() {
			return {
				...this.defaults,
				...this.states[this.state],
			};
		},
	},
	methods: {
		/**
		* Advance to the next state
		*/
		advance() {
			if (++this.state >= this.states.length) this.state = 0;
			this.$emit('change', this.states[this.state].value ?? this.defaults.value);
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				let vState = this.states.findIndex(s => s.value === v);
				if (vState < 0) {
					console.error('<btn-states :value=', this.value, '/> - given a value which does not correspond to any state value - using first state instead');
					this.state = 0;
				} else {
					this.state = vState;
				}
			},
		},
	},
}
</script>

<template>
	<div>
		<a
			:class="activeState.class"
			@click="advance()"
			v-tooltip="activeState.tooltip"
		>
			<i v-if="activeState.icon" :class="activeState.icon"/>
			{{activeState.text ? activeState.text : ''}}
		</a>
	</div>
</template>
