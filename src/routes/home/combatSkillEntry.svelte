<script lang="ts">
	import { MAX_COMBAT_SKILLS } from 'src/constants';

	export let skill: any;
	export let feature: any;
	export let isEquipped: any;
	export let onToggleCombatSkill: any;
	export let numEquipped: any;

	let hideDescription = true;
</script>

<div class="container">
	<div class="skill-container">
		<div class="label" on:click={() => (hideDescription = !hideDescription)}>{feature?.label}</div>
		<div
			class={`caret ${hideDescription ? 'flip' : ''}`}
			on:click={() => (hideDescription = !hideDescription)}
		>
			v
		</div>
		<button
			class={isEquipped ? 'equipped' : ''}
			on:click={() => onToggleCombatSkill(skill)}
			disabled={numEquipped >= MAX_COMBAT_SKILLS && !isEquipped}
		/>
	</div>
	{#if !hideDescription}
		<div class="description" on:click={() => (hideDescription = true)}>
			{#if feature?.reason}
				<div class="reason">{feature.reason}</div>
				<br />
			{/if}
			<div>
				{feature?.description}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		margin-right: 5px;
		row-gap: 5px;

		button {
			height: 20px;
			cursor: pointer;
			&:disabled {
				color: gray;
				cursor: default;
			}
		}
	}
	.skill-container {
		display: flex;
		column-gap: 5px;

		align-items: center;
	}

	.label {
		flex: 1;
		cursor: pointer;
	}
	.description {
		padding: 5px;
		border-radius: 5px;
		background-color: lightgray;
		display: flex;
		font-size: 15px;
		border: 1px solid gray;

		flex-direction: column;
		font-family: sans-serif;
	}

	.equipped {
		background-color: green;
	}

	.caret {
		transition: transform 0.2s linear;
		padding: 0px 5px;
		cursor: pointer;
		margin-bottom: 1px;
		border: 1px solid black;
		border-radius: 100%;
		height: 15px;

		font-size: 12px;
	}

	.flip {
		transform: rotate(180deg);
	}

	.reason {
		color: brown;
	}
</style>
