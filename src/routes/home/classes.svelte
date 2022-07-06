<script lang="ts">
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';

	import { BEGINNER_CLASSES, CLASS_TO_LABEL, CONTEXTS, INTERMEDIATE_CLASSES } from 'src/constants';
	import { CLASS_TO_FEATURES } from 'src/constants/classes';
	import { getContext } from 'svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let masteredClasses: any;

	export let equippedClass: string;
	export let setEquippedClass: Function;

	export let unlockedClasses: Array<string>;
	export let onUpdateUnlockedClasses: Function;

	export let customCombatSkills: any;
	export let onUpdateCustomCombatSkills: any;
	export let customCombatArts: any;
	export let onUpdateCustomCombatArts: any;
	export let customWeapons: any;
	export let onUpdateCustomWeapons: any;
	export let playerStats: any;
	export let onUpdatePlayerStats: any;

	$: classSet = new Set(unlockedClasses);

	const onToggleEquipClass = (classToSelect: string) => {
		if (equippedClass === classToSelect) {
			setEquippedClass('');
		} else if (classSet.has(classToSelect)) {
			setEquippedClass(classToSelect);
		}
	};

	const promptUserIfRequired = (targetClass: any, onUnlockClass: any) => {
		open(PickOnePrompt, {
			pickOne: CLASS_TO_FEATURES[targetClass].unlocks.pickOne,
			reason: `Unlocked by obtaining ${CLASS_TO_LABEL[targetClass]} class`,
			customWeapons,
			customCombatArts,
			customCombatSkills,
			onUpdateCustomCombatArts,
			onUpdateCustomCombatSkills,
			onUpdateCustomWeapons,
			playerStats,
			onUpdatePlayerStats,
			onSubmit: onUnlockClass
		});
	};
	const onToggleClassActive = (targetClass: string) => {
		if (classSet.has(targetClass)) {
			if (equippedClass === targetClass) {
				setEquippedClass('');
			}
			onUpdateUnlockedClasses(Array.from(classSet).filter((val) => val !== targetClass));
		} else {
			const onUnlockClass = () => onUpdateUnlockedClasses([...Array.from(classSet), targetClass]);
			if (CLASS_TO_FEATURES[targetClass].unlocks.pickOne) {
				promptUserIfRequired(targetClass, onUnlockClass);
			} else {
				onUnlockClass();
			}
		}
	};
</script>

<div class="container">
	<div class="category">
		<div class="label">Beginner</div>
		<div class="classes-container">
			{#each Array.from(BEGINNER_CLASSES) as beginnerClass}
				<div class="class-container">
					<button
						class={classSet?.has(beginnerClass) ? 'active' : 'not-active'}
						on:click={() => onToggleClassActive(beginnerClass)}
					/>
					<div
						class={`${masteredClasses.indexOf(beginnerClass) !== -1 ? 'mastered' : ''} class-label`}
					>
						{CLASS_TO_LABEL[beginnerClass]}
					</div>
					<button
						class={equippedClass === beginnerClass ? 'equipped' : ''}
						on:click={() => onToggleEquipClass(beginnerClass)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Intermediate</div>
		<div class="classes-container">
			{#each Array.from(INTERMEDIATE_CLASSES) as intermediateClass}
				<div class="class-container">
					<button
						class={classSet?.has(intermediateClass) ? 'active' : 'not-active'}
						on:click={() => onToggleClassActive(intermediateClass)}
					/>
					<div
						class={`${
							masteredClasses.indexOf(intermediateClass) !== -1 ? 'mastered' : ''
						} class-label`}
					>
						{CLASS_TO_LABEL[intermediateClass]}
					</div>
					<button
						class={equippedClass === intermediateClass ? 'equipped' : ''}
						on:click={() => onToggleEquipClass(intermediateClass)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		background-color: powderblue;
		padding: 10px;
		border-radius: 5px;

		row-gap: 10px;
	}

	.label {
		font-weight: bold;
	}

	.classes-container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}
	.class-container {
		display: flex;
	}
	.class-label {
		flex: 1;
		white-space: nowrap;
	}

	.active {
		background-color: blue;
	}
	.equipped {
		background-color: green;
	}

	.mastered {
		color: red;
	}
</style>
