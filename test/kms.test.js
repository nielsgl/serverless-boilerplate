const jestPlugin = require('serverless-jest-plugin');

const { lambdaWrapper } = jestPlugin;
const endpoint = lambdaWrapper.wrap(require('../handler'), { handler: 'kms' });

describe('GET /kms', () => {
	beforeEach((done) => {
		done();
	});

	it('should return an object with decrypted', async () => {
		expect.assertions(2);

		const response = await endpoint.run();
		const res = JSON.parse(response.body);

		expect(res).toBeDefined();
		expect(res.decrypted).toEqual('');
	});
});
