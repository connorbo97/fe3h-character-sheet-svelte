import { Dice } from './constants/dice';
import { addNumberPrefix } from './textUtils';

export const getDiceFaces = (d: Dice) => parseInt(d.split('d')[1]);
export const rollDice = (n: number) => Math.floor(Math.random() * n + 1);
export const rollD20 = () => rollDice(20);

export const calcDice = (die: CalcEntry) => {
	if (typeof die === 'number') {
		return die;
	}

	const [times, faces] = die.split('d');

	return parseInt(times) * rollDice(parseInt(faces));
};
export const printCalc = (calc: Array<CalcEntry>, addPlusSign?: boolean): string => {
	const res = calc.reduce((acc: string, entry: number | string, index: number) => {
		if (entry === '-' || parseInt(entry + '') < 0) {
			acc = acc.substr(0, acc.length - 1);
		}

		return acc + (entry + '') + (index === calc.length - 1 ? '' : '+');
	}, '');

	if (res.toString()[0] !== '-' && addPlusSign) {
		return '+' + res;
	}

	return res;
};

export const checkCalcRequiresRoll = (calc: Array<CalcEntry>) =>
	calc.some((calc: any) => Object.values(Dice).includes(calc));

export const rollCalc = (calc: Dice | Array<CalcEntry>) => {
	if (!Array.isArray(calc)) {
		return calcDice(calc);
	}

	const res = calc.map((entry) => {
		if (entry === '-') {
			return entry;
		}

		return calcDice(entry);
	});

	let multiplier = 1;
	return res.reduce((acc: number, entry: number | string) => {
		let curMultiplier = multiplier;

		if (entry === '-') {
			multiplier = -1;
			return acc;
		} else {
			multiplier = 1;
		}
		const parsed = parseInt(entry + '');
		return acc + parsed * curMultiplier;
	}, 0);
};

export const simplifyCalc = (calc: Array<CalcEntry>) => {
	let subtractFlag: any = false;
	const SUBTRACT = '-';
	const accStart: { remainingDice: Array<any>; numSum: number } = {
		numSum: 0,
		remainingDice: []
	};
	const diceValues = new Set(Object.values(Dice));
	const { remainingDice, numSum } = calc.reduce((acc, calc: any) => {
		if (calc === SUBTRACT) {
			subtractFlag = true;
		} else if (diceValues.has(calc)) {
			if (subtractFlag) {
				subtractFlag = false;
				acc.remainingDice = [...acc.remainingDice, SUBTRACT, calc];
			} else {
				acc.remainingDice = [...acc.remainingDice, calc];
			}
		} else {
			if (subtractFlag) {
				subtractFlag = false;
				accStart.numSum -= calc;
			} else {
				accStart.numSum += calc;
			}
		}

		return acc;
	}, accStart);

	return [...remainingDice, numSum];
};

const getDiceBoxResult = () => document.getElementById('dice-box-result');
export const rollVisualDice = (
	dice: any = [Dice.d20],
	options: {
		disableRollOnCancel?: any;
		modifier?: Array<CalcEntry>;
		disableResultBox?: boolean;
		onRollResult?: Function;
		clearTimeout?: number;
		customResultBoxLabel?: Function;
	} = {}
): Promise<{ value: number; resultArray: Array<any> }> => {
	return new Promise((resolve) => {
		let waitFlag = true;
		let clearTimer: any = null;
		let submitReturn: any = null;

		let rollHasFinished = false;

		const sanitizedDice = dice.map((d) => {
			switch (d) {
				case Dice.d2:
					return Dice.d4;
				case Dice.d3:
					return Dice.d6;
				case Dice.d5:
					return Dice.d10;
				default:
					return d;
			}
		});

		const onClearDiceRoll = () => {
			waitFlag = false;
			window.diceBox.clear();
			window.diceBoxContainer.style.pointerEvents = 'none';
			(getDiceBoxResult()?.style || { opacity: 0 }).opacity = 0;

			if (clearTimer) {
				clearTimeout(clearTimer);
			}

			if (submitReturn) {
				submitReturn();
			} else if (!rollHasFinished && !options?.disableRollOnCancel) {
				const resultArray = dice.map((die: any) => rollCalc([die]));
				resolve({ value: resultArray.reduce((acc: number, r: number) => acc + r), resultArray });
			}
		};

		const getDefaultLabel = (finalCalc, finalCalcResult) => {
			let defaultFront;

			defaultFront = finalCalc.reduce((acc, cur, i) => {
				const prefix = i === 0 ? '' : ' ';
				const val = i === 0 ? cur : addNumberPrefix(cur, true);
				// if (sanitizedDice[i] !== dice[i]) {
				// 	return acc + prefix + `${val} (${dice[i]})`;
				// 	// return acc + prefix + `${val} (Ceil(${originalResult} / 2))`;
				// } else {
				// 	return acc + prefix + val;
				// }
				return acc + prefix + `${val}${i >= dice.length ? '' : `(${dice[i]})`}`;
			}, '');

			return `${defaultFront} = ${finalCalcResult}`;
		};

		window.diceBox.roll(sanitizedDice).then((res: any) => {
			rollHasFinished = true;

			if (!waitFlag) {
				return;
			}

			let hasUnrealDice = false;

			const originalResult = res.map(({ value }: { value: any }) => value);
			const dieResult = res.map(({ value }: { value: any }, index: number) => {
				if (sanitizedDice[index] !== dice[index]) {
					hasUnrealDice = true;
					const originalFaces = getDiceFaces(dice[index]);
					// return value - originalFaces > 0 ? value - originalFaces : value;
					return Math.ceil(value / 2.0);
				}
				return value;
			});

			const finalCalc = [...dieResult, ...(options.modifier || [])];
			const finalCalcResult = rollCalc(finalCalc);

			const resultBox = getDiceBoxResult();
			if (resultBox && !options.disableResultBox) {
				resultBox.style.opacity = '1';
				resultBox.innerHTML = options?.customResultBoxLabel
					? options?.customResultBoxLabel(finalCalc, finalCalcResult, {
							sanitizedDice,
							hasUnrealDice
					  })
					: getDefaultLabel(finalCalc, finalCalcResult);
			}

			const returnValue = {
				resultArray: finalCalc,
				value: finalCalcResult
			};

			if (options.clearTimeout) {
				submitReturn = () => resolve(returnValue);
				clearTimer = setTimeout(onClearDiceRoll, options.clearTimeout);
			} else {
				resolve(returnValue);
			}
		});

		window.diceBoxContainer.style.pointerEvents = 'auto';
		window.diceBoxContainer.addEventListener('click', onClearDiceRoll, { once: true });
	});
};