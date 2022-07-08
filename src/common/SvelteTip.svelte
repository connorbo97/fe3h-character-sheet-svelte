<script lang="ts">
	export let containerStyle: any = '';
	export let contentStyle: any = '';
	export let timeout = 500;
	let hovered = false;
	let timer: any = null;

	const onMouseEnter = () => {
		timer = setTimeout(() => {
			hovered = true;
			timer = null;
		}, timeout);
	};
	const onMouseLeave = () => {
		if (timer) {
			clearTimeout(timer);
		}
		hovered = false;
	};
</script>

<div class="container" style={containerStyle}>
	<div
		class="content"
		style={contentStyle}
		on:mouseenter={onMouseEnter}
		on:mouseleave={onMouseLeave}
	>
		<slot name="content">test</slot>
	</div>
	{#if hovered}
		<div class="tooltip-container">
			<div class="tooltip">
				<slot name="tooltip">tooltip</slot>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		position: relative;
		cursor: help;
	}
	.tooltip-container {
		position: absolute;
		display: flex;
		top: -5px;
		left: 5px;
	}
	.tooltip {
		position: fixed;

		max-width: 500px;
		border-radius: 5px;
		background-color: white;
		padding: 5px;
		transform: translateY(-100%);
	}
</style>
