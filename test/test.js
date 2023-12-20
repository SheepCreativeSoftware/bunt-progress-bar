import { ProgressBar } from '../dist/index.js';

const timeProgress = 10;
const timeLogging = 1000;
const variation = 200;
const options = {
	prefixText: 'Progress',
};

let progressBar = new ProgressBar(options);

let progress = 0;
const intervalProgress = setInterval(() => {
	progressBar.update(progress / 10);
	progress++;
	if(progress >= 1100) {
		progressBar.finish();
		//clearInterval(intervalProgress);
		progress = 0;
		progressBar = new ProgressBar(options);
	}
}, timeProgress);

let progress2 = 0;
setInterval(() => {
	console.log(`Log Text ${progress2}`, progress);
	progress2++;
}, timeLogging);

setInterval(() => {
	console.error(`Error Text ${progress2}`);
}, timeLogging+variation);

setInterval(() => {
	console.warn(`Warn Text ${progress2}`);
}, timeLogging+variation+variation);

setInterval(() => {
	console.info(`Info Text ${progress2}`);
}, timeLogging-variation);

setInterval(() => {
	console.debug(`Debug Text ${progress2}`);
}, timeLogging-variation-variation);
