const debug = require('debug')('app:log:plugins:dynalite');
const error = require('debug')('app:err:plugins:dynalite');
const config = require('config');
const _ = require('lodash');
const Dynalite = require('dynalite');
const chokidar = require('graceful-chokidar');
const AWS = require('aws-sdk');

const DEFAULT_PORT = config.db.local.port;
const DEFAULT_REGION = config.db.local.region;

const PORT_OPTIONS = {
	shortcut: 'p',
	usage: `the port number that dynalite will listen on (default ${DEFAULT_PORT})`,
	required: false,
};


class ServerlessDynalite {
	constructor(serverless, options) {
		this.serverless = serverless;
		this.service = serverless.service;

		this.log = serverless.cli.log.bind(serverless.cli);
		this.config = (this.service.custom && this.service.custom.dynalite) || {};
		this.options = options;

		this.commands = {
			dynalite: {
				commands: {
					start: {
						usage: 'start a persistent dynalite server',
						lifecycleEvents: ['startHandler'],
						options: {
							port: PORT_OPTIONS,
						},
					},
					watch: {
						usage: 'start persistent dynalite server and watch for table definition changes',
						lifecycleEvents: ['watchHandler'],
						options: {
							port: PORT_OPTIONS,
						},
					},
				},
			},
		};

		this.hooks = {
			'dynalite:start:startHandler': this.startHandler.bind(this),
			'dynalite:watch:watchHandler': this.watchHandler.bind(this),
			'before:offline:start:init': this.watchHandler.bind(this),
			'before:offline:start:end': this.endHandler.bind(this),
		};
	}

	get port() {
		return _.get(this, ['config', 'start', 'port'], DEFAULT_PORT);
	}

	get region() {
		return _.get(this, ['config', 'start', 'region'], DEFAULT_REGION);
	}

	get dynamodb() {
		if (this.my_dynamodb) {
			return this.my_dynamodb;
		}

		const dynamoOptions = {
			endpoint: `http://localhost:${this.port}`,
			region: this.region,
			accessKeyId: 'MOCK_ACCESS_KEY_ID',
			secretAccessKey: 'MOCK_SECRET_ACCESS_KEY',
		};

		AWS.config.update({
			region: dynamoOptions.region,
			endpoint: dynamoOptions.endpoint,
		});

		this.my_dynamodb = {
			// raw: new AWS.DynamoDB(dynamoOptions),
			// doc: new AWS.DynamoDB.DocumentClient(dynamoOptions),
			raw: new AWS.DynamoDB(),
			doc: new AWS.DynamoDB.DocumentClient(),
		};

		return this.my_dynamodb;
	}

	async watchHandler() {
		await this.startHandler();

		this.watcher = chokidar.watch('./serverless.yml', {persistent: true, interval: 1000})
			.on('change', async () => {
				this.log('serverless.yml changed, updating...');

				// await this.service.load({});
				await this.reloadService();
				this.updateTables();
			});

		this.log('Listening for table additions / deletions.');
	}

	async startHandler() {
		this.dynalite = new Dynalite({createTableMs: 0});
		try {
			await this.dynalite.listen(this.port);
		} catch (e) {
			debug('err', e);
		}
		// await new Promise((res, rej) => , err => err ? rej(err) : res()));

		this.log(`Dynalite listening on http://localhost:${this.port}`);
		return this.updateTables();
	}

	endHandler() {
		if (this.watcher) {
			this.watcher.close();
		}

		if (this.dynalite) {
			this.dynalite.close();
		}
	}

	async reloadService() {
		const {options} = this.serverless.processedInput;
		await this.service.load(options);
		await this.serverless.variables.populateService(options);
		await this.service.setFunctionNames(options);
		await this.service.mergeResourceArrays();
		await this.service.validate();
	}

	async updateTables() {
		const requiredTables = _.map(_.filter(_.values(_.get(this.service, ['resources', 'Resources'], {})), {Type: 'AWS::DynamoDB::Table'}), 'Properties');

		this.log(`Tables in config: ${JSON.stringify(_.map(requiredTables, 'TableName'))}`);

		const currentTables = await this.dynamodb.raw.listTables({}).promise();
		this.log(`Current Tables: ${JSON.stringify(currentTables.TableNames)}`);

		const missingTables = _.reject(requiredTables, ({TableName}) =>
			_.includes(currentTables.TableNames, TableName));
		this.log(`Missing Tables: ${JSON.stringify(_.map(missingTables, 'TableName'))}`);

		_.forEach(missingTables, async (table) => {
			this.log(`Creating table ${table.TableName}...`);
			await this.dynamodb.raw.createTable(table).promise();
		});

		setTimeout(async () => {
			const finalTables = await this.dynamodb.raw.listTables({}).promise();
			this.log(`Current Tables: ${JSON.stringify(finalTables.TableNames)}`);
		}, 1000);
	}
}

module.exports = ServerlessDynalite;
