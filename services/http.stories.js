import {setup} from '@storybook/vue3';
import Http from '#services/http';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$http', Http, {
		debug: true, // Show output in console
	});
});

import HttpDemo from '#services/http.demo';
export default {
	title: 'Services/Http',
	component: HttpDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
