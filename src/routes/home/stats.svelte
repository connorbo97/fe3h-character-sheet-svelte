<script lang="ts">
	import Popup from './Popup.svelte';

	import { getModifierByPlayerStat, rollD20, rollVisualDice } from 'src/utils';
	import {
		CONTEXTS,
		CRESTS,
		CRESTS_TO_FEATURES,
		CrestType,
		DEFAULT_PLAYER_STAT,
		PLAYER_STAT_TO_LABEL
	} from '../../constants';
	import { getContext } from 'svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	// state
	export let stats = DEFAULT_PLAYER_STAT;
	export let onUpdatePlayerStats: Function;

	export let playerCrest: PlayerCrest;
	export let onUpdateCrest: any;

	let majorMinorDropdown: any = {};

	$: {
		if (majorMinorDropdown) {
			majorMinorDropdown.value = playerCrest.type
				? playerCrest?.isMajor
					? CrestType.MAJOR
					: CrestType.MINOR
				: 'none';
		}
	}

	// handlers
	const onPlayerStatRoll = (stat: string) => {
		const statBuff = getModifierByPlayerStat(stats[stat]);
		const rng = rollD20();
		const result = rng + statBuff;
		rollVisualDice(['1d20'], { modifier: [statBuff] });
		// open(Popup, { message: `${result} = ${rng} + ${statBuff}` });
	};

	const onPlayerStatChange = (stat: string, value: any) => {
		onUpdatePlayerStats({ ...stats, [stat]: isNaN(value) ? 0 : value });
	};

	const showPopup = () => {
		open(Popup, { message: "It's a popup!" });
	};

	$: playerCrestFeatures = CRESTS_TO_FEATURES[playerCrest?.type] || {};
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
	<div class="crest">
		{#if playerCrestFeatures?.image}
			<img
				style:border-color={playerCrest.isMajor ? 'slateblue' : 'lightskyblue'}
				class="crest-image"
				src={playerCrestFeatures.image}
				title={`${playerCrestFeatures?.description} DC ${
					playerCrestFeatures.activationDC[playerCrest.isMajor ? CrestType.MAJOR : CrestType.MINOR]
				}`}
				alt={playerCrest?.type}
			/>
		{/if}
		<select
			name="crest"
			on:change={(e) => {
				onUpdateCrest({
					type: e.currentTarget.value,
					isMajor: false
				});
			}}
		>
			<option value={''} selected={!playerCrest.type}>Crest?</option>
			{#each Object.keys(CRESTS) as crest}
				<option value={crest} selected={playerCrest?.type === crest}>
					{CRESTS_TO_FEATURES[crest]?.label}
				</option>
			{/each}
		</select>
		<select
			bind:this={majorMinorDropdown}
			name="major-minor"
			on:change={(e) =>
				onUpdateCrest({ ...playerCrest, isMajor: e.currentTarget.value === 'MAJOR' })}
		>
			<option value={'none'}>Major/Minor?</option>
			<option value={CrestType.MAJOR}>{'Major'}</option>
			<option value={CrestType.MINOR}>{'Minor'}</option>
		</select>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;

		row-gap: 17px;
		border-radius: 5px;
		background-color: rgb(71, 140, 201);

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

	.crest {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.crest-image {
		box-sizing: border-box;
		background-color: white;
		border-radius: 100%;
		border: 5px solid gray;
		width: 95%;
	}
</style>
