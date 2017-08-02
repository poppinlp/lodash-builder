const
	fs = require('fs'),
	path = require('path');
const
	rollup = require('rollup'),
	mkdirp = require('mkdirp'),
	commonjs = require('rollup-plugin-commonjs'),
	nodeResolve = require('rollup-plugin-node-resolve');

module.exports = ({
	methods = [],
	moduleName = '',
	context = 'window',
	format = 'iife',
	output
}) => {
	const
		BUILD_FILE_PATH = path.normalize(`_lodash-builder-${Date.now()}.js`),
		lodashImportList = [],
		lodashExportList = [];

	methods.forEach(name => {
		lodashImportList.push(`import _${name} from 'lodash/${name}';`);
		lodashExportList.push(`${name}: _${name},`);
	});

	fs.writeFileSync(BUILD_FILE_PATH, `
		${lodashImportList.join('')}
		window._ = {
			${lodashExportList.join('')}
		};
	`);

	return rollup.rollup({
		entry: BUILD_FILE_PATH,
		context,
		plugins: [
			nodeResolve({
				jsnext: true,
				main: true,
				browser: true,
				preferBuiltins: false,
				customResolveOptions: {
					moduleDirectory: 'node_modules'
				}
			}),
			commonjs({
				sourceMap: false
			})
		]
	}).then(bundle => bundle.generate({
		format,
		moduleName
	})).then(({ code }) => {
		if (output) {
			mkdirp(path.parse(output).dir);
			fs.writeFileSync(output, code);
		} else {
			console.log(code);
		}

		fs.unlinkSync(BUILD_FILE_PATH);
	});
};
