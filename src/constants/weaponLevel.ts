import { COMBAT_SKILLS } from './combatSkills';
import { WEAPONS } from './weapons';
import { PickOnePromptType } from './enums';
import { WEAPON_TYPE } from './weaponType';
import { COMBAT_ARTS } from './combatArts';

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

export const WEAPON_TYPES_TO_LEVEL_FEATURES: { [s: string]: { [s: string]: XPLevelFeatures } } = {
	[WEAPON_TYPE.SWORD]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.SWORD_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {
				combatArts: { [COMBAT_ARTS.WRATH_STRIKE]: 1 }
			}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {
				combatArts: {
					[COMBAT_ARTS.GROUNDER]: 1
				}
			}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_3]: 1
				},
				pickOne: [
					{
						type: PickOnePromptType.CombatArt,
						options: [COMBAT_ARTS.SUNDER, COMBAT_ARTS.HAZE_SLICE]
					}
				]
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.SWORD_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.LANCE]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.LANCE_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {
				combatArts: {
					[COMBAT_ARTS.TEMPEST_LANCE]: 1
				}
			}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {
				combatArts: {
					[COMBAT_ARTS.KNIGHT_KNEELER]: 1
				}
			}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_3]: 1
				},
				pickOne: [
					{
						type: PickOnePromptType.CombatArt,
						options: [COMBAT_ARTS.SHATTER_SLASH, COMBAT_ARTS.HIT_AND_RUN]
					}
				]
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LANCE_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.AXE]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.AXE_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {
				combatArts: {
					[COMBAT_ARTS.SMASH]: 1
				}
			}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {
				combatArts: {
					[COMBAT_ARTS.HELM_SPLITTER]: 1
				}
			}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_3]: 1
				},
				pickOne: [
					{
						type: PickOnePromptType.CombatArt,
						options: [
							COMBAT_ARTS.FOCUSED_STRIKE,
							COMBAT_ARTS.SPIKE,
							COMBAT_ARTS.WILD_ABANDON,
							COMBAT_ARTS.DIAMOND_AXE
						]
					}
				]
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.AXE_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.BOW]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.BOW_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {
				combatArts: { [COMBAT_ARTS.CURVED_SHOT]: 1 }
			}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.CLOSE_COUNTER]: 1
				}
			}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_3]: 1
				},
				pickOne: [
					{
						type: PickOnePromptType.CombatArt,
						options: [
							COMBAT_ARTS.DEADEYE,
							COMBAT_ARTS.HEAVY_DRAW,
							COMBAT_ARTS.WANING_SHOT,
							COMBAT_ARTS.BREAK_SHOT
						]
					}
				]
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.BOW_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.FISTS]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.FISTS_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_3]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FISTS_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.HEAVY_ARMOR]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.RIDING]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {}
			},
			removes: {
				combatSkills: {}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.REASON]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.REASON_PROWESS_1]: 1 },
				pickOne: [
					{
						type: PickOnePromptType.Weapon,
						options: [WEAPONS.FIRE, WEAPONS.WIND, WEAPONS.THUNDER, WEAPONS.BLIZZARD]
					}
				]
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_3]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.REASON_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.FAITH]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.FAITH_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_3]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.FAITH_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	},
	[WEAPON_TYPE.LEADERSHIP]: {
		[WEAPON_LEVEL.E]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.E_PLUS]: {
			unlocks: {
				combatSkills: { [COMBAT_SKILLS.LEADERSHIP_PROWESS_1]: 1 }
			}
		},
		[WEAPON_LEVEL.D]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.D_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_2]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_1]: 1
				}
			}
		},
		[WEAPON_LEVEL.C]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.C_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_3]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_2]: 1
				}
			}
		},
		[WEAPON_LEVEL.B]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.B_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_4]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_3]: 1
				}
			}
		},
		[WEAPON_LEVEL.A]: {
			unlocks: {}
		},
		[WEAPON_LEVEL.A_PLUS]: {
			unlocks: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_5]: 1
				}
			},
			removes: {
				combatSkills: {
					[COMBAT_SKILLS.LEADERSHIP_PROWESS_4]: 1
				}
			}
		},
		[WEAPON_LEVEL.S]: {
			unlocks: {}
		}
	}
};
