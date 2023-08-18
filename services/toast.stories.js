// Load service
import {setup} from "@storybook/vue3";
import Toast from './toast.vue';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$toast', Toast);
});

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
