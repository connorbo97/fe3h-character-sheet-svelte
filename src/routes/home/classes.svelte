<script lang="ts">
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import { BEGINNER_CLASSES, CLASS_TO_LABEL, CONTEXTS, INTERMEDIATE_CLASSES } from 'src/constants';
	import { CLASS_TO_FEATURES } from 'src/constants/classes';
	import { classBuilder } from 'src/textUtils';
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
	<u>Classes</u>
	<div class="category">
		<div class="label">Beginner</div>
		<div class="classes-container">
			{#each Array.from(BEGINNER_CLASSES) as targetClass}
				<div class="class-container">
					<SvelteTip disabled={!masteredClasses.includes(targetClass)}>
						<button
							class={classBuilder({
								mastered: masteredClasses.includes(targetClass),
								active: classSet?.has(targetClass),
								'not-active': classSet?.has(targetClass)
							})}
							on:click={() => onToggleClassActive(targetClass)}
						/>

						<div slot="t">Mastered</div>
					</SvelteTip>
					<div class={`class-label`}>
						{CLASS_TO_LABEL[targetClass]}
					</div>
					<button
						class={equippedClass === targetClass ? 'equipped' : ''}
						on:click={() => onToggleEquipClass(targetClass)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Intermediate</div>
		<div class="classes-container">
			{#each Array.from(INTERMEDIATE_CLASSES) as targetClass}
				<div class="class-container">
					<button
						class={classBuilder({
							mastered: masteredClasses.includes(targetClass),
							active: classSet?.has(targetClass),
							'not-active': classSet?.has(targetClass)
						})}
						on:click={() => onToggleClassActive(targetClass)}
					/>
					<div class={`class-label`}>
						{CLASS_TO_LABEL[targetClass]}
					</div>
					<button
						class={equippedClass === targetClass ? 'equipped' : ''}
						on:click={() => onToggleEquipClass(targetClass)}
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
		padding: 5px;

		row-gap: 10px;
		height: 100%;
		overflow-y: auto;

		border-right: 1px solid gray;
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
		align-items: center;
		column-gap: 5px;
		> button {
			height: 20px;
		}
	}
	.class-label {
		flex: 1;
	}

	.active {
		background-color: blue;
	}
	.equipped {
		background-color: #51bf51;
	}
	.mastered {
		background-color: lightskyblue;
	}
</style>
