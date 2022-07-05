<script lang="ts">
	export let queries: Array<Query>;
	export let selections: { [s: string]: QueryOption };
	export let onUpdateQuerySelection: any;
</script>

<div class="container">
	{#each queries as query}
		{@const selectedOption = selections[query.key || '']}
		<div class="query">
			<div class="prompt">{query.prompt}</div>
			<select
				class={selectedOption !== query.options[0] ? 'selected' : ''}
				name={query.prompt}
				on:change={(e) => {
					onUpdateQuerySelection(query.key, query.options[parseInt(e?.currentTarget?.value)]);
				}}
			>
				{#each query.options as option, optionIndex}
					<option value={optionIndex} selected={selectedOption === option}>{option.label}</option>
				{/each}
			</select>
			<div class="description">{selectedOption?.description || ''}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		padding: 5px;
		border: 1px solid black;
		height: calc(100% - 10px);
		border-radius: 5px;

		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: 1fr;
		gap: 5px;
	}
	.query {
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.selected {
		background-color: lightpink;
	}
</style>
