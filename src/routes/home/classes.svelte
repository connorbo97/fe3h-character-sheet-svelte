<script lang='ts'>
import { BEGINNER_CLASSES, CLASS, INTERMEDIATE_CLASSES } from "src/constants";

$: classSet = new Set([CLASS.MYRMIDON]);
  
</script>

<div class="container">
  <div class="category">
    Beginner
    <div class="classes-container">
      {#each Array.from(BEGINNER_CLASSES) as beginnerClass}
        <div class="class-container">
          <button class={classSet.has(beginnerClass) ? 'active' : 'not-active'}></button>
          <div class="class-label">{beginnerClass}</div>
        </div>
      {/each}
    </div>
  </div>
  <div class="category">
    Intermediate
    <div class="classes-container">
      {#each Array.from(INTERMEDIATE_CLASSES) as intermediateClass}
        <div class="class-container">
          <button class={classSet.has(intermediateClass) ? 'active' : 'not-active'}></button>
          <div class="class-label">{intermediateClass}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang='scss'>
  .container {
    display: flex;
    flex-direction: column;

    background-color: teal;
    padding: 10px;
    border-radius: 5px;

    row-gap: 5px;

  }

  .classes-container {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
  .class-container {
    display: flex;
  }

  .active {
    background-color: blue;
  }
</style>

