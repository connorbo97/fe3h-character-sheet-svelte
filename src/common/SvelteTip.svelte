<script lang="ts">
	import { onDestroy } from 'svelte';

	export let timeout = 500;
	export let tooltipStyle = '';
	export let tooltipClass = '';

	let hovered = false;
	const timer: any = { current: null };
	let helper: any;

	const prevContent: any = { current: null, mouseEnterListener: null, mouseLeaveListener: null };
	$: content = helper?.previousElementSibling;
	$: contentClass = content?.className.split(' ')?.find((c: any) => c.indexOf('s-') === 0);
	$: tooltip = helper?.childNodes[0];
	$: {
		tooltip;
		if (content && prevContent.current !== content) {
			const mouseEnterListener = () => {
				timer.current = setTimeout(() => {
					hovered = true;
					timer.current = null;
				}, timeout);
			};
			const mouseLeaveListener = () => {
				if (timer.current) {
					clearTimeout(timer.current);
				}
				hovered = false;
			};
			const prevContentEl: any = prevContent.current;
			if (prevContentEl) {
				prevContentEl.removeEventListener('mouseenter', prevContent.mouseEnterListener);
				prevContentEl.removeEventListener('mouseleave', prevContent.mouseLeaveListener);
			}
			prevContent.current = content;
			prevContent.mouseEnterListener = mouseEnterListener;
			prevContent.mouseLeaveListener = mouseLeaveListener;
			content.id += 'TOOLTIP_container';

			content?.addEventListener('mouseenter', mouseEnterListener);
			content?.addEventListener('mouseleave', mouseLeaveListener);
		}
	}
	$: {
		tooltip;
		contentClass;
		if (content) {
			if (hovered) {
				content?.appendChild(tooltip);
			} else {
				try {
					content?.removeChild(tooltip);
				} catch (err) {}
			}
		}
	}

	onDestroy(() => {
		if (prevContent.current) {
			const test: any = prevContent.current;
			test.removeEventListener('mouseover', prevContent.mouseEnterListener);
			test.removeEventListener('mouseleave', prevContent.mouseLeaveListener);
		}
	});
</script>

<slot />
<div class="hidden" bind:this={helper}>
	<div class="TOOLTIP_tooltip-positioner">
		<div class={`${tooltipClass} ${contentClass} TOOLTIP_tooltip_container ${tooltipStyle} `}>
			<slot name="t">tooltip</slot>
		</div>
	</div>
</div>

<style lang="scss">
	:global {
		#TOOLTIP_container {
			position: relative;
			cursor: help;
			z-index: 999;
		}
		.TOOLTIP_tooltip_container {
			position: relative;
			cursor: help;
			z-index: 999;
		}
	}
	.TOOLTIP_tooltip-positioner {
		position: absolute;
		pointer-events: none;
		z-index: -1;
		width: 100vw;
		height: 100vh;
		display: flex;
		top: -5px;
		left: 5px;

		&.CENTER {
			left: 0px;
		}
	}
	.TOOLTIP_tooltip_container {
		position: absolute;

		max-width: 500px;
		border-radius: 5px;
		background-color: blue;
		color: white;
		padding: 5px;
		transform: translateY(-100%);
		top: 0;
		left: 0;
		&.CENTER {
			transform: translate(-50%, -100%);
		}
	}
	.hidden {
		display: none;
	}
</style>
