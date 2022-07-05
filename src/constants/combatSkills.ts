import { Dice } from './dice';
import { WEAPONS } from './weapons';
import { WEAPON_TYPE } from './weaponType';

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
		description: '+1 to attack when shooting from cover',
		queries: [
			{
				prompt: 'ranged attack from cover?',
				compatibleWeapons: [
					WEAPON_TYPE.SWORD,
					WEAPON_TYPE.AXE,
					WEAPON_TYPE.LANCE,
					WEAPON_TYPE.FISTS,
					WEAPON_TYPE.BOW
				],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						attackBonus: [1],
						description: '+1 attack'
					}
				]
			}
		]
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
		description: '+2 damage when initiating an attack on already damaged targets',
		queries: [
			{
				prompt: 'is target damaged?',
				compatibleWeapons: [
					WEAPON_TYPE.SWORD,
					WEAPON_TYPE.AXE,
					WEAPON_TYPE.LANCE,
					WEAPON_TYPE.FISTS,
					WEAPON_TYPE.BOW
				],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						damageBonus: [2],
						description: '+2 damage'
					}
				]
			}
		]
	},
	ARMORED_COMBAT: {
		label: 'Armored Combat',
		description: '+1 protection when initiating combat',
		queries: [
			{
				prompt: 'are you initiating combat?',
				compatibleWeapons: [
					WEAPON_TYPE.SWORD,
					WEAPON_TYPE.AXE,
					WEAPON_TYPE.LANCE,
					WEAPON_TYPE.FISTS,
					WEAPON_TYPE.BOW
				],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						protectionBonus: 1,
						description: '+1 protection'
					}
				]
			}
		]
	},
	GRAPPLER: {
		label: 'Grappler',
		description:
			'Gain the Reposition, Pull back, and Shove combat arts. These do not take up combat art slots'
	},

	FIENDISH_BLOW: {
		label: 'Fiendish Blow',
		description: '+2 damage when attacking an undamaged unit',
		queries: [
			{
				prompt: 'is target at full hp?',
				compatibleWeapons: [WEAPON_TYPE.REASON, WEAPON_TYPE.FAITH],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						damageBonus: [2],
						description: '+2 damage'
					}
				]
			}
		]
	},
	HEAL_PLUS: {
		label: 'Heal Plus',
		description:
			'Doubles number of usages of Heal and increases the HP healed by 1d2. Does not stack with Priest class',
		bonusCharges: {
			[WEAPONS.HEAL]: 8
		},
		attackBonus: {
			[WEAPONS.HEAL]: [Dice.d2]
		}
	}
};
