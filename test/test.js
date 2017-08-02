import os from 'os';
import path from 'path';
import fs from 'fs';
import test from 'ava';
import lodashBuilder from '../index.js';

test('[output stdout] should build with no error', async t => {
	await t.notThrows(lodashBuilder({
		methods: [
			'assignIn',
			'clone'
		]
	}));
});

test('[output file] should build with no error', async t => {
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
