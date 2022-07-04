<script lang="ts">
	import { COMBAT_ARTS_TO_FEATURES, getCombatArtsDescription } from 'src/constants/combatArts';
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants/combatSkills';
	import { CRESTS_TO_FEATURES, CrestTrigger } from 'src/constants/crests';
	import { Dice } from 'src/constants/dice';
	import { PLAYER_STAT } from 'src/constants/stats';

	import {
		getWeaponDescription,
		HEALING_MAGIC,
		WEAPONS_TO_FEATURES,
		WEAPON_TO_TYPE
	} from 'src/constants/weapons';
	import { WEAPON_TYPE } from 'src/constants/weaponType';
	import { getModifierByPlayerStat, printCalc, rollCalc } from 'src/utils';

	export let equippedCombatArts: Array<string>;
	export let equippedCombatSkills: Array<string>;
	export let playerCrest: PlayerCrest;
	export let playerStats: any;

	export let allWeapons: AllWeapons;
	export let allCombatArts: AllCombatArts;

	let selectedWeapon: any;
	let selectedCombatArt: any;

	let optionalModifierChoices;

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

	$: crestTrigger = new Set(CRESTS_TO_FEATURES[playerCrest.type]?.triggersOn);
	$: calcShouldRollCrest = () => {
		if (selectedCombatArt) {
			return crestTrigger.has(CrestTrigger.COMBAT_ART);
		} else if (
			selectedWeaponType === WEAPON_TYPE.REASON ||
			selectedWeaponType === WEAPON_TYPE.FAITH
		) {
			return (
				(crestTrigger.has(CrestTrigger.MAGIC_ATTACK) &&
					WEAPONS_TO_FEATURES[selectedWeapon]?.damage?.[0] === 0) ||
				(crestTrigger.has(CrestTrigger.HEAL) && HEALING_MAGIC.has(selectedWeapon))
			);
		} else {
			return crestTrigger.has(CrestTrigger.ATTACK);
		}
	};

	$: selectedWeaponType = WEAPON_TO_TYPE[selectedWeapon];
	$: shouldRollCrest = calcShouldRollCrest();

	$: attackDexModifier = getModifierByPlayerStat(playerStats[PLAYER_STAT.DEX]);
	$: weaponAttackModifier = WEAPONS_TO_FEATURES[selectedWeapon]?.attackBonus || 0;
	$: weaponArtAttackModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.attackBonus || [0];
	$: skillAttackModifier = equippedCombatSkills.reduce((acc: any, skill: any) => {
		return [
			...acc,
			...(COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.['ANY'] ||
				COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.[selectedWeaponType] ||
				[])
		];
	}, []);
	$: optionalAttackModifier = 0;
	$: attackModifier = [
		...skillAttackModifier,
		...weaponArtAttackModifier,
		weaponAttackModifier,
		attackDexModifier,
		optionalAttackModifier
	].filter((a) => a !== 0);
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
						{WEAPONS_TO_FEATURES[weapon].label}
					</option>
				{/each}
			</select>
		</div>
		<div class="entry">
			{WEAPONS_TO_FEATURES[selectedWeapon] &&
				getWeaponDescription(WEAPONS_TO_FEATURES[selectedWeapon])}
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
		<div class="entry">
			{COMBAT_ARTS_TO_FEATURES[selectedCombatArt] &&
				getCombatArtsDescription(COMBAT_ARTS_TO_FEATURES[selectedCombatArt])}
		</div>
		{#if shouldRollCrest}
			<img
				class="crest-indicator"
				src={CRESTS_TO_FEATURES[playerCrest.type].image}
				alt={playerCrest.type}
			/>
		{/if}
	</div>
	<div class="content">
		<h1>Attack Bonus</h1>
		<span>
			<span>
				{rollCalc(attackModifier)}
			</span>
			{#if attackModifier.length > 1}
				<span>
					= {printCalc(attackModifier)}
				</span>
			{/if}
		</span>
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
	.entry {
		flex: 1;
	}

	.crest-indicator {
		width: 20px;
	}
</style>
