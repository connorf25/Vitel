import StartCase from './startCase.demo.vue';
export default {
	title: 'Filters/StartCase',
	component: StartCase,
	tags: ['autodocs'],
}

export const BasicWord = {
	args: {
		value: 'hello',
	},
}

export const CamelCased = {
	args: {
		value: 'thisCamelCasedString',
	},
}
