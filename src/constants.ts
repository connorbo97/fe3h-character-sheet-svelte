export const PROFICIENCY_BONUS = 2;
export const PLAYER_STAT = {
	STR: 'pc_strength',
	DEX: 'pc_dexterity',
	CON: 'pc_constitution',
	INT: 'pc_intelligence',
	WIS: 'pc_wisdom',
	CHA: 'pc_charisma'
};

export const DEFAULT_PLAYER_STAT = {
	[PLAYER_STAT.STR]: 10,
	[PLAYER_STAT.DEX]: 10,
	[PLAYER_STAT.CON]: 10,
	[PLAYER_STAT.INT]: 10,
	[PLAYER_STAT.WIS]: 10,
	[PLAYER_STAT.CHA]: 10
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
	SURVIVAL: 'SURVIVAL',
}

export const DEFAULT_PLAYER_SKILL_PROFICIENCY: { [s: string]: number } = {}
export const DEFAULT_PLAYER_SKILL_BONUSES: { [s: string]: number } = {}

export const PLAYER_SKILL_TO_STAT = {
  [PLAYER_SKILL.ACROBATICS]: PLAYER_STAT.DEX,
	[PLAYER_SKILL.ANIMAL_HANDLING]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.ARCANA]: PLAYER_STAT.INT,
	[PLAYER_SKILL.ATHLETICS]: PLAYER_STAT.STR,
	[PLAYER_SKILL.DECEPTION]: PLAYER_STAT.CHA,
	[PLAYER_SKILL.HISTORY]: PLAYER_STAT.INT,
	[PLAYER_SKILL.INSIGHT]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.INTIMIDATION]:  PLAYER_STAT.CHA,
	[PLAYER_SKILL.INVESTIGATION]:  PLAYER_STAT.INT,
	[PLAYER_SKILL.MEDICINE]: PLAYER_STAT.WIS,
	[PLAYER_SKILL.NATURE]:  PLAYER_STAT.INT,
	[PLAYER_SKILL.PERCEPTION]:  PLAYER_STAT.WIS,
	[PLAYER_SKILL.PERFORMANCE]:  PLAYER_STAT.CHA,
	[PLAYER_SKILL.PERSUASION]:  PLAYER_STAT.CHA,
	[PLAYER_SKILL.RELIGION]:  PLAYER_STAT.INT,
	[PLAYER_SKILL.SLEIGHT_OF_HAND]:  PLAYER_STAT.DEX,
	[PLAYER_SKILL.STEALTH]: PLAYER_STAT.DEX,
	[PLAYER_SKILL.SURVIVAL]:  PLAYER_STAT.WIS,
}

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
	[PLAYER_SKILL.SURVIVAL]: 'Survival',
}