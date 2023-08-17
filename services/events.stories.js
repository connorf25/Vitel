// Load service
import {setup} from "@storybook/vue3";
import Events from './events.vue';
import Service from './service.js';

setup(app => Service(Events, {app}))

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
