<script lang="ts">
	import { WEAPON_TO_LABEL } from 'src/constants';

	export let weapon: any;
	export let equippedWeapon: any;
	export let onToggleEquip: any;
	export let customWeapons: any;
	export let classWeaponsSet: any;
	export let equippedWeaponsSet: any;

	$: isCustomUnlock = !!customWeapons[weapon];
	$: isClassUnlock = classWeaponsSet.has(weapon) || equippedWeaponsSet.has(weapon);
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
	<button
		class={equippedWeapon === weapon ? 'equipped' : ''}
		on:click={() => onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
	/>
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
</style>
