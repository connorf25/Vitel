// Load service
import {setup} from "@storybook/vue3";
import Toast from './toast.vue';
import Service from './service.js';

// Will auto load $service
setup(app => Service(Toast, {app}))

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
