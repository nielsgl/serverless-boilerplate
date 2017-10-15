const debug = require('debug')('app:log:src:health');

const health = async (event, context, cb) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			status: 'ok',
		}),
	};

	return cb(null, response);
};

export default health;
