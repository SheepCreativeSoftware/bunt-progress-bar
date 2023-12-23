/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
import * as assert from 'assert';
import { ProgressBar } from '../dist/index.js';
import { record } from 'record-stdstreams';

const offset = 8;
const offset2 = 4;

const options = {
	minChangeOfValue: 5,
};

describe('#progress-bar-capture minChangeOfValue at 5', function () {
	it('#There should be a progress-bar with 0% in the console', function () {
		const stopRecord = record();

		const progressBar = new ProgressBar(options);

		progressBar.start();
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset, 10+offset), '0.0% [>...');
		assert.equal(stdout.substring(consoleAvailableWidth-offset, consoleAvailableWidth+offset), '.............]');
		progressBar.finish();
	});
	it('#There should be no change on the progress-bar with 5%', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(5);
		const { stdout, stderr } = stopRecord();

		assert.equal(stderr, '');
		assert.equal(stdout, '');

		progressBar.finish();
	});
	it('#There should be a change on the progress-bar with 5.1%', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(5.1);
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset2, 10+offset2), '5.1% [====');
		assert.equal(stdout.substring(consoleAvailableWidth-offset2, consoleAvailableWidth+offset2), '....]');
		progressBar.finish();
	});
});

