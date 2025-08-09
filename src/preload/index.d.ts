import { ElectronAPI } from '@electron-toolkit/preload'

type UseCases = {
  getOS: () => Promise<SystemInfo.os>;
  getCPU: () => Promise<SystemInfo.cpu>;
  getCPULoad: () => Promise<SystemInfo.cpuLoad>;
  getCPUCurrentSpeed: () => Promise<SystemInfo.CpuCurrentSpeedData>;
  getCPUTemps: () => Promise<SystemInfo.CpuTemperatureData>;
  getMem: () => Promise<SystemInfo.mem>;
  getMemLayout: () => Promise<SystemInfo.memLayout>;
  getFSSize: () => Promise<SystemInfo.fs>;
  getFSStats: () => Promise<si.Systeminformation.FsStatsData>;
  getFSDisksIO: () => Promise<si.Systeminformation.DisksIoData>;
  getFSOpenFiles: () => Promise<si.Systeminformation.FsOpenFilesData[]>;
  getFSBlockDevices: () => Promise<si.Systeminformation.BlockDevicesData[]>;
  getNet: () => Promise<SystemInfo.net>;
  getGPU: () => Promise<SystemInfo.gpu>;
  getBattery: () => Promise<SystemInfo.battery>;
  getProcesses: () => Promise<SystemInfo.ProcessesData>;
  getNvidiaGpuInfo: () => Promise<{ temp: string; used: string; total: string }>;
  getPowerDraw: () => Promise<{ power: string; limit: string }>;
};

declare global {
  interface Window {
    electron: ElectronAPI & UseCases
    api: UseCases
  }
}
