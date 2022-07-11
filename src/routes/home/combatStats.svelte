<script lang="ts">
	import SvelteTip from 'src/common/SvelteTip.svelte';
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
		PLAYER_STAT,
		MAX_WEAPONS_EQUIPPED,
		MAX_COMBAT_SKILLS,
		MAX_COMBAT_ARTS
	} from 'src/constants';
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants/combatSkills';
	import { TooltipStyle } from 'src/constants/enums';
	import { WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { getModifierByPlayerStat } from 'src/utils';

	export let stats: any;
	export let equippedWeapons: any;
	export let equippedCombatArts: any;
	export let unlockedClasses: Array<string>;
	export let equippedClass: string;
	export let equippedCombatSkills: Array<string>;
	export let allWeapons: AllWeapons;
	export let allCombatSkills: AllCombatSkills;

	export let selectedWeapon: string;

	let terrainMod = 0;
	$: dexMod = getModifierByPlayerStat(stats[PLAYER_STAT.DEX]);
	$: dodgeRate = 0;
	$: weaponBonus = 0;
	$: allWeaponFeatures = allWeapons.fullFeatures;
	$: selectedWeaponType = allWeaponFeatures[selectedWeapon]?.type;
	$: selectedWeaponAcBonus = allWeaponFeatures[selectedWeapon]?.acBonus || 0;
	$: acSkillBonus = equippedCombatSkills.reduce((acc, cur) => {
		const features = COMBAT_SKILLS_TO_FEATURES[cur];
		const { acBonusCompatibility, acBonus } = features || {};
		if (acBonus && (!acBonusCompatibility || acBonusCompatibility.includes(selectedWeaponType))) {
			return acc + (COMBAT_SKILLS_TO_FEATURES[cur].acBonus || 0);
		}
		return acc;
	}, 0);
	$: ac =
		DEFAULT_ARMOR_CLASS +
		dexMod +
		dodgeRate +
		weaponBonus +
		selectedWeaponAcBonus +
		acSkillBonus +
		terrainMod;

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
	$: skillHPBonus = equippedCombatSkills.reduce((acc, cur) => {
		return acc + (COMBAT_SKILLS_TO_FEATURES[cur].hpBonus || 0);
	}, 0);
	$: conMod = getModifierByPlayerStat(stats[PLAYER_STAT.CON]) * 2;
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
	$: skillProtectionBonus = equippedCombatSkills.reduce((acc, cur) => {
		return acc + (COMBAT_SKILLS_TO_FEATURES[cur].protectionBonus || 0);
	}, 0);
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
		return CLASS_TO_FEATURES?.[c]?.canUseMagic ? INTERMEDIATE_MAGIC_RESILIENCE_BONUS : acc;
	}, 0);
	$: equippedClassResilienceBonus =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.resilienceBonus || 0;
	$: skillResilienceBonus = equippedCombatSkills.reduce((acc, cur) => {
		return acc + (COMBAT_SKILLS_TO_FEATURES[cur].resilienceBonus || 0);
	}, 0);
	$: resilience =
		DEFAULT_RESILIENCE +
		unlockedClassResilienceBonus +
		intermediateClassResilienceBonus +
		equippedClassResilienceBonus +
		skillResilienceBonus;

	$: selectedWeaponFollupMod = allWeapons.fullFeatures[selectedWeapon]?.followUpBonus || 0;
	$: skillsFollowupMod = allCombatSkills.fullArray.reduce((acc, cur) => {
		return acc + (allCombatSkills.fullFeatures[cur].followUpBonus || 0);
	}, 0);
	$: followUp = dexMod + selectedWeaponFollupMod + skillsFollowupMod;

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
	{#if !equippedClass || equippedWeapons?.length !== MAX_WEAPONS_EQUIPPED || equippedCombatSkills?.length !== MAX_COMBAT_SKILLS || equippedCombatArts?.length !== MAX_COMBAT_ARTS}
		<SvelteTip tooltipStyle={TooltipStyle.CENTER} hiddenFirst>
			<div slot="t" class="warning-tooltip">
				{#if !equippedClass}
					<u>No Equipped Class</u>
				{/if}
				{#if equippedWeapons?.length !== MAX_WEAPONS_EQUIPPED}
					<u>Max Weapons not Equipped</u>
				{/if}
				{#if equippedCombatSkills?.length !== MAX_COMBAT_SKILLS}
					<u>Max Combat Skills not Equipped</u>
				{/if}
				{#if equippedCombatArts?.length !== MAX_COMBAT_ARTS}
					<u>Max Combat Arts not Equipped</u>
				{/if}
			</div>
			<div class="warning-container"><span class="warning">!</span></div>
		</SvelteTip>
	{/if}

	<SvelteTip tooltipStyle={TooltipStyle.CENTER}>
		<div slot="t">
			{`AC = ${DEFAULT_ARMOR_CLASS} + ${dexMod} (dex modifier) + ${dodgeRate} (class bonus) + ${acSkillBonus} (combat skill bonus) + ${selectedWeaponAcBonus} (selected weapon) + ${weaponBonus} (weapon bonus) + ${terrainMod}(terrain mod)`}
		</div>
		<div
			style:flex="0"
			style:display="flex"
			style:flex-direction="column"
			style:justify-content="center"
		>
			<div class="big-text">
				AC: {ac}
			</div>
			<div class="terrain-container">
				<div>Terrain:</div>
				<input type="number" value={terrainMod} on:input={onTerrainModChange} />
			</div>
		</div>
	</SvelteTip>
	<SvelteTip tooltipStyle={TooltipStyle.CENTER}>
		<div slot="t" class="skinny-tooltip">
			{`Move Speed = ${DEFAULT_MOVEMENT_SPEED} + ${equippedClassMovementBonus} (from class) + ${skillMovementBonus} (from combat skills)`}
		</div>
		<div class="big-text skinny">
			MS: {ms}
		</div>
	</SvelteTip>
	<SvelteTip tooltipStyle={TooltipStyle.LEFT_END}>
		<div slot="t" class="skinny-tooltip">
			{`HP Max = ${DEFAULT_MAX_HP} + ${unlockedClassHpBonus} (from unlocked classes) + ${intermediateClassHpBonus} (from unlocking an intermediate class) + ${skillHPBonus} (from combat skills) + ${conMod} (CON modifier * 2)`}
		</div>
		<div class="big-text skinny" style:flex="0">
			HP Max: {hpMax}
		</div>
	</SvelteTip>
	<SvelteTip tooltipStyle={TooltipStyle.LEFT_END}>
		<div slot="t">
			{`Attack Speed = ${dexMod} (dex modifier) + ${selectedWeaponFollupMod} (selected weapon) + ${skillsFollowupMod} (skills)`}
		</div>
		<div class="big-text">
			AS: {followUp}
		</div>
	</SvelteTip>
	<SvelteTip tooltipStyle={TooltipStyle.LEFT_END}>
		<div slot="t">
			{`Protection = ${DEFAULT_PROTECTION} + ${unlockedClassProtectionBonus} (from unlocked classes) + ${intermediateClassProtectionBonus} (from unlocking an intermediate martial class) + ${equippedClassProtectionBonus} (from equipped class) + ${skillProtectionBonus} (from skills)`}
		</div>
		<div class="big-text">
			Prt: {protections}
		</div>
	</SvelteTip>
	<SvelteTip tooltipStyle={TooltipStyle.LEFT_END} hiddenFirst>
		<div slot="t">
			{`Resilience = ${DEFAULT_RESILIENCE} + ${unlockedClassResilienceBonus} (from unlocked classes) + ${intermediateClassResilienceBonus} (from unlocking an intermediate magic class) + ${equippedClassResilienceBonus} (from equipped class) + ${skillResilienceBonus} (from skills)`}
		</div>
		<div class="big-text">
			Res: {resilience}
		</div>
	</SvelteTip>
</div>

<style lang="scss">
	.container {
		flex: 1;
		background-color: rgb(157, 178, 116);
		padding: 10px;

		display: flex;
		flex-direction: row;
		align-items: center;

		> * {
			width: 100%;
			padding: 10px;
			text-align: center;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		> *:not(:last-child) {
			border-right: 1px solid black;
		}
	}

	.big-text {
		font-size: 25px;
	}

	.terrain-container {
		display: flex;
		flex: 1;
		justify-content: center;
		input {
			width: 30px;
		}
	}
	.skinny.skinny {
		// flex: 0;
		white-space: nowrap;
	}
	.skinny-tooltip {
		white-space: normal;
	}

	.warning-container {
		flex: 0;
		.warning {
			font-weight: bold;
			font-size: 30px;
			background-color: red;
			border-radius: 100%;
			padding: 5px 18px;
			flex: 0;
		}
	}

	.warning-tooltip {
		display: flex;
		flex-direction: column;
	}
</style>
