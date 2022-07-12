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

	const ONE_MINUTE = 1000 * 60;
	const FIVE_MINUTES = ONE_MINUTE * 5;
	const ONE_DAY = ONE_MINUTE * 60 * 24;

	const db: any = getContext(CONTEXTS.DB);

	const now = new Date(Date.now() - ONE_DAY);
	let rolls;
	let chat;
	let chatEntries: any = [];

	let scrolledToBottom = { current: false };

	const q = query(
		collection(db, 'lobby', 'taboola', 'rolls'),
		where('date', '>', Timestamp.fromDate(now)),
		orderBy('date')
	);

	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		const newRolls: Array<any> = [];

		querySnapshot.forEach((doc) => {
			newRolls.push(doc.data());
		});

		rolls = newRolls;
		if (!scrolledToBottom.current) {
			scrolledToBottom.current = true;
			window.requestAnimationFrame(() => {
				chat.scrollTop = chat.scrollHeight;
			});
		}
	});
	onDestroy(() => {
		unsubscribe();
	});

	$: {
		if (chat) {
			chat.scrollTop = chat.scrollHeight;
		}
	}
</script>

<div class="container">
	<h1>Roll Chat (total entries: {rolls?.length || '-'})</h1>

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
		{#if !rolls}
			<div>Loading</div>
		{/if}
		{#if rolls}
			{#each rolls as roll, i}
				<div bind:this={chatEntries[i]}>
					<span>Attack: {roll.attackRoll}</span>
					<span>Crest: {roll.crestRoll}</span>
					<span>Crit: {roll.critRoll}</span>
					<span>Damage: {roll.damageRoll}</span>
					<span>Date: {new Date(roll.date.seconds * 1000)}</span>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.scroll-container {
		height: 100px;
		overflow: scroll;
		background-color: lightskyblue;
		border-radius: 5px;
		width: 33%;
	}
</style>
