import vAutocompleteDemo from './v-autocomplete.demo.vue';
import Http from '#services/http';
import RegExpEscape from '#utils/regexpEscape';
import Vitel from '#vitel';
import {setup} from '@storybook/vue3';

let metasyntactic = ['Foo', 'Bar', 'Baz', 'Qux', 'Quux', 'Flarp', 'Corge', 'Grault', 'Garply', 'Waldo', 'Fred', 'Plugh', 'Xyzzy', 'Thud'];

export default {
	title: 'Directives/v-autocomplete',
	component: vAutocompleteDemo,
	tags: ['autodocs'],
}

setup(app => {
	app.use(Vitel);
	app.service('$http', Http, {
		debug: true, // Show output in console
	});
});

export const SimpleArray = {
	args: {
		settings: {
			options: metasyntactic,
		},
	},
}

export const SimpleArrayWithFiltering = {
	args: {
		settings: {
			options: metasyntactic,
			filter: true,
		},
	},
}

export const SimpleArrayWithFilteringAndSort = {
	args: {
		settings: {
			options: metasyntactic,
			filter: true,
			sort: true,
		},
	},
}

export const AsyncCallback = {
	args: {
		settings: {
			options(query) {
				let queryRE = new RegExp( // Make a RegExp for each word. e.g. 'Hello World' => /(hello|world)/i
					'('
					+ query.split(/\s+/)
						.map(word => RegExpEscape(word))
						.join('|')
					+ ')'
				, 'i')

				return metasyntactic
					.filter(term => queryRE.test(term))
			},
		},
	},
}

export const AxiosRequest = {
	args: {
		settings: {
			options(query) {
				return {
					method: 'GET',
					url: 'https://api.github.com/search/users',
					params: {
						q: query,
					},
				};
			},
		},
	},
}
