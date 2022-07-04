<script lang="ts">
	import { BEGINNER_CLASSES, CLASS_TO_LABEL, INTERMEDIATE_CLASSES } from 'src/constants';

	export let masteredClasses: any;

	export let equippedClass: string;
	export let setEquippedClass: Function;

	export let unlockedClasses: Array<string>;
	export let onUpdateUnlockedClasses: Function;

	$: classSet = new Set(unlockedClasses);

	const onToggleEquipClass = (classToSelect: string) => {
		if (equippedClass === classToSelect) {
			setEquippedClass('');
		} else if (classSet.has(classToSelect)) {
			setEquippedClass(classToSelect);
		}
	};

	const onToggleClassActive = (targetClass: string) => {
		if (classSet.has(targetClass)) {
			if (equippedClass === targetClass) {
				setEquippedClass('');
			}
			onUpdateUnlockedClasses(Array.from(classSet).filter((val) => val !== targetClass));
		} else {
			onUpdateUnlockedClasses([...Array.from(classSet), targetClass]);
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
