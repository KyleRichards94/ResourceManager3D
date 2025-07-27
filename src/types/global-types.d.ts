import * as si from 'systeminformation';

interface systemInfo {
  os: si.Systeminformation.OsData;
  cpu: si.Systeminformation.CpuData;
  cpuLoad: si.Systeminformation.CurrentLoadData;
  cpuTemps: si.Systeminformation.CpuTemperatureData;
  cpuSpeed: si.Systeminformation.CpuCurrentSpeedData;
  mem: si.Systeminformation.MemData;
  fs: si.Systeminformation.FsSizeData[];
  net: si.Systeminformation.NetworkStatsData[];
  gpu: si.Systeminformation.GraphicsData;
  battery: si.Systeminformation.BatteryData;
  processes: si.Systeminformation.ProcessesData;
}

declare global {
  type SystemInfo = systemInfo;
}

//TODO delete this slop
