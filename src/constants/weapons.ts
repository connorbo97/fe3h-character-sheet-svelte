import { addNumberPrefix } from 'src/textUtils';
import { Dice } from './dice';
import { PLAYER_STAT } from './stats';
import { MAGIC_WEAPON_TYPES, WEAPON_TYPE } from './weaponType';

export const WEAPONS = {
	TRAINING_SWORD: 'TRAINING_SWORD',
	IRON_SWORD: 'IRON_SWORD',
	STEEL_SWORD: 'STEEL_SWORD',
	LEVIN_SWORD: 'LEVIN_SWORD',
	SWORD_OF_THE_CREATOR: 'SWORD_OF_THE_CREATOR',

	TRAINING_LANCE: 'TRAINING_LANCE',
	IRON_LANCE: 'IRON_LANCE',
	STEEL_LANCE: 'STEEL_LANCE',
	PIKE: 'PIKE',
	LANCE_OF_RUIN: 'LANCE_OF_RUIN',

	TRAINING_AXE: 'TRAINING_AXE',
	IRON_AXE: 'IRON_AXE',
	STEEL_AXE: 'STEEL_AXE',
	HAND_AXE: 'HAND_AXE',
	HAMMER: 'HAMMER',

	TRAINING_BOW: 'TRAINING_BOW',
	IRON_BOW: 'IRON_BOW',
	STEEL_BOW: 'STEEL_BOW',
	SHORT_BOW: 'SHORT_BOW',

	TRAINING_GAUNTLETS: 'TRAINING_GAUNTLETS',
	IRON_GAUNTLETS: 'IRON_GAUNTLETS',
	STEEL_GAUNTLETS: 'STEEL_GAUNTLETS',
	CLOTH_GAUNTLETS: 'CLOTH_GAUNTLETS',

	MIASMA: 'MIASMA',
	FIRE: 'FIRE',
	THUNDER: 'THUNDER',
	WIND: 'WIND',
	BLIZZARD: 'BLIZZARD',

	BOLGANONE: 'BOLGANONE',
	THORON: 'THORON',
	CUTTING_GALE: 'CUTTING_GALE',
	SAGITTAE: 'SAGITTAE',
	HAILSTORM: 'HAILSTORM',

	HEAL: 'HEAL',
	NOSFERATU: 'NOSFERATU',
	SERAPHIM: 'SERAPHIM',

	RECOVER: 'RECOVER',
	PHYSIC: 'PHYSIC',
	RESTORE: 'RESTORE',
	WARD: 'WARD'
};

export const TRAINING_WEAPONS_SET = new Set([
	WEAPONS.TRAINING_SWORD,
	WEAPONS.TRAINING_LANCE,
	WEAPONS.TRAINING_AXE,
	WEAPONS.TRAINING_BOW,
	WEAPONS.TRAINING_GAUNTLETS
]);
export const SWORD_WEAPONS = [
	WEAPONS.TRAINING_SWORD,
	WEAPONS.IRON_SWORD,
	WEAPONS.STEEL_SWORD,
	WEAPONS.LEVIN_SWORD,
	WEAPONS.SWORD_OF_THE_CREATOR
];
export const LANCE_WEAPONS = [
	WEAPONS.TRAINING_LANCE,
	WEAPONS.IRON_LANCE,
	WEAPONS.STEEL_LANCE,
	WEAPONS.PIKE,
	WEAPONS.LANCE_OF_RUIN
];
export const AXE_WEAPONS = [
	WEAPONS.TRAINING_AXE,
	WEAPONS.IRON_AXE,
	WEAPONS.STEEL_AXE,
	WEAPONS.HAMMER,
	WEAPONS.HAND_AXE
];
export const BOW_WEAPONS = [
	WEAPONS.TRAINING_BOW,
	WEAPONS.IRON_BOW,
	WEAPONS.STEEL_BOW,
	WEAPONS.SHORT_BOW
];
export const FIST_WEAPONS = [
	WEAPONS.TRAINING_GAUNTLETS,
	WEAPONS.IRON_GAUNTLETS,
	WEAPONS.STEEL_GAUNTLETS,
	WEAPONS.CLOTH_GAUNTLETS
];
export const REASON_MAGIC = [
	WEAPONS.MIASMA,
	WEAPONS.FIRE,
	WEAPONS.THUNDER,
	WEAPONS.BLIZZARD,
	WEAPONS.WIND,
	WEAPONS.BOLGANONE,
	WEAPONS.THORON,
	WEAPONS.CUTTING_GALE,
	WEAPONS.SAGITTAE,
	WEAPONS.HAILSTORM
];
export const FAITH_MAGIC = [
	WEAPONS.HEAL,
	WEAPONS.NOSFERATU,
	WEAPONS.RECOVER,
	WEAPONS.PHYSIC,
	WEAPONS.RESTORE,
	WEAPONS.WARD
];

export const WEAPON_TO_TYPE = {
	[WEAPONS.TRAINING_SWORD]: WEAPON_TYPE.SWORD,
	[WEAPONS.IRON_SWORD]: WEAPON_TYPE.SWORD,
	[WEAPONS.STEEL_SWORD]: WEAPON_TYPE.SWORD,

	[WEAPONS.TRAINING_LANCE]: WEAPON_TYPE.LANCE,
	[WEAPONS.IRON_LANCE]: WEAPON_TYPE.LANCE,
	[WEAPONS.STEEL_LANCE]: WEAPON_TYPE.LANCE,
	[WEAPONS.PIKE]: WEAPON_TYPE.LANCE,

	[WEAPONS.TRAINING_AXE]: WEAPON_TYPE.AXE,
	[WEAPONS.IRON_AXE]: WEAPON_TYPE.AXE,
	[WEAPONS.STEEL_AXE]: WEAPON_TYPE.AXE,
	[WEAPONS.HAMMER]: WEAPON_TYPE.AXE,
	[WEAPONS.HAND_AXE]: WEAPON_TYPE.AXE,

	[WEAPONS.TRAINING_BOW]: WEAPON_TYPE.BOW,
	[WEAPONS.IRON_BOW]: WEAPON_TYPE.BOW,
	[WEAPONS.STEEL_BOW]: WEAPON_TYPE.BOW,
	[WEAPONS.SHORT_BOW]: WEAPON_TYPE.BOW,

	[WEAPONS.TRAINING_GAUNTLETS]: WEAPON_TYPE.FISTS,
	[WEAPONS.IRON_GAUNTLETS]: WEAPON_TYPE.FISTS,
	[WEAPONS.STEEL_GAUNTLETS]: WEAPON_TYPE.FISTS,
	[WEAPONS.CLOTH_GAUNTLETS]: WEAPON_TYPE.FISTS,

	[WEAPONS.FIRE]: WEAPON_TYPE.REASON,
	[WEAPONS.THUNDER]: WEAPON_TYPE.REASON,
	[WEAPONS.WIND]: WEAPON_TYPE.REASON,
	[WEAPONS.BLIZZARD]: WEAPON_TYPE.REASON,

	[WEAPONS.BOLGANONE]: WEAPON_TYPE.REASON,
	[WEAPONS.THORON]: WEAPON_TYPE.REASON,
	[WEAPONS.CUTTING_GALE]: WEAPON_TYPE.REASON,
	[WEAPONS.SAGITTAE]: WEAPON_TYPE.REASON,
	[WEAPONS.HAILSTORM]: WEAPON_TYPE.REASON,

	[WEAPONS.HEAL]: WEAPON_TYPE.FAITH,
	[WEAPONS.NOSFERATU]: WEAPON_TYPE.FAITH,
	[WEAPONS.SERAPHIM]: WEAPON_TYPE.FAITH,
	[WEAPONS.RECOVER]: WEAPON_TYPE.FAITH,
	[WEAPONS.PHYSIC]: WEAPON_TYPE.FAITH,
	[WEAPONS.RESTORE]: WEAPON_TYPE.FAITH,
	[WEAPONS.WARD]: WEAPON_TYPE.FAITH
};
export const WEAPONS_TO_FEATURES: { [s: string]: WeaponFeatures } = {
	[WEAPONS.TRAINING_SWORD]: {
		label: 'Training Sword',
		description: '',
		type: WEAPON_TYPE.SWORD,
		acBonus: 1,
		damage: [1],
		attackBonus: 3,
		range: [1]
	},
	[WEAPONS.IRON_SWORD]: {
		label: 'Iron Sword',
		description: '',
		type: WEAPON_TYPE.SWORD,
		damage: [Dice.d2, 1],
		attackBonus: 1,
		range: [1]
	},
	[WEAPONS.STEEL_SWORD]: {
		label: 'Steel Sword',
		description: '',
		type: WEAPON_TYPE.SWORD,
		acBonus: -1,
		followUpBonus: -2,
		damage: [Dice.d3, 1],
		attackBonus: -1,
		range: [1]
	},
	[WEAPONS.LEVIN_SWORD]: {
		label: 'Levin Sword',
		description: 'Uses Int instead of Str for damage',
		type: WEAPON_TYPE.SWORD,
		acBonus: -1,
		followUpBonus: -1,
		damage: [Dice.d3, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -4,
		range: [1, 2]
	},
	[WEAPONS.SWORD_OF_THE_CREATOR]: {
		label: 'Sword of the Creator',
		description: '',
		type: WEAPON_TYPE.SWORD,
		acBonus: -1,
		followUpBonus: -1,
		damage: [Dice.d2, 1],
		attackBonus: 1,
		range: [1, 2]
	},

	[WEAPONS.TRAINING_LANCE]: {
		label: 'Training Lance',
		description: '',
		type: WEAPON_TYPE.LANCE,
		acBonus: 1,
		damage: [Dice.d2],
		attackBonus: 1,
		range: [1]
	},
	[WEAPONS.IRON_LANCE]: {
		label: 'Iron Lance',
		description: '',
		type: WEAPON_TYPE.LANCE,
		damage: [Dice.d2, 1],
		attackBonus: -1,
		range: [1]
	},
	[WEAPONS.STEEL_LANCE]: {
		label: 'Steel Lance',
		description: '',
		type: WEAPON_TYPE.LANCE,
		acBonus: -1,
		followUpBonus: -2,
		damage: [Dice.d3, 2],
		attackBonus: -2,
		range: [1]
	},
	[WEAPONS.PIKE]: {
		label: 'Pike',
		description: '+1 range',
		type: WEAPON_TYPE.LANCE,
		acBonus: -2,
		followUpBonus: -3,
		damage: [Dice.d3, 1],
		attackBonus: -2,
		range: [1, 2]
	},
	[WEAPONS.LANCE_OF_RUIN]: {
		label: 'Lance of Ruin',
		description: '',
		type: WEAPON_TYPE.LANCE,
		acBonus: -1,
		followUpBonus: -2,
		damage: [Dice.d2, 4],
		attackBonus: -4,
		range: [1]
	},

	[WEAPONS.TRAINING_AXE]: {
		label: 'Training Axe',
		description: '',
		type: WEAPON_TYPE.AXE,
		acBonus: 1,
		damage: [Dice.d2, 1],
		attackBonus: -1,
		range: [1]
	},
	[WEAPONS.IRON_AXE]: {
		label: 'Iron Axe',
		description: '',
		type: WEAPON_TYPE.AXE,
		damage: [Dice.d3, 1],
		attackBonus: -3,
		range: [1]
	},
	[WEAPONS.STEEL_AXE]: {
		label: 'Steel Axe',
		description: '',
		type: WEAPON_TYPE.AXE,
		acBonus: -2,
		damage: [Dice.d4, 1],
		followUpBonus: -3,
		attackBonus: -4,
		range: [1]
	},
	[WEAPONS.HAMMER]: {
		label: 'Warhammer',
		description: '',
		type: WEAPON_TYPE.AXE,
		damage: [Dice.d4, 1],
		acBonus: -3,
		followUpBonus: -4,
		attackBonus: -5,
		range: [1]
	},
	[WEAPONS.HAND_AXE]: {
		label: 'Hand Axe',
		description: '',
		type: WEAPON_TYPE.AXE,
		followUpBonus: -1,
		damage: [Dice.d2],
		attackBonus: -3,
		range: [1]
	},

	[WEAPONS.TRAINING_BOW]: {
		label: 'Training Bow',
		description: '',
		type: WEAPON_TYPE.BOW,
		acBonus: 1,
		damage: [1],
		attackBonus: 1,
		range: [2]
	},
	[WEAPONS.IRON_BOW]: {
		label: 'Iron Bow',
		description: '',
		type: WEAPON_TYPE.BOW,
		damage: [Dice.d2, 1],
		range: [2]
	},
	[WEAPONS.STEEL_BOW]: {
		label: 'Steel Bow',
		description: '',
		type: WEAPON_TYPE.BOW,
		acBonus: -1,
		followUpBonus: -2,
		attackBonus: -1,
		damage: [Dice.d3, 1],
		range: [2]
	},
	[WEAPONS.SHORT_BOW]: {
		label: 'Short Bow',
		description: '',
		acBonus: 1,
		followUpBonus: 1,
		type: WEAPON_TYPE.BOW,
		damage: [Dice.d2],
		attackBonus: 1,
		range: [1, 2]
	},

	[WEAPONS.TRAINING_GAUNTLETS]: {
		label: 'Training Fists',
		description: '',
		type: WEAPON_TYPE.FISTS,
		acBonus: 1,
		attackBonus: 1,
		damage: [Dice.d2, -1],
		range: [1]
	},
	[WEAPONS.IRON_GAUNTLETS]: {
		label: 'Iron Fists',
		description: '',
		type: WEAPON_TYPE.FISTS,
		damage: [1],
		attackBonus: 0,
		range: [1]
	},
	[WEAPONS.STEEL_GAUNTLETS]: {
		label: 'Steel Fists',
		description: '',
		type: WEAPON_TYPE.FISTS,
		attackBonus: -1,
		damage: [Dice.d2, 1],
		range: [1]
	},
	[WEAPONS.CLOTH_GAUNTLETS]: {
		label: 'Hand Wraps',
		description: "Doesn't consume superiority dies when using combat arts",
		type: WEAPON_TYPE.FISTS,
		acBonus: 1,
		followUpBonus: 1,
		attackBonus: 1,
		damage: [0],
		range: [1],
		dieCost: { roll: 1, target: 0, mult: 0 }
	},

	[WEAPONS.MIASMA]: {
		label: 'Miasma',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d2, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -1,
		followUpBonus: -1,
		range: [1, 2],
		uses: 10
	},
	[WEAPONS.FIRE]: {
		label: 'Fire',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d2],
		damageType: [PLAYER_STAT.INT],
		attackBonus: 1,
		range: [1, 2],
		uses: 10
	},
	[WEAPONS.THUNDER]: {
		label: 'Thunder',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d2, 1],
		damageType: [PLAYER_STAT.INT],
		critBonus: 1,
		attackBonus: -1,
		range: [1, 2],
		uses: 8
	},
	[WEAPONS.WIND]: {
		label: 'Wind',
		description: '',
		type: WEAPON_TYPE.REASON,
		followUpBonus: 1,
		acBonus: 1,
		attackBonus: 3,
		damage: [1],
		damageType: [PLAYER_STAT.INT],
		critBonus: 2,
		range: [1, 2],
		uses: 12
	},
	[WEAPONS.BLIZZARD]: {
		label: 'Blizzard',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d2, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -3,
		critBonus: 3,
		range: [1, 2],
		uses: 10
	},

	[WEAPONS.BOLGANONE]: {
		label: 'Bolganone',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d3, 1],
		damageType: [PLAYER_STAT.INT],
		range: [1, 2],
		uses: 5
	},
	[WEAPONS.THORON]: {
		label: 'Thoron',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d3, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -2,
		critBonus: 2,
		range: [1, 3],
		uses: 4
	},
	[WEAPONS.CUTTING_GALE]: {
		label: 'Cutting Gale',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d2, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: 2,
		critBonus: 2,
		range: [1, 2],
		uses: 6
	},
	[WEAPONS.SAGITTAE]: {
		label: 'Sagittae',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d2, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: 1,
		critBonus: 1,
		range: [1, 2],
		uses: 10
	},
	[WEAPONS.HAILSTORM]: {
		label: 'Hailstorm',
		description: '',
		type: WEAPON_TYPE.REASON,
		damage: [Dice.d5],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -3,
		critBonus: 3,
		range: [1, 2],
		uses: 6
	},

	[WEAPONS.HEAL]: {
		label: 'Heal',
		description: '',
		isHealing: true,
		type: WEAPON_TYPE.FAITH,
		damage: [2],
		damageType: [PLAYER_STAT.INT],
		range: [1],
		uses: 8
	},
	[WEAPONS.NOSFERATU]: {
		label: 'Nosferatu',
		description: 'Heals user for damage dealt / 2 (rounded down)',
		type: WEAPON_TYPE.FAITH,
		damage: [1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -1,
		range: [1, 2],
		uses: 8
	},
	[WEAPONS.SERAPHIM]: {
		label: 'Seraphim',
		description: '',
		type: WEAPON_TYPE.FAITH,
		damage: [Dice.d2, 1],
		damageType: [PLAYER_STAT.INT],
		attackBonus: -2,
		critBonus: 1,
		range: [1, 2],
		uses: 8
	},
	[WEAPONS.RECOVER]: {
		label: 'Recover',
		description: '',
		type: WEAPON_TYPE.FAITH,
		isHealing: true,
		damage: [8],
		damageType: [PLAYER_STAT.INT],
		range: [1],
		uses: 5
	},
	[WEAPONS.PHYSIC]: {
		label: 'Physic',
		description: '',
		type: WEAPON_TYPE.FAITH,
		isHealing: true,
		damage: [2],
		damageType: [PLAYER_STAT.INT],
		range: ['1', '2 + 2 * INT'],
		uses: 5
	},
	[WEAPONS.RESTORE]: {
		label: 'Restore',
		description: 'Removes all status effects from targeted player',
		type: WEAPON_TYPE.FAITH,
		damage: [0],
		damageType: [PLAYER_STAT.INT],
		range: ['1', '2 + INT'],
		uses: 10
	},
	[WEAPONS.WARD]: {
		label: 'Ward',
		description: 'Give targeted player +3 resistance. Reduces by 1 each round (cannot be stacked)',
		type: WEAPON_TYPE.FAITH,
		damageType: [PLAYER_STAT.INT],
		damage: [0],
		range: [1],
		uses: 5
	}
};

export const HEALING_MAGIC = new Set(
	Object.keys(WEAPONS_TO_FEATURES).filter((k) => WEAPONS_TO_FEATURES[k].isHealing)
);

const [MAGIC_WEAPONS, MARTIAL_WEAPONS] = Object.keys(WEAPONS_TO_FEATURES).reduce(
	(acc: any, w: any) => {
		if (MAGIC_WEAPON_TYPES.includes(WEAPONS_TO_FEATURES[w].type)) {
			acc[0].push(w);
		} else {
			acc[1].push(w);
		}

		return acc;
	},
	[[], []]
);
export { MAGIC_WEAPONS, MARTIAL_WEAPONS };

export const getWeaponDescription = (feature: WeaponFeatures) => {
	const { damage, attackBonus, range, critBonus, description, followUpBonus, isHealing } = feature;
	return [
		attackBonus ? `Attack: ${addNumberPrefix(attackBonus)}` : '',
		`${isHealing ? 'HP Restored' : 'Damage'}: ${damage.reduce((acc, cur, i) => {
			return acc + (i === 0 ? cur : addNumberPrefix(cur));
		}, '')}`,
		`Range: ${Array.isArray(range) ? range?.join('-') : range}`,
		critBonus ? `Crit Bonus: ${critBonus}` : '',
		followUpBonus ? `AS Bonus: ${addNumberPrefix(followUpBonus)}` : '',
		description
	]
		.filter((a) => a)
		.join(', ');
};
