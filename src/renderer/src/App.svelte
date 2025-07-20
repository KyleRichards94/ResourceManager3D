
<script lang="ts">
	import { CurrentView, Views } from '../../classes/SPAViewModel.js';
  import CpuInfoMenu from './components/CpuInfoView.svelte';
	import MenuCarousel from './components/MenuItems.svelte';
  // import ActiveProcesses from './components/ActiveProcesses.svelte';

</script>

<div class="container-fluid d-flex flex-column" style="height: 100vh; width:100vw; overflow: hidden;">
  <!-- Top (scrollable) content -->
  <div class="flex-grow-1 overflow-auto mt-3">
    {#if $CurrentView === Views.Main}
      <h3>Main lol</h3>

    {:else if $CurrentView === Views.CpuInfo}
      <div class="container">
        <div class="row">
          <CpuInfoMenu />
        </div>
      </div>

    {:else if $CurrentView === Views.TaskManager}
      <div class="container">
        <!-- Task manager content -->
      </div>
    {/if}
  </div>

  <!-- Bottom fixed menu -->
  <div class="row d-block">
    <MenuCarousel />
  </div>
</div>