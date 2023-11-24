import vAutocompleteDemo from './v-autocomplete.demo.vue';
import Http from '#services/http';
import RegExpEscape from '#utils/regexpEscape';
import Vitel from '#vitel';
import {setup} from '@storybook/vue3';

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
			options: ['Foo', 'Bar', 'Baz', 'Qux', 'Quux', 'Flarp', 'Corge', 'Grault', 'Garply', 'Waldo', 'Fred', 'Plugh', 'Xyzzy', 'Thud'],
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

				console.log('FILTER RE', queryRE);

				return ['Foo', 'Bar', 'Baz', 'Qux', 'Quux', 'Flarp', 'Corge', 'Grault', 'Garply', 'Waldo', 'Fred', 'Plugh', 'Xyzzy', 'Thud']
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
