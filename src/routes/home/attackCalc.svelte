<script lang="ts">
	import { CLASS_TO_FEATURES } from 'src/constants/classes';

	import { COMBAT_ARTS_TO_FEATURES, getCombatArtsDescription } from 'src/constants/combatArts';
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants/combatSkills';
	import { CRESTS_TO_FEATURES, CrestTrigger, CrestType } from 'src/constants/crests';
	import { Dice } from 'src/constants/dice';
	import { PLAYER_STAT, PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';

	import {
		getWeaponDescription,
		HEALING_MAGIC,
		WEAPONS,
		WEAPONS_TO_FEATURES,
		WEAPON_TO_TYPE
	} from 'src/constants/weapons';
	import { WEAPON_TYPE } from 'src/constants/weaponType';
	import {
		checkCalcRequiresRoll,
		getModifierByPlayerStat,
		printCalc,
		rollCalc,
		rollDice
	} from 'src/utils';
	import EntryPicker from './queryPicker.svelte';
	import OptionsPicker from './queryPicker.svelte';

	export let equippedClass: string;
	export let equippedCombatArts: Array<string>;
	export let equippedCombatSkills: Array<string>;
	export let playerCrest: PlayerCrest;
	export let playerStats: any;

	export let allWeapons: AllWeapons;
	export let allCombatArts: AllCombatArts;

	let selectedWeapon: any;
	let selectedCombatArt: any;

	$: allCombatArtFeatures = allCombatArts.fullFeatures;
	$: dexMod = getModifierByPlayerStat(playerStats[PLAYER_STAT.DEX]);

	// queries
	$: calcQueriesMap = (): { [s: string]: Query } => {
		const combatSkillQueries = equippedCombatSkills.reduce((acc: any, skill) => {
			const curQueries = COMBAT_SKILLS_TO_FEATURES[skill].queries || [];

			curQueries.forEach((query, index) => {
				if (query.compatibleWeapons.includes(WEAPONS_TO_FEATURES[selectedWeapon]?.type)) {
					const key = skill + '__' + index;
					acc[key] = { ...query, key: skill + '__' + index };
				}
			});

			return acc;
		}, {});

		return combatSkillQueries;
	};
	$: queriesMap = calcQueriesMap();
	$: queries = Object.values(queriesMap);

	let selections: { [s: string]: QueryOption } | undefined;
	$: {
		if (!selections) {
			selections = queries.reduce((acc: { [s: string]: QueryOption }, query: Query) => {
				acc[query.key || ''] = query.options[0];
				return acc;
			}, {});
		} else {
			queries.forEach((query) => {
				if (!selections?.[query.key || '']) {
					(selections || {})[query.key || ''] = query.options[0];
				}
			});
		}
	}
	$: onUpdateQuerySelection = (key: string, value: QueryOption) => {
		selections = { ...selections, [key]: value };
	};
	$: console.log(queries, selections, queriesMap, equippedCombatSkills);

	// selected weapon
	$: weaponsOptions = allWeapons.fullArray.filter((a) => a);
	let weaponsSelect: any;
	$: {
		if (weaponsSelect && !allWeapons.fullSet.has(weaponsSelect?.value)) {
			selectedWeapon = '';
			weaponsSelect.value = '';
		}
	}

	// selected combat art
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

	// crest activation
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
	$: crestDC = shouldRollCrest
		? CRESTS_TO_FEATURES[playerCrest.type].activationDC[
				playerCrest.isMajor ? CrestType.MAJOR : CrestType.MINOR
		  ]
		: 21;

	// Attack
	$: attackDexModifier = dexMod;
	$: weaponAttackModifier = WEAPONS_TO_FEATURES[selectedWeapon]?.attackBonus || 0;
	$: weaponArtAttackModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.attackBonus || [];
	$: skillAttackModifier = equippedCombatSkills.reduce((acc: any, skill: any) => {
		return [
			...acc,
			...(COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.['ANY'] ||
				COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.[selectedWeaponType] ||
				[])
		];
	}, []);
	$: optionalAttackModifier = [];
	$: attackModifier = [
		...skillAttackModifier,
		...weaponArtAttackModifier,
		weaponAttackModifier,
		attackDexModifier,
		...optionalAttackModifier
	].filter((a) => a !== 0);
	$: attackModifierRequiresRoll = checkCalcRequiresRoll(attackModifier);

	let attackRoll = 'Roll Attack';

	// Damage
	$: weaponDamageType = WEAPONS_TO_FEATURES[selectedWeapon]?.damageType;
	let damageTypeSelection = '';

	$: {
		if (!damageTypeSelection) {
			if (weaponDamageType) {
				damageTypeSelection = weaponDamageType[0];
			} else {
				damageTypeSelection = PLAYER_STAT.STR;
			}
		}
	}
	$: damageBase = getModifierByPlayerStat(playerStats[damageTypeSelection] || 10);
	$: damageTypeLabel = PLAYER_STAT_TO_SHORT_LABEL[damageTypeSelection];
	$: weaponDamageModifier = WEAPONS_TO_FEATURES[selectedWeapon]?.damage || [];
	$: weaponArtDamageModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.damageBonus || [];
	$: optionsDamageModifier = [];
	$: damageCalc = [
		damageBase,
		...weaponDamageModifier,
		...weaponArtDamageModifier,
		...optionsDamageModifier
	].filter((a) => a !== 0);

	let damageRoll = 'roll damage';

	// Crit
	$: critDexModifier = -1;
	$: weaponCritModifier = WEAPONS_TO_FEATURES[selectedWeapon]?.critBonus || 0;
	$: weaponArtCritModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.critBonus || [];
	$: optionsCritModifier = [];
	$: critModifier = rollCalc([
		dexMod,
		critDexModifier,
		weaponCritModifier,
		...weaponArtCritModifier,
		...optionsCritModifier
	]);

	let critRoll = 'Click to roll crit';

	// Range
	$: equippedClassRangeModifier =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.bonusRange?.[
			WEAPONS_TO_FEATURES[selectedWeapon]?.type
		] || 0;
	$: combatSkillsRangeModifier = equippedCombatSkills.reduce(
		(acc, skill) =>
			acc +
			(COMBAT_SKILLS_TO_FEATURES[skill]?.bonusRange?.[WEAPONS_TO_FEATURES[selectedWeapon]?.type] ||
				0),
		0
	);
	$: optionsRangeModifier = 0;
	$: calcWeaponRange = () => {
		let baseWeaponRange = [...(WEAPONS_TO_FEATURES[selectedWeapon]?.range || [1])];

		if (selectedWeapon === WEAPONS.RESTORE) {
			baseWeaponRange = [1, 2 + 2 * getModifierByPlayerStat(playerStats[PLAYER_STAT.INT])];
		} else if (selectedWeapon === WEAPONS.PHYSIC) {
			baseWeaponRange = [1, 2 + 2 * getModifierByPlayerStat(playerStats[PLAYER_STAT.INT])];
		}

		if (baseWeaponRange[1] === undefined) {
			baseWeaponRange[1] = baseWeaponRange[0];
		}

		baseWeaponRange[1] =
			parseInt(baseWeaponRange[1] + '') +
			equippedClassRangeModifier +
			combatSkillsRangeModifier +
			optionsRangeModifier;

		return baseWeaponRange;
	};
	$: [weaponRangeMin, weaponRangeMax] = calcWeaponRange();
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
					damageTypeSelection = '';
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
	<div class="calcs">
		<div class="attack-container">
			<h2 class="content">
				Attack: 1d20
				<span class="modifiers">
					{#if attackDexModifier}
						<span>+ {attackDexModifier}<span class="source">(dex)</span></span>
					{/if}
					{#if weaponAttackModifier}
						<span>+ {weaponAttackModifier}<span class="source">(weapon)</span></span>{/if}
					{#if weaponArtAttackModifier.length}
						<span>
							+ {printCalc(weaponArtAttackModifier)}<span class="source">(combat art)</span>
						</span>
					{/if}
					{#if optionalAttackModifier.length > 0}
						<span>
							+ {printCalc(optionalAttackModifier)}<span class="source">(optionals)</span>
						</span>
					{/if}
				</span>
				{#if attackModifier.length > 0 && !attackModifierRequiresRoll}
					<span>
						= 1d20 <span class="modifiers">+ {rollCalc(attackModifier)}</span>
					</span>
				{/if}
			</h2>
		</div>
		<div class="damage-container">
			<h2 class="content">
				Damage: {#if selectedWeapon}
					{damageBase}{#if damageTypeSelection && (weaponDamageType || []).length <= 1}
						<span>({damageTypeLabel})</span>
					{/if}{#if weaponDamageType && weaponDamageType.length > 1}
						<select
							on:change={(e) => {
								damageTypeSelection = e.currentTarget.value;
							}}
						>
							<option value={''}>-</option>
							{#each weaponDamageType as type}
								<option value={type} selected={type === damageTypeSelection}
									>{PLAYER_STAT_TO_SHORT_LABEL[type]}</option
								>
							{/each}
						</select>
					{/if}

					<span class="modifiers">
						{#if weaponDamageModifier.length}
							<span>+ {printCalc(weaponDamageModifier)}<span class="source">(weapon)</span></span>
						{/if}
						{#if weaponArtDamageModifier.length}
							<span>+ {weaponArtDamageModifier}<span class="source">(combat art)</span></span>
						{/if}
						{#if optionsDamageModifier.length}
							<span>+ {optionsDamageModifier}<span class="source">(options)</span></span>
						{/if}
					</span>
				{/if}
			</h2>
		</div>
		<div class="crit-container">
			<h2 class="content">
				Crit Modifier: {dexMod + critDexModifier}<span class="source"
					>(Dex{critDexModifier > 0 ? '+' + critDexModifier : critDexModifier})</span
				>
				<span class="modifiers">
					{#if weaponCritModifier}
						<span
							>{weaponCritModifier > 0 ? '+ ' + weaponCritModifier : weaponCritModifier}<span
								class="source">(weapon)</span
							></span
						>
					{/if}
					{#if weaponArtCritModifier.length}
						<span>+ {printCalc(weaponArtCritModifier)}<span class="source">(combat art)</span></span
						>
					{/if}
					{#if optionsCritModifier.length}
						<span>+ {optionsCritModifier}<span class="source">(options)</span></span>
					{/if}
				</span>
				= {20 - critModifier} to 20
				<span />
			</h2>
		</div>
		<div class="range-container">
			<h2 class="content">
				Range: {#if selectedWeapon}
					{weaponRangeMin}
					{#if weaponRangeMax !== weaponRangeMin}to {weaponRangeMax}{/if}
				{/if}
			</h2>
		</div>
	</div>
	<div class="rolls">
		<button
			on:click={() => {
				const roll = rollDice(20);
				const mod = rollCalc(attackModifier);
				attackRoll = roll + mod + '=' + roll + '+' + mod;
			}}>{attackRoll}</button
		>
		<button
			on:click={(e) => {
				const mod = rollCalc(attackModifier);
				e.currentTarget.innerHTML = mod + '';
			}}>Roll Mods Only</button
		>
		<button
			on:click={() => {
				const damage = rollCalc(damageCalc);
				damageRoll = damage + '';
			}}>{damageRoll}</button
		>
		<button
			on:click={(e) => {
				const roll = rollCalc([Dice.d20]);
				const didCrit = roll >= 20 - critModifier;

				critRoll = `${didCrit ? 'CRIT' : 'Normal'} (${roll})`;
				e.currentTarget.innerHTML = `${didCrit ? 'CRIT' : 'Normal'} (${roll})`;
			}}>Roll Crit</button
		>
	</div>
	<div class="options">
		<button
			class="reset"
			on:click={() => {
				selections = {};
			}}>Reset Queries</button
		>
		<EntryPicker {queries} {selections} {onUpdateQuerySelection} />
	</div>
</div>

<style lang="scss">
	.container {
		background-color: lightgray;
		border-radius: 5px;
		padding: 5px;

		display: grid;
		grid-template-areas:
			'header header'
			'rolls buttons'
			'picks empty';

		grid-template-rows: min-content min-content 1fr;
		grid-template-columns: 1fr min-content;

		row-gap: 5px;
		button {
			width: 100px;
			height: 25px;
		}
	}

	.content {
		margin: 0;
	}

	.header {
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

	.crest-indicator {
		width: 20px;
	}
	.attack-container {
		display: flex;
	}
	.damage-container {
		display: flex;
	}
	.crit-container {
		display: flex;
	}
	.source {
		font-size: 20px;
	}
	.modifiers {
		color: royalblue;
	}

	.crest-container {
		display: flex;
		align-items: center;
	}

	.options {
		position: relative;
		display: flex;
		flex-direction: column;
		.reset {
			width: 200px;
		}
	}
</style>
