<script lang="ts">
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';

	import SvelteTip from 'src/common/SvelteTip.svelte';
	import { CONTEXTS, MAX_COMBAT_SKILLS } from 'src/constants';
	import { COMBAT_SKILLS } from 'src/constants/combatSkills';
	import { PickOnePromptType, TooltipStyle } from 'src/constants/enums';
	import { getContext } from 'svelte';
	import CombatSkillEntry from './combatSkillEntry.svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let allCombatSkills: AllCombatSkills;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;
	export let customCombatSkills: any;
	export let onUpdateCustomCombatSkills: any;

	$: allCombatSkillsArr = allCombatSkills.fullArray;
	$: allCombatSkillFeatures = allCombatSkills.fullFeatures;
	$: availableCombatSkills = Object.values(COMBAT_SKILLS).filter(
		(a) => !allCombatSkills.fullSet.has(a)
	);
	$: openAddPrompt = () => {
		open(PickOnePrompt, {
			pickOne: [
				{
					type: PickOnePromptType.CombatSkill,
					options: availableCombatSkills
				}
			],
			reason: `Manually adding in combat skills section`,
			customCombatSkills,
			onUpdateCustomCombatSkills: (newVals) =>
				onUpdateCustomCombatSkills({ ...customCombatSkills, ...newVals })
		});
	};
</script>

<div class="container">
	<div class="header">
		<u>
			Combat Skills
			<SvelteTip tooltipStyle={TooltipStyle.BOTTOM_CENTER}>
				<span
					on:click={() =>
						equippedCombatSkills.forEach((s) => {
							onToggleCombatSkill(s);
						})}
				>
					({equippedCombatSkills.length}/{MAX_COMBAT_SKILLS})
				</span>
				<div slot="t">Click to Clear All</div>
			</SvelteTip>
		</u>
		<button on:click={openAddPrompt}> + </button>
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

		overflow-y: auto;
		height: calc(50% - 10px);
	}

	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
