// STATS
export const PLAYER_STAT = {
	STR: 'pc_strength',
	DEX: 'pc_dexterity',
	CON: 'pc_constitution',
	INT: 'pc_intelligence',
	WIS: 'pc_wisdom',
	CHA: 'pc_charisma'
};

export const PLAYER_STAT_TO_LABEL = {
	[PLAYER_STAT.STR]: 'Strength',
	[PLAYER_STAT.DEX]: 'Dexterity',
	[PLAYER_STAT.CON]: 'Constitution',
	[PLAYER_STAT.INT]: 'Intelligence',
	[PLAYER_STAT.WIS]: 'Wisdom',
	[PLAYER_STAT.CHA]: 'Charisma'
};
export const PLAYER_STAT_TO_SHORT_LABEL = {
	[PLAYER_STAT.STR]: 'Str',
	[PLAYER_STAT.DEX]: 'Dex',
	[PLAYER_STAT.CON]: 'Con',
	[PLAYER_STAT.INT]: 'Int',
	[PLAYER_STAT.WIS]: 'Wis',
	[PLAYER_STAT.CHA]: 'Cha'
};

export const PLAYER_SKILL = {
	ACROBATICS: 'ACROBATICS',
	ANIMAL_HANDLING: 'ANIMAL_HANDLING',
	ARCANA: 'ARCANA',
	ATHLETICS: 'ATHLETICS',
	DECEPTION: 'DECEPTION',
	HISTORY: 'HISTORY',
	INSIGHT: 'INSIGHT',
	INTIMIDATION: 'INTIMIDATION',
	INVESTIGATION: 'INVESTIGATION',
	MEDICINE: 'MEDICINE',
	NATURE: 'NATURE',
	PERCEPTION: 'PERCEPTION',
	PERFORMANCE: 'PERFORMANCE',
	PERSUASION: 'PERSUASION',
	RELIGION: 'RELIGION',
	SLEIGHT_OF_HAND: 'SLEIGHT_OF_HAND',
	STEALTH: 'STEALTH',
	SURVIVAL: 'SURVIVAL'
};

// SKILLS
export const PLAYER_SKILL_TO_STAT = {
	[PLAYER_SKILL.ACROBATICS]: PLAYER_STAT.DEX,
	[PLAYER_SKILL.ANIMAL_HANDLING]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.ARCANA]: PLAYER_STAT.INT,
	[PLAYER_SKILL.ATHLETICS]: PLAYER_STAT.STR,
	[PLAYER_SKILL.DECEPTION]: PLAYER_STAT.CHA,
	[PLAYER_SKILL.HISTORY]: PLAYER_STAT.INT,
	[PLAYER_SKILL.INSIGHT]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.INTIMIDATION]: PLAYER_STAT.CHA,
	[PLAYER_SKILL.INVESTIGATION]: PLAYER_STAT.INT,
	[PLAYER_SKILL.MEDICINE]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.NATURE]: PLAYER_STAT.INT,
	[PLAYER_SKILL.PERCEPTION]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.PERFORMANCE]: PLAYER_STAT.CHA,
	[PLAYER_SKILL.PERSUASION]: PLAYER_STAT.CHA,
	[PLAYER_SKILL.RELIGION]: PLAYER_STAT.INT,
	[PLAYER_SKILL.SLEIGHT_OF_HAND]: PLAYER_STAT.DEX,
	[PLAYER_SKILL.STEALTH]: PLAYER_STAT.DEX,
	[PLAYER_SKILL.SURVIVAL]: PLAYER_STAT.WIS
};

export const PLAYER_SKILL_TO_LABEL = {
	[PLAYER_SKILL.ACROBATICS]: 'Acrobatics',
	[PLAYER_SKILL.ANIMAL_HANDLING]: 'Animal Handling',
	[PLAYER_SKILL.ARCANA]: 'Arcana',
	[PLAYER_SKILL.ATHLETICS]: 'Athletics',
	[PLAYER_SKILL.DECEPTION]: 'Deception',
	[PLAYER_SKILL.HISTORY]: 'History',
	[PLAYER_SKILL.INSIGHT]: 'Insight',
	[PLAYER_SKILL.INTIMIDATION]: 'Intimidation',
	[PLAYER_SKILL.INVESTIGATION]: 'Investigation',
	[PLAYER_SKILL.MEDICINE]: 'Medicine',
	[PLAYER_SKILL.NATURE]: 'Nature',
	[PLAYER_SKILL.PERCEPTION]: 'Perception',
	[PLAYER_SKILL.PERFORMANCE]: 'Performance',
	[PLAYER_SKILL.PERSUASION]: 'Persuasion',
	[PLAYER_SKILL.RELIGION]: 'Religion',
	[PLAYER_SKILL.SLEIGHT_OF_HAND]: 'Sleight of Hand',
	[PLAYER_SKILL.STEALTH]: 'Stealth',
	[PLAYER_SKILL.SURVIVAL]: 'Survival'
};

// tools
export const TOOLS = {
	LOCKPICKING: 'LOCKPICKING',
	COOKING: 'COOKING'
};

// weapons

export const WEAPON_TYPE = {
	SWORD: 'SWORD',
	LANCE: 'LANCE',
	AXE: 'AXE',
	BOW: 'BOW',
	FISTS: 'FISTS',
	HEAVY_ARMOR: 'HEAVY_ARMOR',
	RIDING: 'RIDING',
	REASON: 'REASON',
	FAITH: 'FAITH',
	LEADERSHIP: 'LEADERSHIP'
};

export const WEAPON_TYPE_TO_LABEL = {
	[WEAPON_TYPE.SWORD]: 'Sword',
	[WEAPON_TYPE.LANCE]: 'Lance',
	[WEAPON_TYPE.AXE]: 'Axe',
	[WEAPON_TYPE.BOW]: 'Bow',
	[WEAPON_TYPE.FISTS]: 'Fists',
	[WEAPON_TYPE.HEAVY_ARMOR]: 'Heavy Armor',
	[WEAPON_TYPE.RIDING]: 'Riding',
	[WEAPON_TYPE.REASON]: 'Reason',
	[WEAPON_TYPE.FAITH]: 'Faith',
	[WEAPON_TYPE.LEADERSHIP]: 'Leadership'
};

export const WEAPON_TYPE_TO_STAT = {
	[WEAPON_TYPE.SWORD]: [PLAYER_STAT.STR],
	[WEAPON_TYPE.LANCE]: [PLAYER_STAT.STR, PLAYER_STAT.DEX],
	[WEAPON_TYPE.AXE]: [PLAYER_STAT.STR],
	[WEAPON_TYPE.BOW]: [PLAYER_STAT.DEX],
	[WEAPON_TYPE.FISTS]: [PLAYER_STAT.STR, PLAYER_STAT.DEX],
	[WEAPON_TYPE.HEAVY_ARMOR]: [PLAYER_STAT.CON],
	[WEAPON_TYPE.RIDING]: [PLAYER_SKILL.ANIMAL_HANDLING],
	[WEAPON_TYPE.REASON]: [PLAYER_STAT.INT],
	[WEAPON_TYPE.FAITH]: [PLAYER_STAT.INT],
	[WEAPON_TYPE.LEADERSHIP]: [PLAYER_STAT.WIS, PLAYER_STAT.CHA]
};

export const WEAPON_LEVEL: { [s: string]: string } = {
	E: 'E',
	E_PLUS: 'E_PLUS',
	D: 'D',
	D_PLUS: 'D_PLUS',
	C: 'C',
	C_PLUS: 'C_PLUS',
	B: 'B',
	B_PLUS: 'B_PLUS',
	A: 'A',
	A_PLUS: 'A_PLUS',
	S: 'S'
};
export const WEAPON_LEVEL_TO_MAX_XP = {
	[WEAPON_LEVEL.E]: 40,
	[WEAPON_LEVEL.E_PLUS]: 100,
	[WEAPON_LEVEL.D]: 180,
	[WEAPON_LEVEL.D_PLUS]: 300,
	[WEAPON_LEVEL.C]: 460,
	[WEAPON_LEVEL.C_PLUS]: 580,
	[WEAPON_LEVEL.B]: 860,
	[WEAPON_LEVEL.B_PLUS]: 1220,
	[WEAPON_LEVEL.A]: 1660,
	[WEAPON_LEVEL.A_PLUS]: 2420,
	[WEAPON_LEVEL.S]: 3500
};
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

// Combat Arts
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
// Class

export const CLASS = {
	MYRMIDON: 'MYRMIDON',
	SOLDIER: 'SOLDIER',
	FIGHTER: 'FIGHTER',
	RANGER: 'RANGER',
	MONK: 'MONK',

	MERCENARY: 'MERCENARY',
	THIEF: 'THIEF',
	CAVALIER: 'CAVALIER',
	ARCHER: 'ARCHER',
	BRIGAND: 'BRIGAND',
	ARMORED_KNIGHT: 'ARMORED_KNIGHT',
	BRAWLER: 'BRAWLER',
	MAGE: 'MAGE',
	PRIEST: 'PRIEST'
};

export const BEGINNER_CLASSES = new Set([
	CLASS.MYRMIDON,
	CLASS.SOLDIER,
	CLASS.FIGHTER,
	CLASS.RANGER,
	CLASS.MONK
]);
export const INTERMEDIATE_CLASSES = new Set([
	CLASS.MERCENARY,
	CLASS.THIEF,
	CLASS.CAVALIER,
	CLASS.ARCHER,
	CLASS.BRIGAND,
	CLASS.ARMORED_KNIGHT,
	CLASS.BRAWLER,
	CLASS.MAGE,
	CLASS.PRIEST
]);

export const CLASS_TO_LABEL = {
	[CLASS.MYRMIDON]: 'Myrmidon',
	[CLASS.SOLDIER]: 'Soldier',
	[CLASS.FIGHTER]: 'Fighter',
	[CLASS.RANGER]: 'Ranger',
	[CLASS.MONK]: 'Monk',

	[CLASS.MERCENARY]: 'Mercenary',
	[CLASS.THIEF]: 'Thief',
	[CLASS.CAVALIER]: 'Cavalier',
	[CLASS.ARCHER]: 'Archer',
	[CLASS.BRIGAND]: 'Brigand',
	[CLASS.ARMORED_KNIGHT]: 'Armored Knight',
	[CLASS.BRAWLER]: 'Brawler',
	[CLASS.MAGE]: 'Mage',
	[CLASS.PRIEST]: 'Priest'
};

export const CLASS_TO_FEATURES: ClassToFeatures = {
	[CLASS.MYRMIDON]: {
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 12
			},
			combatArts: {
				[COMBAT_ARTS.SWAP]: 1
			},
			weapons: {
				[WEAPONS.IRON_SWORD]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.MYRMIDON_MASTER]: 1
			}
		}
	},
	[CLASS.SOLDIER]: {
		unlocks: {
			playerStats: {
				pickOne: [
					[
						{
							[PLAYER_STAT.DEX]: 12
						},
						{
							[PLAYER_STAT.STR]: 12
						}
					]
				]
			},
			combatArts: {
				[COMBAT_ARTS.REPOSITION]: 1
			},
			weapons: {
				[WEAPONS.IRON_LANCE]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.SOLDIER_MASTER]: 1
			}
		}
	},
	[CLASS.FIGHTER]: {
		unlocks: {
			playerStats: {
				pickOne: [
					[
						{
							[PLAYER_STAT.DEX]: 12
						},
						{
							[PLAYER_STAT.STR]: 12
						}
					]
				]
			},
			combatArts: {
				[COMBAT_ARTS.SHOVE]: 1
			},
			weapons: {
				[WEAPONS.IRON_AXE]: 1,
				[WEAPONS.IRON_GAUNTLETS]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.FISTS]: 1.3,
				[WEAPON_TYPE.AXE]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.FIGHTER_MASTER]: 1
			}
		}
	},
	[CLASS.RANGER]: {
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 12
			},
			combatArts: {
				[COMBAT_ARTS.PULL_BACK]: 1
			},
			weapons: {
				[WEAPONS.IRON_BOW]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.BOW]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.RANGER_MASTER]: 1
			}
		}
	},
	[CLASS.MONK]: {
		canUseMagic: true,
		unlocks: {
			playerStats: {
				[PLAYER_STAT.INT]: 12
			},
			combatArts: {
				[COMBAT_ARTS.PULL_BACK]: 1
			},
			weapons: {}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.REASON]: 1.3,
				[WEAPON_TYPE.FAITH]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.MONK_MASTER]: 1
			}
		}
	},

	[CLASS.MERCENARY]: {
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_SWORD]: 1,
				[WEAPONS.IRON_AXE]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.6,
				[WEAPON_TYPE.AXE]: 1.3
			},
			msBonus: 1
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.VANTAGE]: 1
			}
		}
	},
	[CLASS.THIEF]: {
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_SWORD]: 1,
				[WEAPONS.IRON_AXE]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.6,
				[WEAPON_TYPE.BOW]: 1.3
			},
			toolProficiencies: {
				[TOOLS.LOCKPICKING]: 1
			},
			msBonus: 1
		},
		whenMastered: {
			toolProficiencies: {
				[TOOLS.LOCKPICKING]: 1
			},
			playerSkills: {
				[PLAYER_SKILL.SLEIGHT_OF_HAND]: 1
			}
		}
	},
	[CLASS.CAVALIER]: {
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 12,
				[PLAYER_STAT.WIS]: 12
			},
			playerSkills: {
				[PLAYER_SKILL.ANIMAL_HANDLING]: 1
			},
			weapons: {
				[WEAPONS.STEEL_LANCE]: 1,
				[WEAPONS.PIKE]: 1,
				pickOne: [[WEAPONS.IRON_SWORD, WEAPONS.IRON_AXE, WEAPONS.IRON_BOW]]
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.6,
				pickOne: [[{ weapons: [WEAPON_TYPE.SWORD, WEAPON_TYPE.AXE, WEAPON_TYPE.BOW], xp: 1.3 }]]
			},
			toolProficiencies: {
				[TOOLS.LOCKPICKING]: 1
			},
			msBonus: 3
		},
		whenMastered: {
			toolProficiencies: {
				[TOOLS.LOCKPICKING]: 1
			},
			combatSkills: {
				[COMBAT_SKILLS.ANIMAL_WHISPERER]: 1
			}
		}
	},
	[CLASS.ARCHER]: {
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 14
			},
			weapons: {
				[WEAPONS.STEEL_BOW]: 1,
				[WEAPONS.SHORT_BOW]: 1,
				[WEAPONS.IRON_SWORD]: 1
			}
		},
		whenEquipped: {
			bonusRange: 1,
			msBonus: 1,
			xpMods: {
				[WEAPON_TYPE.BOW]: 1.6,
				[WEAPON_TYPE.SWORD]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.BULLSEYE]: 1
			}
		}
	},
	[CLASS.BRIGAND]: {
		unlocks: {
			hpBonus: 1,
			playerStats: {
				[PLAYER_STAT.STR]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_AXE]: 1,
				[WEAPONS.HAND_AXE]: 1,
				[WEAPONS.STEEL_GAUNTLETS]: 1
			}
		},
		whenEquipped: {
			msBonus: 1,
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.6,
				[WEAPON_TYPE.FISTS]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.ARMORED_KNIGHT]: {
		unlocks: {
			hpBonus: 1,
			playerStats: {
				[PLAYER_STAT.STR]: 12,
				[PLAYER_STAT.CON]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_AXE]: 1,
				[WEAPONS.STEEL_LANCE]: 1,
				[WEAPONS.HAMMER]: 1,
				[WEAPONS.IRON_LANCE]: 1,
				[WEAPONS.IRON_AXE]: 1
			}
		},
		whenEquipped: {
			followUpBonus: -1,
			protectionBonus: 1,
			weapons: {
				[WEAPONS.IRON_SHIELD]: 1
			},
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.6,
				[WEAPON_TYPE.LANCE]: 1.6
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.ARMORED_COMBAT]: 1
			}
		}
	},
	[CLASS.BRAWLER]: {
		unlocks: {
			hpBonus: 1,
			playerStats: {
				pickOne: [
					[
						{
							[PLAYER_STAT.STR]: 12,
							[PLAYER_STAT.DEX]: 14
						},
						{
							[PLAYER_STAT.STR]: 14,
							[PLAYER_STAT.DEX]: 12
						}
					]
				]
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_GAUNTLETS]: 1,
				[WEAPONS.CLOTH_GAUNTLETS]: 1
			}
		},
		whenEquipped: {
			msBonus: 1,
			xpMods: {
				[WEAPON_TYPE.FISTS]: 1.6,
				[WEAPON_TYPE.AXE]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.GRAPPLER]: 1
			}
		}
	},
	[CLASS.MAGE]: {
		canUseMagic: true,
		unlocks: {
			playerStats: {
				[PLAYER_STAT.INT]: 14
			},
			weapons: {
				pickOne: [
					[WEAPONS.FIRE, WEAPONS.THUNDER, WEAPONS.BLIZZARD, WEAPONS.WIND, 'DOUBLE_EXISTING']
				]
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.REASON]: 1.6,
				[WEAPON_TYPE.FAITH]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.FIENDISH_BLOW]: 1
			}
		}
	},
	[CLASS.PRIEST]: {
		canUseMagic: true,
		unlocks: {
			playerStats: {
				[PLAYER_STAT.INT]: 14
			},
			playerSkills: {
				[PLAYER_SKILL.RELIGION]: 1
			}
		},
		whenEquipped: {
			combatSkills: {
				[COMBAT_SKILLS.HEAL_PLUS]: 1
			},
			xpMods: {
				[WEAPON_TYPE.FAITH]: 1.6,
				[WEAPON_TYPE.REASON]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.HEAL_PLUS]: 1
			}
		}
	}
};

// Crests
export const CRESTS = {
	BLAIDDYD: 'BLAIDDYD',
	CETHLEANN: 'CETHLEANN',
	CICHOL: 'CICHOL',
	CHARON: 'CHARON',
	DAPHNEL: 'DAPHNEL',
	DOMINIC: 'DOMINIC',
	FRALDARIUS: 'FRALDARIUS',
	GAUTIER: 'GAUTIER',
	GLOUCESTER: 'GLOUCESTER',
	GONERIL: 'GONERIL',
	INDECH: 'INDECH',
	LAMINE: 'LAMINE',
	MACUIL: 'MACUIL',
	RIEGAN: 'RIEGAN'
};
export const CRESTS_TO_LABELS = {
	[CRESTS.BLAIDDYD]: 'Blaiddyd',
	[CRESTS.CETHLEANN]: 'Cethleann',
	[CRESTS.CICHOL]: 'Cichol',
	[CRESTS.CHARON]: 'Charon',
	[CRESTS.DAPHNEL]: 'Daphnel',
	[CRESTS.DOMINIC]: 'Dominic',
	[CRESTS.FRALDARIUS]: 'Fraldarius',
	[CRESTS.GAUTIER]: 'Gautier',
	[CRESTS.GLOUCESTER]: 'Gloucester',
	[CRESTS.GONERIL]: 'Goneril',
	[CRESTS.INDECH]: 'Indech',
	[CRESTS.LAMINE]: 'Lamine',
	[CRESTS.MACUIL]: 'Macuil',
	[CRESTS.RIEGAN]: 'Riegan'
};

export enum CrestType {
	MAJOR = 'MAJOR',
	MINOR = 'MINOR'
}
export const ActivationRates = {
	alpha: {
		[CrestType.MAJOR]: 17,
		[CrestType.MINOR]: 19
	},
	beta: {
		[CrestType.MAJOR]: 13,
		[CrestType.MINOR]: 17
	},
	gamma: {
		[CrestType.MAJOR]: 11,
		[CrestType.MINOR]: 15
	},
	omega: {
		[CrestType.MAJOR]: 7,
		[CrestType.MINOR]: 13
	}
};
export const CRESTS_TO_FEATURES: { [s: string]: CrestFeatures } = {
	[CRESTS.BLAIDDYD]: {
		label: 'Blaiddyd',
		description:
			'When using a combat art, conserves superiority die and doubles any extra damage done by the weapon art if activated',
		activationDC: ActivationRates.omega
	},
	[CRESTS.CETHLEANN]: {
		label: 'Cethleann',
		description: 'When using recovery magic, heal the target for +2 HP if activated.',
		activationDC: ActivationRates.beta
	},
	[CRESTS.CICHOL]: {
		label: 'Cichol',
		description: 'When using a combat art, prevent counterattack',
		activationDC: ActivationRates.beta
	},
	[CRESTS.CHARON]: {
		label: 'Charon',
		description:
			'When using a combat art, doubles any extra damage done by the weapon art if activated',
		activationDC: ActivationRates.alpha
	},
	[CRESTS.DAPHNEL]: {
		label: 'Daphnel',
		description:
			'When using a combat art, adds +2 damage if the combat art does damage if activated',
		activationDC: ActivationRates.alpha
	},
	[CRESTS.DOMINIC]: {
		label: 'Dominic',
		description: 'When attacking with a spell, conserves spell slot if activated',
		activationDC: ActivationRates.omega
	},
	[CRESTS.FRALDARIUS]: {
		label: 'Fraldarius',
		description: 'When attacking with a weapon, adds +2 damage to the attack if activated',
		activationDC: ActivationRates.gamma
	},
	[CRESTS.GAUTIER]: {
		label: 'Gautier',
		description:
			'When using a combat art, adds +2 damage if the combat art deals damage if activated',
		activationDC: ActivationRates.alpha
	},
	[CRESTS.GLOUCESTER]: {
		label: 'Gloucester',
		description: 'When attcking with a spell, adds +2 damage to the attack if activated',
		activationDC: ActivationRates.omega
	},
	[CRESTS.GONERIL]: {
		label: 'Goneril',
		description: 'When using a combat art, prevents counterattack',
		activationDC: ActivationRates.beta
	},
	[CRESTS.INDECH]: {
		label: 'Indech',
		description:
			'When attacking with a weapon, you may attack the target again if activated. (this follow up attack can also trigger the effect)',
		activationDC: ActivationRates.omega
	},
	[CRESTS.LAMINE]: {
		label: 'Lamine',
		description: 'When using recovery magic, fe the spell slot if activated',
		activationDC: ActivationRates.omega
	},
	[CRESTS.MACUIL]: {
		label: 'Macuil',
		description: 'When attacking with a spell, add +2 damage to the attack if activated.',
		activationDC: ActivationRates.omega
	},
	[CRESTS.RIEGAN]: {
		label: 'Riegan',
		description:
			'When using a combat art, heal for 30% of the damage dealt if the combat art deals damage if activated',
		activationDC: ActivationRates.beta
	}
};

// CONSTS
export const MAX_COMBAT_ARTS = 3;
export const MAX_COMBAT_SKILLS = 5;
export const PROFICIENCY_BONUS = 2;

export const INTERMEDIATE_MARTIAL_HP_BONUS = 2;
export const INTERMEDIATE_MAGIC_HP_BONUS = 1;

export const INTERMEDIATE_MARTIAL_PROTECTION_BONUS = 1;
export const INTERMEDIATE_MAGIC_RESILIENCE_BONUS = 1;

export const BEGINNER_MASTERY_REQ = 5;
export const INTERMEDIATE_MASTERY_REQ = 5;

// DEFAULTS
export const DEFAULT_PLAYER_STAT = {
	[PLAYER_STAT.STR]: 10,
	[PLAYER_STAT.DEX]: 10,
	[PLAYER_STAT.CON]: 10,
	[PLAYER_STAT.INT]: 10,
	[PLAYER_STAT.WIS]: 10,
	[PLAYER_STAT.CHA]: 10
};
export const DEFAULT_PLAYER_SKILL_PROFICIENCY: { [s: string]: number } = {};
export const DEFAULT_PLAYER_SKILL_BONUSES: { [s: string]: number } = {};
export const DEFAULT_ARMOR_CLASS = 5;
export const DEFAULT_MOVEMENT_SPEED = 4;
export const DEFAULT_MAX_HP = 8;
export const DEFAULT_PROTECTION = 0;
export const DEFAULT_RESILIENCE = 0;
