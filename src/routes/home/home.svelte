<script lang="ts">
	import Classes from './classes.svelte';
	import CombatArts from './combatArts.svelte';
	import CombatSkills from './combatSkills.svelte';
	import CombatStats from './combatStats.svelte';
	import Skills from './skills.svelte';
	import Stats from './stats.svelte';
	import Weapons from './weapons.svelte';

	export let playerStats: any;
	export let onUpdatePlayerStats: any;

	export let customWeapons: any;
	export let customCombatSkills: any;

	export let playerSkillBonus: any;

	export let playerSkillProficiency: any;
	export let onToggleSkillProficiency: any;

	export let equippedWeapon: any;
	export let setEquippedWeapon: any;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;

	export let equippedClass: any;
	export let setEquippedClass: any;

	export let unlockedClasses: any;
	export let onUpdateUnlockedClasses: any;

	export let unlockedClassesPicks: any;
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
		<CombatSkills
			{unlockedClasses}
			{equippedClass}
			{customCombatSkills}
			{unlockedClassesPicks}
			{equippedCombatSkills}
			{onToggleCombatSkill}
		/>
	</div>
	<div class="rest">
		<div class="weapons">
			<Weapons
				{customWeapons}
				{unlockedClasses}
				{equippedClass}
				{equippedWeapon}
				{setEquippedWeapon}
			/>
		</div>
		<div class="arts">
			<CombatArts />
		</div>
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
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}

	.rest {
		grid-area: rest;
		display: grid;
		grid-template-areas:
			'weapons weapons'
			'arts rest';
		grid-template-rows: min-content 1fr;
		grid-template-columns: min-content 1fr;
	}

	.weapons {
		grid-area: weapons;
	}

	.arts {
		grid-area: arts;
		display: flex;
	}
</style>
