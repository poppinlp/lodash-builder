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
			'assignIn',
			'clone'
		]
	}));
});

test('minify and output to file', async t => {
	const tmpFile = path.join(os.tmpdir(), 'lodash-builder-tmp-dist.js');

	await t.notThrows(lodashBuilder({
		methods: [
			'assignIn',
			'clone'
		],
		output: tmpFile
	}));

	fs.unlinkSync(tmpFile);
});

test('no minify and output to stdout', async t => {
	await t.notThrows(lodashBuilder({
		methods: [
			'assignIn',
			'clone'
		],
		minify: false
	}));
});
