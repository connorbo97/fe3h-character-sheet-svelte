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
	import SkillEntry from './skillEntry.svelte';

	export let stats = DEFAULT_PLAYER_STAT;
	export let skillProficiency = DEFAULT_PLAYER_SKILL_PROFICIENCY;
	export let skillBonus = DEFAULT_PLAYER_SKILL_BONUSES;
	export let onToggleSkillProficiency: Function;
</script>

<div class="container">
	<div class="skills">
		{#each Object.values(PLAYER_SKILL) as skill}
			<SkillEntry {skill} {stats} {skillBonus} {skillProficiency} {onToggleSkillProficiency} />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: red;
		padding: 5px;
		border-radius: 5px;
		row-gap: 10px;

		flex: 1;
	}

	.skills {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
	.transparent {
		background-color: transparent;
	}
</style>
