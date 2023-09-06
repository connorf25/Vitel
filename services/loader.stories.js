// Load service
import {setup} from '@storybook/vue3';
import Loader from '#services/loader';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$loader', Loader);
});

// Load Debug UI
import LoaderDemo from '#services/loader.demo';
export default {
	title: 'Services/Loader',
	component: LoaderDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
