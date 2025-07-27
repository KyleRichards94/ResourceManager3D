
<script lang="ts">

    import CpuInfo from './CpuInfo.svelte';
    import CoreUtilizationMatrix from './CoreUtilizationMatrix.svelte';
  // import ActiveProcesses from './components/ActiveProcesses.svelte';
</script>

<div class="container ">
  <div class="row ">
    <div class="col-md-12" style="position: relative; z-index: 20000;">
      <CpuInfo></CpuInfo>
      <CoreUtilizationMatrix />
      <!-- <ActiveProcesses></ActiveProcesses> -->
    </div>
  </div>
</div>