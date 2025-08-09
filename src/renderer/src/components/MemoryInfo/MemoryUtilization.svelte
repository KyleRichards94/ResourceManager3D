<script lang="ts">
  import BarGraph from './../Shared/BarGraph.svelte'
  import { onMount, onDestroy } from 'svelte'
  import FlowerOsciliscope from '../Osciliscopes/FlowerOsciliscope.svelte'

  const summaryFields = [
    { key: 'total', label: 'Total' },
    { key: 'swaptotal', label: 'Swap' },
    { key: 'buffers', label: 'Buf' },
    { key: 'cached', label: 'Cache' },
    { key: 'slab', label: 'Slab' },
    { key: 'reclaimable', label: 'Rec' }
  ]

  let mem = {
    total: 0,
    free: 0,
    used: 0,
    active: 0,
    available: 0,
    buffcache: 0,
    buffers: 0,
    cached: 0,
    slab: 0,
    reclaimable: 0,
    swaptotal: 0,
    swapused: 0,
    swapfree: 0,
    writeback: 0,
    dirty: 0
  }
  let memLayout: SystemInfo.memLayout[] = []

  let interval

  async function fetchMem() {
    if (window.api && window.api.getMem) {
      const data = await window.api.getMem()
      mem = data
    }
  }

  async function fetchMemLayout() {
    if (window.api && window.api.getMemLayout) {
      const data = await window.api.getMemLayout()
      memLayout = data
    }
  }

  onMount(() => {
    fetchMemLayout()
    fetchMem()
    interval = setInterval(fetchMem, 1000)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  function formatBytes(bytes) {
    if (bytes === null || bytes === undefined) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
  }

  const _ByteToGBConversion: number = 1073741824
  function toGB(bytes: number): number {
    return Math.round(bytes / _ByteToGBConversion)
  }

  $: usedPercent = mem.total ? ((mem.used / mem.total) * 100).toFixed(1) : 0
  $: freePercent = mem.total ? ((mem.free / mem.total) * 100).toFixed(1) : 0
  $: swapUsedPercent = mem.swaptotal ? ((mem.swapused / mem.swaptotal) * 100).toFixed(1) : 0
  $: usedGB = toGB(mem.used)
  $: totalGB = toGB(mem.total)
</script>

<div class="row d-flex h-100 d-block p-3">
  <div class="col-md-8">
    <div class="scanlines glass border border-dark p-2 dos-box">
      {#if memLayout?.length}
        <table class="mem-table">
          <thead>
            <tr>
              <th>Property</th>
              {#each memLayout as s, i}
                <th>Module {i + 1}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Size</td>
              {#each memLayout as s}
                <td>|{formatBytes(s.size)}</td>
              {/each}
            </tr>
            <tr>
              <td>Bank</td>
              {#each memLayout as s}
                <td>|{s.bank}</td>
              {/each}
            </tr>
            <tr>
              <td>Type</td>
              {#each memLayout as s}
                <td>|{s.type}</td>
              {/each}
            </tr>
            <tr>
              <td>Form Factor</td>
              {#each memLayout as s}
                <td>|{s.formFactor}</td>
              {/each}
            </tr>
            <tr>
              <td>Clock Speed</td>
              {#each memLayout as s}
                <td>|{s.clockSpeed ? s.clockSpeed + ' MHz' : '-'}</td>
              {/each}
            </tr>
            <tr>
              <td>ECC</td>
              {#each memLayout as s}
                <td>|{s.ecc == null ? '-' : s.ecc ? 'Yes' : 'No'}</td>
              {/each}
            </tr>
            <tr>
              <td>Manufacturer</td>
              {#each memLayout as s}
                <td>|{s.manufacturer || '-'}</td>
              {/each}
            </tr>
            <!-- <tr>
                  <td>Part #</td>
                  {#each memLayout as s}
                    <td>{s.partNum}</td>
                  {/each}
                </tr> -->
            <tr>
              <td>Voltage (Cfg)</td>
              {#each memLayout as s}
                <td>|{s.voltageConfigured != null ? s.voltageConfigured + ' V' : '-'}</td>
              {/each}
            </tr>
            <tr>
              <td>Voltage (Min)</td>
              {#each memLayout as s}
                <td>|{s.voltageMin != null ? s.voltageMin + ' V' : '-'}</td>
              {/each}
            </tr>
            <tr>
              <td>Voltage (Max)</td>
              {#each memLayout as s}
                <td>|{s.voltageMax != null ? s.voltageMax + ' V' : '-'}</td>
              {/each}
            </tr>
          </tbody>
        </table>
      {:else}
        Loading memory information…
      {/if}

      {#if mem}
        <div class="mem-summary">
          {#each summaryFields as f}
            <span class="badge">
              {f.label}: {formatBytes(mem[f.key])}
            </span>
          {/each}
        </div>
      {:else}
        Loading…
      {/if}
    </div>
  </div>
  <div class="col-md-4 d-flex justify-content-center align-items-center">
    <div>
      {#if mem}
        <FlowerOsciliscope _Class="col" _Width={500} _Height={355} _Value={usedPercent}
        ></FlowerOsciliscope>
      {/if}
    </div>
  </div>
</div>

<div
  class="row position-absolute scanlines glass border border-dark w-100 p-3"
  style="bottom: 200px; left:12px; width: 100%;"
>
  {#if mem}
    <BarGraph used={usedGB} total={totalGB} showLabels={true} delimeter="GB"></BarGraph>
  {:else}
    <div style="color:#3399ff;font-family:'Share Tech Mono',monospace;">Loading memory usage…</div>
  {/if}
</div>
