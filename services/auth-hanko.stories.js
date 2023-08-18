// Load service
import {setup} from "@storybook/vue3";
import AuthHanko from './auth-hanko.vue';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$hanko', AuthHanko, {
		bypassEmail: 'fake-user@fake-domain.com',
	});
});

// Load Debug UI
import AuthHankoDemo from './auth-hanko.demo.vue';
export default {
	title: 'Services/AuthHanko',
	component: AuthHankoDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
