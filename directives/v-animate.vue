<script>
/**
* Apply a CSS class when an element becomes visible
*
* @param {Object|String} [options] Additional options to mutate behaviour, if a string is given its assumed to populate `options.classShow`
* @param {String|Array<String>} [options.classShow] CSS class(es) to apply when the element becomes visible, specify multiple classes as string arrays or space delimited strings
* @param {String|Array<String>} [options.classHide] CSS class(es) to apply when the element is no longer visible
* @param {Boolean} [options.classSwap=true] If true, remove the counter classes (i.e. remove `classShow` when the element becomes hidden)
* @param {Boolean} [options.classReset=true] If true, remove all classes when attached animations complete
* @param {Function} [options.onVisble] Async function to run when the element becomes visible
* @param {Boolean} [options.once=true] Only play the animation sequence once then detach observers
* @param {Number} [options.settleTime=1000] Time before we consider the UI "settled", once will detach after this period
* @param {Function} [options.onHide] Async function to run when the element becomes hidden
* @param {Number} [optionss.minRatio=0.01] Minimum ratio of the element to count as it becoming visible
* @param {Boolean} [options.debug=false] Enable for debugging messages
*/
export default {
	mounted(el, binding) {
		let settings = {
			classShow: null,
			classHide: null,
			classSwap: true,
			classReset: false,
			minRatio: 0.01,
			once: true,
			settleTime: 1000,
			onShow: ()=> {},
			onHide: ()=> {},
			debug: true,
			...(
				typeof binding.value == 'string' ? {classShow: binding.value} // Passed a post-processed string
				: binding.value
			),
		};
		// Settings mangling {{{
		// Split class{In,Out} into arrays
		['classShow', 'classHide'].forEach(k =>
			Array.isArray(settings[k]) ? settings[k] // Already an array
			: typeof settings[k] == 'string' ? settings[k] = settings[k].split(/\s+/) // Split strings into arrays
			: null
		);
		// }}}

		let isActive = false;
		let isSettled = false;
		let settleTimer; // Timer handle to check if things have settled

		let intersectionObserver = new IntersectionObserver(async ([entry]) => {
			if (!isSettled) {
				clearTimeout(settleTimer);
				settleTimer = setTimeout(()=> isSettled = true, settings.settleTime);
				return;
			}

			if (!isActive && entry.isIntersecting && entry.intersectionRatio >= settings.minRatio) { // Note we are only checking ABOVE zero
				if (settings.debug) console.log('v-animate - SHOW', el, {ratio: entry.intersectionRatio, entry});
				await settings.onShow();
				if (settings.classSwap && settings.classHide) el.classList.remove(...settings.classHide);
				if (settings.classShow) el.classList.add(...settings.classShow);
				isActive = true;
				if (settings.once) {
					if (settings.debug) console.log('v-animate - DISCONNECT', el);
					intersectionObserver.disconnect();
				}
			} else if (isActive && (!entry.isIntersecting || entry.intersectionRatio < settings.minRatio)) {
				if (settings.debug) console.log('v-animate - HIDE', el);
				await settings.onHide();
				if (settings.classSwap && settings.classShow) el.classList.remove(...settings.classShow);
				if (settings.classHide) el.classList.add(...settings.classHide);
				isActive = false;
			} else {
				if (settings.debug) console.log('v-animate - OBSERVE', el, {isActive, ratio: entry.intersectionRatio, entry});
			}

			if (settings.classReset)
				el.addEventListener('animationend', ()=> {
					if (settings.debug) console.log('v-animate - END', el);
					el.classList.remove(
						...settings.classShow ? settings.classShow : [],
						...settings.classHide ? settings.classHide : [],
					);
				}, {once: true, passive: true});
		});
		intersectionObserver.observe(el);
	},
}
</script>
