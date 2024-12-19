<script>
/**
* Display a simple image component for a user Gravatar
*/
export default {
	data() { return {
		/**
		* Eventual computed GravatarUrl, computed from the above via `refresh()`
		* @type {String}
		*/
		gravatarUrl: null,
	}},
	props: {
		/**
		* The email address of the user to look up
		* @type {String}
		*/
		email: {type: String, required: true},


		/**
		* Size of the avatar in pixels square
		* @type {Number}
		*/
		size: {type: [Number, String], default: 200},


		/**
		* The style of the Gravatar to use if the user doesn't have an override image defined
		* @type {'404'|'mp'|'identicon'|'monsterid'|'wavatar'|'retro'|'robohash'|'blank'}
		*/
		style: {
			type: String,
			default: 'wavatar',
			validate: v => v.includes(['404', 'mp', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', 'blank']),
		},


		/**
		* The Avatar rating suitability requested
		* @type {'g'|'pg'|'r'|'x'}
		*/
		rating: {type: String, default: 'pg', validate: v => v.includes(['g', 'pg', 'r', 'x'])},
	},
	methods: {
		/**
		* Async, browser native SHA256 hashing of a given input string
		* @param {String} input The simple input string to hash
		* @return {String} The SHA256 hash of the input string
		*/
		async sha256(input) {
			// Hash the message
			const hashBuffer = await crypto.subtle.digest(
				'SHA-256',
				new TextEncoder().encode(input)
			);

			// Convert buffer to hex string
			const hashArray = Array.from(new Uint8Array(hashBuffer));
			return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
		},


		/**
		* Refresh the URL to use
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async refresh() {
			this.gravatarUrl =
				'https://gravatar.com/avatar/'
				+ (await this.sha256(this.email))
				+ '?'
				+ [
					`d=${this.style}`,
					`r=${this.rating}`,
					`s=${this.size}`,
				].join('&');
		},
	},
	watch: {
		email: {
			handler: 'refresh',
			immediate: true,
		},
	},
}
</script>

<template>
	<img
		v-if="gravatarUrl"
		:src="gravatarUrl"
	/>
</template>
