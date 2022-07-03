<script lang="ts">
	import {
		CLASS_TO_FEATURES,
		DEFAULT_ARMOR_CLASS,
		DEFAULT_MAX_HP,
		DEFAULT_MOVEMENT_SPEED,
		DEFAULT_PROTECTION,
		DEFAULT_RESILIENCE,
		INTERMEDIATE_CLASSES,
		INTERMEDIATE_MAGIC_HP_BONUS,
		INTERMEDIATE_MARTIAL_HP_BONUS,
		INTERMEDIATE_MARTIAL_PROTECTION_BONUS,
		INTERMEDIATE_MAGIC_RESILIENCE_BONUS,
		PLAYER_STAT
	} from 'src/constants';
	import { getModifierByPlayerStat } from 'src/utils';

	export let stats: any;
	export let unlockedClasses: Array<string>;
	export let equippedClass: string;

	let terrainMod = 0;
	$: dexMod = getModifierByPlayerStat(stats[PLAYER_STAT.DEX]);
	$: dodgeRate = 0;
	$: weaponBonus = 0;
	$: skillBonus = 0;
	$: ac = DEFAULT_ARMOR_CLASS + dexMod + dodgeRate + weaponBonus + skillBonus + terrainMod;

	$: equippedClassMovementBonus = CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.msBonus || 0;
	$: skillMovementBonus = 0;
	$: ms = DEFAULT_MOVEMENT_SPEED + equippedClassMovementBonus + skillMovementBonus;

	$: unlockedClassHpBonus = unlockedClasses.reduce(
		(acc: any, c: string) => acc + CLASS_TO_FEATURES?.[c]?.unlocks?.hpBonus || 0,
		0
	);
	$: intermediateClassHpBonus = unlockedClasses.reduce((acc: any, c: string) => {
		// if not an intermediate class, move on
		if (!INTERMEDIATE_CLASSES.has(c)) {
			return acc;
		}
		if (CLASS_TO_FEATURES?.[c]?.canUseMagic === true) {
			return Math.max(acc, INTERMEDIATE_MAGIC_HP_BONUS);
		}

		// otherwise, this is an intermeidate martial class
		return Math.max(acc, INTERMEDIATE_MARTIAL_HP_BONUS);
	}, 0);
	$: skillHPBonus = 0;
	$: conMod = getModifierByPlayerStat(stats[PLAYER_STAT.CON]);
	$: hpMax =
		DEFAULT_MAX_HP + unlockedClassHpBonus + intermediateClassHpBonus + skillHPBonus + conMod;

	$: unlockedClassProtectionBonus = unlockedClasses.reduce(
		(acc: any, c: string) => acc + CLASS_TO_FEATURES?.[c]?.unlocks?.protectionBonus || 0,
		0
	);
	$: intermediateClassProtectionBonus = unlockedClasses.reduce((acc: any, c: string) => {
		// if not an intermediate class, move on
		if (!INTERMEDIATE_CLASSES.has(c)) {
			return acc;
		}
		// if intermediate AND is not a magic class, add bonus
		return !CLASS_TO_FEATURES?.[c]?.canUseMagic ? INTERMEDIATE_MARTIAL_PROTECTION_BONUS : acc;
	}, 0);
	$: equippedClassProtectionBonus =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.protectionBonus || 0;
	$: skillProtectionBonus = 0;
	$: protections =
		DEFAULT_PROTECTION +
		unlockedClassProtectionBonus +
		intermediateClassProtectionBonus +
		equippedClassProtectionBonus +
		skillProtectionBonus;

	$: unlockedClassResilienceBonus = unlockedClasses.reduce(
		(acc: any, c: string) => acc + CLASS_TO_FEATURES?.[c]?.unlocks?.protectionBonus || 0,
		0
	);
	$: intermediateClassResilienceBonus = unlockedClasses.reduce((acc: any, c: string) => {
		// if not an intermediate class, move on
		if (!INTERMEDIATE_CLASSES.has(c)) {
			return acc;
		}
		// if intermediate AND is a magic class, add bonus
		return CLASS_TO_FEATURES?.[c]?.canUseMagic ? INTERMEDIATE_MAGIC_RESILIENCE_BONUS : acc
	}, 0);
	$: equippedClassResilienceBonus =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.resilienceBonus || 0;
	$: skillResilienceBonus = 0;
	$: resilience = DEFAULT_RESILIENCE + unlockedClassResilienceBonus + intermediateClassResilienceBonus + equippedClassResilienceBonus + skillResilienceBonus;

	const onTerrainModChange = (e: any) => {
		const input = parseInt(e.currentTarget.value);

		if (isNaN(input)) {
			terrainMod = 0;
		} else {
			terrainMod = input;
		}
	};
</script>

<div class="container">
	<div
		title={`AC = ${DEFAULT_ARMOR_CLASS} + ${dexMod} (dex modifier) + ${dodgeRate} (class bonus) + ${skillBonus} (combat skill bonus) + ${weaponBonus} (weapon bonus) + ${terrainMod}(terrain mod)`}
	>
		<div class="big-text">
			AC: {ac}
		</div>
		<div class="terrain-container">
			<div>Terrain Modifier:</div>
			<input type="number" value={terrainMod} on:input={onTerrainModChange} />
		</div>
	</div>

	<div
		class="big-text"
		title={`Speed = ${DEFAULT_MOVEMENT_SPEED} + ${equippedClassMovementBonus} (from class) + ${skillMovementBonus} (from combat skills)`}
	>
		Speed: {ms}
	</div>

	<div
		class="big-text"
		title={`HP Max = ${DEFAULT_MAX_HP} + ${unlockedClassHpBonus} (from unlocked classes) + ${intermediateClassHpBonus} (from being a intermediate class) + ${skillHPBonus} (from combat skills) + ${conMod} (CON modifier)`}
	>
		HP Max: {hpMax}
	</div>

	<div
		class="big-text"
		title={`Protection = ${DEFAULT_PROTECTION} + ${unlockedClassProtectionBonus} (from unlocked classes) + ${intermediateClassProtectionBonus} (from being a intermediate martial class) + ${equippedClassProtectionBonus} (from equipped class) + ${skillProtectionBonus} (from skills)`}
	>
		Protection: {protections}
	</div>
	<div
		class="big-text"
		title={`Resilience = ${DEFAULT_RESILIENCE} + ${unlockedClassResilienceBonus} (from unlocked classes) + ${intermediateClassResilienceBonus} (from being a intermediate magic class) + ${equippedClassResilienceBonus} (from equipped class) + ${skillResilienceBonus} (from skills)`}
	>
		Resilience: {resilience}
	</div>
</div>

<style lang="scss">
	.container {
		flex: 1;
		background-color: green;
		border-radius: 5px;
		padding: 10px;
	}

	.big-text {
		font-size: 30px;
	}

	.terrain-container {
		display: flex;
		input {
			width: 50px;
		}
	}
</style>
