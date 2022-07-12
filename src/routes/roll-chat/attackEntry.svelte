<script lang="ts">
	import { onMount } from 'svelte';

	export let entry: AttackEntry;
	export let spoilersOn: boolean;
	const {
		playerName = 'No Name',
		attackRoll,
		critRoll,
		crestRoll,
		damageRoll,
		crestName,
		isHealWeapon,
		attackName
	} = entry;

	let spoilerOn;

	$: getSpoilerLeft = () => {
		const attackRollMissing = attackRoll === undefined;
		const numToHide = (critRoll ? 1 : 0) + (crestRoll ? 1 : 0) + (damageRoll !== undefined ? 1 : 0);
		if (attackRollMissing) {
			return '0';
		}

		if (numToHide === 1) {
			return '50%';
		} else if (numToHide === 2) {
			return '33%';
		} else {
			return '25%';
		}
	};

	onMount(() => {
		spoilerOn = spoilersOn;
	});
	$: spoilerLeftPos = spoilersOn ? getSpoilerLeft() : 0;
</script>

<div class="container">
	<b class="player">{playerName} - {attackName}</b>
	<div class="rolls">
		{#if attackRoll !== undefined}
			<div class="attack">Attack</div>
		{/if}
		{#if critRoll}
			<div class="Crit">Crit</div>
		{/if}
		{#if crestRoll}
			<div class="Crest">Crest of {crestName || ''}</div>
		{/if}
		{#if damageRoll !== undefined}
			<div class="Damage">{isHealWeapon ? 'HP Restored' : 'Damage'}</div>
		{/if}
	</div>
	<div class="result">
		{#if attackRoll !== undefined}
			<div class="attack">{attackRoll}</div>
		{/if}
		{#if spoilerOn}
			{#if critRoll}
				<div />
			{/if}
			{#if crestRoll}
				<div />
			{/if}
			{#if damageRoll !== undefined}
				<div />
			{/if}
			<div class="spoiler" style:left={spoilerLeftPos} on:click={() => (spoilerOn = false)}>
				Click to reveal
			</div>
		{/if}
		{#if !spoilerOn}
			{#if critRoll}
				<div class="Crit">{critRoll}</div>
			{/if}
			{#if crestRoll}
				<div class="Crest">{crestRoll}</div>
			{/if}
			{#if damageRoll !== undefined}
				<div class="Damage">{damageRoll}</div>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: bisque;
		border-radius: 5px;
	}
	.player {
		padding: 5px;
		// border-bottom: 1px solid black;
	}

	.rolls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: bisque;
		border-radius: 5px 5px 0 0;
		text-align: center;
		> * {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 5px;
			flex: 1;
			&:not(:last-child) {
				border-right: 1px solid black;
			}

			// > * {
			// 	flex: 1;
			// }
		}
	}
	.result {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: lightyellow;
		border-radius: 5px;
		text-align: center;
		position: relative;
		> * {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 10px;
			&:not(:last-child) {
				border-right: 1px solid black;
			}

			min-height: 50px;
		}
		// 	.attack {
		// 	// .crit {
		// 	// 	display: flex;
		// 	// 	flex-direction: column;
		// 	// 	row-gap: 5px;
		// 	// }

		// 	// .crest {
		// 	// 	display: flex;
		// 	// 	flex-direction: column;
		// 	// 	justify-content: center;
		// 	// 	align-items: center;

		// 	// 	row-gap: 5px;

		// 	// 	text-align: center;
		// 	// 	.description {
		// 	// 		font-size: 12px;
		// 	// 	}
		// 	// }
		// 	// .combat-art-note {
		// 	// 	color: #7dbff0;
		// 	// }
	}

	.spoiler {
		color: white;
		background-color: black;
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		// .text {
		// }
	}
</style>
