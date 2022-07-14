<script lang="ts">
	import { WEAPON_TYPES_TO_LEVEL_FEATURES } from 'src/constants/weaponLevel';
	import { getLevelUpDescription } from 'src/descriptionUtils';

	export let type: any;
	export let level: any;
	export let disablePickOne: any = false;
</script>

<div class="container">
	<div><u>{disablePickOne ? 'Always ' : ''}Unlocks</u></div>
	<div>
		{getLevelUpDescription(WEAPON_TYPES_TO_LEVEL_FEATURES[type]?.[level], disablePickOne)}
	</div>
</div>

<style lang="scss">
</style>
