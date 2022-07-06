<script lang="ts">
	import { CONTEXTS } from 'src/constants';
	import { getContext, onMount } from 'svelte';

	const { close } = getContext(CONTEXTS.MODAL);
	export let defaultReason: string = '';
	export let weapon: string;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };
	export let customWeapons: { [s: string]: WeaponFeatures };
	export let onUpdateCustomWeapons: Function;

	let reason: string = defaultReason;
	let input: any;

	onMount(() => {
		input.select();
	});
</script>

<div class="container">
	<h1>Adding custom weapon:</h1>
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

	<button
		on:click={() => {
			onUpdateCustomWeapons({
				...customWeapons,
				[weapon]: {
					...weaponsToFeatures[weapon],
					reason: reason
				}
			});
			close();
		}}>Click to Submit</button
	>
</div>

<style lang="scss">
	#custom-weapon-prompt-input {
		width: 100%;
	}
</style>
