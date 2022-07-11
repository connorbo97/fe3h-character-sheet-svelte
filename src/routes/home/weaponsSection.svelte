<script lang="ts">
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import { CONTEXTS, MAX_WEAPONS_EQUIPPED } from 'src/constants';
	import { TooltipStyle } from 'src/constants/enums';

	import { getWeaponDescription, WEAPONS } from 'src/constants/weapons';
	import { checkHealPlus } from 'src/utils';
	import { getContext } from 'svelte';
	import CustomWeaponPrompt from './customWeaponPrompt.svelte';

	export let weapon: any;
	export let equippedClass: any;
	export let equippedWeapons: any;
	export let equippedCombatSkills: any;
	export let onToggleEquip: any;
	export let allWeapons: AllWeapons;
	export let spellUseFlag: any;
	export let customWeapons: any;
	export let onUpdateCustomWeapons: any;

	export let isMagic: any;

	export let weaponUses: { [s: string]: number };
	export let onUpdateWeaponUses: any;
	const { open } = getContext(CONTEXTS.MODAL);

	let prevSpellUseFlag = { current: spellUseFlag };
	$: hasHealPlus = checkHealPlus(equippedClass, equippedCombatSkills);
	let prevMaxUses: any = { current: null };
	$: maxUses =
		(allWeapons.fullFeatures[weapon]?.uses || Infinity) *
		(hasHealPlus && weapon === WEAPONS.HEAL ? 2 : 1);
	$: curUses = weaponUses[weapon] === undefined ? maxUses : curUses;
	$: updateCurWeaponUses = (newTotal: any) => {
		if (newTotal <= maxUses && newTotal >= 0) {
			onUpdateWeaponUses(weapon, newTotal);
		}
	};

	$: {
		if (prevSpellUseFlag.current != spellUseFlag || maxUses !== prevMaxUses.current) {
			updateCurWeaponUses(maxUses);
			prevMaxUses.current = maxUses;
			prevSpellUseFlag.current = spellUseFlag;
		}
	}

	$: isCustomUnlock = allWeapons?.customSet.has(weapon);
	$: isClassUnlock =
		allWeapons?.classUnlockSet.has(weapon) || allWeapons?.equippedClassSet.has(weapon);
	$: isTrainingWeapon = weapon.indexOf('TRAINING') >= 0;

	$: isUnlocked = isCustomUnlock || isClassUnlock || isTrainingWeapon;

	$: weaponsToFeatures = allWeapons.fullFeatures;
	$: tooltipText = weaponsToFeatures[weapon].reason;
</script>

<div class="container">
	<SvelteTip disabled={!tooltipText}>
		<button
			class={`available-button ${isCustomUnlock ? 'custom-unlock' : ''} ${
				allWeapons.fullSet.has(weapon) ? 'unlocked' : ''
			}`}
			on:click={() => {
				open(CustomWeaponPrompt, {
					weapon,
					customWeapons,
					weaponsToFeatures,
					onUpdateCustomWeapons,
					defaultReason: 'Manually added in weapons section'
				});
			}}
		/>
		<div slot="t">{weaponsToFeatures[weapon].reason}</div>
	</SvelteTip>
	<SvelteTip tooltipStyle={TooltipStyle.CENTER} timeout={300}>
		<div slot="t">{getWeaponDescription(allWeapons.fullFeatures[weapon])}</div>
		<div class={`label ${isMagic ? 'magic' : ''}`}>{allWeapons.weaponsToLabel[weapon]}</div>
	</SvelteTip>
	{#if !isMagic}
		<div class="equip-button">
			<button
				class={`${equippedWeapons.includes(weapon) ? 'equipped' : ''}`}
				on:click={() => onToggleEquip(weapon, isUnlocked)}
				disabled={equippedWeapons.length >= MAX_WEAPONS_EQUIPPED &&
					!equippedWeapons.includes(weapon)}
			/>
		</div>
	{/if}
	{#if isMagic}
		<div class="equip-button">
			{#key maxUses}
				<input
					class={'count ' +
						(curUses === 0 ? 'bad' : curUses <= Math.ceil(maxUses / 3) ? 'danger' : '')}
					type="number"
					on:change={(e) => {
						const value = parseInt(e.currentTarget.value);

						if (value >= 0 && value <= maxUses) {
							updateCurWeaponUses(value);
							e.currentTarget.value = value + '';
						} else {
							e.currentTarget.value = maxUses + '';
						}
					}}
					value={curUses}
				/>
			{/key}
			/<span style:width={'15px'}>{maxUses}</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex: 1;

		font-weight: normal;

		justify-content: space-between;
		align-items: center;
		column-gap: 5px;
		.label {
			line-height: 15px;
			&.magic {
				font-size: 15px;
			}
		}
		button {
			height: 15px;
		}

		.equip-button {
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}
	}

	.custom-unlock {
		border-color: red;
	}

	// .available-button {
	// 	cursor: pointer !important;
	// }

	.unlocked {
		background-color: blue;
	}

	.equipped {
		background-color: green;
	}
	.count {
		width: 30px;
		border: 1px solid black;
	}

	.danger {
		background-color: rgba(233, 156, 32, 0.617);
	}
	.bad {
		background-color: red;
	}
</style>
