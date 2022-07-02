<script lang="ts">
import Popup from './Popup.svelte';

	import { getModifierByPlayerStat, rollD20 } from 'src/utils';
	import { DEFAULT_PLAYER_STAT, PLAYER_STAT_TO_LABEL } from '../../constants';
import { getContext } from 'svelte';

  const { open } = getContext('simple-modal');

	// state
	export let stats = DEFAULT_PLAYER_STAT;
	export let onUpdatePlayerStats: Function;

	// handlers
	const onPlayerStatRoll = (stat: string) => {
		const statBuff = getModifierByPlayerStat(stats[stat]);
		const rng = rollD20();
		const result = rng + statBuff;

		open(Popup, { message: `${result} = ${rng} + ${statBuff}`})
	};

	const onPlayerStatChange = (stat: string, value: any) => {
		onUpdatePlayerStats({ ...stats, [stat]: isNaN(value) ? 0 : value });
	};

  const showPopup = () => {
		open(Popup, { message: "It's a popup!" });
	};
</script>

<div class="container">
	{#each Object.keys(stats) as stat}
		<div class="stat-container">
			<button class="label" on:click={() => onPlayerStatRoll(stat)}>
				{PLAYER_STAT_TO_LABEL[stat]}
			</button>
			<div>{getModifierByPlayerStat(stats[stat])}</div>
			<input
				class="value"
				value={typeof stats[stat] === 'number' ? stats[stat] : 0}
				on:input={(e) => onPlayerStatChange(stat, parseInt(e.currentTarget.value))}
				type="number"
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;

		row-gap: 20px;
		background-color: blue;

		padding: 10px;
		height: calc(100% - 20px);
	}
	.stat-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 5px;
		background-color: white;

		text-align: center;

		padding: 5px;
		border-radius: 5px;

		button {
			border: 0;
			padding: 0;
			background-color: transparent;
			&:hover {
				color: red;
			}
		}
		input {
			display: inline-block;
			text-align: center;
			max-width: 50px;
		}
	}


</style>
