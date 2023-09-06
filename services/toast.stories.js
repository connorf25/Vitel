import {setup} from '@storybook/vue3';
import Toast from '#services/toast';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$toast', Toast);
});

import ToastDemo from '#services/toast.demo';
export default {
	title: 'Services/Toast',
	component: ToastDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
