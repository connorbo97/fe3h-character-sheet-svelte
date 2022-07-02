<script lang='ts'>
import Skills from "./skills.svelte";

import Stats from "./stats.svelte";

  export let playerStats: any;
  export let playerSkillProficiency: any;
  export let playerSkillBonus: any;
  export let onToggleSkillProficiency: any;
  export let onUpdatePlayerStats: any;
</script>

<div class="container">
	<div class="stats">
		<Stats stats={playerStats} {onUpdatePlayerStats}  />
	</div>
  <div class="skills">
    <Skills
      stats={playerStats}
      skillProficiency={playerSkillProficiency}
      skillBonus={playerSkillBonus}
      onToggleSkillProficiency={onToggleSkillProficiency}
    />
  </div>
</div>

<style lang='scss'>
	.container {
		display: grid;
		grid-template-areas:
			'stats skills rest';
		grid-template-columns: min-content 200px 1fr;
		column-gap: 5px;
	}
	.stats {
		grid-area: stats;
	}

	.skills {
		grid-area: skills;
	}

</style>

