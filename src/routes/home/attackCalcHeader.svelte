<script lang="ts">
	import { COMBAT_ARTS_TO_FEATURES, getCombatArtsDescription } from 'src/constants/combatArts';
	import { CRESTS_TO_FEATURES } from 'src/constants/crests';
	import { getWeaponDescription, WEAPON_TO_TYPE } from 'src/constants/weapons';

	export let equippedWeapons: any;
	export let selectedWeapon: any;
	export let setSelectedWeapon: any;
	export let damageTypeSelection: any;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };
	let weaponsSelect: any;
	$: {
		if (weaponsSelect && !equippedWeapons.includes(weaponsSelect?.value)) {
			setSelectedWeapon('');
			weaponsSelect.value = '';
		}
	}

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;
	export let equippedCombatArts: any;
	export let allCombatArts: AllCombatArts;
	$: allCombatArtFeatures = allCombatArts.fullFeatures;
	$: combatArtsOptions = equippedCombatArts.filter((art: string) => {
		const compatibleWeapons = allCombatArtFeatures[art].compatibleWeapons || [];
		const weaponType = WEAPON_TO_TYPE[selectedWeapon];

		return compatibleWeapons.indexOf(weaponType) !== -1;
	});

	let combatArtsSelect: any;
	$: {
		if (combatArtsSelect && !combatArtsOptions.includes(combatArtsSelect?.value)) {
			setSelectedCombatArt('');
			combatArtsSelect.value = '';
		}
	}

	export let shouldRollCrest: any;
	export let playerCrest: any;
	export let crestDC: any;
</script>

<div class="container">
	<div class="entry">
		<span class="label">
			{`Weapon: `}
		</span>
		<select
			bind:this={weaponsSelect}
			on:change={(e) => {
				setSelectedWeapon(e.currentTarget.value);
				damageTypeSelection = '';
			}}
		>
			<option value={''}> - </option>
			{#each equippedWeapons as weapon}
				<option value={weapon}>
					{weaponsToFeatures[weapon].label}
				</option>
			{/each}
		</select>
	</div>
	<div class="entry">
		{weaponsToFeatures[selectedWeapon] && getWeaponDescription(weaponsToFeatures[selectedWeapon])}
	</div>
	<div class="entry">
		<span class="label">
			{`Combat Art: `}
		</span>
		<select
			bind:this={combatArtsSelect}
			on:change={(e) => {
				setSelectedCombatArt(e.currentTarget.value);
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
	<div class="entry">
		{COMBAT_ARTS_TO_FEATURES[selectedCombatArt] &&
			getCombatArtsDescription(COMBAT_ARTS_TO_FEATURES[selectedCombatArt])}
	</div>
	{#if shouldRollCrest}
		<div class="crest-container">
			<img
				class="crest-indicator"
				src={CRESTS_TO_FEATURES[playerCrest.type].image}
				alt={playerCrest.type}
			/>
			<span>DC {crestDC}</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;

		display: flex;
		justify-content: space-between;
		grid-area: header;
	}
	.crest-container {
		display: flex;
		align-items: center;
	}

	.crest-indicator {
		width: 20px;
	}

	.entry {
		flex: 1;
	}
</style>
