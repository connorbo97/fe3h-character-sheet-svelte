<script lang="ts">
	var exports = {};
	import { onMount } from 'svelte';

	import {
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT,
		MAX_COMBAT_ARTS,
		MAX_COMBAT_SKILLS,
		MAX_WEAPONS_EQUIPPED
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
	import Editor from './editor/editor.svelte';

	const defaultSheet: CharacterSheet = {
		playerStats: DEFAULT_PLAYER_STAT,
		playerName: 'No Name',
		playerSkills: DEFAULT_PLAYER_SKILL_PROFICIENCY,
		skillBonuses: DEFAULT_PLAYER_SKILL_BONUSES,
		unlockedClasses: [],
		customWeapons: {},
		customCombatSkills: {},
		customCombatArts: {},
		classXP: {},
		weaponXP: {},
		crest: { type: '', isMajor: false }
	};

	let ready = false;
	let fullSheet: CharacterSheet = defaultSheet;
	let equippedClass: string = '';
	let equippedWeapons: Array<string> = [];
	let equippedCombatSkills: Array<string> = [];
	let equippedCombatArts: Array<string> = [];

	let selectedCombatArt: string;
	let selectedWeapon: string;

	let currentPage = 'HOME';

	let weaponUses: { [s: string]: number } = {};

	$: playerStats = fullSheet.playerStats;
	$: playerSkillProficiency = fullSheet.playerSkills;
	$: playerSkillBonus = fullSheet.skillBonuses;
	$: unlockedClasses = fullSheet.unlockedClasses;
	$: name = fullSheet.playerName;
	$: customWeapons = fullSheet.customWeapons;
	$: customCombatSkills = fullSheet.customCombatSkills;
	$: customCombatArts = fullSheet.customCombatArts;
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

	$: onChangeSheet = (newSheet: any) => {
		fullSheet = newSheet;
		localStorage.setItem('sheet', JSON.stringify(newSheet));
	};
	$: onUpdateSheet = (property: string, value: any) => {
		fullSheet = { ...fullSheet, [property]: value };
		localStorage.setItem('sheet', JSON.stringify(fullSheet));
	};
	$: onUpdatePlayerStats = (newStats: any) => {
		onUpdateSheet('playerStats', newStats);
	};
	$: onUpdatePlayerName = (newName: any) => {
		onUpdateSheet('playerName', newName);
	};
	$: onToggleSkillProficiency = (skill: any) => {
		const curVal = playerSkillProficiency[skill];

		onUpdateSheet('playerSkills', { ...playerSkillProficiency, [skill]: !curVal });
	};
	$: setEquippedClass = (newClass: any) => {
		equippedClass = newClass;
	};
	$: setSelectedWeapon = (newWeapon: any) => {
		selectedWeapon = newWeapon;
	};
	$: setSelectedCombatArt = (art: any) => {
		selectedCombatArt = art;
	};
	$: onToggleCombatArts = (targetArt: any) => {
		if (equippedCombatArts.indexOf(targetArt) !== -1) {
			equippedCombatArts = equippedCombatArts.filter((art) => art !== targetArt);
		} else if (equippedCombatArts.length < MAX_COMBAT_ARTS) {
			equippedCombatArts = [...equippedCombatArts, targetArt];
		}
	};
	$: onToggleCombatSkill = (targetSkill: any) => {
		if (equippedCombatSkills.indexOf(targetSkill) !== -1) {
			equippedCombatSkills = equippedCombatSkills.filter((skill) => skill !== targetSkill);
		} else if (equippedCombatSkills.length < MAX_COMBAT_SKILLS) {
			equippedCombatSkills = [...equippedCombatSkills, targetSkill];
		}
	};
	$: onToggleEquippedWeapons = (weapon: any) => {
		if (equippedWeapons.includes(weapon)) {
			equippedWeapons = equippedWeapons.filter((w) => w !== weapon);
		} else if (equippedWeapons.length < MAX_WEAPONS_EQUIPPED) {
			equippedWeapons = [...equippedWeapons, weapon];
		}
	};
	$: onUpdateUnlockedClasses = (newClasses: Array<string>) => {
		onUpdateSheet('unlockedClasses', newClasses);
	};
	$: onChangePage = (newPage: any) => {
		currentPage = newPage;
	};
	$: onUpdateWeaponXP = (weapon: any, total: any, level: string, mastered: boolean) => {
		onUpdateSheet('weaponXP', { ...weaponXP, [weapon]: { total, level, mastered } });
	};
	$: onUpdateClassXP = (targetClass: any, total: any, mastered: boolean) => {
		onUpdateSheet('classXP', { ...classXP, [targetClass]: { total, mastered } });
	};
	$: onUpdateCrest = (newCrest: PlayerCrest) => {
		onUpdateSheet('crest', newCrest);
	};
	$: onUpdateWeaponUses = (weapon: any, newUses: any) => {
		weaponUses = { ...weaponUses, [weapon]: newUses };
	};
	$: onUpdateCustomWeapons = (newCustom: any) => {
		onUpdateSheet('customWeapons', newCustom);
	};
	$: onUpdateCustomCombatArts = (newCustom: any) => {
		onUpdateSheet('customCombatArts', newCustom);
	};
	$: onUpdateCustomCombatSkills = (newCustom: any) => {
		onUpdateSheet('customCombatSkills', newCustom);
	};
</script>

<div class={`${ready ? '' : 'no-clicks'} container`}>
	{#if ready}
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
						{playerStats}
						{onUpdatePlayerStats}
						{playerSkillBonus}
						{playerSkillProficiency}
						{onToggleSkillProficiency}
						{equippedWeapons}
						{onToggleEquippedWeapons}
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
						{selectedWeapon}
						{setSelectedWeapon}
						{weaponUses}
						{onUpdateWeaponUses}
						{customCombatSkills}
						{onUpdateCustomCombatSkills}
						{customWeapons}
						{onUpdateCustomWeapons}
						{customCombatArts}
						{onUpdateCustomCombatArts}
					/>
				</div>
				<div class={currentPage === 'XP' ? '' : 'invisible'}>
					{#if currentPage === 'XP'}
						<Xp {unlockedClasses} {classXP} {weaponXP} {onUpdateClassXP} {onUpdateWeaponXP} />
					{/if}
				</div>
				<div class={currentPage === 'EDITOR' ? '' : 'invisible'}>
					{#if currentPage === 'EDITOR'}
						<Editor {fullSheet} {onChangeSheet} />
					{/if}
				</div>
			</div>
		</Modal>
	{/if}
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
