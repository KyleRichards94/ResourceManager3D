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
