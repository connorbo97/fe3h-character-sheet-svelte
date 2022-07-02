<script lang="ts">
	import { onMount } from 'svelte';

	import {
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT
	} from '../constants';
	import Home from './home/home.svelte';
	import Header from './home/Header.svelte';
	import { modal } from 'src/stores.js';
import Modal from 'src/common/Modal.svelte';

	const defaultSheet = {
		playerStats: DEFAULT_PLAYER_STAT,
		playerName: 'No Name',
		playerSkills: DEFAULT_PLAYER_SKILL_PROFICIENCY,
		skillBonuses: DEFAULT_PLAYER_SKILL_BONUSES,
		unlockedClasses: [],
	};

	let ready = false;
	let fullSheet = defaultSheet;
	let equippedClass = '';

	$: playerStats = fullSheet.playerStats;
	$: playerSkillProficiency = fullSheet.playerSkills;
	$: playerSkillBonus = fullSheet.skillBonuses;
	$: unlockedClasses = fullSheet.unlockedClasses;
	$: name = fullSheet.playerName;

	onMount(() => {
		const lsSheet = localStorage.getItem('sheet');

		if (lsSheet) {
			try {
				fullSheet = { ...defaultSheet, ...JSON.parse(lsSheet) };
			} catch (err) {
				console.error(err);
			}
		}

		ready = true
	});

	const onUpdateSheet = (property: string, value: any) => {
		fullSheet = { ...fullSheet, [property]: value };
		localStorage.setItem('sheet', JSON.stringify(fullSheet));
	};
	const onUpdatePlayerStats = (newStats: any) => {
		onUpdateSheet('playerStats', newStats);
	};
	const onUpdatePlayerName = (newName: any) => {
		onUpdateSheet('playerName', newName);
	};
	const onToggleSkillProficiency = (skill: any) => {
		const curVal = playerSkillProficiency[skill];

		onUpdateSheet('playerSkills', { ...playerSkillProficiency, [skill]: !curVal });
	};
	const setEquippedClass = (newClass: any) => {
		equippedClass = newClass
	}
	const onUpdateUnlockedClasses = (newClasses: Array<string>) => {
		onUpdateSheet('unlockedClasses', newClasses)
	}
</script>

<div class={`${ready ? '' : 'no-clicks'} container`}>
  <Modal show={$modal}>
    <div class="header">
      <Header playerName={name} {onUpdatePlayerName} {fullSheet} />
    </div>
    <div class="content">
      <Home
        {playerStats}
        {onUpdatePlayerStats}

        {playerSkillBonus}
	
        {playerSkillProficiency}
        {onToggleSkillProficiency}

				{equippedClass}
				{setEquippedClass}
	
				{unlockedClasses}
				{onUpdateUnlockedClasses}

      />
    </div>
  </Modal>
	{#if !ready}
		<div class="not-ready">Loading</div>
	{/if}
</div>

<style lang="scss">
	// :global {
	// }
	.container {
		display: grid;
		grid-template-areas:
			'header'
			'content';
		grid-template-rows: min-content 1fr;
		grid-template-columns: 1fr;

		min-height: 100vh;

		row-gap: 5px
	}
	.header {
		grid-area: header
	}
	.content {
		grid-area:content
	}
	.no-clicks {
		pointer-events: none;
	}
	.not-ready {
		position: fixed;
		inset: 0;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
