import {
	CLASS_TO_FEATURES,
	COMBAT_ARTS,
	COMBAT_SKILLS,
	COMBAT_ARTS_TO_FEATURES
} from './constants';
import memoize from 'memoize-one';

export const calculateAllWeapons = (fullSheet: CharacterSheet, equippedClass: string) =>
	calculateAllWeaponsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customWeapons,
		fullSheet.classXP,
		equippedClass
	);
const calculateAllWeaponsMemoized = memoize(
	(
		unlockedClasses: Array<string>,
		customWeapons: object,
		classXP: XPMap,
		equippedClass: string
	): AllWeapons => {
		const customSet: Set<string> = new Set(Object.keys(customWeapons));
		const equippedClassSet: Set<string> = new Set(
			Object.keys(CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.weapons || {})
		);
		const classUnlockSet: Set<string> = new Set();

		// weapons from unlocked and mastered classes
		unlockedClasses.forEach((curClass: string) => {
			Object.keys(CLASS_TO_FEATURES[curClass]?.unlocks?.weapons || {}).forEach((w) =>
				classUnlockSet.add(w)
			);
			const masteredWeapons = CLASS_TO_FEATURES[curClass]?.whenMastered?.weapons;

			if (masteredWeapons && classXP?.[curClass]?.mastered) {
				Object.keys(masteredWeapons).forEach((w) => classUnlockSet.add(w));
			}
		});

		//remove pick one
		customSet.delete('pickOne');
		equippedClassSet.delete('pickOne');
		classUnlockSet.delete('pickOne');

		const fullSet = new Set([...customSet, ...equippedClassSet, ...classUnlockSet]);

		return {
			customSet,
			equippedClassSet,
			classUnlockSet,
			fullSet,
			fullArray: Array.from(fullSet),
			fullFeatures: { ...customWeapons }
		};
	}
);

export const calculateAllCombatSkills = (fullSheet: CharacterSheet, equippedClass: string) =>
	calculateAllCombatSkillsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customCombatSkills,
		fullSheet.classXP,
		equippedClass
	);
const calculateAllCombatSkillsMemoized = (
	unlockedClasses: Array<string>,
	customCombatSkills: object,
	classXP: XPMap,
	equippedClass: string
): AllCombatSkills => {
	const customSet: Set<string> = new Set(Object.keys(customCombatSkills));
	const equippedClassSet: Set<string> = new Set(
		Object.keys(CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.combatSkills || {})
	);
	const classUnlockSet: Set<string> = new Set();

	// skills from unlocked and mastered classes
	unlockedClasses.forEach((curClass: string) => {
		Object.keys(CLASS_TO_FEATURES[curClass]?.unlocks?.combatSkills || {}).forEach((w) =>
			classUnlockSet.add(w)
		);
		const masteredSkills = CLASS_TO_FEATURES[curClass]?.whenMastered?.combatSkills;

		if (masteredSkills && classXP?.[curClass]?.mastered) {
			Object.keys(masteredSkills).forEach((w) => classUnlockSet.add(w));
		}
	});
	const fullSet = new Set([...customSet, ...equippedClassSet, ...classUnlockSet]);
	return {
		customSet,
		equippedClassSet,
		classUnlockSet,
		fullSet,
		fullArray: Array.from(fullSet)
	};
};

export const calculateAllCombatArts = (
	fullSheet: CharacterSheet,
	equippedClass: string,
	allCombatSkillsSet: Set<string>
) =>
	calculateAllCombatArtsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customWeapons,
		fullSheet.classXP,
		equippedClass,
		allCombatSkillsSet
	);
const calculateAllCombatArtsMemoized = (
	unlockedClasses: Array<string>,
	customCombatArts: object,
	classXP: XPMap,
	equippedClass: string,
	allCombatSkillsSet: Set<string>
): AllCombatArts => {
	const baseCombatArts = [
		COMBAT_ARTS.TEMPEST_LANCE,
		COMBAT_ARTS.WRATH_STRIKE,
		COMBAT_ARTS.SMASH,
		COMBAT_ARTS.CURVED_SHOT,
		COMBAT_ARTS.FADING_BLOW
	];
	const customSet: Set<string> = new Set(Object.keys(customCombatArts));
	const equippedClassSet: Set<string> = new Set(
		Object.keys(CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.combatArts || {})
	);
	const classUnlockSet: Set<string> = new Set();

	// combat arts from unlocked and mastered classes
	unlockedClasses.forEach((curClass: string) => {
		Object.keys(CLASS_TO_FEATURES[curClass]?.unlocks?.combatArts || {}).forEach((w) =>
			classUnlockSet.add(w)
		);
		const masteredSkills = CLASS_TO_FEATURES[curClass]?.whenMastered?.combatArts;

		if (masteredSkills && classXP?.[curClass]?.mastered) {
			Object.keys(masteredSkills).forEach((w) => classUnlockSet.add(w));
		}
	});

	const fullSet = new Set([
		...baseCombatArts,
		...customSet,
		...equippedClassSet,
		...classUnlockSet,
		// if grappler, add the corresponding combat arts
		...(allCombatSkillsSet.has(COMBAT_SKILLS.GRAPPLER)
			? [COMBAT_ARTS.REPOSITION, COMBAT_ARTS.SWAP, COMBAT_ARTS.PULL_BACK, COMBAT_ARTS.SHOVE]
			: [])
	]);

	return {
		customSet,
		equippedClassSet,
		classUnlockSet,
		fullSet,
		fullArray: Array.from(fullSet),
		fullFeatures: { ...customCombatArts, ...COMBAT_ARTS_TO_FEATURES }
	};
};
