<script lang='ts'>
  import { DEFAULT_PLAYER_STAT, PLAYER_STAT, PLAYER_STAT_TO_LABEL } from '../../constants'

  export let stats = DEFAULT_PLAYER_STAT

  const onPlayerStatRoll = (stat: string) => {
    const statBuff = Math.floor((stats[stat] - 10) / 2);
    const rng = Math.floor(Math.random() * 20 + 1)
    const result = rng + statBuff
    alert(`${result} = ${rng} + ${statBuff}`);
  }

</script>

<div class="container">
	{#each Object.keys(stats) as stat}
		<div class="stat-container">
      <button class='label' on:click={() => onPlayerStatRoll(stat)}>{PLAYER_STAT_TO_LABEL[stat]}</button>
      <span class='value'>{stats[stat] || 0}</span>
    </div>
	{/each}
</div>

<style lang="scss">

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    min-height: 100vh;
    row-gap: 20px;
    background-color: blue;

    padding: 10px;

    width: min-content;
  }
  .stat-container {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    background-color: white;

    text-align: center;

    padding: 5px;
    border-radius: 5px;
    
    button {
      border: 0;
      padding: 0;
      background-color: transparent;
      &:hover {
        color: red
      }
    }
  }
</style>