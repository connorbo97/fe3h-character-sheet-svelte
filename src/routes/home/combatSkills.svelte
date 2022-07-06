<script lang="ts">
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants';
	import CombatSkillEntry from './combatSkillEntry.svelte';

	export let allCombatSkills: AllCombatSkills;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;

	$: allCombatSkillsArr = allCombatSkills.fullArray;
	$: allCombatSkillFeatures = allCombatSkills.fullFeatures;
</script>

<div class="container">
	{#each allCombatSkillsArr as skill}
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

		overflow-y: scroll;
		height: 100%;
	}
</style>
