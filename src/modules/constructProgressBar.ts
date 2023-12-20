import { mapRange } from './mapRange.js';

const spareCharacters = 5;
const maxPercentage = 100;
const oneLess = 1;

const constructProgressBar = (value: number, maxNumber:number, prefixText: string, fractionDigits: number) => {
	let percentage = value.toFixed(fractionDigits);
	if(maxNumber === maxPercentage && value >= maxPercentage) percentage = maxPercentage.toFixed(fractionDigits);
	if(maxNumber !== maxPercentage) percentage = mapRange(value, { inputMax: maxNumber, outputMax: maxPercentage });
	let output = `${prefixText}: ${percentage}% `;

	const consoleAvailableWidth = process.stdout.columns - spareCharacters - output.length;
	const numberOfSigns = Number(mapRange(value, { fractionDigits: 0, inputMax: maxNumber, outputMax: consoleAvailableWidth }));
	output += '[';
	for(let index = 0; index < numberOfSigns-oneLess; index++) output += '=';
	output += '>';
	for(let index = 0; index < consoleAvailableWidth-numberOfSigns; index++) output += '.';
	output += ']';
	return output;
};

export { constructProgressBar };
