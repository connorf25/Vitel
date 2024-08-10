<script>
/**
* Overload `v-href` to act like `<router-link/>` for regular elements and also help with table rows
*
* @param {String|Object} location The URL to navigate to or the number of steps forward / backward to navigate
* @see go() for other parameters
* @param {String} [settings.location] Alternative method to set the location
* @param {Boolean} [settings.stop=true] Fire event.stopPropagation() on click
* @param {Boolean} [settings.prevent=true] Fire event.preventDefault() on click, disabling this will likely cause the link to be clicked twice
* @param {Boolean} [settings.allowTab=true] Allow middle clicking to open a new tab by adding a `href` attribute to `<a/>` tags
* @param {String} [settings.method='push'] The router method to use
* @param {String} [settings.class='v-href'] Class to append to handled objects
* @param {Function} [settings.before] Function to run before navigating. Called as `(e:Event)`
* @param {Function} [settings.handle] Function to actually handle the naivgation, if specified this disables the default router navigation. Called as `(e:Event, settings:Object)`
* @param {Function} [settings.after] Function to run after navigating. Called as `(e:Event)`
* @param {Object} [settings.router] The router instance to send the request via, defaults to `binding.instance.$router`
*
* @param {Boolean} [modifier.window] Sets `{target: '_blank'}` - i.e. open in a new tab / window
* @param {Boolean} [modifier.nostop] Sets `{stop: false}` - i.e. prevent `e.stopPropagation()` by default
* @param {Boolean} [modifier.replace] Sets `{method: 'replace'}` to replace the current history item rather than appending to it
*
*
* @example Make <a/> tags act like `<router-link/>`
* <a v-href="'/link/to/somewhere'">Text</a>
*
* @example Simple table links
* <table>
*   <tr v-for="widget in widgets" v-href="`/widgets/${widget._id}`">
*     <td>{{widget.title}}</td> <!-- This element gets an <a/> wrapper -->
*     <td><a href="/somewhere">Something</td> <!-- This element doesn't -->
*   </tr>
* </table>
*/
export default {
	created(el, binding) {
		bindVHref(el, binding);
	},
	updated(el, binding) {
		if (!el) return; // Skip updates to things that arn't mounted yet
		bindVHref(el, binding);
	},
}

/**
* Actual worker for the v-href directive
* @param {DOMElement} el DOM element to bind against
* @param {Object} binding Vue binding object to process
*/
let bindVHref = function vHrefBind(el, binding) {
	let settings = {
		stop: true,
		prevent: true,
		method: 'push',
		class: 'v-href',
		router: binding.instance.$router,
		before: ()=> {},
		after: ()=> {},
		...(typeof binding.value == 'string' ? {path: binding.value} : binding.value),
	};

	// Process modifiers into settings
	if (binding.modifiers.window) settings.target = '_blank';
	if (binding.modifiers.nostop) settings.stop = false;
	if (binding.modifiers.replace) settings.method = 'replace';

	if (!settings.path) return; // Nothing to bind to - URL will presumably be provided in update cycle

	settings.destination = typeof settings.path == 'string' // Determine what to pass to router
		? {path: settings.path}
		: settings.path;

	if (el.classList.contains(settings.class)) { // Already bound? Assume link update lifecycle
		el.removeEventListener('click', clickListener);
	} else { // Bind for first time
		el.classList.add(settings.class);
	}

	el.addEventListener('click', clickListener.bind(settings));
	if (typeof settings.destination.path == 'string' && el.tagName == 'A') { // Add href to link also to handle middle clicking
		el.href = settings.destination.path;
	}
};


/**
* Click handler for v-href bound items
* @context The settings object passed to v-href
* @param {Event} e The click event to respond to
* @returns {Promise} A promise which resolves when the operation has completed
*/
let clickListener = function vHrefClick(e) {
	if (this.stop) e.stopPropagation();
	if (this.prevent) e.preventDefault();
	return Promise.resolve()
		.then(()=> this.before(e))
		.then(()=> this.handle
			? this.handle(e, this)
			: this.router[this.method](this.destination)
		)
		.then(()=> this.after(e))
}
</script>
