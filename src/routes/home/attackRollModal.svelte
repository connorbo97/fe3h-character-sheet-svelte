<script lang="ts">
	import { CRESTS_TO_FEATURES } from 'src/constants/crests';
	import { Dice } from 'src/constants/dice';
	import { copyToClipboard, printCalc, rollCalc, rollDice, rollVisualDice } from 'src/utils';

	export let playerName: any;

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

	let critRoll: any = 0;

	let crestRoll: any = 0;

	$: crestActivated = crestRoll >= crestDC;
	$: crestDoesDamage = crestDamage.length || crestCombatArtDamageModifier > 1;

	$: prefixedAttackCalc = printCalc(attackCalc, true);

	const onAttackRoll = async () => {
		attackRoll = await rollVisualDice([Dice.d20], {
			clearTimeout: 250,
			disableResultBox: true
		}).then((res: any) => res.value);
		attackMod = rollCalc(attackCalc);
	};
	const onDamageRoll = () => {
		damageRoll = rollCalc(damageCalc);
	};
	const onCritRoll = async () => {
		critRoll = await rollVisualDice([Dice.d20], {
			clearTimeout: 250,
			disableResultBox: true
		}).then((res: any) => res.value);
	};
	$: getCrestDamageRollText = () => {
		if (crestDamage.length) {
			return printCalc(crestDamage);
		} else if (crestCombatArtDamageModifier > 1) {
			return `${crestCombatArtDamageModifier}*${printCalc(combatArtDamageBonus)}`;
		}

		return '0';
	};
	$: onCrestRoll = async () => {
		crestRoll = await rollVisualDice([Dice.d20], {
			clearTimeout: 250,
			disableResultBox: true
		}).then((res: any) => res.value);

		if (crestRoll >= crestDC) {
			if (crestDamage.length) {
				crestDamageRoll = rollCalc(crestDamage);
			} else if (crestCombatArtDamageModifier > 1) {
				crestDamageRoll = Math.round(rollCalc(combatArtDamageBonus) * crestCombatArtDamageModifier);
			}
		}

		return crestDamageRoll;
	};
	const onRollAll = async () => {
		try {
			await onAttackRoll();
			await onDamageRoll();
			await onCritRoll();
			await onCrestRoll();
		} catch (err) {
			alert('wait until all rolls have finished');
		}
	};

	$: combatArtLabel = selectedCombatArt
		? ` (${allCombatArts.fullFeatures[selectedCombatArt]?.label})`
		: '';
	$: weaponLabel = allWeapons.fullFeatures[selectedWeapon]?.label;
	$: headerLabel = `${weaponLabel}` + combatArtLabel;
	$: getDamageRollText = () => {
		const critRoll = rollDice(20);
		const crestRoll = rollDice(20);

		const critActivated = critRoll > 20 - critModifier;
		const crestActivated = critRoll > 20 - critModifier;
		const calc = `${printCalc(damageCalc)}${
			crestActivated && crestRoll >= crestDC ? `+${getCrestDamageRollText()}` : ''
		}`;
		return `/roll ${calc}${critActivated ? '+' + calc : ''}${
			crestActivated ? ` [Crest Activated [${crestRoll}]]` : ''
		}${critActivated ? ` [CRIT[${critRoll}]]` : ''} [ID${Math.floor(Math.random() * 1000000)}]`;
	};
	$: damageResultText2 = getDamageRollText();
	$: attackRollText = `&{template:atk} {{rname=[${weaponLabel}](\`${damageResultText2})}} {{mod=${
		selectedCombatArt ? allCombatArts.fullFeatures[selectedCombatArt]?.label : '+0'
	}}} {{r1=[[1d20${prefixedAttackCalc}]]}} {{normal=1}} {{charname=${playerName}}}`;
</script>

<div class="container">
	<div class="actions">
		<span> {headerLabel} </span>
		<button on:click={onRollAll}>Roll everything</button>
		<button on:click={() => copyToClipboard(attackRollText)}>Copy to clipboard</button>
	</div>
	<div class="rolls">
		<div class="attack">
			<h3>Attack Modifier</h3>
			<div class="content">{prefixedAttackCalc}</div>
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
		<div class="damage">{damageRoll}</div>
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
