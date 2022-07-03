<script lang="ts">
	import {
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT,
		PLAYER_SKILL,
		PLAYER_SKILL_TO_LABEL,
		PLAYER_SKILL_TO_STAT,
		PLAYER_STAT_TO_SHORT_LABEL,
		PROFICIENCY_BONUS
	} from 'src/constants';
	import { getModifierByPlayerStat } from 'src/utils';

	export let stats = DEFAULT_PLAYER_STAT;
	export let skillProficiency = DEFAULT_PLAYER_SKILL_PROFICIENCY;
	export let skillBonus = DEFAULT_PLAYER_SKILL_BONUSES;
	export let onToggleSkillProficiency: Function;
</script>

<div class="container">
	{#each Object.values(PLAYER_SKILL) as skill}
		{@const skillBonusMod = skillBonus[skill] || 0}
		{@const skillProficiencyMod = skillProficiency[skill] ? PROFICIENCY_BONUS : 0}
		{@const skillStat = PLAYER_SKILL_TO_STAT[skill]}
		{@const skillStatModifier = getModifierByPlayerStat(stats[skillStat])}
		<div class="skill-container">
			<button
				class={`${skillProficiencyMod ? 'blue' : 'white'}`}
				on:click={() => onToggleSkillProficiency(skill)}
			/>
			<div class="total">{skillBonusMod + skillProficiencyMod + skillStatModifier}</div>
			<div class="label">
				{`${PLAYER_SKILL_TO_LABEL[skill]} (${PLAYER_STAT_TO_SHORT_LABEL[skillStat]})`}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: red;
		padding: 5px;
		border-radius: 5px;
	}
	.skill-container {
		display: flex;
		padding: 5px;
		column-gap: 3px;
	}
	.blue {
		background-color: blue;
	}
	.transparent {
		background-color: transparent;
	}
</style>
