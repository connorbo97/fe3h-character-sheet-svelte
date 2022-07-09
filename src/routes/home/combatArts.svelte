<script lang="ts">
	import SvelteTip from 'src/common/SvelteTip.svelte';
	import { CONTEXTS, MAX_COMBAT_ARTS } from 'src/constants';
	import { WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { getContext } from 'svelte';

	import CombatArtsEntry from './combatArtsEntry.svelte';

	// const { open } = getContext(CONTEXTS.MODAL);

	export let allCombatArts: AllCombatArts;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let equippedWeapons: any;

	$: equippedWeaponTypes = new Set(equippedWeapons.map((w) => WEAPONS_TO_FEATURES[w]?.type));

	// $: openAddPrompt = () => {
	// 	// open
	// }
</script>

<div class="container">
	<div class="header">
		<u>Combat Arts ({equippedCombatArts.length}/{MAX_COMBAT_ARTS})</u>
		<!-- <button on:click={openAddPrompt}> + </button> -->
	</div>
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

	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
