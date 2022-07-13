<script lang="ts">
	import CategoryHeader from 'src/common/categoryHeader.svelte';
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
	<CategoryHeader label={'Skills'} />
	<div class="divider" />
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
		background-color: #dfd6c2;
		row-gap: 5px;

		height: 100%;

		flex: 1;
	}

	.skills {
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
	.divider {
		margin-top: 1px;
		height: 1px;
		background-image: linear-gradient(to right, #bbb9ad, 75%, transparent);
		border-radius: 1px;
	}
</style>
