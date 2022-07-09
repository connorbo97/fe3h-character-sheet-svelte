<script lang="ts">
	import { COMBAT_ARTS_TO_FEATURES, MAX_COMBAT_ARTS } from 'src/constants';
	import { WEAPON_TYPE_TO_IMAGE } from 'src/constants/weaponType';

	export let art: any;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let allCombatArts: any;

	export let equippedWeaponTypes: Set<any>;

	$: features = allCombatArts.fullFeatures;
	$: compatibleWeapons = features[art]?.compatibleWeapons || [];

	let hideDescription: any = false;
</script>

<div class="container">
	<div class="content">
		<!-- <button
			class={selectedCombatArt === art ? 'selected' : ''}
			on:click={() => setSelectedCombatArt(art)}
			disabled={equippedCombatArts.indexOf(art) === -1}
		/> -->
		<div class="label" on:click={() => (hideDescription = !hideDescription)}>
			<span>
				{features[art].label}
			</span>
			{#each compatibleWeapons as type}
				{#if WEAPON_TYPE_TO_IMAGE[type]}
					<img
						class={`icon ${equippedWeaponTypes?.has(type) ? 'equipped' : 'not-equipped'}`}
						src={WEAPON_TYPE_TO_IMAGE[type]}
						alt="icon"
					/>
				{/if}
			{/each}
		</div>
		<div
			class={`caret ${hideDescription ? '' : 'flip'}`}
			on:click={() => (hideDescription = !hideDescription)}
		>
			v
		</div>
		<button
			class={equippedCombatArts.indexOf(art) !== -1 ? 'equipped' : ''}
			on:click={() => onToggleCombatArts(art)}
			disabled={equippedCombatArts.length >= MAX_COMBAT_ARTS &&
				equippedCombatArts.indexOf(art) === -1}
		/>
	</div>
	{#if hideDescription}
		<div class="description">
			{#if features[art]?.reason}
				<div class="reason">{features[art].reason}</div>
				<br />
			{/if}
			{features[art].description}
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		margin-right: 5px;
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

		display: flex;
		flex-direction: column;
	}
	.label {
		cursor: pointer;
		flex: 1;
		display: flex;
		align-items: center;
	}

	.equipped {
		background-color: green;
	}
	.selected {
		background-color: blue;
	}
	.reason {
		color: brown;
	}

	.icon {
		height: 15px;
		border-radius: 5px;
		margin-left: 5px;
	}
	.not-equipped {
		filter: opacity(0.2);
	}
</style>
