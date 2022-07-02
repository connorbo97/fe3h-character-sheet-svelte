<script lang='ts'>

  export let playerName: any;
  export let onUpdatePlayerName: any;
  
  
</script>

<div class="container">
  <textarea type="text" class="name" value={playerName} rows='3' on:input={(e) => onUpdatePlayerName(e.currentTarget.value || '')} />  
  
</div>

<style lang='scss'>
  .container {
    height: 50px;

    display: flex;
    justify-content: space-between;

    column-gap: 10px;
  }
</style>

