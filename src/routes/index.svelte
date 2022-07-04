<script lang="ts">
	import { onMount } from 'svelte';

	import {
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT,
		MAX_COMBAT_SKILLS
	} from '../constants';
	import Home from './home/home.svelte';
	import Header from './home/header.svelte';
	import { modal } from 'src/stores.js';
	import Modal from 'src/common/Modal.svelte';
	import Xp from './xp/xp.svelte';

	type CharacterSheet = {
		playerStats: any;
		playerName: any;
		playerSkills: any;
		skillBonuses: any;
		unlockedClasses: any;
		unlockedClassesPicks: any;
		customWeapons: any;
		customCombatSkills: any;
		classXP: { [s: string]: { total: number; level: string } };
		weaponXP: { [s: string]: { total: number; level: string } };
	};

	const defaultSheet: CharacterSheet = {
		playerStats: DEFAULT_PLAYER_STAT,
		playerName: 'No Name',
		playerSkills: DEFAULT_PLAYER_SKILL_PROFICIENCY,
		skillBonuses: DEFAULT_PLAYER_SKILL_BONUSES,
		unlockedClasses: [],
		unlockedClassesPicks: {},
		customWeapons: {},
		customCombatSkills: {},
		classXP: {},
		weaponXP: {}
	};

	let ready = false;
	let fullSheet: CharacterSheet = defaultSheet;
	let equippedClass: string = '';
	let equippedWeapon: string = '';
	let equippedCombatSkills: Array<string> = [];

	let currentPage = 'HOME';

	$: playerStats = fullSheet.playerStats;
	$: playerSkillProficiency = fullSheet.playerSkills;
	$: playerSkillBonus = fullSheet.skillBonuses;
	$: unlockedClasses = fullSheet.unlockedClasses;
	$: unlockedClassesPicks = fullSheet.unlockedClassesPicks;
	$: name = fullSheet.playerName;
	$: customWeapons = fullSheet.customWeapons;
	$: customCombatSkills = fullSheet.customCombatSkills;
	$: classXP = fullSheet.classXP;
	$: weaponXP = fullSheet.weaponXP;

	onMount(() => {
		const lsSheet = localStorage.getItem('sheet');

		if (lsSheet) {
			try {
				fullSheet = { ...defaultSheet, ...JSON.parse(lsSheet) };
			} catch (err) {
				console.error(err);
			}
		}

		ready = true;
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
		equippedClass = newClass;
	};
	const setEquippedWeapon = (newWeapon: any) => {
		equippedWeapon = newWeapon;
	};
	const onToggleCombatSkill = (targetSkill: any) => {
		if (equippedCombatSkills.indexOf(targetSkill) !== -1) {
			equippedCombatSkills = equippedCombatSkills.filter((skill) => skill !== targetSkill);
		} else if (equippedCombatSkills.length < MAX_COMBAT_SKILLS) {
			equippedCombatSkills = [...equippedCombatSkills, targetSkill];
		}
	};
	const onUpdateUnlockedClasses = (newClasses: Array<string>) => {
		onUpdateSheet('unlockedClasses', newClasses);
	};
	const onChangePage = (newPage: any) => {
		currentPage = newPage;
	};
	const onUpdateWeaponXP = (weapon: any, total: any, level: any) => {
		onUpdateSheet('weaponXP', { ...weaponXP, [weapon]: { total, level } });
	};
	const onUpdateClassXP = (targetClass: any, total: any, level: any) => {
		onUpdateSheet('classXP', { ...classXP, [targetClass]: { total, level } });
	};
</script>

<div class={`${ready ? '' : 'no-clicks'} container`}>
	<Modal show={$modal}>
		<div class="header">
			<Header playerName={name} {onUpdatePlayerName} {fullSheet} {onChangePage} {currentPage} />
		</div>
		<div class="content">
			<div class={currentPage === 'HOME' ? '' : 'invisible'}>
				<Home
					{classXP}
					{playerStats}
					{onUpdatePlayerStats}
					{playerSkillBonus}
					{customWeapons}
					{customCombatSkills}
					{playerSkillProficiency}
					{onToggleSkillProficiency}
					{equippedWeapon}
					{setEquippedWeapon}
					{equippedClass}
					{setEquippedClass}
					{equippedCombatSkills}
					{onToggleCombatSkill}
					{unlockedClasses}
					{onUpdateUnlockedClasses}
					{unlockedClassesPicks}
				/>
			</div>
			<div class={currentPage === 'XP' ? '' : 'invisible'}>
				<Xp {unlockedClasses} {classXP} {weaponXP} {onUpdateClassXP} {onUpdateWeaponXP} />
			</div>
			<div class={currentPage === 'CUSTOM' ? '' : 'invisible'}>CUSTOM</div>
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
	}
	.header {
		grid-area: header;
	}
	.content {
		grid-area: content;
		padding: 5px;
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

	.invisible {
		height: 0;
		width: 0;
		overflow: hidden;
	}
</style>
