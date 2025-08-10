<script lang="ts">
  export let total: number
  export let used: number
  export let delimeter: string = ''
  export let showLabels: boolean = false
  export let usedLabel: string | null = 'Used'
  export let freeLabel: string | null = 'Free'
  export let totalLabel: string | null = 'Total'

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
      {#if usedLabel}
        <span class="mem-label">{usedLabel}: {used.toFixed(2)}{delimeter}</span>
      {/if}
      {#if freeLabel}
        <span class="mem-label">{freeLabel}: {(total - used).toFixed(2)}{delimeter}</span>
      {/if}
      {#if totalLabel}
        <span class="mem-label">{totalLabel}: {total.toFixed(2)}{delimeter}</span>
      {/if}
    </div>
  {/if}
</div>
