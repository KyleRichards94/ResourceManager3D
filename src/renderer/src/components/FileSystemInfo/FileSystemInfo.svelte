<script lang="ts">
  import BarGraph from './../Shared/BarGraph.svelte'
  import { onMount } from 'svelte'
  import type { SystemInfo } from 'systeminformation'

  let _FileSystemInfo: SystemInfo['FsSizeData'][] | null = null
  const _ByteToGBConversion: number = 1073741824

  onMount(async () => {
    await window.api.getFS().then((info) => {
      _FileSystemInfo = info
    })
  })

  function toGB(bytes: number): number {
    return (bytes / _ByteToGBConversion).toFixed(2)
  }
</script>

<div class="row">
  {#each _FileSystemInfo as fs, index (index)}
    <div class="col-md-4 position-relative scanlines">
      <h3>Disk - {fs.fs}</h3>
      <p>Size: {toGB(fs.size)} GB</p>
      <p>Used: {toGB(fs.used)} GB</p>
      <p>Free: {toGB(fs.size - fs.used)} GB</p>

      <BarGraph used={fs.used} total={fs.size}></BarGraph>

      <p>Type: {fs.type}</p>
    </div>
  {/each}
</div>
