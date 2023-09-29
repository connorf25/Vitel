import {setup} from '@storybook/vue3';
import Digest from '#components/digest';
import Http from '#services/http';
import Vitel from '#vitel';

setup(app => {
	app.use(Vitel);
	app.service('$http', Http);
});

export default {
	title: 'Components/Digest',
	component: Digest,
	tags: ['autodocs'],
}

export const Example = {
	args: {
		url: '/api/users/count',
		field: 'count',

		// Styling:
		classValid: 'badge rounded-pill bg-primary',
		iconValid: 'fas fa-user',
		classInvalid: 'badge rounded-pill bg-danger',
		iconInvalid: 'fas fa-circle-xmark',
		textInvalid: 'Error fetching users',
	},
}
