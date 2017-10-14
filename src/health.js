// eslint-disable-next-line import/prefer-default-export
const health = async (event, context, cb) => {
	const p = new Promise((resolve) => {
		resolve('success');
	});
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			status: 'ok',
		}),
	};
	p
	.then(() => cb(null, response))
	.catch(e => cb(e));
};

export default health;
