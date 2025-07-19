import { ElectronAPI } from '@electron-toolkit/preload'

type UseCases = {
  getOS: () => Promise<SystemInfo.os>;
  getCPU: () => Promise<SystemInfo.cpu>;
  getCPULoad: () => Promise<SystemInfo.cpuLoad>;
  getCPUCurrentSpeed: () => Promise<SystemInfo.CpuCurrentSpeedData>;
  getCPUTemps: () => Promise<SystemInfo.CpuTemperatureData>;
  getMem: () => Promise<SystemInfo.mem>;
  getFS: () => Promise<SystemInfo.fs>;
  getNet: () => Promise<SystemInfo.net>;
  getGPU: () => Promise<SystemInfo.gpu>;
  getBattery: () => Promise<SystemInfo.battery>;
  getProcesses: () => Promise<SystemInfo.ProcessesData>;
};

declare global {
  interface Window {
    electron: ElectronAPI & UseCases
    api: UseCases
  }
}
