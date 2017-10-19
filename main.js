'use strict';

const fs = require('fs');
const lineByLine = require('n-readlines');

function reindent_line(line, from_format, to_format) {
	let index = 0;
	let count = 0;
	while (String(line.slice(index, index + from_format.length)) === from_format) {
		index += from_format.length;
		count++;
	}
	return to_format.repeat(count) + line.slice(index);
}

function reindent_file(file_path, from_format, to_format) {
	const backup_file_path = file_path + '.bak';
	fs.renameSync(file_path, backup_file_path);
	try {
		const reader = new lineByLine(backup_file_path);
		const write_stream = fs.createWriteStream(file_path);
		let line;
		while (line = reader.next()) {
			write_stream.write(reindent_line(line, from_format, to_format));
			write_stream.write('\n');
		};
		write_stream.end();
	} catch (e) {
		fs.renameSync(backup_file_path, file_path);
		throw e;
	}
	fs.unlinkSync(backup_file_path);
}

module.exports = reindent_file;
