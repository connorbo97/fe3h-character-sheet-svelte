<script lang="ts">
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import {
		BEGINNER_CLASSES,
		BEGINNER_MASTERY_REQ,
		CLASS_TO_LABEL,
		CONTEXTS,
		INTERMEDIATE_CLASSES,
		INTERMEDIATE_MASTERY_REQ,
		LEVEL_UP_ORDER,
		PROFICIENCY_BONUS,
		WEAPON_LEVEL,
		WEAPON_LEVEL_TO_LABEL,
		WEAPON_LEVEL_TO_MAX_XP,
		WEAPON_TYPE,
		WEAPON_TYPE_TO_LABEL
	} from 'src/constants';
	import { Dice } from 'src/constants/dice';
	import { TooltipStyle } from 'src/constants/enums';
	import { PLAYER_SKILL } from 'src/constants/playerSkills';
	import { PLAYER_STAT, PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';
	import { WEAPON_TYPES_TO_LEVEL_FEATURES } from 'src/constants/weaponLevel';
	import { WEAPON_TYPE_TO_STAT } from 'src/constants/weaponType';
	import {
		addNumberPrefix,
		classBuilder,
		getModifierByPlayerStat,
		rollVisualDice
	} from 'src/utils';
	import { getContext } from 'svelte';
	const { open } = getContext(CONTEXTS.MODAL);

	export let unlockedClasses: any;
	export let weaponXP: any;
	export let classXP: any;

	export let playerSkillProficiency;
	export let playerSkillBonus;

	export let onUpdateClassXP: any;
	export let onUpdateWeaponXP: any;

	export let customCombatArts: any;
	export let customCombatSkills: any;
	export let customWeapons: any;
	export let playerStats: any;

	export let onUpdatePlayerStats: any;
	export let onUpdateCustomCombatArts: any;
	export let onUpdateCustomCombatSkills: any;
	export let onUpdateCustomWeapons: any;

	let resetInputs = true;

	const DEFAULT_ROLLS = 4;
	let rollsRemaining = DEFAULT_ROLLS;
	let greatAlreadyHappened = false;

	let statPerWeaponType = Object.keys(WEAPON_TYPE_TO_STAT).reduce((acc, key) => {
		acc[key] = WEAPON_TYPE_TO_STAT[key][0];

		return acc;
	}, {});

	$: promptWeaponLevelUp = (type: any, level, onSuccess) => {
		const pickOne = WEAPON_TYPES_TO_LEVEL_FEATURES[type][level]?.unlocks?.pickOne;
		if (!pickOne) {
			return onSuccess();
		}

		open(PickOnePrompt, {
			pickOne,
			onSubmit: onSuccess,
			reason: `Unlocked ${WEAPON_TYPE_TO_LABEL[type]} level ${WEAPON_LEVEL_TO_LABEL[level]}`,
			customCombatArts,
			customCombatSkills,
			customWeapons,
			playerStats,
			onUpdatePlayerStats,
			onUpdateClassXP,
			onUpdateCustomCombatArts,
			onUpdateCustomCombatSkills,
			onUpdateCustomWeapons
		});
	};
	$: onWeaponXpChange = (value: any, { curLevel, curXP, maxXP, type, onSuccess }: any) => {
		let newLevel = curLevel;

		let newXP = curXP + value;

		const onSuccessPrompt = () => {
			onUpdateWeaponXP(type, newXP, newLevel);
			resetInputs != resetInputs;
			onSuccess && onSuccess();
		};

		if (newXP >= maxXP) {
			newLevel = LEVEL_UP_ORDER[LEVEL_UP_ORDER.indexOf(curLevel) + 1] || curLevel;
			newXP = newXP - maxXP;

			promptWeaponLevelUp(type, newLevel, onSuccessPrompt);
		} else {
			onSuccessPrompt();
		}
	};
	$: onWeaponXPChangeFromInput = (e, args) => {
		const target = e.currentTarget;
		const parsedValue = parseInt(e.currentTarget.value);
		const onSuccess = () => {
			target.value = '';
		};

		onWeaponXpChange(parsedValue, { ...args, onSuccess });
	};
	$: onWeaponChangeLevel = (e: any, { type, curLevel }: any) => {
		const newLevel = e.currentTarget.value;

		const onSuccess = () => {
			onUpdateWeaponXP(type, 0, newLevel);
			resetInputs != resetInputs;
		};

		if (!curLevel || LEVEL_UP_ORDER.indexOf(curLevel) < LEVEL_UP_ORDER.indexOf(newLevel)) {
			promptWeaponLevelUp(type, newLevel, onSuccess);
		} else {
			onSuccess();
		}
	};

	$: rollXP = async (args) => {
		const { type: weaponType } = args;
		const curStatForType = statPerWeaponType[weaponType];
		const isAnimalHandling = curStatForType === PLAYER_SKILL.ANIMAL_HANDLING;
		const animalHandlingSkillProficiency =
			(playerSkillProficiency[PLAYER_SKILL.ANIMAL_HANDLING] * PROFICIENCY_BONUS || 0) +
			(playerSkillBonus[PLAYER_SKILL.ANIMAL_HANDLING] || 0);
		const statLabel = isAnimalHandling
			? 'Animal Handling'
			: PLAYER_STAT_TO_SHORT_LABEL[curStatForType];
		const statMod = isAnimalHandling
			? getModifierByPlayerStat(playerStats[PLAYER_STAT.WIS]) + animalHandlingSkillProficiency
			: getModifierByPlayerStat(playerStats[curStatForType]);
		const customResultBoxLabel = (_, finalCalcResult) => {
			let suffix = '';
			let moddedValue = finalCalcResult + statMod;
			if (finalCalcResult === 20) {
				suffix = 'Perfect: 16 XP + 1 roll!';
			} else if (finalCalcResult === 1 || moddedValue <= 1) {
				suffix = 'Awful: 0 XP';
			} else if (moddedValue <= 5) {
				suffix = 'Poor: 6 XP';
			} else if (moddedValue <= 15) {
				suffix = 'Good: 9 XP';
			} else {
				suffix = `Great: 12 XP ${!greatAlreadyHappened ? '+ 1 roll (once per session)' : ''}`;
			}

			const finalCalcStyle =
				finalCalcResult === 20 ? '"color: green"' : finalCalcResult === 1 ? '"color: red"' : '';

			return `<div><span style=${finalCalcStyle}>${finalCalcResult}</span> ${addNumberPrefix(
				statMod,
				true
			)}(${statLabel}) = ${moddedValue}</div><div style='text-align:center'>${suffix}</div>`;
		};
		const { value } = await rollVisualDice([Dice.d20], { customResultBoxLabel });
		const finalValue = value + statMod;

		let newRolls = rollsRemaining - 1;
		if (value === 20) {
			onWeaponXpChange(16, args);
			newRolls += 1;
		} else if (value === 1 || finalValue <= 1) {
			//nothing
		} else if (finalValue <= 5) {
			onWeaponXpChange(6, args);
		} else if (finalValue <= 15) {
			onWeaponXpChange(9, args);
		} else {
			if (!greatAlreadyHappened) {
				newRolls += 1;
			}
			onWeaponXpChange(12, args);
			greatAlreadyHappened = true;
		}

		rollsRemaining = newRolls;
	};
</script>

<div class="container">
	<div class="weapon-xp-container">
		<div class="category">
			<u>Type</u>
			<u style:text-align="center" style:white-space="nowrap" style:width="0"
				>XP (Current XP / XP Required to Level Up)</u
			>
			<span />
			<u style:text-align="center" style:white-space="nowrap" style:width="0">Lvl</u>
			<u style:text-align="center" style:white-space="nowrap" style:width="0">Stat Modifier</u>
			<span />
			{#each Object.keys(WEAPON_TYPE) as type}
				{@const curXP = weaponXP[type]?.total || 0}
				{@const curLevel = weaponXP[type]?.level || WEAPON_LEVEL.E}
				{@const maxXP = WEAPON_LEVEL_TO_MAX_XP[curLevel]}
				<div class="label">{WEAPON_TYPE_TO_LABEL[type]}</div>
				<div class="xp-bar">
					<div class="fill" style:right={`${((maxXP - curXP) / maxXP) * 100.0}%`}>
						<span>{`${curXP} / ${maxXP}`}</span>
					</div>
				</div>
				<div class="form">
					<div class="prompt">XP to Add</div>
					<input
						type="number"
						on:change={(e) => onWeaponXPChangeFromInput(e, { curLevel, curXP, maxXP, type })}
					/>
				</div>
				{#key resetInputs}
					<select name="weapon_level" on:change={(e) => onWeaponChangeLevel(e, { type, curLevel })}>
						{#each Object.keys(WEAPON_LEVEL) as level}
							<option value={WEAPON_LEVEL[level]} selected={curLevel === level}>
								{WEAPON_LEVEL_TO_LABEL[level]}</option
							>
						{/each}
					</select>
				{/key}
				{#if WEAPON_TYPE_TO_STAT[type].length > 1}
					<select
						on:change={(e) => {
							statPerWeaponType = { ...statPerWeaponType, [type]: e.currentTarget.value };
						}}
					>
						{#each WEAPON_TYPE_TO_STAT[type] as stat}
							<option value={stat} selected={statPerWeaponType[type] === stat}
								>{PLAYER_STAT_TO_SHORT_LABEL[stat]}</option
							>
						{/each}
					</select>
				{/if}
				{#if WEAPON_TYPE_TO_STAT[type].length <= 1}
					<span style:text-align="center"
						>{PLAYER_STAT_TO_SHORT_LABEL[WEAPON_TYPE_TO_STAT[type][0]]}</span
					>
				{/if}
				<SvelteTip tooltipStyle={TooltipStyle.BOTTOM_CENTER} tooltipPositionerStyle="z-index: 100">
					<button
						disabled={rollsRemaining <= 0}
						on:click={() => rollXP({ curLevel, curXP, maxXP, type })}>Roll</button
					>
					<div slot="t">
						<div>Roll for your lecture:</div>
						<div class="test">
							<span>{'<= 1 Awful'}</span>
							<span>= 0 XP</span>
						</div>
						<div class="test">
							<span>{'2-5 Poor'}</span>
							<span>= 6 XP</span>
						</div>
						<div class="test">
							<span>6-15 Good</span>
							<span>= 9 XP</span>
						</div>
						<div class="test">
							<span>{'>= 16 Great'}</span>
							<span> = 12 XP and +1 Roll (1 per session)</span>
						</div>
						<div class="test">
							<span>Nat 1 Awful </span>
							<span>= 0 XP</span>
						</div>
						<div class="test">
							<span>Nat 20 Perfect </span>
							<span> = 16 XP and +1 Roll</span>
						</div>
					</div>
				</SvelteTip>
			{/each}
		</div>
		<div class="auto-xp" style:flex="1">
			<span style:flex="1">Automatic Training:</span>
			<SvelteTip>
				<div slot="t">
					<span>
						This text turns orange when you have rolled a 16+ for this training session already.
						Meaning any more 16+ will not add 1 to your available training sessions.
					</span>
					<br />
					<span>Will be reset when you click the Reset Rolls button</span>
				</div>
				<span class={classBuilder({ 'great-already': greatAlreadyHappened })}
					># of rolls remaining:</span
				>
			</SvelteTip>
			<input
				type="number"
				value={rollsRemaining}
				on:change={(e) => (rollsRemaining = parseInt(e.currentTarget.value))}
			/>
			<button
				on:click={() => {
					rollsRemaining = DEFAULT_ROLLS;
					greatAlreadyHappened = false;
				}}>Reset Rolls</button
			>
		</div>
	</div>
	<div class="category" style:background-color={'#d277ed'}>
		<u>Class</u>
		<u style:text-align="center" style:white-space="nowrap" style:width="0"
			>Class XP (Current Battles / Battles Required to Master)</u
		>
		<span />
		<span />
		<span />
		<span />
		{#each unlockedClasses as curClass}
			{@const curXP = classXP[curClass]?.total || 0}
			{@const maxXP = BEGINNER_CLASSES.has(curClass)
				? BEGINNER_MASTERY_REQ
				: INTERMEDIATE_CLASSES.has(curClass)
				? INTERMEDIATE_MASTERY_REQ
				: 10000}
			{@const mastered = classXP[curClass]?.mastered}
			<div class="label">{CLASS_TO_LABEL[curClass]}</div>
			<div class="xp-bar">
				<div
					class={`fill ${mastered ? 'mastered' : ''}`}
					style:right={`${((maxXP - curXP) / maxXP) * 100.0}%`}
				>
					<span>{`${curXP} / ${maxXP}`}</span>
				</div>
			</div>
			<div class="form">
				<div class="prompt">XP to Add</div>
				<input
					type="number"
					on:change={(e) => {
						let parsedValue = parseInt(e.currentTarget.value);

						let newXP = curXP + parsedValue;

						if (newXP >= maxXP) {
							newXP = maxXP;
						}

						onUpdateClassXP(curClass, newXP, newXP === maxXP);

						e.currentTarget.value = '';
					}}
				/>
			</div>
			<span />
			<span />
			<span />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		> * {
			flex: 1;
		}
		column-gap: 5px;
	}
	.weapon-xp-container {
		display: flex;
		flex-direction: column;
		background-color: thistle;
		border-radius: 5px;
	}
	.category {
		background-color: thistle;
		padding: 5px;
		border-radius: 5px;

		display: grid;
		grid-template-columns: max-content 1fr max-content min-content min-content max-content;
		grid-auto-rows: min-content;
		gap: 5px;
	}
	.xp-bar {
		flex: 1;
		position: relative;
		z-index: 1;
		background-color: white;
		outline: 1px solid black;
		border-radius: 5px;

		.fill {
			position: absolute;
			inset: 2px;
			border-radius: 5px;
			background-color: #5ecd5f;
			z-index: -1;
			white-space: nowrap;
		}
	}
	.form {
		display: flex;
		align-items: center;
		column-gap: 5px;
		input {
			width: 40px;
		}
	}

	.auto-xp {
		display: flex;
		align-items: flex-end;
		padding: 5px;
		flex: 1;
		column-gap: 5px;
		> input {
			width: 50px;
		}
	}

	.mastered.mastered {
		background-color: lightskyblue;
	}
	.test {
		display: flex;
		justify-content: space-between;
		column-gap: 5px;
		> :first-child {
			flex: 1;
			text-align: left;
		}
	}

	.great-already {
		color: orange;
	}
</style>
