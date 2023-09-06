import {setup} from '@storybook/vue3';
import AuthHanko from '#services/auth-hanko';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$hanko', AuthHanko, {
		bypassEmail: 'fake-user@fake-domain.com',
	});
});

import AuthHankoDemo from '#services/auth-hanko.demo';
export default {
	title: 'Services/AuthHanko',
	component: AuthHankoDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
