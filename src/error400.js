const debug = require('debug')('app:log:src:health');
const error = require('debug')('app:err:src:health');
const boom = require('boom');

const http = require('../lib/services/http');

const error400 = async (event, context, cb) => {
	http.failure(boom.badRequest('this is not valid'), cb);
};

export default error400;
