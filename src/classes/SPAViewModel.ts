import { writable } from "svelte/store";

export enum Views {
    Main = "Main",
    CpuInfo = "CpuInfo",
    TaskManager = "TaskManager",
    MemoryInfo = "MemoryInfo",
    GPUInfo = "GPUInfo",
    DiskInfo = "DiskInfo",
    NetworkInfo = "NetworkInfo",
    BatteryInfo = "BatteryInfo",
}

export const CurrentView = writable<Views>(Views.CpuInfo);
export const CpuUtilization = writable<number>(0);
export const ByteToGBConversion: number = 1073741824
export function toGB(bytes: number): number {
    return Math.round(bytes / ByteToGBConversion)
}
