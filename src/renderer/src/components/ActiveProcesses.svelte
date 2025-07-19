<script lang="ts">
import { onMount } from 'svelte'

// eslint-disable-next-line no-undef
let processess: SystemInfo['processes'] | null = null;

onMount(async () => {
   await window.api.getProcesses()
      .then((processes) => {
        processess = processes;
        console.log('Active Processes:', processes);
            console.log('Active Processes:', processes.list);
      })
      .catch((error) => {
        console.error('Error fetching processes info:', error);
      });
  setInterval(async () => {
    await window.api.getProcesses()
      .then((processes) => {
        processess = processes;
        console.log('Active Processes:', processes);
            console.log('Active Processes:', processes.list);
      })
      .catch((error) => {
        console.error('Error fetching processes info:', error);
      });
  }, 10000); // Update every second
});
</script>

{#if processess}
    <div class="container">
    <div class="row">
        <div class="col-md-12">
        <h3>Active Processes</h3>
        <table class="table table-striped">
            <thead class="sticky">
            <tr>
                <th>PID</th>
                <th>Name</th>
                <th>CPU Usage (%)</th>
                <th>Memory Usage (MB)</th>
            </tr>
            </thead>
            <tbody>
            {#each processess.list.sort((a,b) => b.mem - a.mem) as process (process.pid)}
            <tr>
                <td>{process.pid}</td>
                <td>{process.name}</td>
                <td>{process.cpuu}%</td>
                <td>{(process.mem*1024).toFixed(2)}</td>
            </tr>
            {/each}
            </tbody>
        </table>
        </div>
    </div>
    </div>
{/if}