// Load service
import {setup} from "@storybook/vue3";
import ToastService from './toast.js';
setup(app => ToastService(app));

// Load Debug UI
import ToastDemo from './toast.demo.vue';
export default {
	title: 'Services/Toast',
	component: ToastDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Toast = {
}
