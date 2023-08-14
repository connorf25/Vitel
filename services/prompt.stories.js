// Load service
import {setup} from "@storybook/vue3";
import PromptService from './prompt.js';
setup(app => PromptService(app));

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
