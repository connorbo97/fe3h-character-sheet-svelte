<script lang="ts">
	import {
		collection,
		onSnapshot,
		query,
		where,
		addDoc,
		orderBy,
		Timestamp
	} from 'firebase/firestore';
	import { CONTEXTS } from 'src/constants';
	import { addEntryToChat } from 'src/rollUtils';
	import { getContext, onDestroy } from 'svelte';

	const db: any = getContext(CONTEXTS.DB);

	export let chatEntries: any;

	let chat;

	let lastResolvedScroll = -1;

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
	$: console.log(chatEntries);
</script>

<div class="container">
	<div style:width="100%">
		<h1>Roll Chat (total entries: {chatEntries?.length || '-'})</h1>
	</div>

	<button
		on:click={() => {
			addEntryToChat(db, {
				attackRoll: '123',
				damageRoll: '456',
				crestRoll: '789',
				critRoll: '098'
			});
		}}
	>
		click to add
	</button>

	<div class="scroll-container" bind:this={chat} id="test">
		{#if !chatEntries}
			<div>Loading</div>
		{/if}
		{#if chatEntries}
			{#each chatEntries as entry, i}
				<div>
					<span>Attack: {entry.attackRoll}</span>
					<span>Crest: {entry.crestRoll}</span>
					<span>Crit: {entry.critRoll}</span>
					<span>Damage: {entry.damageRoll}</span>
					<span>Date: {new Date(entry.date?.seconds * 1000)}</span>
				</div>
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
		height: 100%;
	}
	.scroll-container {
		overflow: scroll;
		background-color: lightskyblue;
		border-radius: 5px;
		width: 50%;
		flex: 1;
	}
</style>
