<script lang="ts">
  import BarGraph from './../Shared/BarGraph.svelte'
  import { onMount } from 'svelte'
  import type { SystemInfo } from 'systeminformation'

  let _FileSystemInfo: SystemInfo['FsSizeData'][] | null = null
  const _ByteToGBConversion: number = 1073741824

  onMount(async () => {
    await window.api.getFSSize().then((info) => {
      _FileSystemInfo = info
    })
  })

  function toGB(bytes: number): number {
    return Math.round(bytes / _ByteToGBConversion)
  }
</script>

<div class="row">
  {#each _FileSystemInfo as fs, index (index)}
    <div class="col-md-4 position-relative scanlines">
      <h3>Disk - {fs.fs}</h3>
      <div class="row">
        <span class="col-sm-6">Size: {toGB(fs.size)} GB</span>
        <span class="col-sm-6">Free: {toGB(fs.size - fs.used)} GB</span>
        <span class="col-sm-6">Used: {toGB(fs.used)} GB</span>
        <span class="col-sm-6">Type: {fs.type}</span>
      </div>

      <BarGraph used={toGB(fs.used)} total={toGB(fs.size)}></BarGraph>
    </div>
  {/each}
</div>
