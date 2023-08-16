// Load service
import {setup} from "@storybook/vue3";
import Toast from './toast.vue';
import Service from './service.js';

setup(app => Service(Toast, {app}))

// Load Debug UI
import ToastDemo from './toast.demo.vue';
export default {
	title: 'Services/Toast',
	component: ToastDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
