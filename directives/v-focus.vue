<script>
import {nextTick} from 'vue';

/**
* Simple directive to try and obtain focus when an element is mounted
*
* @param {Object} [options] Additional options to mutate behaviour
* @param {Boolean} [options.mount=true] Try to set the focus on mount, can also be disabled via the `.noMount` modifier
* @param {Boolean} [options.intersect=false] Also monitor via IntersectionObserver for when the component becomes intersect later, also settable via the `.intersect` modifier
* @param {Function} [options.intersectionRoot] Function to determine the intersection root element. Defaults to finding the closest modal-body, dialog or document body. Called as `(el:DOMEelemnt)`
* @param {Boolean} [options.modals=true] Listen for wrapping modal elements switching to show state and react to that also
* @param {Function} [options.modalParent] Function to find the wrapping modal parent if `options.modals` is truthy
* @param {Boolean} [options.aggressive=false] Shorthand property to `mount`, `intersect`, `visibility` options. Also settable via the `.aggressive` modifier
* @param {Function} [options.handler] Actual function to run when focusing. Called as `(el:DOMElement, cause: 'mount'|'intersection'|'visibility')`
* @param {Boolean} [options.visibility=false] Periodically checks the visibility of the element and tries to reclaim focus when transitioning from invisible to visible. Also settable via the `.visibility` modifier
* @param {Object} [options.visibilityOptions] Options to pass to `El.checkVisibility()` when `visibility` is enabled. Defaults to all options enabled.
* @param {Number} [options.visibilityInterval=250] Time in milliseconds to monitor the visibility of an element
*
* @example Simple focus on mount
* <input v-focus v-model="myValue"/>
*
* @example Aggressive focus whenever the element comes into view
* <input v-focus.aggressive v-model="myValue"/>
*/
export default {
	mounted(el, binding) {
		let settings = {
			mount: true,
			intersect: false,
			intersectionRoot: el => el.closest('.modal-body, dialog, body'),
			modals: true,
			modalParent: el => el.closest('.modal'),
			aggressive: false,
			visibility: false,
			visibilityOptions: {
				contentVisibilityAuto: true,
				opacityProperty: true,
				visibilityProperty: true,
			},
			visibilityInterval: 250,
			handler: (el, cause) => { // eslint-disable-line
				// console.log('SET FOCUS', el, 'BECAUSE', cause);
				el.focus();
			},
			...binding.value,
		};

		if (binding.modifiers.aggressive) settings.mount = settings.intersect = settings.visibility = true;
		if (binding.modifiers.intersect) settings.intersect = true;
		if (binding.modifiers.noMount) settings.mount = true;
		if (binding.modifiers.visibility) settings.visibility = true;

		if (settings.mount) nextTick(()=> settings.handler(el, 'mount'));

		if (settings.intersect) {
			let intersectionObserver = new IntersectionObserver(entries => {
				if (entries[0].intersectionRatio <= 0) return;
				settings.handler(el, 'intersection');
			}, {
				root: settings.intersectionRoot(el),
			});
			intersectionObserver.observe(el);
		}

		if (settings.visibility) {
			let lastVisible = false;
			let visibilityChecker = setInterval(()=> {
				let isVisible = el.checkVisibility(settings.visibilityOptions);
				if (!lastVisible && isVisible) { // Moving invisible -> visible
					settings.handler(el, 'visibility');
					lastVisible = true;
				} else if (lastVisible && !isVisible) { // Moving visible -> invisible
					lastVisible = false;
				}
			}, settings.visibilityInterval);
		}

		if (settings.modals) {
			let modalParent = settings.modalParent(el);
			if (modalParent) modalParent.addEventListener('shown.bs.modal', ()=>
				settings.handler(el, 'modal-shown')
			);
		}
	},
}
</script>
