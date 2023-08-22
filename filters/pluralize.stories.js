// Load Demo UI
import PluralizeDemo from './pluralize.demo.vue';
export default {
	title: 'Filters/Pluralize',
	component: PluralizeDemo,
	tags: ['autodocs'],
}

export const BasicNumberOutput = {
	args: {
		value: 123456789,
	},
}

export const TemplateSuffixes = {
	args: {
		value: 1,
		suffix: '[person|people]',
	},
}

export const ObjectSuffixes = {
	args: {
		value: 3,
		prefix: 'There are',
		suffix: {
			singular: 'dog',
			plural: 'dogs',
		},
	},
}

export const NoValueOverrides = {
	args: {
		value: 0,
		prefix: 'There are',
		suffix: 'sad people',
		valueIfZero: 'No-one is sad',
	},
}
