<script>
  import { DEFAULT_PLAYER_STAT } from '../constants';
  import Stats from './home/stats.svelte';

  let playerStats = DEFAULT_PLAYER_STAT
  let playerName = "Default Name"

</script>

<style lang='scss'>
  // :global {
  // }
  .container {
    display: grid;
    grid-template-areas: 
    "stats main";
    grid-template-rows: min-content 1fr;
  }
  .stats{
    grid-area: stats;
  }
  
</style>

<div class="container">
  <div class="stats">
    <Stats/>
  </div>

</div>
