<script lang="ts">
	import { COMBAT_ARTS_TO_FEATURES, getCombatArtsDescription } from 'src/constants/combatArts';
	import { getWeaponDescription, WEAPON_TO_TYPE } from 'src/constants/weapons';
	import { MAGIC_WEAPON_TYPES } from 'src/constants/weaponType';

	export let allWeapons: AllWeapons;
	export let equippedWeapons: any;
	export let selectedWeapon: any;
	export let setSelectedWeapon: any;
	export let damageTypeSelection: any;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };

	$: weaponsOptions = [
		...equippedWeapons,
		...allWeapons.fullArray.filter((weapon) =>
			MAGIC_WEAPON_TYPES.includes(weaponsToFeatures[weapon].type)
		)
	];

	$: {
		if (selectedWeapon && !weaponsOptions.includes(selectedWeapon)) {
			setSelectedWeapon('');
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

	$: {
		if (selectedCombatArt && !combatArtsOptions.includes(selectedCombatArt)) {
			setSelectedCombatArt('');
		}
	}
</script>

<div class="container">
	<div class="entry">
		<span class="label">
			{`Weapon: `}
		</span>
		{#key weaponsOptions}
			<select
				on:change={(e) => {
					setSelectedWeapon(e.currentTarget.value);
					damageTypeSelection = '';
				}}
			>
				<option value={''}> - </option>
				{#each weaponsOptions as weapon}
					<option value={weapon} selected={selectedWeapon === weapon}>
						{weaponsToFeatures[weapon]?.label}
					</option>
				{/each}
			</select>
		{/key}
	</div>
	<div class="entry">
		{weaponsToFeatures[selectedWeapon] && getWeaponDescription(weaponsToFeatures[selectedWeapon])}
	</div>
	<div class="entry">
		<span class="label">
			{`Combat Art: `}
		</span>
		{#key combatArtsOptions}
			<select
				on:change={(e) => {
					setSelectedCombatArt(e.currentTarget.value);
				}}
			>
				<option value={''}> - </option>
				{#each combatArtsOptions as art}
					<option value={art} selected={selectedCombatArt === art}>
						{allCombatArtFeatures[art].label}
					</option>
				{/each}
			</select>
		{/key}
	</div>
	<div class="entry">
		{COMBAT_ARTS_TO_FEATURES[selectedCombatArt] &&
			getCombatArtsDescription(COMBAT_ARTS_TO_FEATURES[selectedCombatArt])}
	</div>
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
	.entry {
		flex: 1;
	}
</style>
