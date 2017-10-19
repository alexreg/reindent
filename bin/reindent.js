#!/usr/bin/env node

'use strict';

const yargs = require('yargs');

const reindent = require('../main');

function isValidIndentFormatStr(format) {
	return /^t|\d+$/.test(format);
};

function parseIndentFormat(format) {
	let num_spaces;
	if (format === 't') {
		return '\t';
	} else if (!isNaN(num_spaces = parseInt(format))) {
		return ' '.repeat(num_spaces);
	} else {
		throw Error('Invalid indentation format.');
	}
};

const argv = yargs
	.help()
	.alias('h', 'help')
	.command({
		command: '* <file>',
		desc: 'Convert a text file from one indentation format to another',
		builder: (yargs) => yargs
			.positional('file', {
				type: 'string'
			})
			.option('from', {
				alias: 'f',
				type: 'string',
				demandOption: true,
				desc: 'Indentation format to convert from'
			})
			.option('to', {
				alias: 't',
				type: 'string',
				demandOption: true,
				desc: 'Indentation form to convert to'
			})
			.check(argv => {
				if (!isValidIndentFormatStr(argv.from)) {
					throw Error('Invalid indentation format for `from` argument.');
				}
				if (!isValidIndentFormatStr(argv.to)) {
					throw Error('Invalid indentation format for `to` argument.');
				}
				return true;
			}),
		handler: (argv) => {
			reindent(argv.file, parseIndentFormat(argv.from), parseIndentFormat(argv.to));
		}
	})
	.argv;
