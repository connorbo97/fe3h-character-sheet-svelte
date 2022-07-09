<script lang="ts">
	import {
		AXE_WEAPONS,
		BOW_WEAPONS,
		CONTEXTS,
		FIST_WEAPONS,
		LANCE_WEAPONS,
		SWORD_WEAPONS
	} from 'src/constants';
	import { MAGIC_WEAPONS } from 'src/constants/weapons';
	import { WEAPON_TYPE } from 'src/constants/weaponType';
	import { getContext } from 'svelte';
	import CustomWeaponPrompt from './customWeaponPrompt.svelte';
	import WeaponsSection from './weaponsSection.svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let equippedWeapons: any;
	export let onToggleEquippedWeapons: any;
	export let equippedCombatSkills: any;
	export let equippedClass: any;

	export let allWeapons: AllWeapons;

	export let weaponUses: { [s: string]: number };
	export let onUpdateWeaponUses: any;

	export let customWeapons: any;
	export let onUpdateCustomWeapons: any;

	export let curSuperiorityDies: any;
	export let maxSuperiorityDie: any;
	export let setCurSuperiorityDie: any;

	let spellUseFlag = 0;

	$: allWeaponFeatures = allWeapons.fullFeatures;
	$: reasonEntries = allWeapons.fullArray.filter(
		(w: string) => allWeaponFeatures[w].type === WEAPON_TYPE.REASON
	);
	$: faithEntries = allWeapons.fullArray.filter(
		(w: string) => allWeaponFeatures[w].type === WEAPON_TYPE.FAITH
	);
	$: onToggleEquip = (weapon: any) => {
		onToggleEquippedWeapons(weapon);
	};

	$: resetEquippedWeapons = () => equippedWeapons.forEach((w: any) => onToggleEquippedWeapons(w));

	$: promptNewMagicWeapon = () => {
		open(CustomWeaponPrompt, {
			weapon: MAGIC_WEAPONS.filter((w: any) => !allWeapons.fullSet.has(w)),
			weaponsToFeatures: allWeaponFeatures,
			defaultReason: 'Manually added in magic weapons section',
			customWeapons,
			onUpdateCustomWeapons
		});
	};
</script>

<div class="container">
	<div class="actions">
		<u>Martial Weapons</u>
		<div class="superiority-die">
			<span>Superiority Dies:</span>
			<input
				style:width="50px"
				type="number"
				class={curSuperiorityDies === 0
					? 'bad'
					: curSuperiorityDies <= Math.ceil(maxSuperiorityDie / 3)
					? 'danger'
					: ''}
				value={curSuperiorityDies}
				on:change={(e) => {
					const newValue = parseInt(e.currentTarget.value);
					if (newValue >= 0 && newValue <= maxSuperiorityDie) {
						setCurSuperiorityDie(newValue);
						e.currentTarget.value = newValue + '';
					} else {
						e.currentTarget.value = curSuperiorityDies + '';
					}
				}}
			/>
		</div>
		<button on:click={() => setCurSuperiorityDie(maxSuperiorityDie)}>Reset Superiority Dice</button>
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
						{customWeapons}
						{onUpdateCustomWeapons}
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
						{customWeapons}
						{onUpdateCustomWeapons}
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
						{customWeapons}
						{onUpdateCustomWeapons}
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
						{customWeapons}
						{onUpdateCustomWeapons}
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
						{customWeapons}
						{onUpdateCustomWeapons}
					/>
				{/each}
			</div>
		</div>
	</div>
	{#if reasonEntries.length || faithEntries.length}
		<span style:display="flex">
			<u style:flex="1">Magic Weapons</u>
			<button on:click={promptNewMagicWeapon}>Add new magic weapon</button>
		</span>
	{/if}
	<div class="magic-weapons">
		{#if reasonEntries.length}
			<div class="magic-category">
				<div class="label">Reason</div>
				<div class="category">
					{#each reasonEntries as weapon}
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
							{customWeapons}
							{onUpdateCustomWeapons}
						/>
					{/each}
				</div>
			</div>
		{/if}
		{#if faithEntries.length}
			<div class="magic-category">
				<div class="label">Faith</div>
				<div class="category">
					{#each faithEntries as weapon}
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
							{customWeapons}
							{onUpdateCustomWeapons}
						/>
					{/each}
				</div>
			</div>
		{/if}
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
		justify-content: space-between;
		column-gap: 5px;
	}

	.superiority-die {
		display: flex;
		justify-content: flex-end;
		column-gap: 5px;
		flex: 1;
	}
	.martial-weapons {
		display: flex;
		justify-content: space-between;

		border-bottom: 1px solid black;
	}

	.label {
		font-weight: bold;
	}
	.magic-weapons {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.magic-category {
			padding: 5px;
			flex: 1;
			&:not(:last-child) {
				border-right: 1px solid black;
			}
		}
		.category {
			display: grid;
			flex-direction: column;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, max-content) auto;
			grid-auto-rows: max-content;
			grid-auto-flow: column;

			column-gap: 5px;
			row-gap: 5px;
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
	}

	.danger {
		background-color: rgba(233, 156, 32, 0.617);
	}
	.bad {
		background-color: red;
	}
</style>
