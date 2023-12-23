/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
import * as assert from 'assert';
import { ProgressBar } from '../dist/index.js';
import { record } from 'record-stdstreams';

const options = {
	isInteractiveSession: false,
};

describe('#progress-bar-capture no-interactive-mode', function () {
	it('#There should be no progress-bar in the console', function () {
		const stopRecord = record();

		const progressBar = new ProgressBar(options);

		progressBar.start();
		const { stdout, stderr } = stopRecord();

		assert.equal(stderr, '');
		assert.equal(stdout, '');

		progressBar.finish();
	});
	it('#There should be no progress-bar with 25% in the console', function () {
		const progressBar = new ProgressBar(options);
		progressBar.start();
		const stopRecord = record();

		progressBar.update(25);
		const { stdout, stderr } = stopRecord();

		assert.equal(stderr, '');
		assert.equal(stdout, '');

		progressBar.finish();
	});
});

