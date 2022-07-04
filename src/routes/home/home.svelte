<script lang="ts">
	import AttackCalc from './attackCalc.svelte';
	import Classes from './classes.svelte';
	import CombatArts from './combatArts.svelte';
	import CombatSkills from './combatSkills.svelte';
	import CombatStats from './combatStats.svelte';
	import Skills from './skills.svelte';
	import Stats from './stats.svelte';
	import Weapons from './weapons.svelte';

	export let classXP: any;

	export let allWeapons: any;
	export let allCombatSkills: any;
	export let allCombatArts: any;

	export let masteredClasses: any;

	export let playerCrest: any;
	export let onUpdateCrest: any;

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;

	export let playerStats: any;
	export let onUpdatePlayerStats: any;

	export let customCombatSkills: any;

	export let playerSkillBonus: any;

	export let playerSkillProficiency: any;
	export let onToggleSkillProficiency: any;

	export let equippedWeapon: any;
	export let setEquippedWeapon: any;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;

	export let equippedClass: any;
	export let setEquippedClass: any;

	export let unlockedClasses: any;
	export let onUpdateUnlockedClasses: any;
</script>

<div class="container">
	<div class="stats">
		<Stats stats={playerStats} {onUpdatePlayerStats} {playerCrest} {onUpdateCrest} />
	</div>
	<div class="skills">
		<Skills
			stats={playerStats}
			skillProficiency={playerSkillProficiency}
			skillBonus={playerSkillBonus}
			{onToggleSkillProficiency}
		/>
	</div>
	<div class="classes">
		<Classes
			{equippedClass}
			{setEquippedClass}
			{unlockedClasses}
			{onUpdateUnlockedClasses}
			{masteredClasses}
		/>
		<CombatSkills
			{allCombatSkills}
			{customCombatSkills}
			{equippedCombatSkills}
			{onToggleCombatSkill}
		/>
	</div>
	<div class="rest">
		<div class="weapons">
			<Weapons {allWeapons} {equippedWeapon} {setEquippedWeapon} />
		</div>
		<div class="arts">
			<CombatArts
				{allCombatArts}
				{equippedCombatArts}
				{onToggleCombatArts}
				{selectedCombatArt}
				{setSelectedCombatArt}
			/>
		</div>
		<div class="other">
			<CombatStats stats={playerStats} {equippedClass} {unlockedClasses} {equippedCombatSkills} />
			<AttackCalc
				{equippedClass}
				{equippedWeapon}
				{equippedCombatArts}
				{equippedCombatSkills}
				{allWeapons}
				{allCombatArts}
				{playerCrest}
				{playerStats}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-areas: 'stats skills classes rest';
		grid-template-columns: min-content 210px 210px 1fr;
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

		overflow: hidden;
	}

	.rest {
		grid-area: rest;
		display: grid;
		grid-template-areas:
			'weapons weapons'
			'arts other';
		grid-template-rows: min-content 1fr;
		grid-template-columns: 185px 1fr;
		row-gap: 5px;
		column-gap: 5px;
	}
	.other {
		grid-area: other;

		display: grid;
		grid-area: 'cStats' 'attack';
		grid-template-rows: min-content 1fr;
		gap: 5px;
	}

	.weapons {
		grid-area: weapons;
	}

	.arts {
		grid-area: arts;
		display: flex;
	}
</style>
