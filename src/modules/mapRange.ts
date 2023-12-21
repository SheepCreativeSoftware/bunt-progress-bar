
/** Calculates a factor for multiplication/division to get the given fraction */
const getDigitFactor = (fractionDigits: number) => {
	const factorBase = 10;
	return Math.pow(factorBase, fractionDigits);
};

/** Map a input value with given range to a different range */
const mapRange = ( inputValue: number, { inputMin=0, inputMax, outputMin=0, outputMax, limit=true, fractionDigits=1 }: {
	inputMin?: number, inputMax: number, outputMin?: number, outputMax: number,

	/** Limit output to Min/Max (Default=true) */
	limit?: boolean,

	/** Digits after decimal point (Default=1) */
	fractionDigits?: number
}) => {
	// Output directly in case limit has reached
	if(limit && inputValue >= inputMax) return outputMax.toFixed(fractionDigits);
	if(limit && inputValue <= inputMin) return outputMin.toFixed(fractionDigits);
	const factorDigit = getDigitFactor(fractionDigits);

	// Wrong expectation from eslint
	// eslint-disable-next-line no-extra-parens
	const newValue = (inputValue - inputMin) * (outputMax - outputMin) / ((inputMax - inputMin) + outputMin);
	return (Math.round(newValue * factorDigit) / factorDigit).toFixed(fractionDigits);
};

export { mapRange };
