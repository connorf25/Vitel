import Http from '#services/http';
import VHref from '#directives/v-href';
import VTable from '#components/v-table';
import Vitel from '#vitel';
import {setup} from '@storybook/vue3';

setup(app => {
	app.use(Vitel);
	app.directive('v-href', VHref);
	app.service('$http', Http);
});

export default {
	title: 'Components/V-Table',
	component: VTable,
	tags: ['autodocs'],
	argTypes: {
		// ... all other args are magically decoded from JSDoc //
		layout: {
			control: 'select',
			options: ['card', 'none'],
		},
	},
}

export const Example = {
	args: {
		url: '/api/fake/users',
		mutateRequest(req) { // MSP gets upset if we include any params for some reason
			delete req.params;
			return req;
		},
		columns: [
			{
				id: 'name',
				title: 'Name',
			},
			{
				id: 'jobTitle',
				title: 'Job',
			},
			{
				id: 'dob',
				title: 'DoB',
			},
		],
		layout: 'card',
	},
}
