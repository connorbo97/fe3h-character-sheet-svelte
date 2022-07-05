<script lang="ts">
	import CombatArtsEntry from './combatArtsEntry.svelte';

	export let allCombatArts: AllCombatArts;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;
</script>

<div class="container">
	{#each allCombatArts.fullArray as art}
		<CombatArtsEntry {art} {equippedCombatArts} {onToggleCombatArts} />
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
