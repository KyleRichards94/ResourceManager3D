<script lang="ts">
  export let _Utilization: number = 0 // percent (0–100)
  export let _VramUsed: number = 0 // MB
  export let _VramTotal: number = 1 // MB (avoid div/0)
  $: vramPercent = Math.min((_VramUsed / _VramTotal) * 100, 100)
</script>

<div class="usage-bars">
  <div class="bar-container">
    <div class="bar-label">GPU: {_Utilization}%</div>
    <div class="bar-bg">
      <div class="bar-fill utilization" style="width: {_Utilization}%"></div>
    </div>
  </div>

  <div class="bar-container">
    <div class="bar-label">VRAM: {_VramUsed} / {_VramTotal} MB</div>
    <div class="bar-bg">
      <div class="bar-fill memory" style="width: {vramPercent}%"></div>
    </div>
  </div>
</div>

<style>
  .usage-bars {
    width: 500px;
    font-family: monospace;
    font-size: 11px;
    color: white;
  }
  .bar-container {
    margin-bottom: 10px;
  }
  .bar-label {
    margin-bottom: 2px;
  }
  .bar-bg {
    background-color: #222;
    border: 1px solid #444;
    height: 16px;
    position: relative;
    border-radius: 2px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    transition: width 0.3s ease-in-out;
  }
  .bar-fill.utilization {
    background-color: #3571b8;
  }
  .bar-fill.memory {
    background-color: lime;
  }
</style>
