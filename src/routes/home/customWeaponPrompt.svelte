<script lang="ts">
	import { CONTEXTS } from 'src/constants';
	import { getContext } from 'svelte';

	const { close } = getContext(CONTEXTS.MODAL);
	export let defaultReason: string = '';
	export let weapon: string;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };
	export let customWeapons: { [s: string]: WeaponFeatures };
	export let onUpdateCustomWeapons: Function;

	let reason: string = defaultReason;
</script>

<div class="container">
	<h1>Adding custom weapon:</h1>
	<span>Reason:</span>
	<input type="text" bind:value={reason} />

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
</style>
