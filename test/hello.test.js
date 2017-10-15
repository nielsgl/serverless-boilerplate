const debug = require('debug')('app:log:test:health');
const error = require('debug')('app:err:test:health');

const jestPlugin = require('serverless-jest-plugin');

const {lambdaWrapper} = jestPlugin;
const endpoint = lambdaWrapper.wrap(require('../handler'), {handler: 'hello'});

describe('GET /hello', () => {
	beforeEach((done) => {
		done();
	});

	it('should return a greeting', async () => {
		expect.assertions(2);

		const response = await endpoint.run({});
		const res = JSON.parse(response.body);

		expect(res).toBeDefined();
		expect(res.message).toEqual('Hello, Serverless World!');
	});
});
