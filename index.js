const
	fs = require('fs'),
	path = require('path');
const
	rollup = require('rollup'),
	mkdirp = require('mkdirp'),
	uglify = require('uglify-es'),
	assign = require('lodash/assign'),
	commonjs = require('rollup-plugin-commonjs'),
	nodeResolve = require('rollup-plugin-node-resolve');
const DEFAULT_CONFIG = {
	methods: [],
	format: 'iife',
	minify: true
};

module.exports = (config = {}) => {
	const
		BUILD_FILE_PATH = path.normalize(`_lodash-builder-${process.hrtime().join('')}.js`),
		lodashImportList = [],
		lodashExportList = [],
		{ methods, minify, format, output } = assign({}, DEFAULT_CONFIG, config);

	methods.forEach(name => {
		lodashImportList.push(`import _${name} from 'lodash/${name}';`);
		lodashExportList.push(`${name}: _${name},`);
	});

	fs.writeFileSync(BUILD_FILE_PATH, `
		${lodashImportList.join('')}
		export default { ${lodashExportList.join('')} };
	`);

	return rollup.rollup({
		entry: BUILD_FILE_PATH,
		context: 'window',
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
		moduleName: '_'
	})).then(({ code }) => {
		const result = minify ? uglify.minify(code).code : code;

		if (output) {
			mkdirp(path.parse(output).dir);
			fs.writeFileSync(output, result);
		} else {
			console.log(result);
		}

		fs.unlinkSync(BUILD_FILE_PATH);
	});
};
