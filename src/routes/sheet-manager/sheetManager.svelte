<script lang="ts">
	export let curSheet: any;
	export let onChangeCurSheet: any;

	export let onAddSheet: any;
	export let otherSheetNames: Array<string>;

	let newSheetName: any;

	$: options = otherSheetNames.sort();
</script>

<div class="container">
	<h1>Manage other sheets</h1>

	<select on:change={(e) => onChangeCurSheet(e.currentTarget.value)}>
		<option value={'sheet'} selected={curSheet === 'sheet'}>Main Sheet</option>
		{#each options as name}
			<option value={name} selected={curSheet === name}>{name}</option>
		{/each}
	</select>

	<input bind:value={newSheetName} />
	<button
		disabled={!newSheetName || otherSheetNames.includes(newSheetName)}
		on:click={() => {
			onAddSheet(newSheetName);
			newSheetName = '';
		}}>Add New Sheet</button
	>
</div>

<style lang="scss">
</style>
