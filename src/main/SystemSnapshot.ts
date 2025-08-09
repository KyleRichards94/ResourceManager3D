import si from 'systeminformation'

// This file contains functions to fetch system information using the systeminformation library
// Each function returns a promise that resolves to the respective system information

export async function getOS(): Promise<si.Systeminformation.OsData> {
  return await si.osInfo();
}

export async function getCPU(): Promise<si.Systeminformation.CpuData> {
  return await si.cpu();
}

export async function getCPUTemps(): Promise<si.Systeminformation.CpuTemperatureData> {
  return await si.cpuTemperature();
}

export async function getCPUCurrentSpeed(): Promise<si.Systeminformation.CpuCurrentSpeedData> {
  return await si.cpuCurrentSpeed();
}

export async function getCPULoad(): Promise<si.Systeminformation.CurrentLoadData> {
  return await si.currentLoad(); // lightweight alternative
}

export async function getMem(): Promise<si.Systeminformation.MemData> {
  return await si.mem();
}

export async function getMemLayout(): Promise<si.Systeminformation.MemLayoutData[]> {
  return await si.memLayout();
}

export async function getFSSize(): Promise<si.Systeminformation.FsSizeData[]> {
  return await si.fsSize(); // Heavy — disk IO
}

export async function getFSStats(): Promise<si.Systeminformation.FsStatsData> {
  return await si.fsStats();
}

export async function getFSDisksIO(): Promise<si.Systeminformation.DisksIoData> {
  return await si.disksIO();
}

export async function getFSOpenFiles(): Promise<si.Systeminformation.FsOpenFilesData[]> {
  return await si.fsOpenFiles();
}

export async function getNet(): Promise<si.Systeminformation.NetworkStatsData[]> {
  return await si.networkStats(); // Heavy — networking stats
}

export async function getGPU(): Promise<si.Systeminformation.GraphicsData> {
  return await si.graphics(); // Moderate-heavy
}

export async function getBattery(): Promise<si.Systeminformation.BatteryData> {
  return await si.battery(); // Moderate
}

export async function getProcesses(): Promise<si.Systeminformation.ProcessesData> {
  return await si.processes(); // Moderate
}