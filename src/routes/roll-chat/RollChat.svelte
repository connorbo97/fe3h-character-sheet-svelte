<script lang="ts">
	import { onMount } from 'svelte';

	import Index from '../index.svelte';
	import AttackEntry from './attackEntry.svelte';

	export let chatEntries: any;
	export let spoilersOn: any;
	export let toggleSpoilersOn: any;
	export let alreadyRevealed: any;
	export let setAlreadyRevealed: any;

	let chat;

	let lastResolvedScroll = -1;
	let mounted = false;

	let firstBeep;
	let beepAudio = new Audio('beep.ogg');

	$: {
		chatEntries;
		if (chat && lastResolvedScroll !== chatEntries?.length) {
			const scrolledToBottom =
				Math.abs(chat?.scrollHeight - chat?.scrollTop - chat?.clientHeight) < 1;
			if (scrolledToBottom || lastResolvedScroll === -1) {
				window.requestAnimationFrame(() => {
					chat.scrollTop = chat.scrollHeight;
					lastResolvedScroll = chatEntries.length;
				});
			} else {
				lastResolvedScroll = chatEntries.length;
			}
		}
	}

	onMount(() => {
		mounted = true;
		firstBeep = chatEntries.length;
	});
	$: {
		if (mounted) {
			if (firstBeep !== chatEntries.length) {
				beepAudio.play();
			}
		}
	}
</script>

<div class="container">
	<div style:width="100%">
		<h1>Roll Chat (total entries: {chatEntries?.length || '-'})</h1>
	</div>

	<div>
		<span>Hide Damage Initially?</span>
		<input type="checkbox" checked={spoilersOn !== Infinity} on:click={toggleSpoilersOn} />
	</div>

	<div class="scroll-container" bind:this={chat} id="test">
		{#if !chatEntries}
			<div>Loading</div>
		{/if}
		{#if chatEntries}
			{#each chatEntries as entry, i}
				<AttackEntry
					{entry}
					spoilersOn={spoilersOn !== Infinity && i >= spoilersOn && alreadyRevealed[i] !== true}
					index={i}
					{setAlreadyRevealed}
				/>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		row-gap: 5px;
		flex-direction: column;
		align-items: flex-end;
		height: calc(100% - 10px);
		padding: 5px;
	}
	.scroll-container {
		padding: 5px;
		background-color: #eae8da;
		overflow: scroll;
		border-radius: 5px;
		border: 1px solid black;
		width: 50%;
		flex: 1;

		display: flex;
		flex-direction: column;
		row-gap: 15px;

		margin-bottom: 30px;
	}
</style>
