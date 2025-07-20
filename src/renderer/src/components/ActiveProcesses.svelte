<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Grid ,Willow} from "wx-svelte-grid";

  let data: any[] = [];
  let _IntervalId: number;

  const columns = [
    { id: "pid", name: "PID", width: 50 },
    { id: "name", header: "Process Name"  },
    { id: "cpuU", header: "CPU Usage (%)",sort: true  },
    { id: "memU", header: "Memory Usage (MB)",sort: true  }
  ];

  async function fetchProcessData(): Promise<any[]> {
    try {
      const _Processes = await window.api.getProcesses();
      return _Processes.list.map((process) => ({
        pid: process.pid,
        name: process.name,
        cpuU: process.cpu.toFixed(2),
        memU: ((process.mem) * 1024 * 1024).toFixed(2)
      }));
    } catch (err) {
      console.error('Failed to fetch processes:', err);
      return [];
    }
  }

  // Called by the wx-svelte-grid init hook
  const init = async (api) => {
    const initialData = await fetchProcessData();
    data = initialData;
    api.setNext(data);

    _IntervalId = setInterval(async () => {
      const updatedData = await fetchProcessData();
      data = updatedData;
      api.setNext(data); // this triggers a live update
    }, 1500);
  };

  onDestroy(() => {
    clearInterval(_IntervalId);
  });
</script>

<Willow>
  <Grid {data} {columns} {init} />
</Willow>
