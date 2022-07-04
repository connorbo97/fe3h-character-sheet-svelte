import { printCalc } from 'src/utils';
import { Dice } from './dice';
import { WEAPON_TYPE } from './weaponType';

export const COMBAT_ARTS = {
	SWAP: 'SWAP',
	SHOVE: 'SHOVE',
	REPOSITION: 'REPOSITION',
	PULL_BACK: 'PULL_BACK',

	WRATH_STRIKE: 'WRATH_STRIKE',
	GROUNDER: 'GROUNDER',
	BANE_OF_MONSTERS: 'BANE_OF_MONSTERS',

	TEMPEST_LANCE: 'TEMPEST_LANCE',
	KNIGHT_KNEELER: 'KNIGHT_KNEELER',
	SHATTER_SLICE: 'SHATTER_SLICE',
	MONSTER_PIERCER: 'MONSTER_PIERCER',

	SMASH: 'SMASH',
	HELM_SPLITTER: 'HELM_SPLITTER',
	MONSTER_BREAKER: 'MONSTER_BREAKER',
	SPIKE: 'SPIKE',

	CURVED_SHOT: 'CURVED_SHOT',
	DEADEYE: 'DEADEYE',
	MONSTER_BLAST: 'MONSTER_BLAST',
	BREAK_SHOT: 'BREAK_SHOT',

	FADING_BLOW: 'FADING_BLOW',
	RUSHING_BLOW: 'RUSHING_BLOW',
	MONSTER_CRUSHER: 'MONSTER_CRUSHER',
	NIMBLE_COMBO: 'NIMBLE_COMBO',
	HEAVY_COMBO: 'HEAVY_COMBO'
};

export const COMBAT_ARTS_TO_FEATURES: { [s: string]: ArtFeatures } = {
	[COMBAT_ARTS.SWAP]: {
		label: 'Swap',
		description:
			'As action, switch places with an adjacent ally. Does not consume a superiority die when used.'
	},
	[COMBAT_ARTS.REPOSITION]: {
		label: 'Reposition',
		description:
			'As an action, move an adjacent ally directly across you. Does not consume a superiority die'
	},
	[COMBAT_ARTS.SHOVE]: {
		label: 'Shove',
		description:
			'As an action, push an adjacent ally 1 space away from you. Does not consume a superiority die'
	},
	[COMBAT_ARTS.PULL_BACK]: {
		label: 'Pull Back',
		description:
			'As an action, pull you and an adjacent ally 1 square back. Does not consume a superiority die.'
	},
	[COMBAT_ARTS.WRATH_STRIKE]: {
		label: 'Wrath Strike',
		description: '+1 damage, +2 to attack',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [1],
		attackBonus: [2]
	},
	[COMBAT_ARTS.TEMPEST_LANCE]: {
		label: 'Tempest Lance',
		description: '+2 damage, +2 to attack. 50% chance to lose an extra superiority die',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [2],
		attackBonus: [2],
		dieCost: { roll: Dice.d20, target: 10, mod: -1 }
	},
	[COMBAT_ARTS.SMASH]: {
		label: 'Smash',
		description:
			'+1 damage, +4 to attack, +4 to crit rate. 50% chance to lose an extra superiority die',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [1],
		attackBonus: [4],
		critBonus: [4],
		dieCost: { roll: Dice.d20, target: 10, mod: -1 }
	},
	[COMBAT_ARTS.CURVED_SHOT]: {
		label: 'Curved Shot',
		description: '+4 to attack',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [4],
		rangeBonus: 1
	},
	[COMBAT_ARTS.FADING_BLOW]: {
		label: 'Fading Blow',
		description:
			'+2 to damage, +2 to attack, +6 AC on retaliatory attack. After combat, move away from the target 1 square if possible.',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		attackBonus: [2],
		damageBonus: [2]
	}
};
export const getCombatArtsDescription = (feature: ArtFeatures) => {
	const { damageBonus, attackBonus, rangeBonus } = feature;
	return [
		attackBonus ? `${attackBonus} to attack` : '',
		damageBonus ? printCalc(damageBonus) : '',
		rangeBonus ? `Extra Range: ${rangeBonus}` : ''
	]
		.filter((a) => a)
		.join(', ');
};
