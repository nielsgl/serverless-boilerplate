const debug = require('debug')('app:log:src:hello');
const error = require('debug')('app:err:src:hello');
const config = require('config');

const http = require('../lib/services/http');

const hello = async (event, context, cb) => {
	http.success({
		message: 'Hello, Serverless World!',
		foo: config.foo,
		event,
		context,
		env: process.env,
	}, cb);
};

export default hello;
