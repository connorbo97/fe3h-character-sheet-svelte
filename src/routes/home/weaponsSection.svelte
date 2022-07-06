<script lang="ts">
	import { CONTEXTS } from 'src/constants';

	import { WEAPONS } from 'src/constants/weapons';
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
		(allWeapons.fullFeatures[weapon]?.uses || 0) * (hasHealPlus && weapon === WEAPONS.HEAL ? 2 : 1);
	$: curUses = weaponUses[weapon];
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
</script>

<div class="container">
	<button
		class={`available-button ${isCustomUnlock ? 'custom-unlock' : ''} ${
			allWeapons.fullSet.has(weapon) ? 'unlocked' : ''
		}`}
		title={weaponsToFeatures[weapon].reason}
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
	<div class={`label ${isMagic ? 'magic' : ''}`}>{allWeapons.weaponsToLabel[weapon]}</div>
	{#if !isMagic}
		<button
			class={equippedWeapons.includes(weapon) ? 'equipped' : ''}
			on:click={() => onToggleEquip(weapon, isUnlocked)}
		/>
	{/if}
	{#if isMagic}
		<input
			class={`count ${curUses === maxUses ? 'max' : ''}`}
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
		/<span style:width={'15px'}>{maxUses}</span>
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
			flex: 1;
			&.magic {
				font-size: 15px;
			}
		}
		button {
			height: 15px;
		}
	}

	.custom-unlock {
		border-color: red;
	}

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
</style>
