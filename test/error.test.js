const debug = require('debug')('app:log:test:error400');
const error = require('debug')('app:err:test:error400');

const jestPlugin = require('serverless-jest-plugin');

const {lambdaWrapper} = jestPlugin;
const endpoint = lambdaWrapper.wrap(require('../handler'), {handler: 'error400'});

describe('GET /error', () => {
	beforeEach((done) => {
		done();
	});

	it('should return an error', async () => {
		expect.assertions(7);

		const response = await endpoint.run({});
		const res = JSON.parse(response.body);

		expect(response).toBeDefined();
		expect(response.statusCode).toEqual(400);
		expect(response.body).toBeDefined();
		expect(res).toBeDefined();
		expect(res.statusCode).toEqual(400);
		expect(res.error).toEqual('Bad Request');
		expect(res.message).toEqual('this is not valid');
	});
});
