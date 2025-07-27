<script lang="ts">
  import type { SystemInfo } from 'systeminformation'
  export let _Controllers: SystemInfo['GraphicsControllerData'][] | null = null
  export let _NvidiaGpuInfo: Record<string, string> | null = null
  export let _NvidiaCard = false

  let _Controller = _Controllers?.[0]

  function fallback(cliValue: string | undefined, sysValue: any): string {
    return cliValue ?? sysValue ?? 'N/A'
  }
</script>

<!-- prettier-ignore -->
<div class="scanlines glass border border-dark m-0 p-2 dos-box">
  {_Controller.vendor} | {_Controller.bus}
  ───────────────────────────────────────────
  >  Model            : {_Controller.model}
  >  VRAM             : {_Controller.vram ? _Controller.vram / 1000 + ' GB' : 'N/A'}
  >  VRAM Dynamic     : {_Controller.vramDynamic ? 'Yes' : 'No'}
  >  External         : {_Controller.external ? 'Yes' : 'No'}
  >  SubDevice ID     : {_Controller.subDeviceId ?? 'N/A'}
  >  Driver Version   : {_NvidiaCard
    ? `${fallback(_NvidiaGpuInfo?.driver_version, _Controller.driverVersion)}`
    : `${_Controller.driverVersion ?? 'N/A'}`}
  >  Fan Speed        : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["fan.speed"], _Controller.fanSpeed)} RPM`
      : `${_Controller.fanSpeed ?? 'N/A'} RPM`}
  >  Memory Total     : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["memory.total"], _Controller.memoryTotal)} MB`
      : `${_Controller.memoryTotal ?? 'N/A'} MB`}
  >  Memory Used      : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["memory.used"], _Controller.memoryUsed)} MB`
      : `${_Controller.memoryUsed ?? 'N/A'} MB`}
  >  Memory Free      : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["memory.free"], _Controller.memoryFree)} MB`
      : `${_Controller.memoryFree ?? 'N/A'} MB`}
  >  GPU Utilization  : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["utilization.gpu"], _Controller.utilizationGpu)}%`
      : `${_Controller.utilizationGpu ?? 'N/A'}%`}
  >  VRAM Utilization : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["utilization.memory"], _Controller.utilizationMemory)}%`
      : `${_Controller.utilizationMemory ?? 'N/A'}%`}
  >  Clock (Core)     : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["clocks.gr"], _Controller.clockCore)} MHz`
      : `${_Controller.clockCore ?? 'N/A'} MHz`}
  >  Clock (Memory)   : {_NvidiaCard
      ? `${fallback(_NvidiaGpuInfo?.["clocks.mem"], _Controller.clockMemory)} MHz`
      : `${_Controller.clockMemory ?? 'N/A'} MHz`}
</div>
