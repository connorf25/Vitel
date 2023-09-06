import Dump from '#components/dump';

export default {
	title: 'Components/Dump',
	component: Dump,
	tags: ['autodocs'],
}

export const Object = {
	args: {
		value: {foo: 1, bar: 2, baz: 3},
	},
}

export const Collection = {
	args: {
		value: [
			{title: 'Foo widget', value: 123},
			{title: 'Bar widget', value: 456},
			{title: 'Baz widget', value: 789},
		],
	},
}
