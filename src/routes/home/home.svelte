<script lang="ts">
	import Classes from './classes.svelte';

	import CombatStats from './combatStats.svelte';

	import Skills from './skills.svelte';

	import Stats from './stats.svelte';

	export let playerStats: any;
	export let onUpdatePlayerStats: any;

	export let playerSkillBonus: any;

	export let playerSkillProficiency: any;
	export let onToggleSkillProficiency: any;

	export let equippedClass: any;
	export let setEquippedClass: any;

	export let unlockedClasses: any;
	export let onUpdateUnlockedClasses: any;
</script>

<div class="container">
	<div class="stats">
		<Stats stats={playerStats} {onUpdatePlayerStats} />
	</div>
	<div class="skills">
		<Skills
			stats={playerStats}
			skillProficiency={playerSkillProficiency}
			skillBonus={playerSkillBonus}
			{onToggleSkillProficiency}
		/>
		<CombatStats stats={playerStats} {equippedClass} {unlockedClasses} />
	</div>
	<div class="classes">
		<Classes {equippedClass} {setEquippedClass} {unlockedClasses} {onUpdateUnlockedClasses} />
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-areas: 'stats skills classes rest';
		grid-template-columns: min-content 210px min-content 1fr;
		column-gap: 5px;

		height: 100%;
	}
	.stats {
		grid-area: stats;
	}

	.skills {
		grid-area: skills;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}

	.classes {
		grid-area: classes;
	}
</style>
