import {setup} from '@storybook/vue3';
import Placeholder from '#components/placeholder';
import Prompt from '#services/prompt';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.component('Placeholder', Placeholder); // eslint-disable-line vue/multi-word-component-names
	app.service('$prompt', Prompt);
});

import PromptDemo from '#services/prompt.demo';
export default {
	title: 'Services/Prompt',
	component: PromptDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
