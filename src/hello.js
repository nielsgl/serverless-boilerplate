const debug = require('debug')('app:log:src:hello');
const error = require('debug')('app:err:src:hello');

const hello = async (event, context, cb) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Hello, Serverless World!',
		}),
	};

	return cb(null, response);
};

export default hello;
