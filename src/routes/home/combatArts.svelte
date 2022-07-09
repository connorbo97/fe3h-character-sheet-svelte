<script lang="ts">
	import { WEAPONS_TO_FEATURES } from 'src/constants/weapons';

	import CombatArtsEntry from './combatArtsEntry.svelte';

	export let allCombatArts: AllCombatArts;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let equippedWeapons: any;

	$: equippedWeaponTypes = new Set(equippedWeapons.map((w) => WEAPONS_TO_FEATURES[w]?.type));
</script>

<div class="container">
	{#each allCombatArts.fullArray as art}
		<CombatArtsEntry
			{art}
			{allCombatArts}
			{equippedCombatArts}
			{onToggleCombatArts}
			{equippedWeaponTypes}
		/>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: #7dbff0;
		flex: 1;

		border-radius: 5px;
		padding: 5px;

		row-gap: 5px;

		overflow-y: scroll;
		height: calc(50% - 10px);
	}
</style>
