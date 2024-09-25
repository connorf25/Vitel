<script>
import {cloneDeep} from 'lodash-es';
import {isProxy} from 'vue';

/**
* Key/Val IndexedDB state handler that uses pathing + simple get/set
*/
export default {
	name: '$stateIdb',
	data() { return {
		/**
		* Lookup object for initialized databases
		* Each key is the plain database name
		* @type {Object<IDBDatabase>}
		*/
		databases: {},


		/**
		* Pending promises for databases that are initalizing
		* @type {Object<Promise>}
		*/
		databasesInit: {},


		/**
		* RegExp to evaluate paths
		* @type {RegExp}
		*/
		pathMatcher: /^(?<database>[a-z0-9\_]+)?\/(?<entity>[^\/]+)\/(?<id>[^\/]+)(\/(?<operand>.+))?$/i,


		/**
		* Async serializer for incoming values
		* Set this to anything other than a pass-thru to deconstruct outer fluff like Vue / RxJS
		* By default this function uses lodash.cloneDeep to deconstruct Vue values
		*
		* @type {Function}
		*/
		serialize(v) {
			return cloneDeep(v);
		},


		/**
		* Async deserializer for outgoing values
		* By default this function is a simple pass-thru
		*
		* @type {Function}
		*/
		deserialize(v) {
			return v;
		},
	}},
	props: {
		/**
		* The default database name to assume if none is given in the path
		* @type {String}
		*/
		defaultDatabase: {type: String, default: 'cache'},


		/**
		* The default database version to use when initalizing up databases
		* @type {Number}
		*/
		defaultDatabaseVersion: {type: Number, default: 1},


		/**
		* The default key to create against each entity
		* If nullish the key is ignored
		* If you intend to store non-POJOs like Arrays omitting this is recommended
		* @type {String}
		*/
		defaultEntityKey: {type: String},


		/**
		* The default get() action durability
		* @see https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction#options
		* @type {'default'|'strict'|'relaxed'}
		*/
		defaultGetDurability: {type: String, default: 'default'},


		/**
		* The default set() action durability
		* @see https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction#options
		* @type {'default'|'strict'|'relaxed'}
		*/
		defaultSetDurability: {type: String, default: 'default'},


		/**
		* List of entities to populate on seeing the database for the first time
		* This skips the need to dynamically create these entities
		* Each array entry string should match the `$DATABASE/$ENTITY` / `/$ENTITY` format
		* @type {Array<String>}
		*/
		defaultEntities: {
			type: Array,
			default: ()=> [],
			validator: v => v.every(i =>
				typeof i == 'string'
				&& /^(?<database>.*?)\/(?<entity>.+)$/.test(i)
			),
		},


		/**
		* Whether to dynamically bump+recycle the database to add new entities as needed
		* If this is disabled all entities that are needed need to be declared in `defaultEntities` BEFORE use
		* @type {Boolean}
		*/
		dynamicEntities: {type: Boolean, default: true},
	},
	methods: {

		/**
		* Get the value of a path
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY/$ID` / `/$ENTITY/$ID`
		* @param {*} [fallback] Optional fallback to use if the value does not exist
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.retries=5] Retry the same command this number of times before giving up
		* @param {Number} [options.retryWait=100] Time before retries
		*
		* @returns {Promise<*>} The fetched value or the fallback value if the item is not present
		*/
		async get(path, fallback, options) {
			let settings = options;
			let {database, entity, id} = this.splitPath(path);
			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a get transaction to fetch data by the key
			return this.tryAction(settings, ()=> new Promise((resolve, reject) => {
				let transaction = this.databases[database].transaction(
					entity, // The entity we are planning to access
					'readonly', // Mode
					{
						durability: this.defaultGetDurability,
					},
				)
					.objectStore(entity)
					.get(id);

				transaction.onsuccess = e => resolve(e.target?.result ?? fallback);
				transaction.onerror = e => reject(e);
			}))
				.then(value => this.deserialize(value))
		},


		/**
		* Get all records within an entity
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY` / `/$ENTITY`, note that specifying an ID will throw
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.retries=5] Retry the same command this number of times before giving up
		* @param {Number} [options.retryWait=100] Time before retries
		*
		* @returns {Promise<Object>} The fetched collection of rows
		*/
		async getAll(path, options) {
			let settings = options;
			let {database, entity, id} = this.splitPath(path, {requireId: false});
			if (id) throw new Error('Only "database" + "entity" can be specified for getAll(), "id" is not supported');

			debugger; // FIXME: Untested

			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a get transaction to fetch data by the key
			return this.tryAction(settings, ()=> new Promise((resolve, reject) => {
				let transaction = this.databases[database].transaction(
					entity, // The entity we are planning to access
					'readonly', // Mode
					{
						durability: this.defaultGetDurability,
					},
				)
					.objectStore(entity)
					.getAll();

				transaction.onsuccess = e => resolve(e.target?.result);
				transaction.onerror = e => reject(e);
			}))
				.then(values => values.map(v =>
					this.deserialize(v)
				))
		},


		/**
		* Clear all records within an entity or an entire database
		*
		* @param {String} path A parsable path of the form `$DATABASE` OR `$DATABASE/$ENTITY` OR `/$ENTITY`, note that specifying an ID will throw
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.retries=5] Retry the same command this number of times before giving up
		* @param {Number} [options.retryWait=100] Time before retries
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async clear(path, options) {
			let settings = options;
			let {database, entity, id} = this.splitPath(path, {requireId: false, requireEntity: false});
			if (id) throw new Error('Only "database" + "entity" can be specified for clear(), "id" is not supported');

			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			if (!entity) { // Clear the entire named database
				return this.tryAction(settings, ()=> new Promise((resolve, reject) => {
					let transaction = window.indexedDB.deleteDatabase(database);

					transaction.onsuccess = ()=> resolve();
					transaction.onblocked = ()=> {
						this.debug('Cannot clear database', database, '- blocked, trying to close and retry');
						this.databases[database].close();
						reject(`Database "${database}" clear blocked`);
					};
					transaction.onerror = e => reject(e);
				}))
					.then(()=> console.log('$idb.deleteDB done'))
			} else { // Clear an entity
				// Load entity if its not already present
				await this.initEntity(database, entity);

				// Create a get transaction to clear data by the key
				return this.tryAction(settings, ()=> new Promise((resolve, reject) => {
					let transaction = this.databases[database].transaction(
						entity, // The entity we are planning to access
						'readonly', // Mode
						{
							durability: this.defaultGetDurability,
						},
					)
						.objectStore(entity)
						.clear();

					transaction.onsuccess = ()=> resolve();
					transaction.onerror = e => reject(e);
				}));
			}
		},


		/**
		* Set the value of a path
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY/$ID` / `/$ENTITY/$ID`
		* @param {*} value Any valid POJO value to set
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean|'auto'} [options.clone='auto'] Clone the value before setting. 'auto' determines if the value is a proxy and clones if true
		* @param {Boolean} [options.overwrite=true] Silently overwrite existing keys, if this is false and the key already exists this function will throw
		* @param {Number} [options.retries=5] Retry the same command this number of times before giving up
		* @param {Number} [options.retryWait=100] Time before retries
		*
		* @returns {Promise<*>} The eventual set value after it has been comitted
		*/
		async set(path, value, options) {
			let settings = {
				clone: 'auto',
				overwrite: true,
				...options,
			};

			let {database, entity, id} = this.splitPath(path);
			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Compute the value to save
			let saveValue = (
				(settings.clone == 'auto' && isProxy(value))
				|| settings.clone
			) ? cloneDeep(value) : value;

			// Create a set transaction to fetch data by the key
			return Promise.resolve()
				.then(()=> this.serialize(saveValue))
				.then(()=> this.tryAction(settings, ()=> new Promise((resolve, reject) => {
					let transaction = this.databases[database].transaction(entity, 'readwrite', {durability: this.defaultSetDurability})
						.objectStore(entity)
						[settings.overwrite ? 'put' : 'add'](saveValue, id);

						transaction.onsuccess = ()=> resolve(saveValue);
						transaction.onerror = e => reject(e);
				})))
		},


		/**
		* Delete a value by a path
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY/$ID` / `/$ENTITY/$ID`
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.retries=5] Retry the same command this number of times before giving up
		* @param {Number} [options.retryWait=100] Time before retries
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async unset(path, options) {
			let settings = options;

			let {database, entity, id} = this.splitPath(path);
			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a set transaction to drop the key
			return this.tryAction(settings, ()=> new Promise((resolve, reject) => {
				let transaction = this.databases[database].transaction(entity, 'readwrite', {durability: this.defaultSetDurability})
					.objectStore(entity)
					.delete(id)

					transaction.onsuccess = ()=> resolve(value);
					transaction.onerror = e => reject(e);
			}));
		},


		/**
		* Attempt to run a callback, retrying if the operation failed
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Number} [options.retries=10] Retry the same command this number of times before giving up
		* @param {Number} [options.retryWait=100] Time before retries
		* @param {Function} [options.skipError] Function which determines if a result is actually a failure error. If this function returns truthy the result is treated as successful
		*
		* @param {Function} cb Async function which is executed until the retry count is exhausted
		*
		* @returns {Promise<*>} The eventual promise return value of the callback
		*/
		tryAction(options, cb) {
			let settings = {
				retries: 10,
				retryWait: 100,
				skipError: ()=> false,
				...options,
			};

			let tryCount = 0;
			return new Promise((resolve, reject) => {
				let tryWorker = ()=> Promise.resolve()
					.then(()=> cb())
					.then(result => resolve(result))
					.catch(e => {
						if (!settings.skipError(e)) { // Failed but we're considering it a success anyway
							resolve();
						} else if (++tryCount >= settings.retries) {
							console.log('TRY-ACTION gave up -', e);
							reject(e);
						} else {
							console.log('TRY-ACTION fail [', tryCount, '/', settings.retries, '] -', e);
							setTimeout(tryWorker, settings.retryWait);
						}
					})

				// Kick off initial action
				tryWorker();
			});

		},


		/**
		* Setup a database connection for the database on its current version if it doesn't already exist
		*
		* @param {String} database Database name to create
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.overwrite=false] Overwrite an existing database handle if it already exists
		* @param {'latest'|Number} [options.version='latest'] Version of the database to setup or 'latest' to use the registered version
		* @param {Number} [options.retryLimit=10] Number of times to attempt to connect before giving up
		* @param {Number} [options.retryDelay=100] Pause between connection retries
		* @param {Function} [options.onUpgrade] Function to run when an upgrade is needed. Called as `(db:IDBDatabase, e:IDBVersionChangeEvent)` with the `IDBVersionChangeEvent` event as the context
		* @param {Array<String>} [options.entities] Optional list of entities to always prime the database with, see `defaultEntities` to prime this
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		initDatabase(database, options) {
			// NOTE: Because of the way JavaScript returns deferred async functions, this function cannot be async - it has to exit immediatly OR return a promise

			let settings = {
				overwrite: false,
				version: 'latest',
				retryLimit: 25,
				retryDelay: 100,
				onUpgrade: ()=> {},
				entities: [],
				...options,
			};

			// Check if we already have the database loaded + ready if we're not overwriting
			if (!settings.overwrite) {
				// Database already exists as a pointer
				if (this.databases[database]) return Promise.resolve();

				// Database is current initalizing
				if (this.databasesInit[database]) return this.databasesInit[database];
			}

			this.debug('initDB', database);
			let tryCount = 0;
			return this.databasesInit[database] = Promise.resolve()
				.then(()=> window.indexedDB.databases // Fetch the current version of the database
					? window.indexedDB.databases() // Can use databases() wrapper - doesn't work on Firefix<126
						.then(dbs => dbs.find(db => db.name == database))
						.then(dbInfo => dbInfo?.version)
					: new Promise((resolve, reject) => { // Have to open, scoop version then close again
						let openReq = window.indexedDB.open(database);
						openReq.onsuccess = e => {
							let db = e.target.result;
							let dbVersion = db.version;
							db.close();
							resolve(dbVersion);
						};
						openReq.onerror = e => reject(e);
					})
				)
				.then(existingDBVersion => new Promise((resolve, reject) => {
					let tryConnect = ()=> {
						let databaseVersion = settings.version == 'latest' && existingDBVersion > 0 ? existingDBVersion
							: isFinite(settings.version) ? settings.version
							: this.defaultDatabaseVersion;

						this.debug('Establishing connection to', database, 'version', databaseVersion);

						let dbRequest = window.indexedDB.open(database, databaseVersion);

						dbRequest.onsuccess = e => {
							this.databases[database] = e.target.result;
							this.debug(...[
								'Database', database, 'ready',
								...(tryCount > 0 ? ['after', tryCount, 'tries'] : []),
							]);
							resolve();
						};
						dbRequest.onerror = e => {
							if (tryCount >= settings.retryLimit) { // Exhaused retries
								reject(e);
							} else {
								this.debug('Connecting to', database, 'threw', e.toString(), 'on try', ++tryCount, '/', settings.retryLimit, '- will retry in', settings.retryDelay);
								setTimeout(()=> tryConnect(), settings.retryDelay);
							}
						};
						dbRequest.onupgradeneeded = e => {
							this.debug('Upgrading database', database, 'from version', e.oldVersion, '->', e.newVersion);

							// Do we have an entity list to pre-populate?
							if (settings.entities.length > 0 || this.defaultEntities.length > 0) {
								let db = e.target.result;
								let existingEntities = new Set(db.objectStoreNames);

								let baseEntities = [
									...settings.entities,
									...this.defaultEntities // Rewrite to: `[ {database:String, entity:String} ]`
										.map(e => /^(?<database>.*?)\/(?<entity>.+)$/.exec(e)?.groups)
										.map(e => ({
											...e,
											database: e.database || this.defaultDatabase, // Append default database if the path is missing that part
										}))
										.filter(e =>
											e // Entity name is valid
											&& e.database == database // The database we are creating/bumping is this one
											&& !existingEntities.has(e.entity) // This entity doesn't already exist
										)
										.map(e => e.entity)
								];
								this.debug('Creating default database entities:', baseEntities);

								baseEntities.forEach(entity =>
									this.tryAction({
										skipError: e => /An object store with the specified name already exists/.test(e.toString()),
									}, ()=> db.createObjectStore(entity, {
										...(this.defaultEntityKey && {keyPath: this.defaultEntityKey}),
									}))
								);
							}

							settings.onUpgrade.call(e, e.target.result, e);
						};
					};

					tryConnect(); // Kick off initial connection
				}))
		},


		/**
		* Initalize entities (IDObjectStore) against a database
		* This will either resolved if the entity already exists or bump the database and create it
		*
		* @param {String} database Database name to create the new entry within
		* @param {String} entity The entity name to create
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		initEntity(database, entity) {
			// NOTE: Because of the way JavaScript returns deferred async functions, this function cannot be async - it has to exit immediatly OR return a promise
			if (!this.databases[database]) throw new Error(`Cannot access entity on uninitalied database "${database}"`);

			if (Array.from(this.databases[database].objectStoreNames).some(os => os == entity)) return Promise.resolve(); // Already set up within the database - do nothing
			if (!this.dynamicEntities) throw new Error(`Dynamic entities are disabled - declare '${database}/${entity}' in defaultEntities before use!`);

			this.debug('initEntity', `${database}/${entity}`);

			// Force the database to bump to create the new IDBObjectStore
			this.debug('Need to bump database', database, 'v', this.databases[database].version, 'to add new entity', entity);

			return this.databasesInit[database] = Promise.resolve()
				.then(()=> {
					if (!this.databases[database]) return; // Database isn't present anyway

					// Request database shutdown
					console.log('Request DB shutdown', database);
					this.databases[database].close();
				})
				.then(()=> this.initDatabase(database, {
					overwrite: true,
					version: this.databases[database].version + 1, // Purposely ask for next version up to force an upgrade
					onUpgrade: db => {
						this.debug(...[
							'Appending new entity',
							`${database}/${entity}`,
							...(this.defaultEntityKey ? [
								'with index',
								this.defaultEntityKey ?? 'NONE'
							] : []),
						]);
						this.tryAction({
							skipError: e => /An object store with the specified name already exists/.test(e.toString()),
						}, ()=>
							db.createObjectStore(entity, {
								...(this.defaultEntityKey && {keyPath: this.defaultEntityKey}),
							})
						);
					},
				}))
		},

		/**
		* Split a simple path into {database, entity, id, ...operand}
		*
		* @param {String} path Path to seperate in slash notation or array form
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.requireDatabase=false] Throw if the path does not contain a qualified database name
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
		* this.splitPath('otherDatabase/projects/1234/My dir/My file.png') -> // {database: 'otherDatabase', entity: 'projects', id: '1234', operand: 'My dir/My file.png'}
		*/
		splitPath(path, options) {
			let settings = {
				requireDatabase: false,
				requireEntity: true,
				requireId: true,
				requireOperand: false,
				...options,
			};

			let {database, entity, id, operand} = this.pathMatcher.exec(path)?.groups || {};

			if (settings.requireDatabase && !database) throw new Error(`Could not extract database name from path "${path}"`);
			if (settings.requireEntity && !entity) throw new Error(`Could not extract entity from path "${path}"`);
			if (settings.requireId && !id) throw new Error(`Could not extract ID from path "${path}"`);
			if (settings.requireOperand && !operand) throw new Error(`Could not extract operand from path "${path}"`);

			return {database, entity, id, operand};
		},
	},
}
</script>

<template>
	<div class="center">
	</div>
</template>
