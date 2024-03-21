import vMenu from './v-menu.vue';
import vMenuDemo from './v-menu.demo.vue';
import Toast from '#services/toast';
import Vitel from '#vitel';
import {setup} from '@storybook/vue3';

export default {
	title: 'Directives/v-menu',
	component: vMenuDemo,
	tags: ['autodocs'],
}

setup(app => {
	app.use(Vitel);
	app.directive('menu', vMenu);
	app.service('$toast', Toast);
});

export const Docs = {
	args: {},
}
