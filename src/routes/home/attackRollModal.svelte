<script lang="ts">
	import { CRESTS_TO_FEATURES } from 'src/constants/crests';
	import { Dice } from 'src/constants/dice';
	import { printCalc, rollCalc, rollDice } from 'src/utils';

	export let allWeapons: any;
	export let allCombatArts: any;

	export let attackCalc: any;
	export let damageCalc: any;
	export let critModifier: any;

	export let combatArtDamageBonus: any;

	export let crestType: any;
	export let crestDC: any;
	export let crestDamage: any;
	export let crestCombatArtDamageModifier: any;

	export let selectedWeapon: any;
	export let selectedCombatArt: any;

	let crestSuccess: boolean = false;

	let attackRoll: any = 0;
	let attackMod: any = 0;

	let damageRoll: any = 0;
	let crestDamageRoll: any = 0;
	$: damageRollText = damageRoll;

	let critRoll: any = 0;

	let crestRoll: any = 0;

	$: crestActivated = crestRoll >= crestDC;
	$: crestDoesDamage = crestDamage.length || crestCombatArtDamageModifier > 1;

	const onAttackRoll = () => {
		attackRoll = rollDice(20);
		attackMod = rollCalc(attackCalc);
	};
	const onDamageRoll = () => {
		damageRoll = rollCalc(damageCalc);
	};
	const onCritRoll = () => {
		critRoll = rollDice(20);
	};
	$: onCrestRoll = () => {
		crestRoll = rollDice(20);

		if (crestRoll >= crestDC) {
			if (crestDamage.length) {
				crestDamageRoll = rollCalc(crestDamage);
			} else if (crestCombatArtDamageModifier > 1) {
				crestDamageRoll = Math.round(rollCalc(combatArtDamageBonus) * crestCombatArtDamageModifier);
			}
		}
	};
	const onRollAll = () => {
		onAttackRoll();
		onDamageRoll();
		onCritRoll();
		onCrestRoll();
	};
</script>

<div class="container">
	<div class="actions">
		<span>
			{allWeapons.fullFeatures[selectedWeapon].label}
			{#if selectedCombatArt}
				<span> ({allCombatArts.fullFeatures[selectedCombatArt].label})</span>
			{/if}
		</span>
		<button on:click={onRollAll}>Roll everything</button>
		<button>Copy to clipboard</button>
	</div>
	<div class="rolls">
		<div class="attack">
			<h3>Attack Modifier</h3>
			<div class="content">{printCalc(attackCalc)}</div>
			<button on:click={onAttackRoll}>Roll</button>
		</div>
		<div class="damage">
			<h3>Damage</h3>
			<div class="content">
				{printCalc(damageCalc)}
				{#if crestSuccess && crestDamage}
					<span>+ crestDamage</span>
				{/if}
			</div>
			<button on:click={onDamageRoll}>Roll</button>
		</div>
		<div class="crit">
			<h3>Crit Range</h3>
			<div class="content">
				{#if critModifier < 0}
					<span>Can't Crit</span>
				{/if}
				{#if critModifier >= 0}
					<span>{20 - critModifier} - 20</span>
				{/if}
				<button on:click={onCritRoll}>Roll</button>
			</div>
		</div>
		<div class="crest">
			<h3>Crest</h3>
			<div class="content">
				{#if crestDC && crestDC <= 20}
					<span>DC {crestDC}</span>
				{/if}
				<button on:click={onCrestRoll}>Roll</button>
			</div>
		</div>
	</div>
	<div class="result">
		<div class="attack" title={`${attackRoll} + ${attackMod}`}>{attackRoll + attackMod}</div>
		<div class="damage">{damageRollText}</div>
		<div class="crit">{critRoll >= 20 - critModifier ? 'CRIT' : 'Normal'} ({critRoll})</div>
		<div class="crest">
			{crestActivated ? 'ACTIVATED' : 'Normal'} ({crestRoll})
			{#if crestActivated}
				{#if crestType && !crestDoesDamage}<span class="description"
						>{CRESTS_TO_FEATURES[crestType]?.description}</span
					>{/if}
				{#if crestDoesDamage && crestDamageRoll}
					+ {crestDamageRoll} damage
				{/if}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		padding: 5px;
		h3 {
			margin: 0;
		}
	}
	.rolls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: bisque;
		border-radius: 5px;
		> * {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 5px;
			flex: 1;
			padding: 5px;
			&:not(:last-child) {
				border-right: 1px solid black;
			}
		}
	}
	.result {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: lightyellow;
		> * {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 10px;
			&:not(:last-child) {
				border-right: 1px solid black;
			}

			min-height: 50px;
		}

		.crest {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			row-gap: 5px;

			text-align: center;
			.description {
				font-size: 12px;
			}
		}
	}
</style>
