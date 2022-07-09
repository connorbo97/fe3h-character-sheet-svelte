<script lang="ts">
	import { COMBAT_SKILLS_TO_FEATURES, MAX_COMBAT_SKILLS } from 'src/constants';
	import CombatSkillEntry from './combatSkillEntry.svelte';

	export let allCombatSkills: AllCombatSkills;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;

	$: allCombatSkillsArr = allCombatSkills.fullArray;
	$: allCombatSkillFeatures = allCombatSkills.fullFeatures;
</script>

<div class="container">
	<div class="header">
		<u>Combat Skills ({equippedCombatSkills.length}/{MAX_COMBAT_SKILLS})</u>
		<!-- <button on:click={openAddPrompt}> + </button> -->
	</div>
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
		background-color: rgb(166, 157, 227);

		flex: 1;
		padding: 5px;

		overflow-y: scroll;
		height: calc(50% - 10px);
	}

	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
