import ListDemo from './list.demo.vue';
export default {
	title: 'Filters/List',
	component: ListDemo,
	tags: ['autodocs'],
}

export const BasicList = {
	args: {
		value: ['Foo', 'Bar', 'Baz'],
	},
}

export const ConjoinOr = {
	args: {
		value: ['Foo', 'Bar', 'Baz'],
		conjoin: 'or',
	},
}

export const CollectionPick = {
	args: {
		value: [
			{name: 'Joe', age: 22},
			{name: 'Jane', age: 35},
			{name: 'Janet', age: 41},
		],
		pick: 'name',
	},
}
