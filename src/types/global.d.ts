import type { CrestTrigger } from 'src/constants';
import type { Dice } from 'src/constants/dice';

export {};

declare global {
	type XPBlock = {
		total: number;
		level: string;
		mastered: boolean;
	};
	type XPMap = { [s: string]: XPBlock };
	type PlayerCrest = {
		type: string;
		isMajor: boolean;
	};
	type CharacterSheet = {
		playerStats: any;
		playerName: any;
		playerSkills: any;
		skillBonuses: any;
		unlockedClasses: any;
		unlockedClassesPicks: any;
		customWeapons: any;
		customCombatArts: any;
		customCombatSkills: any;
		classXP: XPMap;
		weaponXP: XPMap;
		crest: PlayerCrest;
	};

	type AllWeapons = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
		fullFeatures: object;
	};
	type AllCombatSkills = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
	};
	type AllCombatArts = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
		fullFeatures: { [s: string]: ArtFeatures };
	};
	//crests
	type CrestFeatures = {
		label: string;
		description: string;
		image: any;
		activationDC: { [s in CrestType]: number };
		triggersOn: Array<CrestTrigger>;

		conservesResource?: boolean;
	};

	//types
	type CalcEntry = '-' | number | Dice;
	declare type BasicStat = {
		[s: string]: number | Array<any> | undefined;
		pickOne?: Array<Array<any>>;
	};

	declare type ClassFeatures = {
		canUseMagic?: boolean;
		unlocks: StatBlock;
		whenEquipped: StatBlock;
		whenMastered: StatBlock;
	};

	declare type ClassToFeatures = { [s: string]: ClassFeatures };

	declare type StatBlock = {
		playerStats?: BasicStat;
		playerSkills?: BasicStat;
		toolProficiencies?: BasicStat;
		combatArts?: BasicStat;
		weapons?: BasicStat;

		xpMods?: BasicStat;

		combatSkills?: BasicStat;

		hpBonus?: number;
		msBonus?: number;
		bonusRange?: number;
		followUpBonus?: number;
		protectionBonus?: number;
		resilienceBonus?: number;
	};

	interface SkillFeatures {
		label: string;
		description: string;
		acBonus?: number;
		msBonus?: number;
		hpBonus?: number;
		damageBonus?: { [s: string]: Array<CalcEntry> };
		attackBonus?: { [s: string]: Array<CalcEntry> };
		protectionBonus?: number;
		resilienceBonus?: number;
		bonusCharges?: { [s: string]: number };
	}
	interface ArtFeatures {
		label: string;
		description: string;
		compatibleWeapons?: Array<string>;
		damageBonus?: Array<CalcEntry>;
		attackBonus?: Array<CalcEntry>;
		rangeBonus?: number;
		critBonus?: Array<CalcEntry>;
		dieCost?: { roll: number | Dice; target: number; mod: number };
	}
}
