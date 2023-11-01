<script>
import {cloneDeepWith, debounce, isEqual, isPlainObject} from 'lodash-es';
import {createClient as Supabase} from '@supabase/supabase-js'
import {reactive, watch} from 'vue';
import {BlobWriter as ZipBlobWriter, BlobReader as ZipBlobReader, ZipWriter} from '@zip.js/zip.js';

/**
* $state service
* Available on all Vue models as `vm.$state`
*
* This module uses a Unix style addressing style for data entities:
*
* /:entity/:id/:operand...
*
* e.g. /projects/12345/My Directory/My File.png
*
* So fetching a data record would be `vm.this.get('/projects/1234')` or `vm.this.subscribe('/projects/1234')`
*
*/
export default {
	name: '$state',
	data() { return {
		/**
		* Supabase client used to pull / push / subscribe to state
		*
		* @type {SupabaseClient}
		*/
		supabase: null,


		/**
		* Steps used to resolve file-type information
		* This is an array of different sync funciton operations to try, the first function to provide an object is used as the response
		* Each function is called as `(file:StateFile)`
		*
		* @type <Array<Function>>
		*/
		fileTypes: [
			// Step - Simple `ext` matching
			function(file) {
				return this.fileTypesLookup[file.parsedName.ext];
			},

			// Step - return one-size-fits-all information (always succeeds)
			function() {
				return {type: 'Unknown file type', icon: 'fas fa-file-lines'};
			},
		],


		/**
		* Basic file-type icon map
		* Used by the intermediate step of `this.fileTypesMatch`
		* This is the ext -> FontAwesome mapping for anything that isn't matched via `this.fileIcon(fie)`
		* If the key is a function it is called as the sync function `(rawFile)` and expected to return an object or nullish - in which case its rejected
		*
		* @type {Object} lower case extension -> FA icon mapping
		*/
		fileTypesLookup: {
			'7z': {type: '7zip compressed archive', icon: 'far fa-file-archive'},
			'avi': {type: 'Movie file', icon: 'far fa-file-video'},
			'doc': {type: 'Microsoft Word Document', icon: 'far fa-file-word'},
			'docx': {type: 'Microsoft Word Document', icon: 'far fa-file-word'},
			'gif': {type: 'GIF image file', icon: 'far fa-file-image'},
			'html': {type: 'Web-page', icon: 'far fa-file-code'},
			'jpeg': {type: 'JPEG image file', icon: 'far fa-file-image'},
			'jpg': {type: 'JPEG image file', icon: 'far fa-file-image'},
			'json': {type: 'JSON data', icon: 'far fa-file-code'},
			'odg': {type: 'LibreOffice drawing', icon: 'far fa-file-image'},
			'odp': {type: 'LibreOffice presentation', icon: 'far fa-file-powerpoint'},
			'ods': {type: 'LibreOffice spreadsheet', icon: 'far fa-file-excel'},
			'odt': {type: 'LibreOffice document', icon: 'far fa-file-word'},
			'pdf': {type: 'PDF file', icon: 'far fa-file-pdf'},
			'png': {type: 'PNG image file', icon: 'far fa-file-image'},
			'ppt': {type: 'Microsoft PowerPoint file', icon: 'far fa-file-powerpoint'},
			'pptx': {type: 'Microsoft PowerPoint file', icon: 'far fa-file-powerpoint'},
			'rar': {type: 'RAR compressed archive', icon: 'far fa-file-archive'},
			'svg': {type: 'Scalable Vector Graphics image file', icon: 'far fa-file-image'},
			'txt': {type: 'Plain text file', icon: 'far fa-file-alt'},
			'xls': {type: 'Microsoft Excel file', icon: 'far fa-file-excel'},
			'xlsx': {type: 'Microsoft Excel file', icon: 'far fa-file-excel'},
			'zip': {type: 'Zip compressed archive', icon: 'far fa-file-archive'},
		},


		/**
		* File transcode handlers, called in sequence whenever a file upload occurs
		* These are funtions, executed in series with the first non-undefined response expected to mutate the file upload
		* @type {Array<Function>} Function called as `(File)`
		*/
		fileTranscoders: [],
	}},
	props: {
		/**
		* Options for this Deepstream wrapper
		*
		* @type {Object}
		* @property {Number} throttle Throttle all writes by this time in milliseconds, set to falsy to disable
		*/
		throttle: {type: Number, default: 200},


		/**
		* Supabase URL used for connections
		* @type {String}
		*/
		supabaseUrl: {type: String, required: true},


		/**
		* Supabase API key used for connections
		* @type {String}
		*/
		supabaseKey: {type: String, required: true},
	},
	methods: {
		// Pathing utilities - splitPath() {{{
		/**
		* Split a simple path into Supabase compatible entity + filters
		*
		* @param {String|Array<String>|Object} Path to seperate in slash notation or array form
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.requireEntity=true] Throw if a entity is not deteceted in the decoded output
		* @param {Boolean} [options.requireId=false] Throw if an ID is not detected in the decoded output
		* @param {Boolean} [options.requireOperand=false] Throw if an operand is not detected in the decoded output
		*
		* @returns {Object} An object composed of `{entity: String, id: String, filter: Object}`
		* @property {String} [entity] The entity the path is referring to
		* @property {String} [id] The Unique ID the path is referring to
		* @property {String} [operand] Any remaining pathing
		*
		* @example Split a given path into parts
		* this.splitPath('/projects/1234/My dir/My file.png') -> // {entity: 'projects', id: '1234', operand: 'My dir/My file.png'}
		*/
		splitPath(path, options) {
			let settings = {
				requireEntity: true,
				requireId: false,
				requireOperand: false,
				...options,
			};

			let [entity, id, operand] =
				Array.isArray(path) ? path // Split array from form: `[$entity, $ID, $operand]`
				: typeof path == 'object' ? [path.entity, path.id, path.operand]
				: typeof path == 'string' ? path // Split string from form: `/$entity/$ID`
					.replace(/^\//, '') // Remove root slash
					.split('/', 3)
				: (()=> { throw new Error('Unknown input type to splitPath') })();

			if (settings.requireEntity && !entity) throw new Error(`Could not extract entity from path "${path}"`);
			if (settings.requireId && (!id || id == 'undefined')) throw new Error(`Could not extract ID from path "${path}"`);
			if (settings.requireOperand && (!id || id == 'undefined')) throw new Error(`Could not extract operand from path "${path}"`);

			return {entity, id, operand};
		},
		// }}}

		// Record / Row handling - get(), set(), create() {{{
		/**
		* Fetch a current snapshot of a Supabase path
		* This fetches a record state *as it is now*, use `this.subscribe()` to also update local state on changes
		*
		* @param {String|Array<String>} path The path to retrieve
		* @param {*} [fallback] Optional fallback if the path does not exist
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.id=true] Include ID of the entity
		* @returns {Promise<Object>} A promise which will resolve with the current snapshot value
		*/
		get(path, fallback, options) {
			let settings = {
				id: true,
				...options,
			};

			let {entity, id} = this.splitPath(path, {requireEntity: true, requireId: true});

			return this.supabase
				.from(entity)
				.select('id, data')
				.limit(1)
				.single()
				.eq('id', id)
				.then(payload => payload.data || fallback || Promise.reject(payload.error.message))
				.then(row => row
					? {
						...(settings.id && {
							id: row.id,
						}),
						...row.data,
					}
					: fallback
				)
		},


		/**
		* Set a snapshot of a Supabase path
		* NOTE: This is actually a merge operation not a pure 'overwrite everything' step, use `replace()` if optimizing
		*
		* @param {String|Array<String>} path The path to set
		* @param {Object} data Data to merge in with the current value
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		set(path, data) {
			let {entity, id} = this.splitPath(path, {requireEntity: true, requireId: true});
			this.debug('SET', path, '=', data);

			return this.get({entity, id}, {})
				.then(existingData => this.supabase
					.from(entity)
					.update({
						data: {
							...existingData,
							...tidyValue(data),
						},
					})
					.eq('id', id)
					.select('id')
				)
				.then(payload => payload.error?.message && Promise.reject(payload.error.message))
		},


		/**
		* Tidy JSON field data so that is safe from private methods (anything starting with '$' or '_', proxies or other non POJO slush
		* @param {Object|Array} input Input object to tidy
		* @returns {Object|Array} POJO, scalar output
		*/
		tidyValue(input) {
			return cloneDeepWith(input, (v, k) => // Clone so we break up all the proxy slush and store primatives only
				!/^[$\_]/.test(k) // Key doesn't start with '$' or '_'
				&& (
					['string', 'number', 'boolean'].includes(typeof v) // Basic scalar types
					|| Array.isArray(v)
					|| isPlainObject(v)
				)
					? undefined // Use default cloning behaviour
					: null // Strip from output
			);
		},


		/**
		* Replace a snapshot of a Supabase path
		* This is a super-optimized upsert with no fetch for original data, use `bindData()` or `create()` + `set()` for more friendly functions
		*
		* @param {String|Array<String>} path The path to set
		* @param {Object} data Data to replace current value with
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		replace(path, data) {
			let {entity, id} = this.splitPath(path, {requireEntity: true, requireId: true});
			this.debug('REPLACE', path, '=', data);

			return this.supabase
				.from(entity)
				.upsert({
					id,
					data: this.tidyValue(data),
				}, {
					onConflict: 'id',
					ignoreDuplicates: false,
				})
				.eq('id', id)
				.select('id')
				.then(payload => payload.error?.message && Promise.reject(payload.error.message))
		},


		/**
		* Create a new entity at the named path including optional data
		*
		* @param {String|Array<String>} path The path to create
		* @param {Object} [data] Initial data to populate
		* @returns {Object} Snapshot of the inserted record - use dataBind to subscribe to the changes by its ID
		*/
		create(path, data) {
			let {entity} = this.splitPath(path, {requireEntity: true, requireId: false});

			return this.supabase
				.from(entity)
				.insert({data})
				.single()
				.select()
				.then(payload => payload.data || Promise.reject(payload.error.message))
				.then(row => ({
					id: row.id,
					...row.data,
				}))
		},
		// }}}

		// Subscribe - bindData() {{{
		/**
		* Return a Vue compatible reactive object which subscribes to read/write changes
		*
		* @param {String|Array<String>|Function} path The path to subscribe to, if a Function is provided it will be called as `(Vue.$root)` and can return a promisable
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {String} [options.idColumn='id'] Primary ID to match against, based on the path
		* @param {String} [options.dataColumn='data'] Data / JSON column to retrieve data from, based on the path
		* @param {Number} [options.throttle=$props.throttle] Throttle all writes by this time in milliseconds, set to falsy to disable
		* @param {Boolean} [options.deep=true] Deeply watch reactive data writes
		* @param {Promise|Array<Promise>} Wait for the given promise(es) to resolve before binding
		* @param {Array<Field:String,Comparison:String,Target:String>} [options.filter] Optional filter (which overrides per-ID watching) to monitor for, note that the value of the filter must be in a three part PostgREST format, not SQL e.g. `['field', 'eq', '123']`. Remember to override `single` if subscribing to multiple matches
		* @param {Boolean} [options.single=true] Assume response to contain one record only
		* @param {Boolean} [options.write=true] Allow writing back to the resource on local changes, if falsy no local watch is setup
		* @param {Boolean} [options.writeSend=true] Actually transfer writes to the server - disable this to see the debugging of what would be written
		*
		* @param {Function} [options.onReactives] Function called as `(Reactives)` when the reactive workers for the refresh cycle are loaded, These are added to objects by default but cannot be added to Array types
		* @param {Function} [options.onRemoteChange] Async function called as `(data)` when either the intiial state was fetched or some other remote change caused a data fetch, will be waited on before calling `onPostInit()`
		* @param {Function} [options.onPostInit] Async function called as as `(data)` when the inital state has been fetched
		*
		* @returns {VueReactive} Vue reactive object
		* @property {Promise} $ready A promise which resolves when the initial state + local subscription + Vue watchers have all been initalized
		* @property {*} [...] Additional data from the remote resource
		*
		* @example Bind to a remote endpoint
		* { // Within a VueComponent
		*   date() { return {
		*     someData: this.this.bindData(()=> '/widgets/${this.$route.params.id}`),
		*   }},
		* }
		*/
		bindData(path, options) {
			let settings = {
				idColumn: 'id',
				dataColumn: 'data',
				throttle: this.throttle,
				deep: true,
				filter: null,
				single: true,
				waitFor: null,
				write: true,
				writeSend: true,

				onPostInit: (data) => {}, // eslint-disable-line no-unused-vars
				onReactives: ({$ready, $refresh}) => {}, // eslint-disable-line no-unused-vars
				onRemoteChange: (data) => {},
				...options,
			};
			if (settings.filter && (!Array.isArray(settings.filter) || settings.filter.length != 3)) throw new Error('Custom filtering in bindData must contain 3 element parts in PostgREST format');

			// Basic empty object which is returned immediately
			let dataReactive = reactive(settings.single ? {} : []);

			/**
			* Storage for the last known "pristine" state
			* @type {Null|Object|Array}
			*/
			let rawState = null;

			/**
			* Number of skips to the the next "local changes" detection
			* This is usually set by the local-change checker to avoid getting into a loop when we needed to update the local state
			* The type is a number in case any nested loops get involed and we need to push/pop stack space
			* @type {Number}
			*/
			let skipLocalUpdate = 0;

			/**
			* Storage for populated reactive functions
			* These are Functions appended to the binding which can be called to perform various utility actions
			* @type {Object<Function>}
			* @param {Function} $getRaw Get the last pristine raw response from the server or local state
			* @param {Function} $setRaw Set a new pristine raw response from the server or local state - clears the dirty flag
			* @param {Function} $refresh Async function to renew state from remote
			* @param {Function} $destroy Async function to call to release the reactive state and release all watchers - calls all `$destroy*` functions
			* @param {Function} $destroyLocal Async function to disconnect from local watcher
			* @param {Function} $destroyRemote Async function to disconnect from remote watcher
			* @param {Promise} $ready A promise which will resolve when the data state has been loaded
			*/
			let reactives = {
				$getRaw() {
					return rawState;
				},
				$setRaw(newRaw) {
					skipLocalUpdate++; // Mark next change as skippable so we don't get in a loop
					rawState = newRaw;
					Object.assign(dataReactive, newRaw);
				},
			};


			// Reactive: $ready: Promise {{{
			reactives.$ready = Promise.resolve()
				.then(()=> Promise.all([
					// Wait on path if its a promise
					typeof path == 'function'
						? path(this.$root)
						: path,

					// Wait on anything in settings.waitFor
					...(Array.isArray(settings.waitFor)
						? settings.waitFor
						: [settings.waitFor]
					)
				]))
				.then(([resolvedPath]) => {
					let {entity, id} = this.splitPath(resolvedPath, {
						requireEntity: true,
						requireId: !settings.filter,
					});
					return {resolvedPath, entity, id};
				})
				// Add reactive.$refresh() {{{
				.then(({resolvedPath, entity, id}) => {
					/**
					* Refresh the snapshot state of a binding
					* This is used to fetch the initial state
					*/
					reactives.$refresh = ()=> {
						let query = this.supabase
							.from(entity)
							.select(settings.single
								? settings.dataColumn
								: `${settings.idColumn},${settings.dataColumn}`
							)

						if (settings.filter) { // Assume filter is an equality function
							query.filter(...settings.filter);
						} else { // Use ID as equality checker
							query.eq('id', id);
						}

						if (settings.single) query.single().limit(1);

						return query
							.then(({data}) => {
								let dataFieldVal = settings.single
									? data?.[settings.dataColumn]
									: data.map(row => ({
										id: row.id,
										...row[settings.dataColumn],
									}))
								this.debug('INIT', resolvedPath, '=', dataFieldVal);
								reactives.$setRaw(dataFieldVal);
							})
								.then(()=> settings.onRemoteChange(dataReactive))
								.then(()=> settings.onPostInit(dataReactive))
					};

					return {resolvedPath, entity, id};
				})
				// }}}
				.then(({resolvedPath, entity, id}) => Promise.all([
					// Fetch initial data state + populate into the reactive {{{
					reactives.$refresh(),
					// }}}

					// Subscribe to remote changes {{{
					(()=> {
						let query = {
							event: 'UPDATE',
							schema: 'public',
							table: entity,
							filter: settings.filter
								? settings.filter.join('')
								: `${settings.idColumn}=eq.${id}`,
						};
						let listener = ({new: {[settings.dataColumn]: payload}}) => { // React to remote changes
							this.debug('REMOTE-UPDATE', resolvedPath, '=', payload);
							reactives.$setRaw(payload);
							settings.onRemoteChange(payload);
						};

						this.debug('Subscribe remote', {query});

						reactives.$destroyRemote = ()=> { // Setup remote watcher release
							console.log('DEBUG: Attempt to disconnect from watcher - this functionality is untested');
							return;
							// FIXME: None of the below works - destroy all active connections and rebuild?
							return this.supabase.channel('any')
								.off('postgres_changes', query, listener)
						};

						return this.supabase.channel('any')
							.on('postgres_changes', query, listener)
							.subscribe()
					})(),
					// }}}

					// Subscribe to local changes {{{
					(()=> {
						if (!settings.write) return; // Skip this step if we're not interested in wrting
						let localWatchHook = rawPayload => {
							if (!settings.single) throw new Error('Reacting to multiple record changes via subscriber is not yet supported');
							if (skipLocalUpdate > 0) {
								// this.debug('Skip local update');
								skipLocalUpdate--;
								return;
							}

							let payload = this.tidyValue(rawPayload);

							this.debug('LOCAL-UPDATE', resolvedPath, '=', payload);
							if (settings.writeSend)
								this.supabase
									.from(entity)
									.upsert({
										[settings.idColumn]: id,
										[settings.dataColumn]: payload,
									}, {
										onConflict: settings.idColumn,
										ignoreDuplicates: false,
									})
									.eq(settings.idColumn, id)
									.select(settings.dataColumn)
									.then(res => {
										let newData = res.data?.[0][settings.dataColumn];
										if (
											!newData // Response doesn't include any data
											|| isEqual(rawState, newData) // Plain data is the same
										) return;

										// Merge server changes into local
										reactives.$setRaw(newData);
									})
						};
						if (settings.throttle) localWatchHook = debounce(localWatchHook, settings.throttle);

						reactives.$destroyLocal = watch(
							dataReactive,
							localWatchHook,
							{
								immediate: false,
								deep: settings.deep,
								flush: 'post',
							},
						);
					})(),
					// }}}
				]))
				// Assign reactives + call onReactives() {{{
				.then(()=> {
					if (settings.single) Object.defineProperties(
						dataReactive,
						Object.fromEntries(
							Object.entries(reactives)
								.map(([key, value]) => [
									key,
									{
										value,
										configurable: false,
										enumerable: false,
										writable: false,
									}
								])
						)
					);
					settings.onReactives(reactives);
				})
				// }}}
				// }}}

				// Reactive: $destroy {{{
				reactives.$destroy = ()=> Promise.all([
					reactives.$destroyRemote && reactives.$destroyRemote(),
					reactives.$destroyLocal && reactives.$destroyLocal(),
				])
				// }}}

			return dataReactive;
		},


		/**
		* Stop watching a remote path and release all local hooks
		*
		* @param {path} The path to stop watching
		* @returns {Promise<Boolean>} Boolean true if anything was actually released
		*/
		releasePath(path) {
			let {docName, docPath} = this.splitPath(path);

			if (!this.boundPaths[docName]) return false;

			return Promise.all([
				this.boundPaths[docName].record.unsubscribe(docPath, this.boundPaths[docName].callback),
				this.boundPaths[docName].record.discard(),
			])
				.then(()=> delete this.boundPaths[docName])
				.then(()=> true)
		},
		// }}}

		// Files / storage - fileList(), fileUpload(), fileTranscode(), fileGet(), fileSet(), fileDownload(), fileZip(), fileSnapshot(), fileRemove(), fileIcon() {{{
		/**
		* Storage file schema
		* Returned by `this.fileList()`
		*
		* @name StateFile
		* @property {String} id A UUID string representing the unique ID of the file
		* @property {String} name Relative name path (can contain prefix directories) for the human readable file name
		* @property {Object} parsedName An object representing meta file parts of a file name
		* @property {String} parsedName.basename The filename + extention (i.e. everything without directory name)
		* @property {String} parsedName.filename The file portion of the name (basename without the extension)
		* @property {String} parsedName.ext The extension portion of the name (always lower case)
		* @property {String} parsedName.dirName The directory path portion of the name
		* @property {Date} created A date representing when the file was created
		* @property {Date} modified A date representing when the file was created
		* @property {Date} accessed A date representing when the file was last accessed
		* @property {Number} size Size, in bytes, of the file
		* @property {String} mime The associated mime type for the file
		*
		* @property {Object} meta Meta information pulled from the corresponding fileMeta table
		*
		* @property {String} icon CSS icon to display for the file (extracted from the file name by `this.fileType()`)
		* @property {String} type Human readable descrition of the file name (extracted from the file name by `this.fileType()`)
		* @property {String} [href] Optional href within TERA we can direct to to manage the file (extracted from the file name by `this.fileType()`)
		*/


		/**
		* Fetch the contents of a given storage path
		*
		* @param {String|Array<String>} path The path to list
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.limit=0] Limit file count
		* @param {Number} [options.offset=0] Offset file count
		* @param {String} [options.sort='name'] Optional sort criteria, begin field with '-' if reverse order is required
		* @param {String} [options.search] Optional search string to filter by
		* @param {Boolean} [options.meta] Pull meta information for each file entity
		* @param {Function} [options.metaPath] Function, called as `(rawFile)` which returns the Path to use when fetching meta data
		*
		* @returns {Promise<Array<StateFile>>} List of found files for the given path
		*/
		fileList(path, options = {}) {
			let settings = {
				limit: 0,
				offset: 0,
				sort: 'name',
				search: null,
				meta: true,
				metaPath: rawFile => `/fileMeta/${rawFile.id}`,
				...options,
			};
			let {entity, id} = this.splitPath(path, {requireEntity: true, requireId: true});

			this.debug('fileList(', path, options, ')');
			return this.supabase.storage
				.from(entity)
				.list(id, {
					...(settings.search && {search: settings.search}),
					...(settings.limit && {limit: settings.limit}),
					...(settings.offset && {offset: settings.offset}),
					...(settings.sort && {
						sortBy: settings.sort.startsWith('-')
							? {column: settings.sort.substr(1), order: 'desc'}
							: {column: settings.sort, order: 'asc'}
					}),
				})
				.then(({data}) => Promise.all((data || []).map(rawFile => Promise.resolve()
					.then(()=> settings.meta
						? this.get(settings.metaPath(rawFile), {}, {id: false})
						: false
					)
					.then((meta) => {
						let baseFile = {
							id: rawFile.id,
							name: rawFile.name,
							parsedName: this._parsePath('/' + rawFile.name),
							created: new Date(rawFile.created_at),
							modified: new Date(rawFile.updated_at),
							accessed: new Date(rawFile.last_accessed_at),
							size: rawFile.metadata.size,
							mime: rawFile.metadata.mimetype,
							meta,
						};
						// Merge in output of this.fileType()
						return Object.assign(baseFile, this.fileType(baseFile));
					})
				)))
		},


		/**
		* Prompt for and upload a file
		*
		* @param {String|Array<String>} path The path to upload to (not the same as the file name)
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {File|Blob|FormData|Object|Array} [options.file] Existing File object as a binary type (File, Blob, FormData) or a POJO (Array, Object), If omitted a file is prompted for
		* @param {Boolean} [options.overwrite=true] Allow overwriting existing files if the path matches
		* @param {String} [options.mode='auto'] Which method to use when uploading, if 'auto' this is guessed from context but some processing can be skipped if specified
		* @param {Object} [options.meta] Meta information to attach to the file, only applicable if `{multiple:false}`
		* @param {Boolean} [options.multiple=false] If prompting, allow multiple file selection (conflicts with `meta`)
		* @param {String} [options.accept] If prompting, Add additional file type restrictions
		* @param {Boolean} [options.toast=true] Use $toast.loading to show progress while uploading the file
		* @param {Function} [options.metaPath] Function, called as `(rawFile:File)` which returns the Path to use when setting meta data
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		fileUpload(path, options) {
			let settings = {
				file: null,
				overwrite: false,
				mode: 'auto',
				name: null,
				meta: null,
				multiple: false,
				accept: null,
				toast: true,
				metaPath: rawFile => `/fileMeta/${rawFile.id}`,
				...options,
			};
			let toastId; // Eventual toastID used to track the loading progress
			let {entity, id} = this.splitPath(path, {requireEntity: true, requireId: true});

			// Sanity checks {{{
			if (settings.multiple && settings.meta) throw new Error('Cannot specify {multiple:true} + {meta:Object} at the same time - upload one file or wrap this function in Promise.all()');
			// }}}

			return Promise.resolve()
				// Determine upload mode (or use settings.mode if specified) {{{
				.then(()=> {
					if (settings.mode != 'auto') return settings.mode;

					// Otherwise, try to guess from context
					if (!settings.file) { // No file given at all - assume we are prompting
						return 'prompt';
					} else if (
						settings.file // Being given SOMETHING
						&& !settings.multiple // ... and only one of it
						&& (Array.isArray(settings.file) || isPlainObject(settings.file)) // ... and it looks like a primative Array or a POJO
					) { // Assume we need to encode the raw file input
						return 'pojo';
					} else if (
						settings.file // Being given SOMETHING
						&& !settings.multiple // ... and only one of it
						&& ( // And its an accepted type
							settings.file instanceof File
							|| settings.file instanceof Blob
							|| settings.file instanceof FormData
						)
					) {
						return 'encoded';
					} else {
						throw new Error('Unable to determine upload file. Specify a File, Bob, FormData, Object or Array or be more specific by setting {mode:String}');
					}
				})
				// }}}
				// Accept files from the detected mode -> Array {{{
				.then(mode => {
					this.debug('Uploading with mode', mode);
					switch (mode) {
						case 'pojo':
							this.debug('Encoding Array|POJO file to Blob');
							if (!path) throw new Error('Passing an Array|POJO to fileUpload() requires `{path:String}` to be specified');

							return [ // Encode POJO into an array of one File
								new File(
									[
										new Blob(
											[
												this._pojoToJson(settings.file)
											],
											{
												type: 'application/json',
											}
										),
									],
									this._parsePath(path).basename,
									{
										type: 'application/json',
									},
								),
							];
						case 'encoded':
							return Array.from(settings.file);
						case 'prompt':
							return this._uploadBlob({
								multiple: settings.multiple,
							})
								.then(res => Array.from(res))
						default:
							throw new Error(`Unknown upload mode "${mode}"`);
					}
				})
				// }}}
				// Create $toast {{{
				.then(files => {
					if (settings.toast) {
						toastId = this.$toast.loading(
							files.length == 1
								? `Uploading "${this._parsePath('/UPLOAD/' + files[0].name).basename}"`
								: `Uploading ${files.length} files`
						);
					}
					return files;
				})
				// }}}
				// Upload all selected files {{{
				.then(files => {
					let stats = {
						totalSize: files.reduce((acc, file) => acc + file.size, 0),
						uploaded: 0,
					};

					return Promise.all(
						files.map(file => Promise.resolve()
							.then(()=> {
								let payload = { // Payload to pass to callbacks which allows mutation
									file,
									meta: {},
								};
								return Promise.resolve()
									.then(()=> this.fileTranscoders.reduce((acc, cb) => acc
										.then(()=> cb.call(this, payload))
										.then(result => result && Promise.reject('END')) // Exit out of promise series chain on first non-falsy
									, Promise.resolve()))
									.then(()=> payload) // No transcoder triggered - return payload as is
									.catch(e => {
										if (e === 'END') return payload; // Exited cleanly in the middle of a promise series chain
										throw e; // Otherwise throw upwards
									})
							})
							.then(({file, meta}) => this.supabase.storage
								.from(entity)
								.upload(`${id}/${file.name}`, file, {
									upsert: settings.overwrite,
								})
								.then(()=> ({file, meta})) // Pass result + meta to next .then block
							)
							.then(({file, meta}) => {
								if (meta) { // If we also want to populate meta we need to refetch the uploaded file by its name
									return this.fileList(`${entity}/${id}`, {
										search: file.name,
										meta: false,
										limit: 1,
									})
										.then(([newFile]) => this.replace(settings.metaPath(newFile), meta))
								}
							})
							.then(()=> {
								stats.uploaded += file.size;
								if (toastId) this.$toast.update(toastId, {
									progress: stats.uploaded / stats.totalSize,
								});
							})
						)
					);
				})
				// }}}
				.finally(()=> toastId && this.$toast.close(toastId))
		},


		/**
		* Fetch a file from the server into a Blob
		*
		* @param {StateFile|String|Array<String>} input Either the StateFile entity or the StateFile name to fetch
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.json=false] Parse the file as JSON and return the decoded content
		* @param {Boolean} [options.toast=true] Use $toast.loading to show progress while downloading
		* @returns {Promise<Blob>} The eventual file contents as a Blob object
		*/
		fileGet(input, options) {
			let path = input?.name || input;
			let settings = {
				json: false,
				toast: true,
				...options,
			};

			let toastId; // Eventual toastID used to track the loading progress
			let {entity, id, operand} = this.splitPath(path, {requireEntity: true, requireId: true});

			// FIXME: Need 404 here if needed

			return Promise.resolve()
				.then(()=> {
					if (!settings.toast) return;
					toastId = this.$toast.loading(`Downloading "${operand}"`);
				})
				.then(()=> this.supabase.storage
				.from(entity)
				.download(`${id}/${operand}`)
				.then(({data}) => settings.json
					? data.text().then(d => this._jsonToPojo(d))
					: data
				))
				.finally(()=> toastId && this.$toast.close(toastId))
		},


		/**
		* Wrapper around fileUpload() specifically for setting file contents en-masse
		*
		* @param {String|Array<String>} path The path to upload to (not the same as the file name)
		* @param {File|Blob|FormData|Object|Array} contents File contents to set
		* @param {Object} [options] Additional options to mutate behaviour, see `fileUpload()` for more details
		*/
		fileSet(path, contents, options) {
			return this.fileUpload(path, {
				file: contents,
				...options,
			});
		},


		/**
		* Download a file for the user
		* NOTE: This function presents a file to the user as a download, not retrieves its content like this.fileGet()
		*
		* @param {StateFile|String|Array<String>} input Either the StateFile entity or its name to download
		* @returns {Promise} A promise which resolves when the download operation has completed
		*/
		fileDownload(input) {
			let path = input?.name || input;
			let {entity, id, operand} = this.splitPath(path, {requireEntity: true, requireId: true});

			return this.fileGet({entity, id, operand})
				.then(blob => this._downloadBlob({
					blob,
					filename: operand.split('/').at(-1), // Extract final file name
				}))
		},


		/**
		* Zip all files within a path and pass to the user as a download
		*
		* @param {String|Array<String>} path The path to upload to (not the same as the file name)
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {String} [options.filename=Date] Filename for the Zip
		* @param {Array<StateFile>} [options.list] Existing file list, if provided it will be used as the destination file array rather than fetching it fresh
		* @param {Function} [options.onProgress] Function to call on progress updates. Called as `({total:Number, pending:Number, fetching:Number, writing:Number, written:Number})`
		* @param {Function} [options.onGeneratingZip] Function to call when building the final file. Called the same way as `options.onProgress()`
		* @param {Function} [options.onDone] Function to call when the zip has been built, just before offering to the user. Called the same way as `options.onProgress()`
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		fileZip(path, options) {
			let settings = {
				/* eslint-disable no-unused-vars */
				filename: (new Date).toISOString().replace(/:/g,'').replace(/\.\d{3}Z$/, '') + '.zip',
				list: null,
				onProgress(stats) {},
				onGeneratingZip(stats) {},
				onDone(stats) {},
				...options,
			};
			let {entity, id} = this.splitPath(path, {requireEntity: true, requireId: true});

			let stats = {
				total: 0,
				pending: 0,
				fetching: 0,
				writing: 0,
				written: 0,
			};

			/**
			* Simple function to merge an object into stats, call the onProgress event + return an optional value
			*
			* @param {Object} merge The values to be merged
			* @param {*} [result] Optional eventual result of the updated promise
			* @returns {Promise} A promise when `settings.onProgress` has completed
			*/
			let updateStats = (merge, result) => {
				Object.assign(stats, merge);
				return Promise.resolve(settings.onProgress(stats));
			};

			return Promise.resolve()
				.then(()=> settings.list || this.fileList({entity, id}))
				.then(files => updateStats({total: files.length})
					.then(()=> files)
				)
				.then(files => {
					let zipBlob = new ZipBlobWriter('application/zip');
					let zip = new ZipWriter(zipBlob);

					// Fetch + append all files into the zip
					return Promise.all(files.map(file => Promise.resolve()
						.then(()=> updateStats({fetching: stats.fetching + 1}))
						.then(()=> this.fileGet({entity, id, operand: file.name}))
						.then(blob => updateStats({fetching: stats.fetching - 1, writing: stats.writing + 1})
							.then(()=> blob)
						)
						.then(blob => zip.add(file.name, new ZipBlobReader(blob)))
						.then(()=> updateStats({writing: stats.writing - 1, written: stats.writing + 1}))
					))
						.then(()=> settings.onGeneratingZip(stats))
						.then(()=> zip.close())
				})
				.then(blob => Promise.resolve(settings.onDone(stats))
					.then(()=> blob)
				)
				.then(blob => this._downloadBlob({
					blob,
					filename: settings.filename,
				}))
		},


		/**
		* Create a file snapshot of an existing file
		*
		* @param {String|Array<String>} path The path to snapshot (not the same as the file name)
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Array<StateFile>} [options.list] Existing file list, if provided it will be used as the destination file array rather than fetching it fresh
		* @returns {Promise<String>} A promise which resolves with the eventual snapshot operand
		*/
		fileSnapshot(path, options) {
			let settings = {
				list: null,
				...options,
			};

			let {entity, id, operand} = this.splitPath(path, {requireEntity: true, requireId: true});
			let operandParts = operand.split('/');
			let {dirname, filename, ext} = this._parsePath(operandParts.pop());

			return Promise.resolve()
				.then(()=> settings.list || this.fileList({entity, id}))
				// Find next applicable version name {{{
				.then(list => new Promise((resolve, reject) => {
					let usedNames = new Set(list.map(l => l.name));

					for (let v = 1; v++; v < 100) {
						let tryName = operandParts.join('/')
							+ `${dirname}${filename}_v${v}.${ext}`

						// Keep trying until we don't hit a conflict
						if (!usedNames.has(tryName)) return resolve(tryName);
					}
					reject('Cannot find a non-conflicting file name');
				}))
				// }}}
				.then(newName => this.supabase.storage
					.from(entity)
					.copy(`${id}/${operand}`, `${id}/${newName}`)
					.then(()=> newName)
				)
		},


		/**
		* Remove a file
		*
		* @param {String|Array<String>} path The path to remove (not the same as the file name)
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		fileRemove(path) {
			let {entity, id, operand} = this.splitPath(path, {requireEntity: true, requireId: true});

			return this.supabase.storage
				.from(entity)
				.remove([`${id}/${operand}`])
		},


		/**
		* Return various meta information for a given file
		* This function processes all workers in `this.fileTypes` until one succeeds
		*
		* @param {StateFile} file The file object to return meta-data for
		*
		* @returns {Object} An object describing the file type
		* @property {String} icon A Fontawesome compatible CSS class to use the icon of
		* @property {String} type A human readable description of the file type
		* @property {String} [href] Optional follow-on href to navigate if the user selects this file
		*/
		fileType(file) {
			let response;
			this.fileTypes.some(ft => response = ft.call(this, file));

			return response;
		},
		// }}}

		// Helper functions - _downloadBlob(), _uploadBlob(), _parsePath(), _pojoToJson(), _jsonToPojo() {{{
		/**
		* Internal function to provide a blob as a downloadable file
		* @private
		* @param {Object} options Additional options to mutate behaviour
		* @param {Blob} options.blob Blob object to download
		* @param {String} options.filename The filename to default to when saving
		*/
		_downloadBlob(options) {
			let blobUrl = URL.createObjectURL(options.blob);

			let el = document.createElement('a');
			el.href = blobUrl;
			el.download = options.filename;

			document.body.appendChild(el);
			el.click();
			el.remove();
		},


		/**
		* Internal function to prompt for a file from disk, returning a File(s) object
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.multiple=false] If prompting, allow multiple file selection (conflicts with `meta`)
		* @param {String} [options.accept] If prompting, Add additional file type restrictions
		*
		* @returns {Promise<FileList>} The output FileList object generated by the user OR the promise will reject with `'CANCEL'`
		*/
		_uploadBlob(options) {
			let settings = {
				multiple: false,
				accept: null,
				...options,
			};

			return new Promise((resolve, reject) => {
				// Create outer, hidden wrapper
				let wrapper = document.createElement('div');
				wrapper.classList.add('d-none');
				document.body.append(wrapper);

				// Create inner input file element we fake interaction with
				let fileControl = document.createElement('input');
				fileControl.type = 'file';
				if (settings.multiple) fileControl.multiple = true;
				if (settings.accept) fileControl.accept = settings.accept;
				wrapper.append(fileControl);
				fileControl.addEventListener('change', e => {
					if (e.target.files.length > 0) {
						resolve(e.target.files);
					} else {
						reject('CANCEL');
					}
					wrapper.remove();
				});
				fileControl.addEventListener('cancel', ()=> {
					wrapper.remove();
					reject();
				});
				fileControl.click();
			})
		},


		/**
		* Parse a file component into a `dirname`, `filename` + `ext`[tention]
		* If a file name fails to parse this function will throw
		*
		* @param {String} path Path to parse
		*
		* @returns {Object} The parsed file components
		* @property {String} dirname Any directory portion of the input path
		* @property {String} basename The filename + extention (i.e. everything without directory name)
		* @property {String} filename The base filename without extension
		* @property {String} ext The extension (sans dot prefix, always lower case)
		*
		* @example Parse a simple filename
		* this._parsePath('/myfile.txt') //= {dirname: '/', basename: 'myfile.txt', filename: 'myfile', ext: 'txt'}
		*/
		_parsePath(path) {
			if (!path.startsWith('/')) throw new Error(`All file paths must start with a slash. Given "${path}"`);
			let {dirname, basename, filename, ext} = /^(?<dirname>.*\/)(?<basename>(?<filename>.+?)(?:\.(?<ext>.+?))?)$/.exec(path)?.groups || {};
			if (!dirname || !filename) throw new Error('Unable to decode filename');
			ext = ext.toLowerCase();

			return {dirname, basename, filename, ext};
		},


		/**
		* Encode a POJO to a JSON string
		* This is really just a wrapper around `JSON.stringify()` which could also tidy up output + inject meta information
		* @param {Object|Array} pojo Input object to encode
		* @returns {String} Encoded JSON string
		*/
		_pojoToJson(pojo) {
			return JSON.stringify(pojo, null, '\t');
		},


		/**
		* Decode a JSON string into a POJO
		* This is really just a wrapper around `JSON.parse()` which could also tidy up input + inject meta information
		* @param {String} str The input string to parse
		* @returns {Object|Array} Decoded POJO output
		*/
		_jsonToPojo(str) {
			return JSON.parse(str);
		},
		// }}}
	},
	created() {
		if (!this.supabaseUrl || !this.supabaseKey) throw new Error('Cannot connect to Supabase without passing supabaseUrl + supabaseKey');

		this.debug('Connecting to Supabase URL', this.supabaseUrl);
		this.supabase = Supabase(this.supabaseUrl, this.supabaseKey, {
			realtime: {
				transport: window.WebSocket, // FIXME: Fix for https://github.com/supabase/realtime-js/issues/219#issuecomment-1387158074
			},
		});

		return this.$services.require('$toast');
	},
}
</script>
