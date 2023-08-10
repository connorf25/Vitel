/**
* Extract all defaults from a given component spec as an object
* This is useful if setting up a story and you want to populate all component defaults without having to spell them out
*
* FIXME: Would be nice if there was a way to make Storybook use the Vue $prop defaults rather than needing to eval them here
*
* @param {VueComponent} Object providing a Vue component spec
* @returns {Object} A simple key=val lookup for a Vue component using its defaults
*
* @example Simple story setup using VueComponent defaults
* export const DateValue = {
*   args: {
*     ...vueDefaults(component),
*     value: 'My overriding value',
*   },
* }
*/
export function vueDefaults(component) {
	return Object.fromEntries(
		Object.entries(component.props)
			.map(([prop, spec]) =>
				spec?.default && typeof spec.default == 'function' ? [prop, spec.default()] // Has default function
				: spec.default ? [prop, spec.default] // Default is a scalar
				: false // Assume no default given

			)
			.filter(Boolean)
	);
}

export default {
	vueDefaults,
}
