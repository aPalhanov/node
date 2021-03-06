#!/usr/bin/env node



//node index.js -f test.json
//echo "[1,2,3]" | node index.js -f -


const concat = require('mississippi').concat;
const readFile = require('fs').readFile;
const yargs = require('yargs');
const argv = yargs
	.usage('parse-json [options]')
	.help('h')
	.alias('h', 'help')
	.demand('f') // require -f to run
	.nargs('f', 1) // tell yargs -f needs 1 argument after it
	.describe('f', 'JSON file to parse')
	.argv;

//console.log(argv);

const file = argv.f;

function parse(str) {
	const value = JSON.parse(str);
	console.log(JSON.stringify(value));
}

if (file === '-') {
	process.stdin.pipe(concat(parse));
} else {
	readFile(file, (err, dataBuffer) => {
		if (err) throw err;
		else parse(dataBuffer.toString());
	});
}
