/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		// '@storybook/addon-styling',
	],
	docs: {
		autodocs: 'tag',
	},
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	stories: [
		'../components/**/*.stories.js',
		'../directives/**/*.stories.js',
		'../filters/**/*.stories.js',
		'../services/**/*.stories.js',
	],
	staticDirs: ['../public'],
};
export default config;
