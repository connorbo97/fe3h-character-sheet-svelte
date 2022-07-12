<script lang="ts">
	export let entry: AttackEntry;
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
</script>

<div class="container">
	<u class="player">{playerName} ({attackName})</u>
	<div class="rolls">
		{#if attackRoll}
			<div class="attack">Attack</div>
		{/if}
		{#if critRoll}
			<div class="Crit">Crit</div>
		{/if}
		{#if crestRoll}
			<div class="Crest">Crest of {crestName || ''}</div>
		{/if}
		{#if damageRoll}
			<div class="Damage">{isHealWeapon ? 'HP Restored' : 'Damage'}</div>
		{/if}
	</div>
	<div class="result">
		{#if attackRoll}
			<div class="attack">{attackRoll}</div>
		{/if}
		{#if critRoll}
			<div class="Crit">{critRoll}</div>
		{/if}
		{#if crestRoll}
			<div class="Crest">{crestRoll}</div>
		{/if}
		{#if damageRoll}
			<div class="Damage">{damageRoll}</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}
	.player {
		padding: 5px;
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
</style>
