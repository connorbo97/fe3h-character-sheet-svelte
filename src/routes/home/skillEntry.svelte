<script lang="ts">
	import { PROFICIENCY_BONUS } from 'src/constants';
	import { Dice } from 'src/constants/dice';

	import { PLAYER_SKILL_TO_LABEL, PLAYER_SKILL_TO_STAT } from 'src/constants/playerSkills';
	import { PLAYER_STAT_TO_LABEL, PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';
	import { getModifierByPlayerStat, rollVisualDice } from 'src/utils';

	export let stats: any;
	export let skillProficiency: any;
	export let skillBonus: any;
	export let onToggleSkillProficiency: Function;
	export let skill: any;

	$: skillBonusMod = skillBonus[skill] || 0;
	$: skillProficiencyMod = skillProficiency[skill] ? PROFICIENCY_BONUS : 0;
	$: skillStat = PLAYER_SKILL_TO_STAT[skill];

	let selectedStat = Array.isArray(skillStat) ? skillStat[0] : skillStat;
	$: {
		selectedStat = Array.isArray(skillStat) ? skillStat[0] : skillStat;
	}

	$: skillStatModifier = getModifierByPlayerStat(stats[selectedStat]);
</script>

<div class="container">
	<button
		class={`${skillProficiencyMod ? 'blue' : 'white'}`}
		on:click={() => onToggleSkillProficiency(skill)}
	/>
	<div class="total">{skillBonusMod + skillProficiencyMod + skillStatModifier}</div>
	<div
		class="label"
		on:click={() =>
			rollVisualDice([Dice.d20], {
				modifier: [skillBonusMod + skillProficiencyMod + skillStatModifier]
			})}
	>
		<span class="label-text">{`${PLAYER_SKILL_TO_LABEL[skill]} `}</span>
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
		&:hover {
			color: royalblue;
		}
	}
	.blue {
		background-color: blue;
	}
</style>
