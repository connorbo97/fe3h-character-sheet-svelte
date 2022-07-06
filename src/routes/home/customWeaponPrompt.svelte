<script lang="ts">
	import { CONTEXTS } from 'src/constants';
	import { getContext, onMount } from 'svelte';

	const { close } = getContext(CONTEXTS.MODAL);
	export let defaultReason: string = '';
	export let weapon: string;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };
	export let customWeapons: { [s: string]: WeaponFeatures };
	export let onUpdateCustomWeapons: Function;

	$: alreadyCustom = customWeapons[weapon];

	let reason: string = defaultReason;
	let input: any;

	onMount(() => {
		input?.select();
	});
</script>

<div class="container">
	<h1>{alreadyCustom ? 'Adding' : 'Removing'} custom weapon:</h1>
	{#if !alreadyCustom}
		<div class="content">
			<div>Reason:</div>
			<textarea
				bind:this={input}
				id="custom-weapon-prompt-input"
				type="text"
				bind:value={reason}
				rows={3}
			/>
		</div>
	{/if}
	{#if alreadyCustom}
		<div class="content">
			<b>Current Reason:</b>
			{customWeapons[weapon]?.reason}
		</div>
	{/if}
	<button
		class="action"
		on:click={() => {
			if (alreadyCustom) {
				const { [weapon]: removed, ...rest } = customWeapons;
				onUpdateCustomWeapons(rest);
			} else {
				onUpdateCustomWeapons({
					...customWeapons,
					[weapon]: {
						...weaponsToFeatures[weapon],
						reason: reason
					}
				});
			}
			close();
		}}>Click to {alreadyCustom ? 'Remove' : 'Submit'}</button
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
	#custom-weapon-prompt-input {
		width: 100%;
	}

	.action {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 5px;
		font-size: 20px;
	}
</style>
