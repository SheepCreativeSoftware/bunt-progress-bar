/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
import * as assert from 'assert';
import { ProgressBar } from '../dist/index.js';
import { record } from 'record-stdstreams';

const offset = 8;
const offset2 = 4;

const options = {
	percentageFractionDigits: 2,
};

describe('#progress-bar-capture fractionDigits is 2', function () {
	it('#There should be a progress-bar with 0% (in DEC.2) in the console', function () {
		const stopRecord = record();

		const progressBar = new ProgressBar(options);

		progressBar.start();
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset, 10+offset), '0.00% [>..');
		assert.equal(stdout.substring(consoleAvailableWidth-offset, consoleAvailableWidth+offset), '.............]');
		progressBar.finish();
	});
	it('#There should be a progress-bar with 25% (in DEC.2) in the console', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(25);
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset2, 10+offset2), '25.00% [==');
		assert.equal(stdout.substring(consoleAvailableWidth-offset2, consoleAvailableWidth+offset2), '....]');
		progressBar.finish();
	});
	it('#There should be a progress-bar with 50% (in DEC.2) in the console', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(50);
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset2, 10+offset2), '50.00% [==');
		assert.equal(stdout.substring(consoleAvailableWidth-offset2, consoleAvailableWidth+offset2), '....]');
		progressBar.finish();
	});
	it('#There should be a progress-bar with 75% (in DEC.2) in the console', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(75);
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset2, 10+offset2), '75.00% [==');
		assert.equal(stdout.substring(consoleAvailableWidth-offset2, consoleAvailableWidth+offset2), '....]');
		progressBar.finish();
	});
	it('#There should be a progress-bar with 100% (in DEC.2) in the console', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(100);
		const { stdout, stderr } = stopRecord();
		const consoleAvailableWidth = process.stdout.columns;

		assert.equal(stderr, '');
		assert.equal(stdout.substring(offset2, 10+offset2), '100.00% [=');
		assert.equal(stdout.substring(consoleAvailableWidth-offset2, consoleAvailableWidth+offset2), '===>]');
		progressBar.finish();
	});
});

