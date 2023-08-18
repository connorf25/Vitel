// Load service
import {setup} from "@storybook/vue3";
import Toast from './toast.vue';
import Vitel from '#vitel';

// Will auto load $service when we load $toast
setup(app => {
	app.use(Vitel);
	app.service('$toast', Toast);
});

// Load Debug UI
import ServiceDemo from './services.demo.vue';
export default {
	title: 'Services/Services',
	component: ServiceDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
