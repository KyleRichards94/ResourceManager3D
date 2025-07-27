<script lang="ts">
  import Osciliscope from '../Osciliscopes/Osciliscope.svelte'
  import { Vector3 } from '../../../../classes/Vector3.js'
  import { onMount } from 'svelte'
  import ThreeRender from '../Three/ThreeRender.svelte'
  import ModelUrl from '../../assets/Cpu.glb?url'
  import { CpuUtilization } from '../../../../classes/SPAViewModel.js'
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

<div class="cpu-info row">
  {#if cpuInfo}
    <div class="row">
      <div class=" col-md-4">
        <!-- prettier-ignore -->
        <div class="scanlines glass border border-dark p-2 dos-box"> 
          {cpuInfo.brand} | {cpuInfo.socket}
          ───────────────────────────────
   >      Model          : {cpuInfo.model}
   >      Cores          : {cpuInfo.cores}
   >      Physical Cores : {cpuInfo.physicalCores}
   >      Speed          : {cpuInfo.speed} GHz
       
   >      l3 Cache Size  : {cpuInfo.cache.l3/1024/1024} MB
   >      Family         : {cpuInfo.family}
   >      Vendor         : {cpuInfo.vendor}
        </div>
      </div>
      <div class="col-md-8 d-flex align-items-center justify-content-center position-relative">
        <Osciliscope
          _Style="position:absolute; width:70%; height:70%; margin:40px"
          _Width={600}
          _Height={300}
          _Value={$CpuUtilization / 2}
        ></Osciliscope>
        <ThreeRender
          _Style="z-index:0;"
          _RenderHeight={290}
          _RenderWidth={290}
          _ModelUrl={ModelUrl}
          _Rotation={new Vector3(0.01, 0.002, 0.001)}
        />
      </div>
    </div>
  {:else}
    <div class="dos-box">Loading CPU information...</div>
  {/if}
</div>

<style>
  .dos-box {
    z-index: 1000;
    background-color: #1111113b;
    color: #ffffff;
    font-family: 'Share Tech Mono', monospace;
    border-radius: 4px;
    white-space: pre-wrap;
    font-size: 0.95rem;
    border-radius: 6px;
  }
</style>
