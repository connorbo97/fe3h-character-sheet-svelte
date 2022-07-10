<script lang="ts">
	import { DEFAULT_DICE_OPTIONS } from 'src/constants';
	import { Dice } from 'src/constants/dice';
	import { rollVisualDice } from 'src/utils';

	import { onMount } from 'svelte';

	let DiceBox: any = null;
	let changedOptions = {};

	onMount(() => {
		import('@3d-dice/dice-box').then((pack) => {
			DiceBox = pack.default;
		});
	});

	$: commitDiceBoxChange = (shouldWriteLocalStorage = false, isReset = false) => {
		const mergedVal = isReset ? {} : changedOptions;
		let diceBoxOptions;
		try {
			diceBoxOptions = JSON.parse(localStorage.getItem('diceBoxOptions') || '{}');
		} catch (err) {
			console.log(err);
		}

		if (shouldWriteLocalStorage) {
			try {
				localStorage.setItem('diceBoxOptions', JSON.stringify({ ...diceBoxOptions, ...mergedVal }));
			} catch (err) {
				console.log(err);
			}
		}

		const diceBox = new DiceBox('#dice-box', {
			...DEFAULT_DICE_OPTIONS,
			...diceBoxOptions,
			...mergedVal
		});
		window.diceBoxContainer.removeChild(document.getElementById('dice-canvas'));

		return diceBox.init().then(() => {
			window.diceBox = diceBox;
		});
	};
</script>

<div class="container">
	<h1>Update how your dice rolls look</h1>

	<div class="">
		<button
			on:click={() => {
				commitDiceBoxChange(false, true).then(() => {
					rollVisualDice([Dice.d20]);
				});
			}}
		>
			Reset Dice to Local Storage State
		</button>
		<button
			on:click={() => {
				commitDiceBoxChange().then(() => {
					rollVisualDice([Dice.d20]);
				});
			}}>Test roll</button
		>
		<button
			on:click={() => {
				commitDiceBoxChange(true);
			}}>Commit Changes to Local Storage</button
		>
	</div>

	<div class="field">
		<span>Die Color (must be full RGB hex (e.g. #FF0000 for red))</span>
		<input
			on:change={(e) => {
				changedOptions = { ...changedOptions, themeColor: e.currentTarget.value };
			}}
		/>
	</div>
</div>

<style lang="scss">
</style>
