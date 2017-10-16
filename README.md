# Serverless Boilerplate

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![CircleCI branch](https://img.shields.io/circleci/project/github/nielsgl/serverless-boilerplate/master.svg?label=master%20build)](https://circleci.com/gh/nielsgl/serverless-boilerplate/tree/master)
[![CircleCI branch](https://img.shields.io/circleci/project/github/nielsgl/serverless-boilerplate/develop.svg?label=develop%20build)](https://circleci.com/gh/nielsgl/serverless-boilerplate/tree/develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/3c139bae9f67f3486528/maintainability)](https://codeclimate.com/github/nielsgl/serverless-boilerplate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3c139bae9f67f3486528/test_coverage)](https://codeclimate.com/github/nielsgl/serverless-boilerplate/test_coverage)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0eb33455ba0d47e6891504960733c818)](https://www.codacy.com/app/nvangalenlast/serverless-boilerplate)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/0eb33455ba0d47e6891504960733c818)](https://www.codacy.com/app/nvangalenlast/serverless-boilerplate)

[![node](https://img.shields.io/node/v/gh-badges.svg)]()
[![Libraries.io for GitHub](https://img.shields.io/librariesio/github/nielsgl/serverless-boilerplate.svg)](https://img.shields.io/librariesio/github/nielsgl/serverless-boilerplate.svg)
[![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/nielsgl/serverless-boilerplate.svg)](https://img.shields.io/github/commit-activity/y/nielsgl/serverless-boilerplate.svg)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/nielsgl/serverless-boilerplate/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/nielsgl/serverless-boilerplate.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)
<!--([![GitHub](https://img.shields.io/github/downloads/nielsgl/serverless-boilerplate/total.svg)](https://img.shields.io/github/downloads/nielsgl/serverless-boilerplate/total.svg) -->
<!--[![GitHub issues](https://img.shields.io/github/issues/nielsgl/serverless-boilerplate.svg)](https://github.com/nielsgl/serverless-boilerplate/issues)-->
<!--[![GitHub stars](https://img.shields.io/github/stars/nielsgl/serverless-boilerplate.svg)](https://github.com/nielsgl/serverless-boilerplate/stargazers)-->
<!--[![GitHub forks](https://img.shields.io/github/forks/nielsgl/serverless-boilerplate.svg)](https://github.com/nielsgl/serverless-boilerplate/network) -->

Serverless Boilerplate - Generic boilerplate for developing applications using the Serverless Framework.

---

## Documentation

- [Installation](#installation)
- [Usage and command line options](#usage-and-command-line-options)
- [Debug process](#debug-process)
- [Todo](#todo)
- [Notes](#notes)
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

### DynamoDB / Dynalite

This boilerplate includes two options for running DynamoDB: the JVM-based AWS version and Dynalite, a Node-based version of DynamoDB

### DynamoDB

DynamoDB will be installed locally and automatically though the `install:dynamodb` script in `package.json`, i.e., `yarn install:dynamodb`. For the JVM-based version you need to enable to following plugin in your plugins section:

```yaml
plugins:
  - serverless-webpack
  - serverless-dynamodb-local
  - serverless-offline
```

Note that it comes after the `serverless-webpack` plugin and before the `serverless-offline` plugin.

This configuration in `serverless.yml` starts DynamoDB automatically when the local server is started with `yarn start` or `serverless offline start`.

```yaml
custom:
  dynamodb:
    start:
      port: 8000
      inMemory: true
      migrate: true
      seed: true
```

You can access the shell interface to interact with DynamoDB at `http://localhost:8000/shell`.


### Dynalite

This plugin can be found in the `.serverless_plugins` directory in the root of this boilerplate. I didn't include the official plugin because it does not work with `serverless-offline` and you would need to start it separately.
 If you want to use Dynalite instead, you need to enable it *before* `serverless-webpack` plugin, for example:

```yaml
plugins:
  - serverless-dynalite
  - serverless-webpack
  - serverless-offline
```

### Admin

An admin interface for DynamoDB can be started with `yarn dynamodb:admin`, and will be available on `http://localhost:8001`.


## Contents

This boilerplate contains the following plugins:

- [Serverless Offline Plugin](https://github.com/dherault/serverless-offline): Emulates AWS λ and API Gateway on your local machine to speed up your development cycles.
- [Serverless Webpack](https://github.com/serverless-heaven/serverless-webpack): A Serverless v1.x plugin to build your lambda functions with Webpack.
- [Serverless KMS Secrets](https://github.com/SC5/serverless-kms-secrets): A Serverless Plugin which helps with encrypting service secrets using the AWS Key Management Service (KMS).
- [Serverless Jest Plugin](https://github.com/SC5/serverless-jest-plugin): plugin to enable test driven development using jest, and adding functionality to create functions and tests from command line
- [Serverless AWS Documentation](https://github.com/9cookies/serverless-aws-documentation): Plugin that adds support for AWS API Gateway documentation and models (e.g. to export a Swagger JSON file with input/output definitions and full text documentation for API documentation).
- [Serverless DynamoDB Local](https://github.com/99xt/serverless-dynamodb-local): Allows to run dynamodb locally for serverless.

- file `serverless.yml.json`: Register plugins above
- file `webpack.config.js`: Settings for webpack-plugin
- file `templates/function.ejs`: Template to use for new functions

## Debug process

## TO DO

- API logs
- Hooks
- Build plugin
- Containerization with Docker
- Shell
- ??

### In Progress:

- Test framework (jest)

### Done:

- ~~Gulp with watch and eslint~~
- ~~KMS secrets~~
- ~~Quality check with CodeClimate~~
- ~~Configuration management~~
- ~~Automatic AWS Documentation~~
- ~~Coverage check with Codecov~~
- ~~DynamoDB and Dynalite~~

## Notes

### Jest Plugin

The jest plugin seems to have several issues, such as:

- it doesn't respect a custom template for tests,
- when an error occurs while creating a function and test it still updates the `serverless.yml` file but does not create the function and test file,
- running `serverless invoke test --function foo` only works when the handler defined in the function of `serverless.yml` matches the test name.

## Credits and inspiration

- [SC5's Boilerplate](https://github.com/SC5/sc5-serverless-boilerplate)
- [9cookies AWS Documentation Scripts](https://github.com/9cookies/serverless-aws-documentation/tree/master/example)
- [Serverless Dynalite](https://github.com/sdd/serverless-dynalite)
- [DynamoDB Admin](https://github.com/aaronshaf/dynamodb-admin)

## Contributing

Yes, thank you!
This boilerplate is community-driven, most of its features are from different authors.
Please update the docs and tests and add your name to the package.json file.
We try to follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).

## License

[MIT](https://github.com/nielsgl/serverless-boilerplate/blob/master/LICENSE)
