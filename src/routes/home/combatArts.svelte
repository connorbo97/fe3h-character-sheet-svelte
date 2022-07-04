<script lang="ts">
	import CombatArtsEntry from './combatArtsEntry.svelte';

	export let allCombatArts: AllCombatArts;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;
</script>

<div class="container">
	{#each allCombatArts.fullArray as art}
		<CombatArtsEntry
			{art}
			{equippedCombatArts}
			{onToggleCombatArts}
			{selectedCombatArt}
			{setSelectedCombatArt}
		/>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: aquamarine;

		border-radius: 5px;
		padding: 5px;

		row-gap: 5px;

		width: 100%;
		overflow-y: scroll;
	}
</style>
