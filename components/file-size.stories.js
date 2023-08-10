import {vueDefaults} from '../.storybook/utils.js';
import FileSize from './file-size.vue';

export default {
	title: 'Components/File-Size',
	component: FileSize,
	tags: ['autodocs'],
	argTypes: {
		// ... all other args are magically decoded from JSDoc //
		decimalsMin: {
			control: {
				type: 'number',
				min: 0,
				max: 20,
			},
		},
		decimalsMax: {
			control: {
				type: 'number',
				min: 0,
				max: 20,
			},
		},
	},
}

export const SimpleNumbers = {
	args: {
		...vueDefaults(FileSize),
		value: 1234567890,
	},
}
