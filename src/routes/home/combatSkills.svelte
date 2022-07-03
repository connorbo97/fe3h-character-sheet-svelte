<script lang="ts">
	import { CLASS_TO_FEATURES, COMBAT_SKILLS_TO_FEATURES } from 'src/constants';
	import CombatSkillEntry from './combatSkillEntry.svelte';

	export let customCombatSkills: any;

	export let equippedClass: any;
	export let unlockedClasses: any;
	export let unlockedClassesPicks: any;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;

	$: unlockedCombatSkillsArr = unlockedClasses.reduce((acc: any, curClass: any) => {
		const unlockedSkills = CLASS_TO_FEATURES[curClass]?.unlocks?.combatSkills || {};
		const unlockedSkillsArr = Object.keys(unlockedSkills);

		let pickedSkillsArr: any = [];
		const pickOne = unlockedSkills?.pickOne;

		if (pickOne) {
			pickedSkillsArr = pickOne
				.map((skillArray: any, index: any) => {
					skillArray[unlockedClassesPicks[curClass]?.unlocks?.combatSkills?.pickOne?.[index]];
				})
				.filter((skill) => skill);
		}

		if (unlockedSkillsArr.length || pickedSkillsArr.length) {
			return [...acc, ...unlockedSkillsArr, ...pickedSkillsArr];
		}

		return acc;
	}, []);

	$: getEquippedClassSkills = () => {
		const skills = CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.combatSkills || {};
		const skillsArr = Object.keys(skills);

		let pickedSkillsArr: any = [];
		const pickOne = skills?.pickOne;

		if (pickOne) {
			pickedSkillsArr = pickOne
				.map((skillArray: any, index: any) => {
					skillArray[
						unlockedClassesPicks[equippedClass]?.whenEquipped?.combatSkills?.pickOne?.[index]
					];
				})
				.filter((skill) => skill);
		}

		return [...skillsArr, ...pickedSkillsArr];
	};
	$: equippedClassCombatSkills = getEquippedClassSkills();
	$: classCombatSkills = new Set([...equippedClassCombatSkills, ...unlockedCombatSkillsArr]);
	$: allCombatSkills = [...Array.from(classCombatSkills), ...Object.keys(customCombatSkills)];
	$: allCombatSkillFeatures = { ...COMBAT_SKILLS_TO_FEATURES, ...customCombatSkills };
</script>

<div class="container">
	{#each allCombatSkills as skill}
		<CombatSkillEntry
			{skill}
			feature={allCombatSkillFeatures[skill]}
			isEquipped={equippedCombatSkills.indexOf(skill) !== -1}
			{onToggleCombatSkill}
			numEquipped={equippedCombatSkills.length}
		/>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		border-radius: 5px;
		background-color: slateblue;

		flex: 1;
		padding: 5px;

		overflow: scroll-x;
	}
</style>
