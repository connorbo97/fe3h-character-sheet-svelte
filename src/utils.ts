import { PLAYER_STAT } from './constants';
import { Dice } from './constants/dice';

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
export const printCalc = (calc: Array<CalcEntry>): string =>
	calc.reduce((acc: string, entry: number | string, index: number) => {
		if (entry === '-' || parseInt(entry + '') < 0) {
			acc = acc.substr(0, acc.length - 1);
		}

		return acc + (entry + '') + (index === calc.length - 1 ? '' : '+');
	}, '');

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

// export const getACFromStatsLoadoutAndCombat = (
// 	sheet: any,
// 	loadout: {
// 		class: any;
// 		weapon: any;
// 		skills: any;
// 	},
// 	otherBonuses: { terrainMod: number }
// ) => {
//   sheet.acBonus
// };
