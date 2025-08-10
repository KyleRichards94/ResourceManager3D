<script lang="ts">
  import NetWorkInfoView from './components/NetWorkInfo/NetWorkInfoView.svelte'
  import FileSystemView from './components/FileSystemInfo/FileSystemView.svelte'
  import { CurrentView, Views } from '../../classes/SPAViewModel.js'
  import CpuInfoMenu from './components/CPUInfo/CpuInfoView.svelte'
  import MenuCarousel from './components/MenuItems.svelte'
  import ActiveProcesses from './components/TsakManager/ActiveProcesses.svelte'
  import MemoryUtilization from './components/MemoryInfo/MemoryUtilization.svelte'
  import GPUInfoView from './components/GPUInfo/GPUInfoView.svelte'
</script>

<div
  class="container-fluid d-flex flex-column"
  style="height: 100vh; width:100vw; overflow: hidden;"
>
  <div class="flex-grow-1 overflow-auto mt-3">
    {#if $CurrentView === Views.Main}
      <h3>Main lol</h3>
    {:else if $CurrentView === Views.CpuInfo}
      <div class="container">
        <div class="row">
          <CpuInfoMenu />
        </div>
      </div>
      <!-- {:else if $CurrentView === Views.TaskManager}
      <div class="container">
        <ActiveProcesses />
      </div> -->
    {:else if $CurrentView === Views.MemoryInfo}
      <div class="container">
        <div class="row">
          <MemoryUtilization />
        </div>
      </div>
    {:else if $CurrentView === Views.GPUInfo}
      <div class="container">
        <div class="row">
          <GPUInfoView />
        </div>
      </div>
    {:else if $CurrentView === Views.DiskInfo}
      <div class="container">
        <div class="row">
          <FileSystemView />
        </div>
      </div>
    {:else if $CurrentView === Views.NetworkInfo}
      <div class="row">
        <NetWorkInfoView />
      </div>
    {/if}
  </div>

  <div class="row d-block">
    <MenuCarousel />
  </div>
</div>
