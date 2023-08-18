// Load service
import {setup} from "@storybook/vue3";
import Events from './events.vue';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$events', Events);
});

// Load Debug UI
import EventsDemo from './events.demo.vue';
export default {
	title: 'Services/Events',
	component: EventsDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
