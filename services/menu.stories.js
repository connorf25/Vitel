// Load service
import {setup} from '@storybook/vue3';
import Menu from '#services/menu';
import Toast from '#services/toast';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$menu', Menu);
	app.service('$toast', Toast);
});

// Load Debug UI
import MenuDemo from '#services/menu.demo';
export default {
	title: 'Services/Menu',
	component: MenuDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
