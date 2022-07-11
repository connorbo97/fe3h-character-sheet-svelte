<script lang="ts">
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';

	import SvelteTip from 'src/common/SvelteTip.svelte';
	import { CONTEXTS, MAX_COMBAT_ARTS, MAX_WEAPONS_EQUIPPED } from 'src/constants';
	import { COMBAT_ARTS } from 'src/constants/combatArts';
	import { PickOnePromptType, TooltipStyle } from 'src/constants/enums';
	import { WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { getContext } from 'svelte';

	import CombatArtsEntry from './combatArtsEntry.svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let allCombatArts: AllCombatArts;

	export let customCombatArts;
	export let onUpdateCustomCombatArts;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let equippedWeapons: any;

	$: equippedWeaponTypes = new Set(equippedWeapons.map((w) => WEAPONS_TO_FEATURES[w]?.type));

	$: availableCombatArts = Object.values(COMBAT_ARTS).filter((a) => !allCombatArts.fullSet.has(a));
	$: openAddPrompt = () => {
		open(PickOnePrompt, {
			pickOne: [
				{
					type: PickOnePromptType.CombatArt,
					options: availableCombatArts
				}
			],
			reason: `Manually adding in combat arts section`,
			customCombatArts,
			onUpdateCustomCombatArts: (newVals) =>
				onUpdateCustomCombatArts({ ...customCombatArts, ...newVals })
		});
	};
</script>

<div class="container">
	<div class="header">
		<u>
			Combat Arts
			<SvelteTip tooltipStyle={TooltipStyle.BOTTOM_CENTER}>
				<span
					on:click={() =>
						equippedCombatArts.forEach((w) => {
							onToggleCombatArts(w);
						})}
				>
					({equippedCombatArts.length}/{MAX_COMBAT_ARTS})
				</span>
				<div slot="t">Click to Clear All</div>
			</SvelteTip>
		</u>
		<button on:click={openAddPrompt}> + </button>
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
		background-color: powderblue;
		border-bottom: 1px solid gray;
		flex: 1;

		padding: 5px;
		row-gap: 2px;

		overflow-y: auto;
		height: calc(50% - 10px);
	}

	.header {
		display: flex;
		justify-content: space-between;
		z-index: 1;
		margin-bottom: 5px;
		> button {
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
