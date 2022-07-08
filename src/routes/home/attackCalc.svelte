<script lang="ts">
	import { CONTEXTS } from 'src/constants';

	import { CLASS_TO_FEATURES } from 'src/constants/classes';

	import { COMBAT_ARTS_TO_FEATURES } from 'src/constants/combatArts';
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants/combatSkills';
	import { CRESTS_TO_FEATURES, CrestTrigger, CrestType } from 'src/constants/crests';
	import { PLAYER_STAT, PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';

	import { HEALING_MAGIC, WEAPONS, WEAPON_TO_TYPE } from 'src/constants/weapons';
	import { WEAPON_TYPE } from 'src/constants/weaponType';
	import {
		checkHealPlus,
		getModifierByPlayerStat,
		printCalc,
		rollCalc,
		setEquality,
		simplifyCalc
	} from 'src/utils';
	import { getContext } from 'svelte';
	import AttackCalcHeader from './attackCalcHeader.svelte';
	import AttackRollModal from './attackRollModal.svelte';
	import EntryPicker from './queryPicker.svelte';

	const { open } = getContext(CONTEXTS.MODAL);
	export let playerName: any;
	export let equippedClass: string;
	export let equippedCombatArts: Array<string>;
	export let equippedCombatSkills: Array<string>;
	export let equippedWeapons: Array<string>;
	export let playerCrest: PlayerCrest;
	export let playerStats: any;

	export let allWeapons: AllWeapons;
	export let allCombatArts: AllCombatArts;

	export let selectedWeapon: any;
	export let setSelectedWeapon: any;

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;

	$: weaponsToFeatures = allWeapons.fullFeatures;
	$: dexMod = getModifierByPlayerStat(playerStats[PLAYER_STAT.DEX]);
	$: hasHealPlus = checkHealPlus(equippedClass, equippedCombatSkills);
	$: selectedWeaponType = WEAPON_TO_TYPE[selectedWeapon];

	// queries
	$: calcQueriesMap = (): { [s: string]: Query } => {
		const combatSkillQueries = equippedCombatSkills.reduce((acc: any, skill) => {
			const curQueries = COMBAT_SKILLS_TO_FEATURES[skill].queries || [];

			curQueries.forEach((query, index) => {
				if (query.compatibleWeapons.includes(weaponsToFeatures[selectedWeapon]?.type)) {
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
	$: queryKeys = queries.map((q) => q.key);
	let prevQueryKeys: any = { current: null };

	let selections: { [s: string]: QueryOption } | undefined;
	$: {
		if (!selections) {
			selections = queries.reduce((acc: { [s: string]: QueryOption }, query: Query) => {
				acc[query.key || ''] = query.options[0];
				return acc;
			}, {});
		} else if (!setEquality(new Set(prevQueryKeys.current), new Set(queryKeys))) {
			prevQueryKeys.current = queryKeys;
			selections = queries.reduce((acc: { [s: string]: QueryOption }, query: Query) => {
				acc[query.key || ''] = query.options[0];
				return acc;
			}, {});
		}
	}

	$: onUpdateQuerySelection = (key: string, value: QueryOption) => {
		selections = { ...selections, [key]: value };
	};

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
					weaponsToFeatures[selectedWeapon]?.damage?.[0] === 0) ||
				(crestTrigger.has(CrestTrigger.HEAL) && HEALING_MAGIC.has(selectedWeapon))
			);
		} else {
			return crestTrigger.has(CrestTrigger.ATTACK);
		}
	};

	$: crestType = playerCrest.type;
	$: crestName = CRESTS_TO_FEATURES[crestType]?.label;
	$: crestDescription = CRESTS_TO_FEATURES[crestType]?.description;
	$: crestDamageBonus = CRESTS_TO_FEATURES[crestType]?.damageBonus || [];
	$: crestCombatArtDamageModifier = CRESTS_TO_FEATURES[crestType]?.combatArtDamageMultiplier || 1;
	$: crestConservesResource = CRESTS_TO_FEATURES[crestType]?.conservesResource || false;
	$: crestHPRecoveryPercent = CRESTS_TO_FEATURES[crestType]?.hpRecoveryPercent || 0;
	$: shouldRollCrest = calcShouldRollCrest();
	$: crestDC = shouldRollCrest
		? CRESTS_TO_FEATURES[crestType].activationDC[
				playerCrest.isMajor ? CrestType.MAJOR : CrestType.MINOR
		  ]
		: Infinity;

	// Attack
	$: attackDexModifier = dexMod;
	$: weaponAttackModifier = weaponsToFeatures[selectedWeapon]?.attackBonus || 0;
	$: weaponArtAttackModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.attackBonus || [];
	$: skillAttackModifier = equippedCombatSkills.reduce((acc: any, skill: any) => {
		return [
			...acc,
			...(COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.[selectedWeaponType] ||
				COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.['ANY'] ||
				[])
		];
	}, []);
	$: optionalAttackModifier = Object.keys(selections || {}).reduce(
		(acc: Array<CalcEntry>, key: string) => {
			if (selections?.[key].attackBonus) {
				acc = [...acc, ...(selections[key].attackBonus || [])];
			}
			return acc;
		},
		[]
	);
	$: attackModifier = [
		...skillAttackModifier,
		...weaponArtAttackModifier,
		weaponAttackModifier,
		attackDexModifier,
		...optionalAttackModifier
	].filter((a) => a !== 0);
	$: simplifiedAttackModifier = simplifyCalc(attackModifier);

	// Damage
	$: weaponDamageType = weaponsToFeatures[selectedWeapon]?.damageType;
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
	$: weaponDamageModifier = [...(weaponsToFeatures[selectedWeapon]?.damage || [])];
	$: healPlusModifier = selectedWeapon === WEAPONS.HEAL && hasHealPlus ? 2 : 0;

	$: weaponArtDamageModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.damageBonus || [];
	$: optionsDamageModifier = Object.keys(selections || {}).reduce(
		(acc: Array<CalcEntry>, key: string) => {
			if (selections?.[key].damageBonus) {
				acc = [...acc, ...(selections[key].damageBonus || [])];
			}
			return acc;
		},
		[]
	);
	$: damageCalc = [
		damageBase,
		...weaponDamageModifier,
		...weaponArtDamageModifier,
		healPlusModifier,
		...optionsDamageModifier
	].filter((a) => a !== 0);
	$: simplifiedDamageCalc = simplifyCalc(damageCalc);

	// Crit
	$: critDexModifier = -1;
	$: weaponCritModifier = weaponsToFeatures[selectedWeapon]?.critBonus || 0;
	$: weaponArtCritModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.critBonus || [];
	$: optionsCritModifier = [];
	$: critModifier = rollCalc([
		dexMod,
		critDexModifier,
		weaponCritModifier,
		...weaponArtCritModifier,
		...optionsCritModifier
	]);

	// Range
	$: equippedClassRangeModifier =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.bonusRange?.[
			weaponsToFeatures[selectedWeapon]?.type
		] || 0;
	$: combatSkillsRangeModifier = equippedCombatSkills.reduce(
		(acc, skill) =>
			acc +
			(COMBAT_SKILLS_TO_FEATURES[skill]?.bonusRange?.[weaponsToFeatures[selectedWeapon]?.type] ||
				0),
		0
	);
	$: optionsRangeModifier = 0;
	$: calcWeaponRange = () => {
		let baseWeaponRange = [...(weaponsToFeatures[selectedWeapon]?.range || [1])];

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

	$: onOpenAttackModal = () =>
		open(AttackRollModal, {
			playerName,
			attackCalc: simplifiedAttackModifier,
			damageCalc: simplifiedDamageCalc,
			critModifier,
			crestDC: shouldRollCrest ? crestDC : Infinity,
			crestDamage: crestDamageBonus,
			crestCombatArtDamageModifier,
			combatArtDamageBonus: weaponArtDamageModifier,
			crestType,
			selectedWeapon,
			selectedCombatArt,
			allWeapons,
			allCombatArts
		});
</script>

<div class="container">
	<AttackCalcHeader
		{damageTypeSelection}
		{weaponsToFeatures}
		{allCombatArts}
		{allWeapons}
		{equippedCombatArts}
		{equippedWeapons}
		{selectedWeapon}
		{setSelectedWeapon}
		{selectedCombatArt}
		{setSelectedCombatArt}
	/>
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
					{#if skillAttackModifier.length}
						<span>
							+ {printCalc(skillAttackModifier)}<span class="source">(combat skills)</span>
						</span>
					{/if}
					{#if optionalAttackModifier.length > 0}
						<span>
							+ {printCalc(simplifyCalc(optionalAttackModifier))}<span class="source"
								>(optionals)</span
							>
						</span>
					{/if}
				</span>
				<span>
					= 1d20 <span class="modifiers">+ {printCalc(simplifiedAttackModifier)}</span>
				</span>
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
						{#if healPlusModifier}
							<span>+ {healPlusModifier}<span class="source">(Heal Plus)</span></span>
						{/if}
						{#if weaponArtDamageModifier.length}
							<span>+ {weaponArtDamageModifier}<span class="source">(combat art)</span></span>
						{/if}
						{#if optionsDamageModifier.length}
							<span
								>+ {printCalc(simplifyCalc(optionsDamageModifier))}<span class="source"
									>(options)</span
								></span
							>
						{/if}
					</span>
					= <span>{printCalc(simplifiedDamageCalc)}</span>
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
				{#if critModifier >= 0}= {20 - critModifier} to 20{/if}
				{#if critModifier < 0}= Can't Crit{/if}
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
		{#if shouldRollCrest}
			<div class="crest-container">
				<h2 class="content">
					Crest of {crestName} (DC {crestDC}):
					<span class="crest-description">{crestDescription}</span>
				</h2>
			</div>
		{/if}
	</div>
	<div class="rolls">
		<button style:height={'100%'} on:click={onOpenAttackModal} disabled={!selectedWeapon}
			>ATTACK</button
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
			'picks picks';

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

	.options {
		position: relative;
		display: flex;
		flex-direction: column;
		grid-area: picks;
		.reset {
			width: 200px;
		}
	}

	.crest-description {
		font-size: 15px;
		font-weight: normal;
	}
</style>
