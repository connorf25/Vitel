<script>
import EventEmitter from 'eventemitter3';
let emitter = new EventEmitter();

/**
* Vitel Events service
*
* This module is really just a wrapped version of eventemitter3 which is a frontend version of Nodes EventEmitter
* @see https://nodejs.org/api/events.html#class-eventemitter
*/
export default {
	name: '$events',
	methods: Object.fromEntries( // Copy all EventEmitter methods to this component
		Object.entries(Object.getPrototypeOf(emitter))
			.filter(([, val]) => typeof val == 'function')
			.map(([key, val]) => [key, emitter[key].bind(emitter)])
	),
}
</script>
