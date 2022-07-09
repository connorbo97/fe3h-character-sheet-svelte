import { COMBAT_ARTS } from './combatArts';
import { COMBAT_SKILLS } from './combatSkills';
import { PickOnePromptType } from './enums';
import { PLAYER_SKILL } from './playerSkills';
import { PLAYER_STAT } from './stats';
import { WEAPONS } from './weapons';
import { WEAPON_TYPE } from './weaponType';

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
			pickOne: [
				{
					type: PickOnePromptType.PlayerStat,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 12
						},
						{
							stat: PLAYER_STAT.STR,
							value: 12
						}
					]
				}
			],
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
			pickOne: [
				{
					type: PickOnePromptType.PlayerStat,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 12
						},
						{
							stat: PLAYER_STAT.STR,
							value: 12
						}
					]
				}
			],
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
				[PLAYER_SKILL.LOCKPICKING]: 1
			},
			msBonus: 1
		},
		whenMastered: {
			toolProficiencies: {
				[PLAYER_SKILL.LOCKPICKING]: 1
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
				[WEAPONS.PIKE]: 1
			},
			pickOne: [
				{
					type: PickOnePromptType.Weapon,
					options: [WEAPONS.IRON_SWORD, WEAPONS.IRON_AXE, WEAPONS.IRON_BOW]
				}
			]
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.6
			},
			toolProficiencies: {
				[PLAYER_SKILL.LOCKPICKING]: 1
			},
			msBonus: 3
		},
		whenMastered: {
			toolProficiencies: {
				[PLAYER_SKILL.LOCKPICKING]: 1
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
				[WEAPONS.IRON_LANCE]: 1
			}
		},
		whenEquipped: {
			bonusRange: {
				[WEAPON_TYPE.BOW]: 1
			},
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
			pickOne: [
				{
					type: PickOnePromptType.PlayerStat,
					description:
						'Pick different stats per dropdown (e.g. if you pick 14 DEX in this dropdown, pick 12 STR in the other)',
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 14
						},
						{
							stat: PLAYER_STAT.STR,
							value: 14
						}
					]
				},
				{
					type: PickOnePromptType.PlayerStat,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 12
						},
						{
							stat: PLAYER_STAT.STR,
							value: 12
						}
					]
				}
			],
			hpBonus: 1,
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

export const SUPERIORITY_DIE_TO_CLASSES: { [n: number]: Set<string> } = {
	1: new Set(Object.values(CLASS)),
	3: new Set(BEGINNER_CLASSES),
	5: new Set(INTERMEDIATE_CLASSES)
};
export const getSuperiorityDieFromClasses = (unlockedClasses: Array<any>) => {
	return Object.keys(SUPERIORITY_DIE_TO_CLASSES).reduce((acc: number, die: any) => {
		if (unlockedClasses.some((c: any) => SUPERIORITY_DIE_TO_CLASSES[die].has(c))) {
			return Math.max(parseInt(die), acc);
		}
		return acc;
	}, 0);
};
