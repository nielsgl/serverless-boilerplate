const debug = require('debug')('app:log:src:health');
const error = require('debug')('app:err:src:health');

const http = require('../lib/services/http');

const health = async (event, context, cb) => {
	http.success({status: 'ok'}, cb);
};

export default health;
