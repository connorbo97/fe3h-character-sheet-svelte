import { COMBAT_SKILLS, CLASS, CrestType } from './constants';
import { Dice } from './constants/dice';

export const setEquality = (as: Set<any>, bs: Set<any>) => {
	if (as.size !== bs.size) return false;
	for (var a of as) if (!bs.has(a)) return false;
	return true;
};

export const getModifierByPlayerStat = (stat: number) => {
	if (stat === undefined) {
		return 0;
	}
	return Math.floor((stat - 10) / 2);
};

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

export const checkHealPlus = (equippedClass: string, equippedCombatSkills: Array<string>) =>
	equippedCombatSkills.includes(COMBAT_SKILLS.HEAL_PLUS) || equippedClass === CLASS.PRIEST;

// download utils

const download = (content: any, fileName: any, contentType: any) => {
	var a = document.createElement('a');
	var file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
};
export const onExportSheet = (fullSheet: CharacterSheet, prefix = '') => {
	try {
		download(JSON.stringify(fullSheet), `${prefix}${fullSheet.playerName}-fe3h.json`, 'text/plain');
	} catch (err) {
		alert('Failed to export sheet, see console');
		console.error(err);
	}
};

export const copyToClipboard = (text: any) => {
	navigator.clipboard.writeText(text);
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
	} = {}
) => {
	return new Promise((resolve) => {
		let waitFlag = true;
		let clearTimer: any = null;
		let submitReturn: any = null;

		let rollHasFinished = false;

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

		window.diceBox.roll(dice).then((res: any) => {
			rollHasFinished = true;

			if (!waitFlag) {
				return;
			}

			const dieResult = res.map(({ value }: { value: any }) => value);
			const finalCalc = [...dieResult, ...(options.modifier || [])];
			const finalCalcResult = rollCalc([...dieResult, ...(options.modifier || [])]);

			const resultBox = getDiceBoxResult();
			if (resultBox && !options.disableResultBox) {
				resultBox.style.opacity = '1';
				resultBox.innerHTML = `${printCalc(finalCalc)} = ${finalCalcResult}`;
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

export const addNumberPrefix = (num) => `${num > 0 ? '+' : ''}${num}`;
export const getCrestStrengthText = (bool: any) => (bool ? 'Major' : 'Minor');
export const getCrestStrength = (bool: any) => (bool ? CrestType.MAJOR : CrestType.MINOR);
