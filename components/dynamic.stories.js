import DateComponent from '#components/date';
import Dynamic from '#components/dynamic';

import {setup} from '@storybook/vue3';
setup(app => app.component('date', DateComponent)); // eslint-disable-line vue/multi-word-component-names, vue/component-definition-name-casing

export default {
	title: 'Components/Dynamic',
	component: Dynamic,
	tags: ['autodocs'],
}

export const Example = {
	args: {
		component: 'date',
		props: {
			value: Date.now() - 1000 * 60 * 60 * 24, //~ Yesterday
		},
	},
}
