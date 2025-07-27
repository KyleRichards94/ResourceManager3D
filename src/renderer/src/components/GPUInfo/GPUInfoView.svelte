<script lang="ts">
  import { onMount } from 'svelte'
  import type { SystemInfo } from 'systeminformation'
  import TempWidget from './TempWidget.svelte'
  import Displays from './Displays.svelte'
  import GPUDetailedInfo from './GPUDetailedInfo.svelte'
  import GPUUtilization from './GPUUtilization.svelte'
  import PowerDraw from './PowerDraw.svelte'

  let _GpuInfo: SystemInfo['GraphicsData'] | null = null
  let _GpuInfoLayout: SystemInfo['GraphicsControllerData'][] | null = null
  let _GpuDisplayData: SystemInfo['GraphicsDisplayData'][] | null = null

  let _NvidiaGpuInfo: Record<string, string> | null = null

  onMount(async () => {
    await window.api
      .getGPU()
      .then((info) => {
        _GpuInfo = info
        _GpuInfoLayout = info.controllers
        _GpuDisplayData = info.displays
      })
      .catch((error) => {
        console.error('Error fetching GPU info:', error)
      })

    if (IsNvidia()) {
      setInterval(async () => {
        try {
          await window.api.getNvidiaGpuInfo().then((info) => {
            _NvidiaGpuInfo = info
          })
        } catch (err) {
          console.error('Failed to fetch NVIDIA CLI info:', err)
        }
      }, 1000)
    }
  })

  function IsNvidia(): boolean {
    return getPrimaryGpu()?.vendor?.toLowerCase().includes('nvidia')
  }

  function getPrimaryGpu(): SystemInfo['GraphicsControllerData'] | null {
    return _GpuInfoLayout.filter((controller) => controller.subDeviceId != null)?.[0]
  }
</script>

{#if _GpuInfo}
  <div class="container d-flex flex-column w-100 h-100">
    <div class="row w-100 h-100">
      <div class="col-md-6 p-0">
        <GPUDetailedInfo
          _Controllers={_GpuInfoLayout.filter((controller) => controller.subDeviceId != null)}
          {_NvidiaGpuInfo}
          _NvidiaCard={IsNvidia()}
        />
      </div>
      <div class="col-md-6 p-0">
        <div class=" row scanlines glass border border-dark rounded">
          <div class="col-md-12">
            <PowerDraw />
          </div>
          <div class="col-md-12">
            <GPUUtilization
              _Utilization={_NvidiaGpuInfo?.['utilization.gpu']}
              _VramUsed={_NvidiaGpuInfo?.['memory.used']}
              _VramTotal={_NvidiaGpuInfo?.['memory.total']}
            />
          </div>
          <div class="col-md-12 text-center"><h3></h3></div>
          <div class="col-md-12">
            <TempWidget _Temp={_NvidiaGpuInfo?.['temperature.gpu']}></TempWidget>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row p-0">
    <div
      class="col-md-12 position-absolute glass w-100 p-0 align-content-center justify-content-center"
      style="bottom:43%; left:0; width: 100%;"
    >
      <Displays _Displays={_GpuDisplayData} />
    </div>
  </div>
{:else}
  <h1>Loading GPU Info...</h1>
{/if}

<style>
</style>
