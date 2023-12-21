/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
import { ProgressBar } from '../dist/index.js';

const timeProgress = 10;
const timeLogging = 600;

const options = {
	prefixText: 'Progress',
};

const progressBar = new ProgressBar(options);


let progress = 0;
setInterval(() => {
	progressBar.start().update(progress / 10);
	progress++;
	if(progress >= 1100) {
		progressBar.finish();
		progress = 0;
	}
}, timeProgress);

let progress2 = 0;
setInterval(() => {
	console.log(`Log Text ${progress2}`, progress);
	progress2++;
}, timeLogging);
