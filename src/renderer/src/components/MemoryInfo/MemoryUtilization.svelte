<script lang="ts">
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

  $: usedPercent = mem.total ? ((mem.used / mem.total) * 100).toFixed(1) : 0
  $: freePercent = mem.total ? ((mem.free / mem.total) * 100).toFixed(1) : 0
  $: swapUsedPercent = mem.swaptotal ? ((mem.swapused / mem.swaptotal) * 100).toFixed(1) : 0
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
    <div class="mem-bar-container">
      <div class="mem-bar-bg">
        <div class="mem-bar-used" style="width: {Math.round((mem.used / mem.total) * 100)}%;"></div>
        <div
          class="mem-bar-free"
          style="width: {Math.round((mem.free / mem.total) * 100)}%; left: {Math.round(
            (mem.used / mem.total) * 100
          )}%;"
        ></div>
      </div>
      <div class="mem-bar-labels">
        <span class="mem-label">
          Used: {formatBytes(mem.used)}
        </span>
        <span class="mem-label">
          Free: {formatBytes(mem.free)}
        </span>
        <span class="mem-label">
          Total: {formatBytes(mem.total)}
        </span>
      </div>
    </div>
  {:else}
    <div style="color:#3399ff;font-family:'Share Tech Mono',monospace;">Loading memory usage…</div>
  {/if}
</div>

<style>
  .mem-bar-container {
    width: 80%;
    margin: 0 auto;
    padding: 18px 0 0 0;
  }
  .mem-bar-bg {
    width: 100%;
    height: 28px;
    background: #1a2332;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(30, 60, 120, 0.18);
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid #223355;
  }
  .mem-bar-used {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #3571b8 0%, #28518a 100%);
    border-radius: 8px 0 0 8px;
    box-shadow: 0 2px 8px 0 rgba(53, 113, 184, 0.18);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
  }
  .mem-bar-free {
    position: absolute;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #223355 0%, #1a2332 100%);
    border-radius: 0 8px 8px 0;
    transition:
      width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }
  .mem-bar-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1rem;
    color: #bcdcff;
    margin-top: 4px;
    padding: 0 4px;
  }

  .mem-label {
    color: #bcdcff;
    font-weight: 400;
  }
</style>
