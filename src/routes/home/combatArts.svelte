<script lang="ts">
	let combatArts = ['Hello'];
	let hideDescription: any = true;
</script>

<div class="container">
	{#each combatArts as art}
		<div class="combat-art-container">
			<button />
			<div class="label">{art}</div>
			<div
				class={`caret ${hideDescription ? 'flip' : ''}`}
				on:click={() => (hideDescription = !hideDescription)}
			>
				v
			</div>
			<button />
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		background-color: aquamarine;

		border-radius: 5px;
		padding: 5px;
	}

	.combat-art-container {
		display: flex;
		column-gap: 5px;
	}
</style>
