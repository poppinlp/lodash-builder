import os from 'os';
import path from 'path';
import fs from 'fs';
import test from 'ava';
import lodashBuilder from '../index.js';

test('default params', async t => {
	await t.notThrows(lodashBuilder());
});

test('minify and output to stdout', async t => {
	await t.notThrows(lodashBuilder({
		methods: [
			'join'
		]
	}));
});

test('minify and output to file', async t => {
	const tmpFile = path.join(os.tmpdir(), 'lodash-builder-tmp-dist.js');

	await t.notThrows(lodashBuilder({
		methods: [
			'join'
		],
		output: tmpFile
	}));

	fs.unlinkSync(tmpFile);
});

test('no minify', async t => {
	await t.notThrows(lodashBuilder({
		methods: [
			'join'
		],
		minify: false
	}));
});

test('es format', async t => {
	await t.notThrows(lodashBuilder({
		methods: [
			'join'
		],
		format: 'es',
		minify: false
	}));
});

test('umd format', async t => {
	await t.notThrows(lodashBuilder({
		methods: [
			'join'
		],
		format: 'umd',
		minify: false
	}));
});
