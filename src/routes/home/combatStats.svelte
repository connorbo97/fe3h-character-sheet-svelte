<script lang="ts">
	import { DEFAULT_ARMOR_CLASS, DEFAULT_MAX_HP, DEFAULT_MOVEMENT_SPEED, PLAYER_STAT } from 'src/constants';
	import { getModifierByPlayerStat } from 'src/utils';

	export let stats: any;
	let terrainMod = 0;
	const dexMod = getModifierByPlayerStat(stats[PLAYER_STAT.DEX]);
	const dodgeRate = 0;
	const weaponBonus = 0;
	const skillBonus = 0;
	$: ac = DEFAULT_ARMOR_CLASS + dexMod + dodgeRate + weaponBonus + skillBonus + terrainMod;

	const classMovementBonus = 0;
	const skillMovementBonus = 0;
	$: ms = DEFAULT_MOVEMENT_SPEED + classMovementBonus + skillMovementBonus;

	const classHpBonus = 0;
	const skillHPBonus = 0;
	const conMod = getModifierByPlayerStat(stats[PLAYER_STAT.CON]);
	$: hpMax = DEFAULT_MAX_HP + classHpBonus + skillHPBonus + conMod;

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
		title={`Speed = ${DEFAULT_MOVEMENT_SPEED} + ${classMovementBonus} (from class) + ${skillMovementBonus} (from combat skills)`}
	>
		Speed: {ms}
	</div>

	<div
		class="big-text"
		title={`HP Max = ${DEFAULT_MAX_HP} + ${classHpBonus} (from class) + ${skillHPBonus} (from combat skills) + ${conMod} (CON modifier)`}
	>
		HP Max: {hpMax}
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
