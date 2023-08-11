/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
	stories: [
		'../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../directives/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../services/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-styling',
			options: {
				sass: {
					// Require your Sass preprocessor here
					implementation: require('sass'),
				},
			},
		},
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;
