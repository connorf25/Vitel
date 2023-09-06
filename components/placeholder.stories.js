import Placeholder from '#components/placeholder';

export default {
	title: 'Components/Placeholder',
	component: Placeholder,
	tags: ['autodocs'],
	argTypes: {
		// ... all other args are magically decoded from JSDoc //
		type: {
			control: 'select',
			options: ['box', 'construction'],
		},
	},
}

export const Example = {
}
