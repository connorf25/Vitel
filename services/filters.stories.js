import {setup} from '@storybook/vue3';
import Filters from '#services/filters';
import FilterCurrency from '#filters/currency';
import FilterNumber from '#filters/number';
import FilterPluralize from '#filters/pluralize';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$filters', Filters);
	app.filter('currency', FilterCurrency);
	app.filter('number', FilterNumber);
	app.filter('pluralize', FilterPluralize);
});

import FiltersDemo from '#services/filters.demo';
export default {
	title: 'Services/Filters',
	component: FiltersDemo,
	tags: ['autodocs'],
	argTypes: {},
}

export const Example = {
}
