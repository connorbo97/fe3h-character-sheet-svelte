import { WEAPONS } from './weapons';
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
			'As action, switch places with an adjacent ally. Does not consume a combat die when used.'
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
			'As an action, pull you and an adjacent ally 1 square back. Does not consume a combat die.'
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
		dieCost: { roll: '1d2', target: 2, mod: -1 }
	},
	[COMBAT_ARTS.SMASH]: {
		label: 'Smash',
		description:
			'+1 damage, +4 to attack, +4 to crit rate. 50% chance to lose an extra superiority die',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [1],
		attackBonus: [4],
		critBonus: [4],
		dieCost: { roll: '1d2', target: 2, mod: -1 }
	},
	[COMBAT_ARTS.CURVED_SHOT]: {
		label: 'Curved Shot',
		description: '+4 to attack',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [4]
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

// Combat Skills
export const COMBAT_SKILLS = {
	MYRMIDON_MASTER: 'MYRMIDON_MASTER',
	SOLDIER_MASTER: 'SOLDIER_MASTER',
	FIGHTER_MASTER: 'FIGHTER_MASTER',
	RANGER_MASTER: 'RANGER_MASTER',
	MONK_MASTER: 'MONK_MASTER',

	MERCENARY_THIEF_SKILL: 'MERCENARY_THIEF_SKILL',
	VANTAGE: 'VANTAGE',
	ANIMAL_WHISPERER: 'ANIMAL_WHISPERER',
	BULLSEYE: 'BULLSEYE',
	DEATH_BLOW: 'DEATH_BLOW',
	ARMORED_COMBAT: 'ARMORED_COMBAT',
	GRAPPLER: 'GRAPPLER',

	FIENDISH_BLOW: 'FIENDISH_BLOW',
	HEAL_PLUS: 'HEAL_PLUS'
};
export const COMBAT_SKILLS_TO_FEATURES: { [s: string]: SkillFeatures } = {
	MYRMIDON_MASTER: {
		label: 'Myrmidon Master',
		description: '+1 AC',
		acBonus: 1
	},
	SOLDIER_MASTER: {
		label: 'Soldier Master',
		description: '+1 protection',
		protectionBonus: 1
	},
	FIGHTER_MASTER: {
		label: 'Fighter Master',
		description: '+1 crit range if the weapon does not have an innate crit chance'
	},
	RANGER_MASTER: {
		label: 'Ranger Master',
		description: '+1 to range when shooting from cover'
	},
	MONK_MASTER: {
		label: 'Monk Master',
		description: '+1 resilience',
		resilienceBonus: 1
	},

	MERCENARY_THIEF_SKILL: {
		label: 'Swift',
		description: '+1 AC',
		acBonus: 1
	},
	VANTAGE: {
		label: 'Vantage',
		description: 'If foe initiates combat, and if HP is ≤ 50%, unit still attacks first'
	},
	ANIMAL_WHISPERER: {
		label: 'Animal Whisperer',
		description: 'You and adjacent allies may roll saves from being dismounted with advantage'
	},
	BULLSEYE: {
		label: 'Bullseye',
		description: '+4 to hit',
		attackBonus: {
			ANY: [4]
		}
	},
	DEATH_BLOW: {
		label: 'Death Blow',
		description: '+2 damage when initiating an attack on already damaged targets'
	},
	ARMORED_COMBAT: {
		label: 'Armored Combat',
		description: '+1 protection when initiating combat'
	},
	GRAPPLER: {
		label: 'Grappler',
		description:
			'Gain the Reposition, Pull back, and Shove combat arts. These do not take up combat art slots'
	},

	FIENDISH_BLOW: {
		label: 'Fiendish Blow',
		description: '+2 damage when attacking an undamaged unit'
	},
	HEAL_PLUS: {
		label: 'Heal Plus',
		description:
			'Doubles number of usages of Heal and increases the HP healed by 1d2. Does not stack with Priest class',
		bonusCharges: {
			[WEAPONS.HEAL]: 8
		},
		attackBonus: {
			[WEAPONS.HEAL]: ['1d2']
		}
	}
};