import {setup} from '@storybook/vue3';
import FileDrop from '#components/file-drop';
import Http from '#services/http';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$http', Http);
});

export default {
	title: 'Components/File-Drop',
	component: FileDrop,
	tags: ['autodocs'],
}

export const Example = {
	args: {
	},
}

export const GlobalHandling = {
	args: {
		global: true,
	},
}
