<script lang="ts">
	import { classBuilder } from 'src/textUtils';

	export let size: any = '16px';
	export let isUnlocked: any;
	export let isMastered: any;
	export let onClick: any;
	export let unlockedFilter: any = 'sepia(100%) saturate(1000%) brightness(45%) hue-rotate(174deg)';
</script>

<button class="container" style:width={size} style:height={size}>
	<img
		src={isMastered ? 'mastered.png' : 'unequipped.png'}
		width={size}
		class={!isMastered && isUnlocked ? 'equipped' : ''}
		alt="unlocked"
		style:filter={!isMastered && isUnlocked ? unlockedFilter : ''}
		on:click={onClick}
	/>
</button>

<style lang="scss">
	.container {
		border-radius: 0;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
		box-shadow: none;

		cursor: pointer;
	}
</style>
