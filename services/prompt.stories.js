// Load service
import {setup} from "@storybook/vue3";
import Placeholder from '../components/placeholder.vue';
import Prompt from './prompt.vue';
import Service from './service.js';

setup(app => {
	app.component('Placeholder', Placeholder); // eslint-disable-line vue/multi-word-component-names
	Service(Prompt, {app})
})

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
