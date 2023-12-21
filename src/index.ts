/* eslint-disable no-console */
import { constructProgressBar } from './modules/constructProgressBar.js';
import { nop } from './modules/nop.js';
import { ProgressBarOptions } from './modules/ProgressBarOptions.js';
import { ProgressBarOptionsConstructor } from './modules/ProgressBarOptionsConstructor.js';

const zero = 0;
const theEntireLine = 0;
const startPosition = 0;
const maxPercentage = 100;

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
	private static isProgressBarActive: boolean = false;
	private isDestroyed: boolean = true;

	constructor({
		isInteractiveSession=process.stdout.isTTY, maxNumber= 100, minChangeOfValue=1, prefixText='', percentageFractionDigits=1,
	}: ProgressBarOptionsConstructor) {
		this.options = {
			isInteractiveSession,
			maxNumber,
			minChangeOfValue,
			percentageFractionDigits,
			prefixText,
		};
	}

	/** Initialize progress bar */
	public start() {
		if(!this.isDestroyed) return this;

		// Capture console
		ProgressBar.oldLog = console.log;
		ProgressBar.oldInfo = console.info;
		ProgressBar.oldWarn = console.warn;
		ProgressBar.oldError = console.error;
		ProgressBar.oldDebug = console.debug;

		// And map it to own functions
		console.log = this.log;
		console.info = this.info;
		console.warn = this.warn;
		console.error = this.error;
		console.debug = this.debug;

		// Setup initial vars
		this.firstUsage = true;
		ProgressBar.lastProgressBar = '';
		this.lastInputValue = zero;
		this.isDestroyed = false;
		ProgressBar.isProgressBarActive = false;

		// Construct first Progress bar
		this.update(zero);
		return this;
	}

	/** Updates the progress of the progress bar */
	public update(value: number): ProgressBar {
		if(!this.options.isInteractiveSession || this.isDestroyed) return this;
		const minChangeOfValue = this.options.maxNumber / maxPercentage * this.options.minChangeOfValue;
		if(!this.firstUsage && value - minChangeOfValue <= this.lastInputValue ) return this;

		this.lastInputValue = value;

		const output = constructProgressBar(value, this.options.maxNumber, this.options.prefixText, this.options.percentageFractionDigits);
		ProgressBar.lastProgressBar = output;
		ProgressBar.isProgressBarActive = true;
		ProgressBar.writeProgressBar(this.firstUsage);

		this.firstUsage = false;

		return this;
	}

	/** Stops and removes progress bar and returns a function to resume the progress bar */
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

	/** Removes the progress bar and sets the cursor back to the begining */
	private static clearProgressBar() {
		process.stdout.clearLine(theEntireLine);
		process.stdout.cursorTo(startPosition);
	}

	/** Write the progress bar to the terminal */
	private static writeProgressBar(clearLine?: boolean) {
		if(!this.isProgressBarActive) return;

		// Only clear line if needed (prevents flickering)
		if(clearLine) process.stdout.clearLine(theEntireLine);

		process.stdout.cursorTo(startPosition);
		process.stdout.write(ProgressBar.lastProgressBar);
	}

	/** Finish the progress and clears/destroys the progress bar */
	public finish() {
		if(this.isDestroyed) return this;

		// Remove Progressbar
		ProgressBar.clearProgressBar();
		this.restoreConsole();
		this.isDestroyed = true;
		return this;
	}

	/** Restores the original fuction mapping of console */
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
