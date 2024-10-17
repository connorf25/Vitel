#!/usr/bin/node
/**
* Spew all Font-awesome icons (along with their main class like '.fab' '.far')
*/

console.log(
	JSON.stringify(
		Object.entries(
			await fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json')
				.then(res => res.json())
		)
			.map(([icon, meta]) =>
				`fa-${icon} `
				+ (
					meta.styles.some(s => s == 'brands') ? 'fab'
					: 'far'
				)
			)
			.sort()
	)
);
