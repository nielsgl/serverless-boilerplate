const debug = require('debug')('pp:app:test:services:http');
const error = require('debug')('pp:err:test:services:http');
const boom = require('boom');

const http = require('../../../lib/services/http');

describe('HTTP Service', () => {
	beforeEach(() => {
	});

	test('constructs Http object', () => {
		expect.assertions(1);
		expect(typeof http).toEqual('function');
	});

	test('response object', () => {
		expect.assertions(4);

		const msg = 'invalid request';
		const bad = boom.badRequest(msg);
		const res = http.response(bad);

		expect(res.statusCode).toEqual(400);
		expect(res.body.statusCode).toEqual(400);
		expect(res.body.error).toEqual('Bad Request');
		expect(res.body.message).toEqual(msg);
	});

	test('success method', () => {
		expect.assertions(1);

		const cb = (foo, msg) => debug('callback msg', msg);

		expect(http.success([{foo: 'hola'}], cb)).toBeUndefined();
	});

	test('success expects callback to be a function', () => {
		expect.assertions(2);

		const http_success = () => http.success({foo: 'bar'});

		expect(http_success).toThrow();
		expect(http_success).toThrowError('#assert_callback: Callback is not a function');
	});

	test('failure method', () => {
		expect.assertions(1);

		const cb = () => true;

		expect(http.failure(boom.badRequest('invalid request'), cb)).toBeUndefined();
	});

	test('failure to throw an error if callback is not a function', () => {
		expect.assertions(2);

		const http_failure = () => http.failure({foo: 'bar'});

		expect(http_failure).toThrow();
		expect(http_failure).toThrowError('#assert_callback: Callback is not a function');
	});
});
