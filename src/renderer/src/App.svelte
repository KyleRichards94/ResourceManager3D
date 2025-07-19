
<script lang="ts">
	import CPURender from './components/CPURender.svelte';
  import CpuInfo from './components/CpuInfo.svelte';
  import CoreUtilizationMatrix from './components/CoreUtilizationMatrix.svelte';
  import ActiveProcesses from './components/ActiveProcesses.svelte';

</script>

<div class="container">

  <div class="row">
    <div class="col-md-12" style="position: relative; z-index: 20000;">
      <CpuInfo></CpuInfo>
      <CoreUtilizationMatrix />

      <ActiveProcesses></ActiveProcesses>
    </div>
  </div>
  <CPURender></CPURender>
    
</div>
