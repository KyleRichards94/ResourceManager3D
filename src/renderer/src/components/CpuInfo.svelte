<script lang="ts">
  import { onMount } from 'svelte'
  // eslint-disable-next-line no-undef
  let cpuInfo: SystemInfo['cpu'] | null = null

  onMount(async () => {
    await window.api
      .getCPU()
      .then((info) => {
        cpuInfo = info
      })
      .catch((error) => {
        console.error('Error fetching CPU info:', error)
      })
  })
</script>

<div class="cpu-info">
  {#if cpuInfo}
    <h2>{cpuInfo.brand} | {cpuInfo.socket}</h2>
    <div class="container ">
      <div class="row row-cols-2">
        <div class="col">
          <p><strong>Model:</strong> {cpuInfo.model}</p>
          <p><strong>Cores:</strong> {cpuInfo.cores}</p>
            <p><strong>Physical Cores:</strong> {cpuInfo.physicalCores}</p>
          <p><strong>Threads:</strong> {cpuInfo.threads}</p>
          <p><strong>Speed:</strong> {cpuInfo.speed} GHz</p>
        </div>
        <div class="col">
          <p><strong>Cache Size:</strong> {cpuInfo.cacheSize} MB</p>
          <p><strong>Family:</strong> {cpuInfo.family}</p>
          <p><strong>Vendor:</strong> {cpuInfo.vendor}</p>
        </div>
      </div>
    </div>

  {:else}
    <p>Loading CPU information...</p>
  {/if}

</div>
