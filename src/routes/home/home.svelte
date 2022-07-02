<script lang='ts'>
import Classes from "./classes.svelte";

import CombatStats from "./combatStats.svelte";

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
		<CombatStats stats={playerStats}/>
  </div>
	<div class="rest">
		<Classes />
	</div>
</div>

<style lang='scss'>
	.container {
		display: grid;
		grid-template-areas:
			'stats skills rest';
		grid-template-columns: min-content 210px 1fr;
		column-gap: 5px;

		height: 100%;
	}
	.stats {
		grid-area: stats;
	}

	.skills {
		grid-area: skills;
		display:flex;
		flex-direction: column;
		row-gap: 5px;
	}

</style>

