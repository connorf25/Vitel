import {setup} from '@storybook/vue3';
import AuthKinde from '#services/auth-kinde';
import Events from '#services/events';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$events', Events);
	app.service('$kinde', AuthKinde, {
		bypassEmail: 'fake-user@fake-domain.com',
		debug: true,
	});
});

import AuthKindeDemo from '#services/auth-kinde.demo';
export default {
	title: 'Services/AuthKinde',
	component: AuthKindeDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
