const AWS = require('aws-sdk');

const hello = async (event, context, cb) => {
	AWS.config.update({ region: 'us-west-2' });
	const kms = new AWS.KMS();

	let data;
	let decrypted = '';
	try {
		if (process.env.MY_KMS_SECRET) {
			const opts = {
				CiphertextBlob: new Buffer.from(process.env.MY_KMS_SECRET, 'base64'),
			};

			data = await kms.decrypt(opts).promise();
			decrypted = String(data.Plaintext);
		}
	} catch (e) {
		console.log('Error', e);
	}


	const response = {
		statusCode: 200,
		body: JSON.stringify({
			decrypted,
		}),
	};

	return cb(null, response);
};

export default hello;
