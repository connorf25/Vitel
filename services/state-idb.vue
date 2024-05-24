<script>
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
				&& /^(<database>.*?)\/(<entity>.+)$/.test(i)
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
		* @returns {Promise<*>} The fetched value or the fallback value if the item is not present
		*/
		async get(path, fallback) {
			let {database, entity, id} = this.splitPath(path);
			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a get transaction to fetch data by the key
			return new Promise((resolve, reject) => {
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
			});
		},


		/**
		* Get all records within an entity
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY` / `/$ENTITY`, note that specifying an ID will throw
		* @returns {Promise<Object>} The fetched collection of rows
		*/
		async getAll(path) {
			let {database, entity, id} = this.splitPath(path, {requireId: false});
			if (id) throw new Error('Only "database" + "entity" can be specified for getAll(), "id" is not supported');

			debugger; // FIXME: Untested

			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a get transaction to fetch data by the key
			return new Promise((resolve, reject) => {
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
			});
		},


		/**
		* Clear all records within an entity
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY` / `/$ENTITY`, note that specifying an ID will throw
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async clear(path) {
			let {database, entity, id} = this.splitPath(path, {requireId: false});
			if (id) throw new Error('Only "database" + "entity" can be specified for clear(), "id" is not supported');

			debugger; // FIXME: Untested

			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a get transaction to fetch data by the key
			return new Promise((resolve, reject) => {
				let transaction = this.databases[database].transaction(
					entity, // The entity we are planning to access
					'readonly', // Mode
					{
						durability: this.defaultGetDurability,
					},
				)
					.objectStore(entity)
					.clear();

				transaction.onsuccess = e => resolve();
				transaction.onerror = e => reject(e);
			});
		},


		/**
		* Set the value of a path
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY/$ID` / `/$ENTITY/$ID`
		* @param {*} value Any valid POJO value to set
		*
		* @param {Object} [options] Additional options to mutate behaviour
		* @param {Boolean} [options.overwrite=true] Silently overwrite existing keys, if this is false and the key already exists this function will throw
		*
		* @returns {Promise<*>} The eventual set value after it has been comitted
		*/
		async set(path, value, options) {
			let settings = {
				overwrite: true,
				...options,
			};

			let {database, entity, id} = this.splitPath(path);
			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a set transaction to fetch data by the key
			return new Promise((resolve, reject) => {
				let transaction = this.databases[database].transaction(entity, 'readwrite', {durability: this.defaultSetDurability})
					.objectStore(entity)
					[settings.overwrite ? 'put' : 'add'](value, id);

					transaction.onsuccess = ()=> resolve(value);
					transaction.onerror = e => reject(e);
			});
		},


		/**
		* Delete a value by a path
		*
		* @param {String} path A parsable path of the form `$DATABASE/$ENTITY/$ID` / `/$ENTITY/$ID`
		*
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		async unset(path) {
			let {database, entity, id} = this.splitPath(path);
			if (!database) database = this.defaultDatabase;

			// Load DB if not already present
			await this.initDatabase(database);

			// Load entity if its not already present
			await this.initEntity(database, entity);

			// Create a set transaction to drop the key
			return new Promise((resolve, reject) => {
				let transaction = this.databases[database].transaction(entity, 'readwrite', {durability: this.defaultSetDurability})
					.objectStore(entity)
					.delete(id)

					transaction.onsuccess = ()=> resolve(value);
					transaction.onerror = e => reject(e);
			});
		},


		/**
		* Setup a database connection for the database on its current version if it doesn't already exist
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
				if (this.databases[database]) return;

				// Database is current initalizing
				if (this.databasesInit[database]) return this.databasesInit[database];
			}

			this.debug('initDB', database);
			let tryCount = 0;
			return this.databasesInit[database] = Promise.resolve()
				.then(()=> window.indexedDB.databases()) // Fetch the current version of the database
				.then(dbs => dbs.find(db => db.name == database))
				.then(dbInfo => new Promise((resolve, reject) => {
					let tryConnect = ()=> {
						let dbRequest = window.indexedDB.open(
							database,
							settings.version == 'latest' && dbInfo?.version ? dbInfo.version
							: isFinite(settings.version) ? settings.version
							: this.defaultDatabaseVersion
						);

						dbRequest.onsuccess = e => {
							this.databases[database] = e.target.result;
							this.debug(...[
								'Database', database, 'ready',
								...(tryCount > 0 ? ['after', tryCount, 'tries'] : []),
							]);
							resolve();
						};
						dbRequest.onerror = e => {
							debugger; // Untested behaviour
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
									db.createObjectStore(entity, {
										...(this.defaultEntityKey && {keyPath: this.defaultEntityKey}),
									})
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
		* @returns {Promise} A promise which resolves when the operation has completed
		*/
		initEntity(database, entity) {
			// NOTE: Because of the way JavaScript returns deferred async functions, this function cannot be async - it has to exit immediatly OR return a promise
			if (!this.databases[database]) throw new Error(`Cannot access entity on uninitalied database "${database}"`);

			if (Array.from(this.databases[database].objectStoreNames).some(os => os == entity)) return; // Already set up within the database - do nothing
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
						db.createObjectStore(entity, {
							...(this.defaultEntityKey && {keyPath: this.defaultEntityKey}),
						});
					},
				}))
		},

		/**
		* Split a simple path into {database, entity, id, ...operand}
		*
		* @param {String} Path to seperate in slash notation or array form
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
