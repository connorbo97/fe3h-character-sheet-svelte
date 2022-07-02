<script lang="ts">
	import { DEFAULT_ARMOR_CLASS, PLAYER_STAT } from 'src/constants';
	import { getModifierByPlayerStat } from 'src/utils';

	export let stats: any;
	let terrainMod = 0;
	const dexMod = getModifierByPlayerStat(stats[PLAYER_STAT.DEX]);
	const dodgeRate = 0;
	const weaponBonus = 0;
	const skillBonus = 0;
	$: ac = DEFAULT_ARMOR_CLASS + dexMod + dodgeRate + weaponBonus + skillBonus + terrainMod;

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
		class="ac"
		title={`AC = 5 + ${dexMod} (dex modifier) + ${dodgeRate} (class bonus) + ${skillBonus} (combat skill bonus) + ${weaponBonus} (weapon bonus) + ${terrainMod}(terrain mod)`}
	>
		AC: {ac}
	</div>
  <div class="terrain-container">
    <div>Terrain Modifier: </div>
    <input type="number" value={terrainMod} on:input={onTerrainModChange} />
  </div>
</div>

<style lang="scss">
	.container {
		flex: 1;
		background-color: green;
		border-radius: 5px;
		padding: 10px;
	}

  .ac {
    font-size: 30px;
  }

  .terrain-container {
    display: flex;
    input {
      width: 50px;
    }
  }
</style>
