<script>
/**
* A button which runs a promise and shows a spinner while waiting
*/
export default {
	data() { return {
		/**
		* Whether the button is active
		* @type {Boolean}
		*/
		isActive: false,
	}},
	props: {
		/**
		* Async callback function to run and wait for
		* This is necessary as Vue does not return the resulting function with an $emit
		* Called as `(e:ClickEvent)`
		* @type {Function}
		*/
		action: {type: Function, required: true},

		/**
		* The default icon to show when inactive
		*/
		idleIcon: {type: String, default: 'far fa-refresh m-0'},

		/**
		* Button class when inactive
		* @type {String}
		*/
		idleClass: {type: String, default: 'btn btn-light'},

		/**
		* Text to display when inactive
		* @type {String}
		*/
		idleText: {type: String, default: ''},

		/**
		* The default icon to show when active
		*/
		activeIcon: {type: String, default: 'far fa-spinner fa-spin'},

		/**
		* Button class when active
		* @type {String}
		*/
		activeClass: {type: String, default: 'btn btn-success disabled'},

		/**
		* Text to display when active
		* @type {String}
		*/
		activeText: {type: String, default: ''},

		/**
		* Optional toast text to display on completion
		* @type {String}
		*/
		toast: {type: String, default: ''},

		/**
		* The toast type to display
		* @type {String}
		*/
		toastType: {type: String, default: 'success'},
	},
	methods: {
		/**
		* Trigger the button payload and mark the button as active
		*
		* @param {Event} e The click event to process
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		click(e) {
			return Promise.resolve()
				.then(()=> this.isActive = true)
				.then(()=> this.action(e))
				.then(()=> this.toast && this.$toast[this.toastType](this.toast))
				.finally(()=> this.isActive = false)
		},
	},
}
</script>

<template>
	<a
		:class="isActive ? activeClass : idleClass"
		@click="click"
	>
		<i :class="isActive ? activeIcon : idleIcon"/>
		{{isActive ? activeText : idleText || activeText}}
	</a>
</template>
