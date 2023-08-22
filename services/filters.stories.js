// Load service
import {setup} from "@storybook/vue3";
import Filters from './filters.vue';
import FilterCurrency from '../filters/currency.js';
import FilterNumber from '../filters/number.js';
import FilterPluralize from '../filters/pluralize.js';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$filters', Filters);
	app.filter('currency', FilterCurrency);
	app.filter('number', FilterNumber);
	app.filter('pluralize', FilterPluralize);
});

// Load Debug UI
import FiltersDemo from './filters.demo.vue';
export default {
	title: 'Services/Filters',
	component: FiltersDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
