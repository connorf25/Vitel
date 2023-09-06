// Load service
import {setup} from "@storybook/vue3";
import Http from './http.vue';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$http', Http);
});

// Load Debug UI
import HttpDemo from './http.demo.vue';
export default {
	title: 'Services/Http',
	component: HttpDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
