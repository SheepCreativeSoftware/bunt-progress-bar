import { mapRange } from './mapRange.js';

const spareCharacters = 5;
const maxPercentage = 100;
const oneLess = 1;

/** Constructs a string to be shown on the terminal */
const constructProgressBar = (value: number, maxNumber:number, prefixText: string, fractionDigits: number) => {
	// Either use value directly
	let percentage = value.toFixed(fractionDigits);
	if(maxNumber === maxPercentage && value >= maxPercentage) percentage = maxPercentage.toFixed(fractionDigits);

	// Recalculate range to percentage range
	if(maxNumber !== maxPercentage) percentage = mapRange(value, { inputMax: maxNumber, outputMax: maxPercentage });
	let output = '';
	if(prefixText !== '') output += `${prefixText}: `;
	output += `${percentage}% `;

	// Map value to the with of the terminal
	const consoleAvailableWidth = process.stdout.columns - spareCharacters - output.length;
	const numberOfSigns = Number(mapRange(value, { fractionDigits: 0, inputMax: maxNumber, outputMax: consoleAvailableWidth }));

	// Construct progress bar
	output += '[';
	for(let index = 0; index < numberOfSigns-oneLess; index++) output += '=';
	output += '>';
	for(let index = 0; index < consoleAvailableWidth-numberOfSigns; index++) output += '.';
	output += ']';
	return output;
};

export { constructProgressBar };
