<script lang="ts">
	import {
		BEGINNER_CLASSES,
		BEGINNER_MASTERY_REQ,
		CLASS_TO_LABEL,
		INTERMEDIATE_CLASSES,
		INTERMEDIATE_MASTERY_REQ,
		LEVEL_UP_ORDER,
		WEAPON_LEVEL,
		WEAPON_LEVEL_TO_LABEL,
		WEAPON_LEVEL_TO_MAX_XP,
		WEAPON_TYPE,
		WEAPON_TYPE_TO_LABEL
	} from 'src/constants';

	export let unlockedClasses: any;
	export let weaponXP: any;
	export let classXP: any;

	export let onUpdateClassXP: any;
	export let onUpdateWeaponXP: any;
</script>

<div class="container">
	<div class="category">
		{#each Object.keys(WEAPON_TYPE) as type}
			{@const curXP = weaponXP[type]?.total || 0}
			{@const curLevel = weaponXP[type]?.level || WEAPON_LEVEL.E}
			{@const maxXP = WEAPON_LEVEL_TO_MAX_XP[curLevel]}
			<div class="label">{WEAPON_TYPE_TO_LABEL[type]}</div>
			<div class="xp-bar">
				<div class="fill" style:right={`${((maxXP - curXP) / maxXP) * 100.0}%`}>
					<span>{`${curXP} / ${maxXP}`}</span>
				</div>
			</div>
			<div class="form">
				<div class="prompt">XP to Add</div>
				<input
					type="number"
					on:change={(e) => {
						let parsedValue = parseInt(e.currentTarget.value);
						let newLevel = curLevel;

						let newXP = curXP + parsedValue;

						if (newXP >= maxXP) {
							newLevel = LEVEL_UP_ORDER[LEVEL_UP_ORDER.indexOf(curLevel) + 1] || curLevel;
							newXP = newXP - maxXP;
						}

						onUpdateWeaponXP(type, newXP, newLevel);

						e.currentTarget.value = '';
					}}
				/>
			</div>
			<select
				name="weapon_level"
				on:change={(e) => {
					onUpdateWeaponXP(type, 0, e.currentTarget.value);
				}}
			>
				{#each Object.keys(WEAPON_LEVEL) as level}
					<option value={WEAPON_LEVEL[level]} selected={curLevel === level}>
						{WEAPON_LEVEL_TO_LABEL[level]}</option
					>
				{/each}
			</select>
		{/each}
	</div>
	<div class="category" style:background-color={'#a178ad'}>
		{#each unlockedClasses as curClass}
			{@const curXP = classXP[curClass]?.total || 0}
			{@const maxXP = BEGINNER_CLASSES.has(curClass)
				? BEGINNER_MASTERY_REQ
				: INTERMEDIATE_CLASSES.has(curClass)
				? INTERMEDIATE_MASTERY_REQ
				: 10000}
			{@const mastered = classXP[curClass]?.level}
			<div class="label">{CLASS_TO_LABEL[curClass]}</div>
			<div class="xp-bar">
				<div
					class={`fill ${mastered ? 'mastered' : ''}`}
					style:right={`${((maxXP - curXP) / maxXP) * 100.0}%`}
				>
					<span>{`${curXP} / ${maxXP}`}</span>
				</div>
			</div>
			<div class="form">
				<div class="prompt">XP to Add</div>
				<input
					type="number"
					on:change={(e) => {
						let parsedValue = parseInt(e.currentTarget.value);

						let newXP = curXP + parsedValue;

						if (newXP >= maxXP) {
							newXP = maxXP;
						}

						onUpdateClassXP(curClass, newXP, newXP === maxXP);

						e.currentTarget.value = '';
					}}
				/>
			</div>
			<span />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		> * {
			flex: 1;
		}
		column-gap: 5px;
	}
	.category {
		background-color: thistle;
		padding: 5px;
		border-radius: 5px;

		display: grid;
		grid-template-columns: max-content 1fr max-content min-content;
		grid-auto-rows: min-content;
		gap: 5px;
	}
	.xp-bar {
		flex: 1;
		position: relative;
		z-index: 1;
		background-color: white;
		outline: 1px solid black;
		border-radius: 5px;

		.fill {
			position: absolute;
			inset: 2px;
			border-radius: 5px;
			background-color: #5ecd5f;
			z-index: -1;
			white-space: nowrap;
		}
	}
	.form {
		display: flex;
		input {
			width: 40px;
		}
	}

	.mastered.mastered {
		background-color: lightskyblue;
	}
</style>
