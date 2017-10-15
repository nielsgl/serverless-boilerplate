const debug = require('debug')('app:log:src:kms');
const error = require('debug')('app:err:src:kms');
const AWS = require('aws-sdk');

const http = require('../../lib/services/http');

const hello = async (event, context, cb) => {
	AWS.config.update({region: 'us-west-2'});
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
		error('Error', e);
	}

	http.success({decrypted}, cb);
};

export default hello;
