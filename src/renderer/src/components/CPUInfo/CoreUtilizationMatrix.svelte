<script lang="ts">
  import { onMount } from 'svelte'
  import {CpuUtilization} from '../../../../classes/SPAViewModel.js';

  // eslint-disable-next-line no-undef
  let cpuLoad: SystemInfo['cpuLoad'] | null = null

  onMount(async () => {
    setInterval(async () => {
        await window.api.getCPULoad()
        .then((load) => {
            cpuLoad = load
            CpuUtilization.set(cpuLoad.currentLoad.toFixed(2))
        })
        .catch((error) => {
            console.error('Error fetching CPU info:', error)
        })
    }, 1000); 
  })
</script>


{#if cpuLoad}
<div class="container">
  <div class="row w-100 text-white rounded-top p-1 w-100 bg-dark">
      <h3>Core Utilization  {cpuLoad.currentLoad.toFixed(2)}%</h3>
  </div>

  <div class="row row-cols-5 w-100">
      {#each cpuLoad?.cpus as cpu, index (index)}
      <span class="col border border-dark p-2 p-relative glass scanlines">
          <small><b>C{index + 1}</b> - {isNaN(cpu.load) ? 0 : cpu.load.toFixed(2)}%</small>
          <div class="progress-fill " style="width: {isNaN(cpu.load) ? 0 : cpu.load}%;" />
      </span>
      {/each}
  </div>
</div>
{:else}
  <p>Loading Cpu Utilization..</p>
{/if}
<style>
  


  .glassy-overlay {
    background: rgba(255, 255, 255, 0.2); /* transparent white wash */
    backdrop-filter: blur(8px);           /* blur behind it */
    -webkit-backdrop-filter: blur(8px);   /* Safari support */
    border-radius: 8px;                   /* optional polish */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* soft glow */
  }
  .cpu-util {
    border: 1 px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }

  .progress-fill {
    height: 10px;
    background-color: rgba(0, 123, 255, 0.5);
    border-radius: 5px;
    transition: width 0.6s ease-in-out;
  }
</style>
