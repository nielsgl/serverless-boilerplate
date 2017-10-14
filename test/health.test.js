const jestPlugin = require('serverless-jest-plugin');

const { lambdaWrapper } = jestPlugin;
const endpoint = lambdaWrapper.wrap(require('../handler'), { handler: 'health' });

describe('GET /health', () => {
	beforeEach((done) => {
		done();
	});

	it('should return an ok status response', async () => {
		expect.assertions(2);

		const response = await endpoint.run({});
		const res = JSON.parse(response.body);

		expect(res).toBeDefined();
		expect(res.status).toEqual('ok');
	});
});
