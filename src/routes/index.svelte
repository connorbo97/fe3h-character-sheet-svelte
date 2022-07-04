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
	import {
		calculateAllCombatArts,
		calculateAllCombatSkills,
		calculateAllWeapons
	} from 'src/combinationUtils';
	import Popup from './home/Popup.svelte';

	const defaultSheet: CharacterSheet = {
		playerStats: DEFAULT_PLAYER_STAT,
		playerName: 'No Name',
		playerSkills: DEFAULT_PLAYER_SKILL_PROFICIENCY,
		skillBonuses: DEFAULT_PLAYER_SKILL_BONUSES,
		unlockedClasses: [],
		unlockedClassesPicks: {},
		customWeapons: {},
		customCombatSkills: {},
		customCombatArts: {},
		classXP: {},
		weaponXP: {},
		crest: { type: '', isMajor: false, canDisplay: true }
	};

	let ready = false;
	let fullSheet: CharacterSheet = defaultSheet;
	let equippedClass: string = '';
	let equippedWeapon: string = '';
	let equippedCombatSkills: Array<string> = [];
	let equippedCombatArts: Array<string> = [];

	let selectedCombatArt: string;

	let currentPage = 'HOME';

	$: playerStats = fullSheet.playerStats;
	$: playerSkillProficiency = fullSheet.playerSkills;
	$: playerSkillBonus = fullSheet.skillBonuses;
	$: unlockedClasses = fullSheet.unlockedClasses;
	$: unlockedClassesPicks = fullSheet.unlockedClassesPicks;
	$: name = fullSheet.playerName;
	$: customCombatSkills = fullSheet.customCombatSkills;
	$: classXP = fullSheet.classXP;
	$: weaponXP = fullSheet.weaponXP;
	$: playerCrest = fullSheet.crest;

	$: allWeapons = calculateAllWeapons(fullSheet, equippedClass);
	$: allCombatSkills = calculateAllCombatSkills(fullSheet, equippedClass);
	$: allCombatArts = calculateAllCombatArts(fullSheet, equippedClass, allCombatSkills.fullSet);
	$: masteredClasses = unlockedClasses.filter((c: any) => classXP[c]?.mastered);

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
	const setSelectedCombatArt = (art: any) => {
		selectedCombatArt = art;
	};
	const onToggleCombatArts = (targetArt: any) => {
		if (equippedCombatArts.indexOf(targetArt) !== -1) {
			equippedCombatArts = equippedCombatArts.filter((art) => art !== targetArt);
		} else if (equippedCombatArts.length < MAX_COMBAT_SKILLS) {
			equippedCombatArts = [...equippedCombatArts, targetArt];
		}
		console.log(targetArt, equippedCombatArts);
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
	const onUpdateWeaponXP = (weapon: any, total: any, level: string, mastered: boolean) => {
		onUpdateSheet('weaponXP', { ...weaponXP, [weapon]: { total, level, mastered } });
	};
	const onUpdateClassXP = (targetClass: any, total: any, mastered: boolean) => {
		onUpdateSheet('classXP', { ...classXP, [targetClass]: { total, mastered } });
	};
	const onUpdateCrest = (newCrest: PlayerCrest) => {
		onUpdateSheet('crest', newCrest);
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
					{allWeapons}
					{allCombatSkills}
					{allCombatArts}
					{classXP}
					{playerStats}
					{onUpdatePlayerStats}
					{playerSkillBonus}
					{customCombatSkills}
					{playerSkillProficiency}
					{onToggleSkillProficiency}
					{equippedWeapon}
					{setEquippedWeapon}
					{equippedCombatArts}
					{onToggleCombatArts}
					{equippedClass}
					{setEquippedClass}
					{equippedCombatSkills}
					{onToggleCombatSkill}
					{unlockedClasses}
					{onUpdateUnlockedClasses}
					{masteredClasses}
					{playerCrest}
					{onUpdateCrest}
					{selectedCombatArt}
					{setSelectedCombatArt}
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
		grid-template-rows: 50px calc(100vh - 50px);
		grid-template-columns: 1fr;

		height: 100vh;
	}
	.header {
		grid-area: header;
	}
	.content {
		grid-area: content;
		padding: 5px;
		> div {
			height: 100%;
		}
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

	.invisible.invisible {
		height: 0;
		width: 0;
		overflow: hidden;
	}
</style>
