<script lang="ts">
	import { onExportSheet } from 'src/utils';

	export let currentPage: any;
	export let fullSheet: any;
	export let playerName: any;
	export let onUpdatePlayerName: any;

	export let onChangePage: any;
</script>

<div class="container">
	<textarea
		type="text"
		class="name"
		value={playerName}
		rows="3"
		on:input={(e) => onUpdatePlayerName(e.currentTarget.value || '')}
	/>

	<button class={currentPage === 'HOME' ? 'active' : ''} on:click={() => onChangePage('HOME')}>
		Home
	</button>
	<button class={currentPage === 'XP' ? 'active' : ''} on:click={() => onChangePage('XP')}
		>Weapon XP</button
	>
	<button class={currentPage === 'EDITOR' ? 'active' : ''} on:click={() => onChangePage('EDITOR')}
		>Sheet Editor</button
	>
	<button
		class={currentPage === 'DICE_EDITOR' ? 'active' : ''}
		on:click={() => onChangePage('DICE_EDITOR')}
	>
		Dice Editor
	</button>
	<button on:click={() => onExportSheet(fullSheet)}>Export Sheet</button>
</div>

<style lang="scss">
	.container {
		height: 50px;

		display: flex;
		justify-content: space-between;

		column-gap: 10px;
	}

	.name {
		flex: 1;
		font-size: 20px;
	}

	.active {
		background-color: blue;
		color: white;
	}
</style>
