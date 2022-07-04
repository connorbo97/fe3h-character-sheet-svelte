<script lang="ts">
	import { COMBAT_ARTS_TO_FEATURES, MAX_COMBAT_ARTS } from 'src/constants';

	export let art: any;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;

	let hideDescription: any = false;
</script>

<div class="container">
	<div class="content">
		<button
			class={equippedCombatArts.indexOf(art) !== -1 ? 'equipped' : ''}
			on:click={() => onToggleCombatArts(art)}
			disabled={equippedCombatArts.length >= MAX_COMBAT_ARTS &&
				equippedCombatArts.indexOf(art) === -1}
		/>
		<div class="label" on:click={() => (hideDescription = !hideDescription)}>
			{COMBAT_ARTS_TO_FEATURES[art].label}
		</div>
		<div
			class={`caret ${hideDescription ? 'flip' : ''}`}
			on:click={() => (hideDescription = !hideDescription)}
		>
			v
		</div>
		<button
			class={selectedCombatArt === art ? 'selected' : ''}
			on:click={() => setSelectedCombatArt(art)}
			disabled={equippedCombatArts.indexOf(art) === -1}
		/>
	</div>
	{#if hideDescription}
		<div class="description">
			{COMBAT_ARTS_TO_FEATURES[art].description}
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}

	.caret {
		transition: transform 0.2s linear;
		padding: 0px 5px;
		cursor: pointer;
		margin-bottom: 1px;
		border: 1px solid black;
		border-radius: 100%;
		height: 20px;
	}

	.flip {
		transform: rotate(180deg);
	}

	.active {
		background-color: blue;
	}

	.content {
		display: flex;
		column-gap: 5px;
	}
	.description {
		background-color: lightgray;
		padding: 5px;
		border-radius: 5px;
	}
	.label {
		cursor: pointer;
		flex: 1;
	}

	.equipped {
		background-color: blue;
	}
	.selected {
		background-color: green;
	}
</style>
