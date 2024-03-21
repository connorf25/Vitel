import {faker} from '@faker-js/faker';
import {rest} from 'msw';
import {initialize, mswLoader} from 'msw-storybook-addon';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

// Initialize MSW
initialize({
	onUnhandledRequest({method, url}) { // Silently drop unknown requests
		if (!url.pathname.startsWith("/api")) { // ... unless its prefixed wiith /api/
			throw new Error(`Unhandled ${method} request to ${url}`);
		}
	},
	serviceWorker: {
		...(location.hostname === 'momsfriendlydevco.github.io' && {
			// Override endpoint URL with GitHub pages
			url: 'https://momsfriendlydevco.github.io/Vitel/mockServiceWorker.js',
		}),
	},
});

const preview = {
	loaders: [mswLoader],
	parameters: {
		actions: {
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		msw: {
			handlers: [
				rest.get('/api/users/count', (req, res, ctx) => res(
					ctx.json({
						count: 60,
					})
				)),
				rest.get('/api/users', (req, res, ctx) => res(
					ctx.json(
						faker.helpers.multiple(()=> ({
							name: faker.person.fullName(),
							jobTitle: faker.person.jobTitle(),
							dob: faker.date.birthdate(),
						}), {count: 60}),
					)
				)),
				rest.get('/api/test/200', (req, res, ctx) => res(
					ctx.status(200, 'OK 200 response')
				)),
				rest.get('/api/test/400', (req, res, ctx) => res(
					ctx.status(400, 'Fake 400 response')
				)),
				rest.get('/api/test/delayed', (req, res, ctx) => setTimeout(()=> {
					res(ctx.status(200, 'OK 200 response'))
				}, 5 * 5000)),
			],
		},
	},
};
export default preview;
