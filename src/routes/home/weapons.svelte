<script lang="ts">
	import {
		AXE_WEAPONS,
		BOW_WEAPONS,
		FAITH_MAGIC,
		FIST_WEAPONS,
		getSuperiorityDieFromClasses,
		LANCE_WEAPONS,
		REASON_MAGIC,
		SWORD_WEAPONS
	} from 'src/constants';
	import WeaponsSection from './weaponsSection.svelte';

	export let equippedWeapons: any;
	export let onToggleEquippedWeapons: any;
	export let equippedCombatSkills: any;
	export let equippedClass: any;

	export let allWeapons: any;

	export let unlockedClasses: any;

	export let weaponUses: { [s: string]: number };
	export let onUpdateWeaponUses: any;

	let prevMax = { current: 0 };
	$: maxSuperiorityDie = getSuperiorityDieFromClasses(unlockedClasses);
	let curSuperiorityDies = maxSuperiorityDie;
	let spellUseFlag = 0;

	$: {
		if (prevMax.current !== maxSuperiorityDie) {
			curSuperiorityDies = maxSuperiorityDie;
			prevMax.current = maxSuperiorityDie;
		}
	}

	$: onToggleEquip = (weapon: any) => {
		onToggleEquippedWeapons(weapon);
	};

	$: resetEquippedWeapons = () => equippedWeapons.forEach((w: any) => onToggleEquippedWeapons(w));
</script>

<div class="container">
	<div class="actions">
		<div>
			<span>Superiority Die Remaining:</span>
			<input
				type="number"
				value={curSuperiorityDies}
				on:change={(e) => {
					const newValue = parseInt(e.currentTarget.value);
					if (newValue >= 0 && newValue <= maxSuperiorityDie) {
						curSuperiorityDies = newValue;
						e.currentTarget.value = newValue + '';
					} else {
						e.currentTarget.value = curSuperiorityDies + '';
					}
				}}
			/>
		</div>
		<button on:click={() => (curSuperiorityDies = maxSuperiorityDie)}>Reset Superiority Dice</button
		>
		<button on:click={() => (spellUseFlag += 1)}>Reset Spell Uses</button>
		<button on:click={resetEquippedWeapons}>Unequip all weapons</button>
	</div>
	<div class="martial-weapons">
		<div class="category">
			<div class="label">Swords</div>
			<div class="category-container">
				{#each SWORD_WEAPONS as weapon}
					<WeaponsSection
						{allWeapons}
						{equippedWeapons}
						{weapon}
						{onToggleEquip}
						isMagic={false}
						spellUseFlag={0}
						{equippedCombatSkills}
						{equippedClass}
						{weaponUses}
						{onUpdateWeaponUses}
					/>
				{/each}
			</div>
		</div>
		<div class="category">
			<div class="label">Lances</div>
			<div class="category-container">
				{#each LANCE_WEAPONS as weapon}
					<WeaponsSection
						{equippedWeapons}
						{weapon}
						{onToggleEquip}
						{allWeapons}
						isMagic={false}
						spellUseFlag={0}
						{equippedCombatSkills}
						{equippedClass}
						{weaponUses}
						{onUpdateWeaponUses}
					/>
				{/each}
			</div>
		</div>
		<div class="category">
			<div class="label">Axes</div>
			<div class="category-container">
				{#each AXE_WEAPONS as weapon}
					<WeaponsSection
						{equippedWeapons}
						{weapon}
						{onToggleEquip}
						{allWeapons}
						isMagic={false}
						spellUseFlag={0}
						{equippedCombatSkills}
						{equippedClass}
						{weaponUses}
						{onUpdateWeaponUses}
					/>
				{/each}
			</div>
		</div>
		<div class="category">
			<div class="label">Bows</div>
			<div class="category-container">
				{#each BOW_WEAPONS as weapon}
					<WeaponsSection
						{equippedWeapons}
						{weapon}
						{onToggleEquip}
						{allWeapons}
						isMagic={false}
						spellUseFlag={0}
						{equippedCombatSkills}
						{equippedClass}
						{weaponUses}
						{onUpdateWeaponUses}
					/>
				{/each}
			</div>
		</div>
		<div class="category">
			<div class="label">Fists</div>
			<div class="category-container">
				{#each FIST_WEAPONS as weapon}
					<WeaponsSection
						{equippedWeapons}
						{weapon}
						{onToggleEquip}
						{allWeapons}
						spellUseFlag={0}
						isMagic={false}
						{equippedCombatSkills}
						{equippedClass}
						{weaponUses}
						{onUpdateWeaponUses}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div class="magic-weapons">
		<div class="category">
			<div class="label">Reason</div>
			{#each REASON_MAGIC as weapon}
				<WeaponsSection
					{equippedWeapons}
					{weapon}
					{onToggleEquip}
					{allWeapons}
					isMagic={true}
					{spellUseFlag}
					{equippedCombatSkills}
					{equippedClass}
					{weaponUses}
					{onUpdateWeaponUses}
				/>
			{/each}
		</div>
		<div class="category">
			<div class="label">Faith</div>
			{#each FAITH_MAGIC as weapon}
				<WeaponsSection
					{equippedWeapons}
					{weapon}
					{onToggleEquip}
					{allWeapons}
					isMagic={true}
					{spellUseFlag}
					{equippedCombatSkills}
					{equippedClass}
					{weaponUses}
					{onUpdateWeaponUses}
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		background-color: darksalmon;
		border-radius: 5px;
		padding: 5px;

		column-gap: 5px;
	}
	.actions {
		display: flex;
		justify-content: space-around;
	}
	.martial-weapons {
		display: flex;
		justify-content: space-between;

		border-bottom: 1px solid black;
	}

	.magic-weapons {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.category {
			display: grid;
			flex-direction: column;
			flex: 1;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, max-content) auto;
			grid-auto-rows: max-content;
			grid-auto-flow: column;

			border-right: 1px solid black;

			padding: 5px;
			max-height: 120px;

			column-gap: 5px;

			.label {
				font-weight: bold;
			}
		}
	}

	.category {
		display: flex;
		flex-direction: column;
		flex: 1;
		flex-wrap: wrap;
		&:not(:last-child) {
			border-right: 1px solid black;
		}
		padding: 5px;
		max-height: 120px;

		column-gap: 5px;

		.label {
			font-weight: bold;
		}
	}
</style>
