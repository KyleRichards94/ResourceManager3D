<script lang="ts">
  import { toGB } from './../../../../classes/SPAViewModel.ts'
  import BarGraph from './../Shared/BarGraph.svelte'
  import { onMount } from 'svelte'
  import type { SystemInfo } from 'systeminformation'

  let _FileSystemInfo: SystemInfo['FsSizeData'][] | null = null

  onMount(async () => {
    await window.api.getFSSize().then((info) => {
      _FileSystemInfo = info
    })
  })
</script>

<div class="container-fluid">
  <div class="row">
    {#each _FileSystemInfo as fs, index (index)}
      <div class="col-sm-4 position-relative scanlines">
        <div class="row">
          <span class="col-sm-6">Free: {toGB(fs.size - fs.used)} GB</span>
          <span class="col-sm-6">Used: {toGB(fs.used)} GB</span>
          <span class="col-sm-6">Type: {fs.type}</span>
        </div>
        <BarGraph used={toGB(fs.used)} total={toGB(fs.size)}></BarGraph>
      </div>
    {/each}
  </div>
</div>
