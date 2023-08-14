// Load service
import {setup} from "@storybook/vue3";
import PromptService from './prompt.js';
import Placeholder from '../components/placeholder.vue';
setup(app => {
	PromptService(app);
	app.component('Placeholder', Placeholder); // eslint-disable-line vue/multi-word-component-names
});

// Load Debug UI
import PromptDemo from './prompt.demo.vue';
export default {
	title: 'Services/Prompt',
	component: PromptDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Prompt = {
}
