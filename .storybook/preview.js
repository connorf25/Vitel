import {faker} from '@faker-js/faker';
import {rest} from 'msw';
import {initialize, mswLoader} from 'msw-storybook-addon';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

// Initialize MSW
initialize();

const preview = {
	loaders: [mswLoader],
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		msw: {
			handlers: [
				rest.get('/api/test/200', (req, res, ctx) => res(
					ctx.status(200, 'OK 200 response')
				)),
				rest.get('/api/test/400', (req, res, ctx) => res(
					ctx.status(400, 'Fake 400 response')
				)),
			],
		},
	},
};
export default preview;
