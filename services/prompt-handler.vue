<script>
import Dynamic from '../components/dynamic.vue';

/* eslint-disable vue/no-v-html, vue/attributes-order */

/**
* Prompt handler for the $prompt service
* This component should be installed somewhere close the root of the DOM tree so it gets z-index presidence
*/
export default {
	components: {
		Dynamic,
	},
	methods: {
		/**
		* Push a dialog onto the model stack
		* This has to be done at the moment level as there is a very strict order on when DOM elements + JS objects need creating that only Vue can manage
		* @param {Object} dialog The dialog settings object from `$prompt.dialog()`
		* @returns {Promise} A promise which resolves when the dialog is visible
		*/
		async push(dialog) {
			if (!dialog.id) dialog.id = `prompt-${Date.now()}`;
			console.info('$prompt.push', dialog);

			this.$prompt.stack.push(dialog);
			await this.$nextTick();

			dialog.modelEl = document.body.querySelector(`#prompt-handler #${dialog.id}`);
			// Bind closing the model to the $prompt.close handler - ideally any successful promises will be resolved BEFORE this happens
			dialog.modelEl.addEventListener('hidden.bs.modal', ()=> this.$prompt.close(dialog.dialogClose == 'resolve', 'CLOSE'));

			dialog.modelBS = new window.bootstrap.Modal(dialog.modelEl, {
				backdrop: dialog.backdrop,
				keyboard: dialog.keyboard,
				focus: true,
			});

			// Trigger show + wait for DOM to update then return resolved promise
			return new Promise(resolve => {
				dialog.modelEl.addEventListener('shown.bs.modal', ()=> resolve());
				dialog.modelBS.show();
			});
		},


		/**
		* Pop the most recent dialog from the model stack
		* @param {Boolean} [success=true] Whether the modal was closed successfully
		* @param {*} [payload] Optional payload for the resolving promise
		* @returns {Promise} A promise which resolves when the dialog has been destroyed
		*/
		pop(success = true, payload) {
			let dialog = this.$prompt.stack.pop();

			// Close UI element in background
			dialog.modelBS.hide();

			if (success) {
				return dialog.promiseResolve(payload);
			} else {
				return dialog.promiseReject(payload);
			}
		},
	},
	created() {
		if (!this.$prompt) throw new Error('$prompt service not found - check the service has been installed correctly');
		if (!window.bootstrap) throw new Error('Bootstrap module not found - check tha the Bootstrap JavaScript helper is installed correctly');

		// Create top level div#prompt-handler
		let promptEl = document.createElement('div');
		promptEl.id = 'prompt-handler';
		document.body.appendChild(promptEl);

		// Allocate main handler functionality
		this.$prompt.handler = this;
	},
}
</script>

<template>
	<div>
		<teleport to="#prompt-handler">
			<div
				v-for="prompt in $prompt.stack"
				:key="prompt.id"
				class="modal fade"
				:id="prompt.id"
				tabindex="-1"
				:aria-labelledby="`${prompt.id}-header`"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div :id="`${prompt.id}-header`" class="modal-header">
							{{prompt.title}}
							<button
								@click="$prompt.close(prompt.dialogClose == 'resolve', 'CLOSE')"
								type="button"
								class="btn-close"
								aria-label="Close"
							/>
						</div>
						<div class="modal-body">
							<div v-if="prompt.isHtml" v-html="prompt.body"/>
							<div v-else v-text="prompt.body"/>

							<dynamic
								v-if="prompt.component"
								:component="prompt.component"
								:props="prompt.componentProps"
								:events="prompt.componentEvents"
							/>
						</div>
						<div class="modal-footer">
							FIXME: Footer
						</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>
