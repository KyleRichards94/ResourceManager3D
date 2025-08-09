<script lang="ts">
  export let total: number
  export let used: number
  export let delimeter: string = ''
  export let showLabels: boolean = false

  $: usedPercent = Math.round((used / total) * 100)
  $: freePercent = Math.round(((total - used) / total) * 100)
</script>

<div class="mem-bar-container">
  <div class="mem-bar-bg">
    <div class="mem-bar-used" style="width: {usedPercent}%;"></div>
    <div class="mem-bar-free" style="width: {freePercent}%; left: {usedPercent}%;"></div>
  </div>

  {#if showLabels}
    <div class="mem-bar-labels">
      <span class="mem-label">Used: {used.toFixed(2)}{delimeter}</span>
      <span class="mem-label">Free: {(total - used).toFixed(2)}{delimeter}</span>
      <span class="mem-label">Total: {total.toFixed(2)}{delimeter}</span>
    </div>
  {/if}
</div>
