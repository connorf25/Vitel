import {setup} from '@storybook/vue3';
import Events from '#services/events';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$events', Events);
});

// Load Debug UI
import EventsDemo from '#services/events.demo';
export default {
	title: 'Services/Events',
	component: EventsDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
