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
			if (!dialog) return; // Overpoped the stack - probably because two things called close() at the same time

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

		if (import.meta.env.DEV) { // Sanity checks if in dev mode
			if (!window.bootstrap) console.warn('Bootstrap module not found for use by $prompt - check tha the Bootstrap JavaScript helper is installed correctly');
			if (!window.bootstrap?.Modal) console.warn('Bootstrap Modal functionality not found for use by $prompt - check tha the Bootstrap JavaScript Modal sub-module is installed correctly');
		}

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
				<div class="modal-dialog" :class="prompt.modalDialogClass">
					<div class="modal-content" :class="prompt.modalClass">
						<div v-if="prompt.title" :id="`${prompt.id}-header`" class="modal-header">
							{{prompt.title}}
							<a
								@click="$prompt.close(prompt.dialogClose == 'resolve')"
								class="btn btn-link btn-close"
								aria-label="Close"
							>
								<i class="fas fa-lg fa-times"/>
							</a>
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
						<div v-if="prompt.buttons && prompt.buttons.length > 0" class="modal-footer d-flex d-justify-end">
							<a
								v-for="button in prompt.buttons"
								:key="button"
								@click="
									button.click == 'resolve' ? $prompt.close(true)
									: button.click == 'reject' ? $prompt.close(false)
									: button.click()
								"
								:class="button.class || 'btn btn-light'"
							>
								<i v-if="button.icon" :class="button.icon"/>
								{{button.title}}
							</a>
						</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>

<style>
#prompt-handler {
	& .btn.btn-close {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 50px;
		aspect-ratio: 1/1;

		padding: 0;
		border-radius: 50%;
		border: 1px solid transparent;
		cursor: pointer;

		color: var(--bs-text);
		text-decoration: none;

		& > i {
			margin: 0px;
		}

		&:hover {
			background: var(--bs-primary);
			color: var(--bs-white);
		}
	}

	& .modal-footer .btn + .btn {
		margin-left: 5px;
	}

	/* Modal sizes {{{ */
	& .modal-dialog {
		&.modal-dialog-md {
			--bs-modal-width: 750px;
		}

		&.modal-dialog-lg {
			--bs-modal-width: calc(100% - 100px);
		}
	}
	/* }}} */
}
</style>
