const path = require('path');
const config = require('config');
const fs = require('fs');
const yaml = require('js-yaml');

// console.log('process.env', process.env.NODE_ENV);
// console.log(`NODE_ENV: ${config.util.getEnv('NODE_ENV')}`);
// console.log('process.env', process.env.NODE_ENV);
// console.log('config', config);

const ymlobj = yaml.dump(config, {
	flowLevel: 3,
	styles: {
		// '!!int': 'hexadecimal',
		'!!null': 'camelcase',
	},
});

fs.writeFileSync(path.resolve(__dirname, '../../config/output.yml'), ymlobj);
