<script>
import {h, resolveComponent} from 'vue';

/**
* Display component composed from a component name + object of props + object of events to respond to
*
* @param {String|Object} component The string name of a component or the object definition
* @param {Object<*>} [props] Prop bindings as an object lookup
* @param {Object<Function>} [events] Event bindings as an object lookup
* @param {String} [refHandle] Setup an inner reference for the custom component
*/
export default {
	props: {
		component: {type: [String, Object], required: true},
		props: {type: Object},
		events: {type: Object},
		refHandle: {type: String},
	},
	render() {
		return h(
			typeof this.component == 'string'
				? resolveComponent(this.component) // Resolve component if string
				: this.component, // OR use prototype if given one
			{
				...(this.refHandle && {ref: this.refHandle}), // Copy ref if we have one
				...this.props, // Splat props directly
				...Object.fromEntries( // Convert all event keys: `click` -> `onClick`
					Object.entries(this.events || {})
						.map(([event, cb]) => [
							'on' + event.substr(0, 1).toUpperCase() + event.substr(1),
							cb,
						])
				)
			},
		);
	},
}
</script>
