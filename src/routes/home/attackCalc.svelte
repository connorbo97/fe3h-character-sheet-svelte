<script lang="ts">
	import { COMBAT_ARTS_TO_FEATURES } from 'src/constants/combatArts';

	import { WEAPON_TO_LABEL, WEAPON_TO_TYPE } from 'src/constants/weapons';

	export let equippedClass;
	export let equippedWeapon: string;
	export let equippedCombatArts: Array<string>;
	export let playerCrest;
	export let playerStats;

	export let allWeapons: AllWeapons;
	export let allCombatArts: AllCombatArts;

	let selectedWeapon: any;
	let selectedCombatArt: any;

	$: allCombatArtFeatures = allCombatArts.fullFeatures;

	$: weaponsOptions = allWeapons.fullArray.filter((a) => a);
	let weaponsSelect: any;
	$: {
		if (weaponsSelect && !allWeapons.fullSet.has(weaponsSelect?.value)) {
			selectedWeapon = '';
			weaponsSelect.value = '';
		}
	}

	$: combatArtsOptions = equippedCombatArts.filter((art: string) => {
		const compatibleWeapons = allCombatArtFeatures[art].compatibleWeapons || [];
		const weaponType = WEAPON_TO_TYPE[selectedWeapon];

		return compatibleWeapons.indexOf(weaponType) !== -1;
	});
	let combatArtsSelect: any;
	$: {
		if (combatArtsSelect && !allCombatArts.fullSet.has(combatArtsSelect?.value)) {
			selectedCombatArt = '';
			combatArtsSelect.value = '';
		}
	}
</script>

<div class="container">
	<div class="header">
		<div class="entry">
			<span class="label">
				{`Weapon: `}
			</span>
			<select
				bind:this={weaponsSelect}
				on:change={(e) => {
					selectedWeapon = e.currentTarget.value;
				}}
			>
				<option value={''}> - </option>
				{#each weaponsOptions as weapon}
					<option value={weapon}>
						{weapon}
					</option>
				{/each}
			</select>
		</div>
		<div class="entry">
			<span class="label">
				{`Combat Art: `}
			</span>
			<select
				bind:this={combatArtsSelect}
				on:change={(e) => {
					selectedCombatArt = e.currentTarget.value;
				}}
			>
				<option value={''}> - </option>
				{#each combatArtsOptions as art}
					<option value={art}>
						{allCombatArtFeatures[art].label}
					</option>
				{/each}
			</select>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		background-color: lightgray;
		border-radius: 5px;
		padding: 5px;
		display: flex;
		flex-direction: column;
	}

	.header {
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;

		display: flex;
		justify-content: space-between;
	}
</style>
