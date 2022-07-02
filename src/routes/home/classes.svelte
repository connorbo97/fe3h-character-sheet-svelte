<script lang="ts">
	import { BEGINNER_CLASSES, CLASS, INTERMEDIATE_CLASSES } from 'src/constants';

	export let equippedClass: string;
	export let setEquippedClass: Function;

	$: classSet = new Set([CLASS.MYRMIDON]);

	const onToggleEquipClass = (classToSelect: string) => {
		if (equippedClass === classToSelect) {
			setEquippedClass('');
		} else if (classSet.has(classToSelect)) {
			setEquippedClass(classToSelect);
		}
	};

	const onToggleClassActive = (classToSelect: string) => {
		if (classSet.has(classToSelect)) {
			classSet.delete(classToSelect);

      if (equippedClass === classToSelect) {
        setEquippedClass('');
      }
		} else {
			classSet.add(classToSelect);
		}

		classSet = new Set(classSet);
	};
</script>

<div class="container">
	<div class="category">
		Beginner
		<div class="classes-container">
			{#each Array.from(BEGINNER_CLASSES) as beginnerClass}
				<div class="class-container">
					<button
						class={classSet.has(beginnerClass) ? 'active' : 'not-active'}
						on:click={() => onToggleClassActive(beginnerClass)}
					/>
					<div class="class-label">{beginnerClass}</div>
					<button
						class={equippedClass === beginnerClass ? 'equipped' : ''}
						on:click={() => onToggleEquipClass(beginnerClass)}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="category">
		Intermediate
		<div class="classes-container">
			{#each Array.from(INTERMEDIATE_CLASSES) as intermediateClass}
				<div class="class-container">
					<button
						class={classSet.has(intermediateClass) ? 'active' : 'not-active'}
						on:click={() => onToggleClassActive(intermediateClass)}
					/>
					<div class="class-label">{intermediateClass}</div>
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

		background-color: teal;
		padding: 10px;
		border-radius: 5px;

		row-gap: 5px;
	}

	.classes-container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}
	.class-container {
		display: flex;
	}

	.active {
		background-color: blue;
	}
	.equipped {
		background-color: green;
	}
</style>
