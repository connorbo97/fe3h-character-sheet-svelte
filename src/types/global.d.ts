export {};

declare global {
	type XPBlock = {
		total: number;
		level: string;
		mastered: boolean;
	};
	type XPMap = { [s: string]: XPBlock };
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
	};

	type AllWeapons = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
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
	};

	//types
	type Dice = '1d2' | '1d3' | '1d4' | '1d20';
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
		damageBonus?: { [s: string]: Array<number | Dice> };
		attackBonus?: { [s: string]: Array<number | Dice> };
		protectionBonus?: number;
		resilienceBonus?: number;
		bonusCharges?: { [s: string]: number };
	}
	interface ArtFeatures {
		label: string;
		description: string;
		compatibleWeapons?: Array<string>;
		damageBonus?: Array<number | Dice>;
		attackBonus?: Array<number | Dice>;
		critBonus?: Array<number | Dice>;
		dieCost?: { roll: number | Dice; target: number; mod: number };
	}
}
