<script lang="ts">
	import { onDestroy } from 'svelte';

	export let timeout = 500;
	export let tooltipStyle = 'RIGHT_START';
	export let tooltipClass = '';
	export let showing = false;
	export let disabled = false;

	const prevDisabled: any = { current: disabled };

	let hovered = false;
	const timer: any = { current: null };
	let helper: any;

	const prevContent: any = { current: null, mouseEnterListener: null, mouseLeaveListener: null };
	$: content = helper?.previousElementSibling;
	$: contentClass = content?.className.split(' ')?.find((c: any) => c.indexOf('s-') === 0);
	$: tooltip = helper?.childNodes[0];
	$: {
		tooltip;
		if (content && (prevContent.current !== content || prevDisabled.current !== disabled)) {
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

			if (!disabled) {
				content.id += 'TOOLTIP_container';

				prevContent.current = content;
				prevContent.mouseEnterListener = mouseEnterListener;
				prevContent.mouseLeaveListener = mouseLeaveListener;

				content?.addEventListener('mouseenter', mouseEnterListener);
				content?.addEventListener('mouseleave', mouseLeaveListener);
			} else {
				content.id = '';
			}
		}

		prevDisabled.current = disabled;
	}
	$: {
		tooltip;
		contentClass;
		if (content) {
			if (showing || hovered) {
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
	<div class={`TOOLTIP_tooltip-positioner ${tooltipStyle}`}>
		<div class={`${tooltipClass} ${contentClass} TOOLTIP_tooltip_container ${tooltipStyle}`}>
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
		width: 100vw;
		height: 100vh;
		display: flex;
		top: -5px;

		&.RIGHT_START {
			left: 5px;
		}
		&.CENTER {
			left: 50%;
			transform: translateX(-50%);
		}
		&.LEFT_END {
			right: 10px;
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
		font-size: 15px;

		&.RIGHT_START {
			left: 0;
		}
		&.CENTER {
			left: 50%;
			transform: translate(-50%, -100%);
		}
		&.LEFT_END {
			left: inherit;
			right: 0;
		}
	}
	.hidden {
		display: none;
	}
</style>
