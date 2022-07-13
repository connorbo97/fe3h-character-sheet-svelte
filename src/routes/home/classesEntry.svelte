<script lang="ts">
	import EquippedButton from 'src/common/equippedButton.svelte';

	import SvelteTip from 'src/common/SvelteTip.svelte';
	import UnlockedButton from 'src/common/unlockedButton.svelte';
	import { CLASS_TO_LABEL } from 'src/constants/classes';
	import { classBuilder } from 'src/textUtils';

	export let isMastered: any;
	export let isUnlocked: any;
	export let onToggleClassActive: any;
	export let onToggleEquipClass: any;
	export let targetClass: any;

	export let equippedClass: any;
</script>

<div class="container">
	<SvelteTip disabled={!isMastered}>
		<div slot="t">Mastered</div>
	</SvelteTip>
	<UnlockedButton {isUnlocked} {isMastered} onClick={() => onToggleClassActive(targetClass)} />

	<div class={`class-label`}>
		{CLASS_TO_LABEL[targetClass]}
	</div>
	<EquippedButton
		isEquipped={equippedClass !== targetClass}
		onClick={() => onToggleEquipClass(targetClass)}
		isVisible={isUnlocked}
	/>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		background-color: #eae8da;
		border: 1px solid #c9c6bb;
		border-bottom-width: 1px;

		:last-child {
			border-bottom-width: 1px;
		}
		padding: 5px;
	}
	.class-label {
		flex: 1;
		margin-left: 5px;
	}
</style>
