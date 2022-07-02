<script lang='ts'>

  export let fullSheet: any;
  export let playerName: any;
  export let onUpdatePlayerName: any;
  
  const download = (content:any, fileName: any, contentType:any) => {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  const onExportSheet = () => {
    try {
      download(JSON.stringify(fullSheet), `${fullSheet.playerName}-fe3h.json`, 'text/plain');
    } catch(err) {
      alert('Failed to export sheet, see console');
      console.error(err);
    }
  }
</script>

<div class="container">
  <textarea type="text" class="name" value={playerName} rows='3' on:input={(e) => onUpdatePlayerName(e.currentTarget.value || '')} />  
  
  <button>Page Placeholder</button>
  <button>Page Placeholder</button>
  <button>Page Placeholder</button>
  <button on:click={onExportSheet}>Export Sheet</button>
  
</div>

<style lang='scss'>
  .container {
    height: 50px;

    display: flex;
    justify-content: space-between;

    column-gap: 10px;
  }

  .name {
    flex: 1;
  }
</style>

