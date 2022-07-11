<script lang="ts">
	import {
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT,
		PLAYER_SKILL
	} from 'src/constants';
	import SkillEntry from './skillEntry.svelte';

	export let stats = DEFAULT_PLAYER_STAT;
	export let skillProficiency = DEFAULT_PLAYER_SKILL_PROFICIENCY;
	export let skillBonus = DEFAULT_PLAYER_SKILL_BONUSES;
	export let onToggleSkillProficiency: Function;
</script>

<div class="container">
	<u>Skills</u>
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
		background-color: #f89090;
		padding: 5px;
		row-gap: 5px;
		overflow: auto;

		height: 100%;

		flex: 1;
	}

	.skills {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}
</style>
