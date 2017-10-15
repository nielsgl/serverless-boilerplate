const debug = require('debug')('app:log:src:hello');
const error = require('debug')('app:err:src:hello');

const http = require('../lib/services/http');

const hello = async (event, context, cb) => {
	http.success({message: 'Hello, Serverless World!', event, context, env: process.env}, cb);
};

export default hello;
