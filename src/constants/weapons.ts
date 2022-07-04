import { WEAPON_LEVEL } from './weaponLevel';
import { WEAPON_TYPE } from './weaponType';

export const LEVEL_UP_ORDER = [
	WEAPON_LEVEL.E,
	WEAPON_LEVEL.E_PLUS,
	WEAPON_LEVEL.D,
	WEAPON_LEVEL.D_PLUS,
	WEAPON_LEVEL.C,
	WEAPON_LEVEL.C_PLUS,
	WEAPON_LEVEL.B,
	WEAPON_LEVEL.B_PLUS,
	WEAPON_LEVEL.A,
	WEAPON_LEVEL.A_PLUS,
	WEAPON_LEVEL.S
];

export const WEAPON_LEVEL_TO_LABEL = {
	[WEAPON_LEVEL.E]: 'E',
	[WEAPON_LEVEL.E_PLUS]: 'E+',
	[WEAPON_LEVEL.D]: 'D',
	[WEAPON_LEVEL.D_PLUS]: 'D+',
	[WEAPON_LEVEL.C]: 'C',
	[WEAPON_LEVEL.C_PLUS]: 'C+',
	[WEAPON_LEVEL.B]: 'B',
	[WEAPON_LEVEL.B_PLUS]: 'B+',
	[WEAPON_LEVEL.A]: 'A',
	[WEAPON_LEVEL.A_PLUS]: 'A+',
	[WEAPON_LEVEL.S]: 'S'
};

export const WEAPONS = {
	TRAINING_SWORD: 'TRAINING_SWORD',
	IRON_SWORD: 'IRON_SWORD',
	STEEL_SWORD: 'STEEL_SWORD',

	TRAINING_LANCE: 'TRAINING_LANCE',
	IRON_LANCE: 'IRON_LANCE',
	STEEL_LANCE: 'STEEL_LANCE',
	PIKE: 'PIKE',

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
	WARD: 'WARD',

	IRON_SHIELD: 'IRON_SHIELD'
};

export const SWORD_WEAPONS = [WEAPONS.TRAINING_SWORD, WEAPONS.IRON_SWORD, WEAPONS.STEEL_SWORD];
export const LANCE_WEAPONS = [
	WEAPONS.TRAINING_LANCE,
	WEAPONS.IRON_LANCE,
	WEAPONS.STEEL_LANCE,
	WEAPONS.PIKE
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

export const WEAPON_TO_LABEL = {
	[WEAPONS.TRAINING_SWORD]: 'Training Sword',
	[WEAPONS.IRON_SWORD]: 'Iron Sword',
	[WEAPONS.STEEL_SWORD]: 'Steel Sword',

	[WEAPONS.TRAINING_LANCE]: 'Training Lance',
	[WEAPONS.IRON_LANCE]: 'Iron Lance',
	[WEAPONS.STEEL_LANCE]: 'Steel Lance',
	[WEAPONS.PIKE]: 'Pike',

	[WEAPONS.TRAINING_AXE]: 'Training Axe',
	[WEAPONS.IRON_AXE]: 'Iron Axe',
	[WEAPONS.STEEL_AXE]: 'Steel Axe',
	[WEAPONS.HAMMER]: 'Warhammer',
	[WEAPONS.HAND_AXE]: 'Hand Axe',

	[WEAPONS.TRAINING_BOW]: 'Training Bow',
	[WEAPONS.IRON_BOW]: 'Iron Bow',
	[WEAPONS.STEEL_BOW]: 'Steel Bow',
	[WEAPONS.SHORT_BOW]: 'Short Bow',

	[WEAPONS.TRAINING_GAUNTLETS]: 'Training Gauntlets',
	[WEAPONS.IRON_GAUNTLETS]: 'Iron Gauntlets',
	[WEAPONS.STEEL_GAUNTLETS]: 'Steel Gauntlets',
	[WEAPONS.CLOTH_GAUNTLETS]: 'Cloth Gauntlets',

	[WEAPONS.FIRE]: 'Fire',
	[WEAPONS.THUNDER]: 'Thunder',
	[WEAPONS.WIND]: 'Wind',
	[WEAPONS.BLIZZARD]: 'Blizzard',

	[WEAPONS.BOLGANONE]: 'Bolganone',
	[WEAPONS.THORON]: 'Thoron',
	[WEAPONS.CUTTING_GALE]: 'Cutting Gale',
	[WEAPONS.SAGITTAE]: 'Sagittae',
	[WEAPONS.HAILSTORM]: 'Hailstorm',

	[WEAPONS.HEAL]: 'Heal',
	[WEAPONS.NOSFERATU]: 'Nosferatu',
	[WEAPONS.SERAPHIM]: 'Seraphim',
	[WEAPONS.RECOVER]: 'Recover',
	[WEAPONS.PHYSIC]: 'Physic',
	[WEAPONS.RESTORE]: 'Restore',
	[WEAPONS.WARD]: 'Ward'
};

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