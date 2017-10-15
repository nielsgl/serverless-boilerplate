const debug = require('debug')('pp:app:lib:services:http');
const error = require('debug')('pp:err:lib:services:http');
// const Boom = require('boom');

/*
 * When we use
 export default class Foo
 * we can include it with
 import foo from './foo';
 *
 * when we use
 class Foo {}; module.exports = Foo;
 * we can include it with
 const foo = require('./Foo');
 *
 * Although the former is prettier it won't work with, for example, repl.
 */
class Http {
	/**
	* Generic response wrapper
	* @param res
	* @returns {{statusCode: number, body}}
	*/
	static response(res) {
		const {output} = res;
		return {
			statusCode: output.statusCode,
			body: output.payload,
		};
	}

	static success(body, callback) {
		this.assert_callback(callback);
		const response = this.build_response(body, 200);
		callback(null, response);
	}

	static failure(body, callback) {
		this.assert_callback(callback);
		const response = this.build_response(body);
		callback(null, response);
	}

	static build_response(body, statusCode) {
		const output = body.isBoom ? body.output : null;
		return {
			statusCode: statusCode || output.statusCode,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(output ? output.payload : body),
		};
	}

	static assert_callback(callback) {
		if (typeof callback !== 'function') {
			throw new Error('#assert_callback: Callback is not a function');
		}
	}
}

module.exports = Http;
