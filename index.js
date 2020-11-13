#!/usr/bin/env node
'use strict';

const { join } = require('path');

const shell = require('any-shell-escape');
const { exec } = require('child_process');
const fs = require('fs');

const folder = process.argv.slice(2);

let fileEnding = '';
fs.readdirSync(folder[0]).forEach((file) => {
	if (file.endsWith('VOB')) fileEnding = 'VOB';
	if (file.endsWith('vob')) fileEnding = 'vob';
	if (fs.statSync(join(folder[0], file)).size == 0) {
		fs.rename(join(folder[0], file), join(folder[0], '_' + file), () => {
			console.log('Umbenennen der leeren Dateien..');
		});
	}
});

const copyToTemp = shell([ 'copy', '/b', join(folder[0], 'VTS_01_*.' + fileEnding), join(process.cwd(), 'temp.vob') ]);
const vobToMKV = shell([
	'ffmpeg',
	'-y',
	'-i',
	join(process.cwd(), 'temp.vob'),
	'-c:v',
	'libx264',
	'-c:a',
	'aac',
	'-b:a',
	'192k',
	join(process.cwd(), 'video.mkv')
]);

let copyProcess = exec(copyToTemp, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	} else {
		console.info('Kopieren fertig. Starte Konvertierung:\n');
	}
});
copyProcess.stdout.on('data', function(data) {
	console.log(data);
});

copyProcess.on('exit', () => {
	let transcodeProcess = exec(vobToMKV, (err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		} else console.log('Konvertieren fertig.');
	});
	transcodeProcess.stdout.on('data', function(data) {
		console.log(data);
	});
});
