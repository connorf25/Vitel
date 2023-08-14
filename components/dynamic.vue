<script>
import {h, resolveComponent} from 'vue';

/**
* Display component composed from a component name + object of props + object of events to respond to
*
* @param {String|Object} component The string name of a component or the object definition
* @param {Object} [events] Event bindings as an object lookup
* @param {Object} [props] Prop bindings as an object lookup
*/
export default {
	props: {
		component: {type: [String, Object], required: true},
		props: {type: Object},
		events: {type: Object},
	},
	render() {
		console.log('Render', this.$props);
		console.log('Render resolved', {component: resolveComponent(this.component)});
		return h(resolveComponent(this.component), {
			...this.props, // Splat props directly
			...Object.fromEntries( // Convert all event keys: `click` -> `onClick`
				Object.entries(this.events || {})
					.map(([event, cb]) => [
						'on' + event.toUpperCase().substr(0, 1) + event.toLowerCase().substr(1),
						cb,
					])
			)
		});
	},
}
</script>
