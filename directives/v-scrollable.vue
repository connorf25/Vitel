<script>
/**
* Create a simple, JavaScript + CSS powered scrollbar with auto-hide
*
* @see https://www.cssscript.com/performant-custom-scrollbar-javascript-library-simplebar/
*
* @param {Object} [options] Options to configure behaviour
* @param {Boolean} [options.autoHide=true] Whether to automatically hide the scrollbar when not needed
* @param {Boolean} [options.forceVisible=false] Whether to always force the visibility of the scroll track
* @param {*} [options.*] Additional options to pass to SimpleBar
*/

import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.min.css';

export default {
	mounted(el, binding) {
		let settings = {
			autoHide: true,
			forceVisible: false,
			...binding.value,
		};

		if (el.simplebar) {
			debugger; // Attempting to remount existing instance
		} else {
			el.simplebar = new SimpleBar(el, settings);
		}
	},
}
</script>
