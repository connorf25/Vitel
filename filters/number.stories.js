import NumberDemo from './number.demo.vue';
export default {
	title: 'Filters/Number',
	component: NumberDemo,
	tags: ['autodocs'],
}

export const BasicNumber = {
	args: {
		value: 123456789,
	},
}

export const BasicCurrency = {
	args: {
		value: 123456789,
		currency: true,
	},
}

export const CurrencyLocale = {
	args: {
		value: 123456789,
		locale: 'en-UK',
		currency: 'GBP',
	},
}
