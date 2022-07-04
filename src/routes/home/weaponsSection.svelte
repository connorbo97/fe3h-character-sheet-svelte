<script lang="ts">
	import { WEAPON_TO_LABEL } from 'src/constants';

	export let weapon: any;
	export let equippedWeapon: any;
	export let onToggleEquip: any;
	export let allWeapons: AllWeapons;

	export let numUses: any | undefined;

	let curUses = numUses;

	$: isCustomUnlock = allWeapons?.customSet.has(weapon);
	$: isClassUnlock =
		allWeapons?.classUnlockSet.has(weapon) || allWeapons?.equippedClassSet.has(weapon);
	$: isTrainingWeapon = weapon.indexOf('TRAINING') >= 0;
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
	{#if !numUses}
		<button
			class={equippedWeapon === weapon ? 'equipped' : ''}
			on:click={() => onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
		/>
	{/if}
	{#if numUses}
		<input
			class="count"
			type="number"
			on:change={(e) => {
				const value = parseInt(e.currentTarget.value);

				curUses = value;

				e.currentTarget.value = '';
			}}
			value={curUses}
		/>
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
	}
</style>
