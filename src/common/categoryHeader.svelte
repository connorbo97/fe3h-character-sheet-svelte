<script lang="ts">
	export let label: any = '';
</script>

<div class="container">
	<div class="label">
		{label}
		<slot name="content" />
	</div>
	<div class="divider" />
	<div class="divider" />
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 24px;
	}
	.label {
		color: white;
		text-shadow: 1px 1px black;
		background-image: linear-gradient(to right, #868182, 75%, transparent);
		padding: 2px;
		width: 100%;
	}
	.divider {
		margin-top: 1px;
		height: 1px;
		background-image: linear-gradient(to right, #bbb9ad, 75%, transparent);
		border-radius: 1px;
	}
</style>
