import Loading from './loading.vue';

export default {
	title: 'Components/Loading',
	component: Loading,
	tags: ['autodocs'],
}

export const Default = {
}

export const CustomText = {
	args: {
		text: 'Waiting on something...',
		size: 'lg',
	},
}
