// Load service
import {setup} from "@storybook/vue3";
import Placeholder from '../components/placeholder.vue';
import Prompt from './prompt.vue';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.component('Placeholder', Placeholder); // eslint-disable-line vue/multi-word-component-names
	app.service('$prompt', Prompt);
});

// Load Debug UI
import PromptDemo from './prompt.demo.vue';
export default {
	title: 'Services/Prompt',
	component: PromptDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
