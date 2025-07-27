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

<div class="container d-flex flex-column">
  {#if _GpuInfo}
    <div class="row">
      <div class="col-md-6" style="height: 150px;">
        <GPUDetailedInfo
          _Controllers={_GpuInfoLayout.filter((controller) => controller.subDeviceId != null)}
          {_NvidiaGpuInfo}
          _NvidiaCard={IsNvidia()}
        />
      </div>
      <div class="col-md-6 gap-3">
        <div class=" row scanlines glass border border-dark rounded m-0 p-0">
          <p>> GPU Utilization</p>
          <div class="col-md-6">
            <PowerDraw _Interval={300} />
          </div>
          <div class="col-md-6">
            <GPUUtilization
              _Utilization={_NvidiaGpuInfo?.['utilization.gpu']}
              _VramUsed={_NvidiaGpuInfo?.['memory.used']}
              _VramTotal={_NvidiaGpuInfo?.['memory.total']}
            />
          </div>
          <div class="col-md-6">
            <TempWidget _Temp={_NvidiaGpuInfo?.['temperature.gpu']}></TempWidget>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 position-absolute" style="top:40%; height: 130%;">
            <Displays _Displays={_GpuDisplayData} />
          </div>
        </div>
      </div>
    </div>
  {:else}
    <h1>Loading GPU Info...</h1>
  {/if}
</div>

<style>
</style>
