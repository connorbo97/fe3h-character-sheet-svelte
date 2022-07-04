import { PLAYER_STAT } from './constants/stats';

export * from './constants/classes';
export * from './constants/combatArts';
export * from './constants/crests';
export * from './constants/playerSkills';
export * from './constants/stats';
export * from './constants/weaponLevel';
export * from './constants/weapons';
export * from './constants/weaponType';

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
