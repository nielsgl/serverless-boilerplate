# Serverless Boilerplate

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![CircleCI branch](https://img.shields.io/circleci/project/github/nielsgl/serverless-boilerplate/master.svg?label=master%20build)](https://circleci.com/gh/nielsgl/serverless-boilerplate/tree/master)
[![CircleCI branch](https://img.shields.io/circleci/project/github/nielsgl/serverless-boilerplate/develop.svg?label=develop%20build)](https://circleci.com/gh/nielsgl/serverless-boilerplate/tree/develop)

[![node](https://img.shields.io/node/v/gh-badges.svg)]()
[![Libraries.io for GitHub](https://img.shields.io/librariesio/github/nielsgl/serverless-boilerplate.svg)](https://img.shields.io/librariesio/github/nielsgl/serverless-boilerplate.svg)
[![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/nielsgl/serverless-boilerplate.svg)](https://img.shields.io/github/commit-activity/y/nielsgl/serverless-boilerplate.svg)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/nielsgl/serverless-boilerplate/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/nielsgl/serverless-boilerplate.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)
<!-- ([![GitHub](https://img.shields.io/github/downloads/nielsgl/serverless-boilerplate/total.svg)](https://img.shields.io/github/downloads/nielsgl/serverless-boilerplate/total.svg)
[![GitHub issues](https://img.shields.io/github/issues/nielsgl/serverless-boilerplate.svg)](https://github.com/nielsgl/serverless-boilerplate/issues)
[![GitHub stars](https://img.shields.io/github/stars/nielsgl/serverless-boilerplate.svg)](https://github.com/nielsgl/serverless-boilerplate/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/nielsgl/serverless-boilerplate.svg)](https://github.com/nielsgl/serverless-boilerplate/network) -->




Serverless Boilerplate - Generic boilerplate for applications using the Serverless Framework

---

## Documentation

- [Installation](#installation)
- [Usage and command line options](#usage-and-command-line-options)
- [Debug process](#debug-process)
- [Todo](#todo)
- [Credits and inspiration](#credits-and-inspiration)
- [Contributing](#contributing)
- [License](#license)

## Installation

## Usage and command line options


### KMS

Generate a key: `aws kms create-key` and get the `keyId`.

Encrypt a variable with

```bash
serverless encrypt --name foo --value bar --keyid {keyId}
```

## Contents

This boilerplate contains the following plugins:

- [Serverless Offline Plugin](https://github.com/dherault/serverless-offline): Emulates AWS λ and API Gateway on your local machine to speed up your development cycles
- [Serverless Webpack](https://github.com/serverless-heaven/serverless-webpack): A Serverless v1.x plugin to build your lambda functions with Webpack.
- [Serverless KMS Secrets](https://github.com/SC5/serverless-kms-secrets): A Serverless Plugin which helps with encrypting service secrets using the AWS Key Management Service (KMS).
<!-- - plugin [serverless-mocha-plugin](https://github.com/SC5/serverless-mocha-plugin): enable test driven development using mocha, creation of functions from command line -->
- file `serverless.yml.json`: Register plugins above
- file `webpack.config.js`: Settings for webpack-plugin
- file `templates/function.ejs`: Template to use for new functions

## Debug process

## TODO

- Automatic AWS Documentation
- API logs
- Hooks
- Build plugin
- Configuration management
- Test framework (jest)
- DynamoDB / (Dynalite?)
- Containerization with Docker
- Coverage check with Coveralls / Codecov
- Quality check with CodeClimate
- Shell
- ??

**Done:**
- ~~Gulp with watch and eslint~~
- ~~KMS secrets~~

## Credits and inspiration

## Contributing

Yes, thank you!
This plugin is community-driven, most of its features are from different authors.
Please update the docs and tests and add your name to the package.json file.
We try to follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).

## License

MIT
