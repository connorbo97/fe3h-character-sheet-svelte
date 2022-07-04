import { PLAYER_STAT } from './constants';
import type { Dice } from './constants/dice';

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
