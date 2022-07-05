<script lang="ts">
	import { WEAPON_TO_LABEL } from 'src/constants';
	import { WEAPONS, WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { checkHealPlus } from 'src/utils';

	export let weapon: any;
	export let equippedClass: any;
	export let equippedWeapons: any;
	export let equippedCombatSkills: any;
	export let onToggleEquip: any;
	export let allWeapons: AllWeapons;

	export let isMagic: any;

	export let weaponUses: { [s: string]: number };
	export let onUpdateWeaponUses: any;

	$: hasHealPlus = checkHealPlus(equippedClass, equippedCombatSkills);
	let prevMaxUses: any = { current: null };
	$: maxUses =
		(WEAPONS_TO_FEATURES[weapon]?.uses || 0) * (hasHealPlus && weapon === WEAPONS.HEAL ? 2 : 1);
	$: curUses = weaponUses[weapon];
	$: updateCurWeaponUses = (newTotal: any) => {
		if (newTotal <= maxUses && newTotal >= 0) {
			onUpdateWeaponUses(weapon, newTotal);
		}
	};

	$: {
		if (maxUses !== prevMaxUses.current) {
			updateCurWeaponUses(maxUses);
			prevMaxUses.current = maxUses;
		}
	}

	$: isCustomUnlock = allWeapons?.customSet.has(weapon);
	$: isClassUnlock =
		allWeapons?.classUnlockSet.has(weapon) || allWeapons?.equippedClassSet.has(weapon);
	$: isTrainingWeapon = weapon.indexOf('TRAINING') >= 0;

	$: isUnlocked = isCustomUnlock || isClassUnlock || isTrainingWeapon;
</script>

<div class="container">
	<button
		class={isCustomUnlock
			? 'custom-unlock'
			: isClassUnlock || isTrainingWeapon
			? 'class-unlock'
			: ''}
	/>
	<div class="label">{WEAPON_TO_LABEL[weapon]}</div>
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

				updateCurWeaponUses(value);

				e.currentTarget.value = '';
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
		column-gap: 5px;
		.label {
			flex: 1;
		}
	}

	.custom-unlock {
		background-color: purple;
	}

	.class-unlock {
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
