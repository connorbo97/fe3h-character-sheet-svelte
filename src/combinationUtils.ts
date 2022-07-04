import { CLASS_TO_FEATURES } from './constants';
import memoize from 'memoize-one';

export const calculateAllWeapons = (fullSheet: CharacterSheet, equippedClass: string) =>
	calculateAllWeaponsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customWeapons,
		fullSheet.classXP,
		equippedClass
	);
export const calculateAllWeaponsMemoized = memoize(
	(
		unlockedClasses: Array<string>,
		customWeapons: object,
		classXP: XPMap,
		equippedClass: string
	): AllWeapons => {
		const customSet: Set<string> = new Set(Object.keys(customWeapons));
		const equippedClassSet: Set<string> = new Set(Object.keys(customWeapons));
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
		const fullSet = new Set([...customSet, ...equippedClassSet, ...classUnlockSet]);

		return {
			customSet,
			equippedClassSet,
			classUnlockSet,
			fullSet,
			fullArray: Array.from(fullSet)
		};
	}
);
