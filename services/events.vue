<script>
import Mitt from 'mitt';
let emitter = new Mitt();

/**
* Vitel Events service
*
* This module is really just a wrapped version of Mitt which is a frontend version of Node's EventEmitter
* @see https://nodejs.org/api/events.html#class-eventemitter
*/
export default {
	name: '$events',
	methods: {
		all() {
			return emitter.all();
		},
		on(...args) {
			return emitter.on(...args);
		},
		off(...args) {
			return emitter.off(...args);
		},
		emit(...args) {
			return emitter.emit(...args);
		},
	},
}
</script>
