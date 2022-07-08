<script lang="ts">
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';

	import {
		BEGINNER_CLASSES,
		BEGINNER_MASTERY_REQ,
		CLASS_TO_LABEL,
		CONTEXTS,
		INTERMEDIATE_CLASSES,
		INTERMEDIATE_MASTERY_REQ,
		LEVEL_UP_ORDER,
		WEAPON_LEVEL,
		WEAPON_LEVEL_TO_LABEL,
		WEAPON_LEVEL_TO_MAX_XP,
		WEAPON_TYPE,
		WEAPON_TYPE_TO_LABEL
	} from 'src/constants';
	import { WEAPON_TYPES_TO_LEVEL_FEATURES } from 'src/constants/weaponLevel';
	import { getContext } from 'svelte';
	const { open } = getContext(CONTEXTS.MODAL);

	export let unlockedClasses: any;
	export let weaponXP: any;
	export let classXP: any;

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
	$: onWeaponXpChange = (e: any, { curLevel, curXP, maxXP, type }: any) => {
		let parsedValue = parseInt(e.currentTarget.value);
		let newLevel = curLevel;

		let newXP = curXP + parsedValue;
		const target = e.currentTarget;

		const onSuccess = () => {
			onUpdateWeaponXP(type, newXP, newLevel);
			target.value = '';
			resetInputs != resetInputs;
		};

		if (newXP >= maxXP) {
			newLevel = LEVEL_UP_ORDER[LEVEL_UP_ORDER.indexOf(curLevel) + 1] || curLevel;
			newXP = newXP - maxXP;

			promptWeaponLevelUp(type, newLevel, onSuccess);
		} else {
			onSuccess();
		}
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
</script>

<div class="container">
	<div class="category">
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
					on:change={(e) => onWeaponXpChange(e, { curLevel, curXP, maxXP, type })}
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
		{/each}
	</div>
	<div class="category" style:background-color={'#a178ad'}>
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
	.category {
		background-color: thistle;
		padding: 5px;
		border-radius: 5px;

		display: grid;
		grid-template-columns: max-content 1fr max-content min-content;
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
		input {
			width: 40px;
		}
	}

	.mastered.mastered {
		background-color: lightskyblue;
	}
</style>
