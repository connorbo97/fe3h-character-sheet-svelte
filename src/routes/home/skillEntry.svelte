<script lang="ts">
	import UnlockedButton from 'src/common/unlockedButton.svelte';
	import { PROFICIENCY_BONUS } from 'src/constants';
	import { Dice } from 'src/constants/dice';

	import {
		getTextFromSkillProficiency,
		PLAYER_SKILL_TO_LABEL,
		PLAYER_SKILL_TO_STAT,
		SkillProficiency
	} from 'src/constants/playerSkills';
	import { PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';
	import { getModifierByPlayerStat, rollVisualDice } from 'src/utils';

	export let stats: any;
	export let skillProficiency: any;
	export let skillBonus: any;
	export let onToggleSkillProficiency: Function;
	export let skill: any;

	$: skillBonusMod = skillBonus[skill] || 0;
	$: skillProficiencyMod =
		skillProficiency[skill] !== SkillProficiency.NONE && skillProficiency[skill] !== undefined
			? PROFICIENCY_BONUS * (skillProficiency[skill] || 1)
			: 0;
	$: skillStat = PLAYER_SKILL_TO_STAT[skill];

	let selectedStat = Array.isArray(skillStat) ? skillStat[0] : skillStat;
	$: {
		selectedStat = Array.isArray(skillStat) ? skillStat[0] : skillStat;
	}

	$: skillStatModifier = getModifierByPlayerStat(stats[selectedStat]);
</script>

<div class="container">
	<UnlockedButton
		isUnlocked={skillProficiency[skill] === SkillProficiency.PROFICIENT ||
			skillProficiency[skill] === SkillProficiency.AWFUL}
		isMastered={skillProficiency[skill] === SkillProficiency.EXPERT}
		onClick={() => onToggleSkillProficiency(skill)}
		unlockedFilter={skillProficiency[skill] === SkillProficiency.PROFICIENT
			? 'sepia(100%) saturate(1000%) brightness(45%) hue-rotate(174deg)'
			: 'sepia(100%) saturate(1000%) brightness(45%) hue-rotate(287deg)'}
	/>
	<div class="label">
		<span
			class="label-text"
			on:click={() =>
				rollVisualDice([Dice.d20], {
					modifier: [skillBonusMod + skillProficiencyMod + skillStatModifier]
				})}
		>
			<span class="total">{skillBonusMod + skillProficiencyMod + skillStatModifier}</span>
			{`${PLAYER_SKILL_TO_LABEL[skill]} `}
		</span>
		{#if Array.isArray(skillStat)}
			<select
				name="stat-type"
				on:change={(e) => {
					selectedStat = e.currentTarget.value;
				}}
			>
				{#each skillStat as stat}
					<option value={stat} selected={selectedStat === stat}>
						{PLAYER_STAT_TO_SHORT_LABEL[stat]}
					</option>
				{/each}
			</select>
		{/if}
		{#if !Array.isArray(skillStat)}
			<span>{`(${PLAYER_STAT_TO_SHORT_LABEL[selectedStat]})`}</span>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		column-gap: 3px;
		background-color: #eae8da;
		border: 1px solid #c9c6bb;
		padding: 4px;
	}
	.label-text {
		cursor: pointer;
		&:hover {
			color: royalblue;
		}
	}
</style>
