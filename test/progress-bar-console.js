/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
import * as assert from 'assert';
import { ProgressBar } from '../dist/index.js';
import { record } from 'record-stdstreams';

const offset = 8;

const options = {
};

describe('#progress-bar-capture Normal Operation', function () {
	it('#There should be a text and progress-bar with 0% in the console', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		// eslint-disable-next-line no-console
		console.log('Sometext');
		const { stdout, stderr } = stopRecord();

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset, 35), 'Sometext\n\x1B[2K\x1B[1G0.0% [>...');
		progressBar.finish();
	});
});

