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
	<button class={currentPage === 'ROLLS' ? 'active' : ''} on:click={() => onChangePage('ROLLS')}>
		Chat
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
	<button
		class={currentPage === 'OTHER_SHEETS' ? 'active' : ''}
		on:click={() => onChangePage('OTHER_SHEETS')}
	>
		Other Sheets
	</button>
	<button on:click={() => onExportSheet(fullSheet)}>Export Sheet</button>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		background-color: #dfd6c2;
		height: 100%;

		column-gap: 10px;

		> button {
			background-color: rgb(65, 17, 99);
			border: 3px solid transparent;
			color: white;
			box-shadow: none;
			display: flex;
			align-items: center;
			&:hover {
				border-color: rgb(129, 82, 158);
			}
		}
	}

	.name {
		flex: 1;
		font-size: 20px;
		text-align: left;
		line-height: 43px;
		background-color: rgb(235, 234, 229);
		font-family: cursive;
		font-size: 33px;
	}

	.active {
		background-color: blue;
		color: white;
	}
</style>
