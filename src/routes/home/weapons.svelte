<script lang="ts">
	import {
		AXE_WEAPONS,
		BOW_WEAPONS,
		CLASS_TO_FEATURES,
		FIST_WEAPONS,
		LANCE_WEAPONS,
		SWORD_WEAPONS,
		WEAPON_TO_LABEL
	} from 'src/constants';

	export let unlockedClasses: any;
	export let equippedClass: any;
	export let customWeapons: any;

	export let equippedWeapon: any;
	export let setEquippedWeapon: any;

	$: classWeaponsSet = new Set(
		unlockedClasses.reduce((acc: Array<any>, curClass: string) => {
			const weaponsObj = CLASS_TO_FEATURES[curClass]?.unlocks?.weapons || {};

			return [...acc, ...Object.keys(weaponsObj)];
		}, [])
	);
	$: equippedWeaponsSet = new Set(
		Object.keys(CLASS_TO_FEATURES[equippedClass]?.unlocks?.weapons || {})
	);

	$: onToggleEquip = (weapon: any, canEquip: any) => {
		if (equippedWeapon === weapon) {
			setEquippedWeapon('');
		} else if (canEquip) {
			setEquippedWeapon(weapon);
		}
	};
</script>

<div class="container">
	<div class="category">
		<div class="label">Swords</div>
		<div class="category-container">
			{#each SWORD_WEAPONS as weapon}
				{@const isCustomUnlock = !!customWeapons[weapon]}
				{@const isClassUnlock = classWeaponsSet.has(weapon) || equippedWeaponsSet.has(weapon)}
				{@const isTrainingWeapon = weapon.indexOf('TRAINING') >= 0}
				<div class="weapon-container">
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
						on:click={() =>
							onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Lances</div>
		<div class="category-container">
			{#each LANCE_WEAPONS as weapon}
				{@const isCustomUnlock = !!customWeapons[weapon]}
				{@const isClassUnlock = classWeaponsSet.has(weapon) || equippedWeaponsSet.has(weapon)}
				{@const isTrainingWeapon = weapon.indexOf('TRAINING') >= 0}
				<div class="weapon-container">
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
						on:click={() =>
							onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Axes</div>
		<div class="category-container">
			{#each AXE_WEAPONS as weapon}
				{@const isCustomUnlock = !!customWeapons[weapon]}
				{@const isClassUnlock = classWeaponsSet.has(weapon) || equippedWeaponsSet.has(weapon)}
				{@const isTrainingWeapon = weapon.indexOf('TRAINING') >= 0}
				<div class="weapon-container">
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
						on:click={() =>
							onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Bows</div>
		<div class="category-container">
			{#each BOW_WEAPONS as weapon}
				{@const isCustomUnlock = !!customWeapons[weapon]}
				{@const isClassUnlock = classWeaponsSet.has(weapon) || equippedWeaponsSet.has(weapon)}
				{@const isTrainingWeapon = weapon.indexOf('TRAINING') >= 0}
				<div class="weapon-container">
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
						on:click={() =>
							onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Fists</div>
		<div class="category-container">
			{#each FIST_WEAPONS as weapon}
				{@const isCustomUnlock = !!customWeapons[weapon]}
				{@const isClassUnlock = classWeaponsSet.has(weapon) || equippedWeaponsSet.has(weapon)}
				{@const isTrainingWeapon = weapon.indexOf('TRAINING') >= 0}
				<div class="weapon-container">
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
						on:click={() =>
							onToggleEquip(weapon, isCustomUnlock || isClassUnlock || isTrainingWeapon)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		background-color: darksalmon;
		border-radius: 5px;
		padding: 5px;

		column-gap: 5px;
	}

	.weapon-container {
		display: flex;
		flex: 1;

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