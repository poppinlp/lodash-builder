# lodash-builder

[![Build Status][ci-img]][ci-url]
[![Code coverage][cov-img]][cov-url]
[![Code style][lint-img]][lint-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]

Build your own lodash since there's too many methods in lodash which you may not need.

- packed by rollup
- output in IIFE format or ECMAScript Module
- use in CLI or nodejs
- produce minify dist and source map

## Install

By npm:

```shell
npm i lodash-builder --save
```

By yarn:

```shell
yarn add lodash-builder
```

## Module

The export module of this package is an async function which accepts some params to build custom lodash.

### Params

#### methods

Type: `Array<string>`

Default: `[]`

Description: lodash methods which you want.

#### output

Type: `<string>`

Default: `undefined`

Description: output file path. Will write to stdout if no `output` param specified.

### Response

The export module will response a promise which include `code`.

## Usage Examples

```js
const lodashBuilder = require('lodash-builder');
lodashBuilder({
	methods: [
		'assignIn',
		'clone'
	]
});
```

## Test

```shell
npm test
```

[ci-img]:https://img.shields.io/travis/poppinlp/lodash-builder.svg?style=flat-square
[ci-url]:https://travis-ci.org/poppinlp/lodash-builder

[cov-img]:https://img.shields.io/coveralls/poppinlp/lodash-builder.svg?style=flat-square
[cov-url]:https://coveralls.io/github/poppinlp/lodash-builder?branch=master

[lint-img]:https://img.shields.io/badge/code%20style-handsome-brightgreen.svg?style=flat-square
[lint-url]:https://github.com/poppinlp/eslint-config-handsome

[dep-img]:https://img.shields.io/david/poppinlp/lodash-builder.svg?style=flat-square
[dep-url]:https://david-dm.org/poppinlp/lodash-builder

[dev-dep-img]:https://img.shields.io/david/dev/poppinlp/lodash-builder.svg?style=flat-square
[dev-dep-url]:https://david-dm.org/poppinlp/lodash-builder#info=devDependencies

[npm-ver-img]:https://img.shields.io/npm/v/lodash-builder.svg?style=flat-square
[npm-dl-img]:https://img.shields.io/npm/dm/lodash-builder.svg?style=flat-square
[npm-lc-img]:https://img.shields.io/npm/l/lodash-builder.svg?style=flat-square
[npm-url]:https://www.npmjs.com/package/lodash-builder