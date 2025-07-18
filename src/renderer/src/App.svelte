<script lang="ts">
  import { onMount } from 'svelte';
  let sysInfo: unknown = {};

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function fetchInfo() {
    sysInfo = await window.api.getSystemInfo();
  }

  onMount(() => {
    fetchInfo()
  })
</script>

<div class="container">
  <pre>{JSON.stringify(sysInfo, null, 2)}</pre>
</div>

