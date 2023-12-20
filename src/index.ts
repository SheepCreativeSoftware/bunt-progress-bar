/* eslint-disable no-console */
import { constructProgressBar } from './modules/constructProgressBar.js';
import { nop } from './modules/nop.js';
import { ProgressBarOptions } from './modules/ProgressBarOptions.js';
import { ProgressBarOptionsConstructor } from './modules/ProgressBarOptionsConstructor.js';

const zero = 0;
const theEntireLine = 0;
const startPosition = 0;

/** Displays a progress bar on cli and handles console input while shown */
class ProgressBar {
	/* eslint-disable @typescript-eslint/no-explicit-any, id-denylist */
	private static oldLog: (message?: any, ...optionalParams: any[]) => void;
	private static oldInfo: (message?: any, ...optionalParams: any[]) => void;
	private static oldWarn: (message?: any, ...optionalParams: any[]) => void;
	private static oldError: (message?: any, ...optionalParams: any[]) => void;
	private static oldDebug: (message?: any, ...optionalParams: any[]) => void;
	/* eslint-enable @typescript-eslint/no-explicit-any, id-denylist */
	private options: ProgressBarOptions;
	private firstUsage: boolean = true;
	private lastInputValue: number = zero;
	private static lastProgressBar: string = '';
	private static isProgressBarActive: boolean = true;
	private isDestroyed: boolean = false;

	constructor({
		isInteractiveSession=process.stdout.isTTY, maxNumber= 100, minChangeOfBar=0.5, prefixText='', percentageFractionDigits=1,
	}: ProgressBarOptionsConstructor) {
		ProgressBar.oldLog = console.log;
		ProgressBar.oldInfo = console.info;
		ProgressBar.oldWarn = console.warn;
		ProgressBar.oldError = console.error;
		ProgressBar.oldDebug = console.debug;
		console.log = this.log;
		console.info = this.info;
		console.warn = this.warn;
		console.error = this.error;
		console.debug = this.debug;
		this.options = {
			isInteractiveSession,
			maxNumber,
			minChangeOfBar,
			percentageFractionDigits,
			prefixText,
		};
		this.update(zero);
	}

	public update(value: number): ProgressBar {
		if(!this.options.isInteractiveSession || this.isDestroyed) return this;
		if(!this.firstUsage && value - this.options.minChangeOfBar <= this.lastInputValue ) return this;
		this.lastInputValue = value;

		const output = constructProgressBar(value, this.options.maxNumber, this.options.prefixText, this.options.percentageFractionDigits);
		ProgressBar.lastProgressBar = output;

		ProgressBar.writeProgressBar(this.firstUsage);

		ProgressBar.isProgressBarActive = true;
		this.firstUsage = false;

		return this;
	}

	private static pauseProgressBar() {
		if(!this.isProgressBarActive) return nop;
		ProgressBar.clearProgressBar();
		this.isProgressBarActive = false;

		const resume = () => {
			this.isProgressBarActive = true;
			this.writeProgressBar(true);
		};
		return resume;
	}

	private static clearProgressBar() {
		process.stdout.clearLine(theEntireLine);
		process.stdout.cursorTo(startPosition);
	}

	private static writeProgressBar(clearLine?: boolean) {
		if(!this.isProgressBarActive) return;

		if(clearLine) process.stdout.clearLine(theEntireLine);

		process.stdout.cursorTo(startPosition);
		process.stdout.write(ProgressBar.lastProgressBar);
		this.isProgressBarActive = true;
	}

	public finish() {
		if(this.isDestroyed) return;
		ProgressBar.clearProgressBar();
		this.restoreConsole();
		this.isDestroyed = true;
	}

	private restoreConsole() {
		console.log = ProgressBar.oldLog;
		console.info = ProgressBar.oldInfo;
		console.warn = ProgressBar.oldWarn;
		console.error = ProgressBar.oldError;
		console.debug = ProgressBar.oldDebug;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private log(message?: any, ...optionalParams: any[]) : void {
		const resumeProgressbar = ProgressBar.pauseProgressBar();

		ProgressBar.oldLog(message, ...optionalParams);

		resumeProgressbar();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private info(message?: any, ...optionalParams: any[]) : void {
		const resumeProgressbar = ProgressBar.pauseProgressBar();

		ProgressBar.oldInfo(message, ...optionalParams);

		resumeProgressbar();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private warn(message?: any, ...optionalParams: any[]) : void {
		const resumeProgressbar = ProgressBar.pauseProgressBar();

		ProgressBar.oldWarn(message, ...optionalParams);

		resumeProgressbar();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private error(message?: any, ...optionalParams: any[]) : void {
		const resumeProgressbar = ProgressBar.pauseProgressBar();

		ProgressBar.oldError(message, ...optionalParams);

		resumeProgressbar();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private debug(message?: any, ...optionalParams: any[]) : void {
		const resumeProgressbar = ProgressBar.pauseProgressBar();

		ProgressBar.oldDebug(message, ...optionalParams);

		resumeProgressbar();
	}
}

export { ProgressBar, ProgressBarOptionsConstructor as ProgressBarOptions };
