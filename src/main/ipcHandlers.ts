import { ipcMain } from 'electron'
import {
    getOS,
    getCPU,
    getCPULoad,
    getCPUTemps,
    getCPUCurrentSpeed,
    getMem,
    getFSSize,
    getFSStats,
    getFSDisksIO,
    getFSOpenFiles,
    getFSBlockDevices,
    getNet,
    getGPU,
    getBattery,
    getProcesses,
    getMemLayout,
    getNetworkConnections,
    getWifiNetworks,
    getWifiInterfaces,
    getWifiConnections
} from './SystemSnapshot'
import { GetNvidiaGpuInfo, GetPowerDraw } from './NvidiaCli'

// Define the IPC handler mappings
const _IpcHandlers = {
    'get-os-info': getOS,
    'get-cpu-info': getCPU,
    'get-cpu-load-info': getCPULoad,
    'get-cpu-speed-info': getCPUCurrentSpeed,
    'get-cpu-temp-info': getCPUTemps,
    'get-mem-info': getMem,
    'get-mem-layout-info': getMemLayout,
    'get-fs-size': getFSSize,
    'get-fs-stats': getFSStats,
    'get-fs-disk-io': getFSDisksIO,
    'get-fs-open-files': getFSOpenFiles,
    'get-fs-block-devices': getFSBlockDevices,
    'get-net-info': getNet,
    'get-network-connections': getNetworkConnections,
    'get-wifi-networks': getWifiNetworks,
    'get-wifi-interfaces': getWifiInterfaces,
    'get-wifi-connections': getWifiConnections,
    'get-gpu-info': getGPU,
    'get-battery-info': getBattery,
    'get-processes-info': getProcesses,
    'get-nvidia-gpu-info': GetNvidiaGpuInfo,
    'get-power-draw-info': GetPowerDraw
}

export function registerIpcHandlers(): void {
    Object.entries(_IpcHandlers).forEach(([channel, handler]) => {
        ipcMain.handle(channel, async () => {
            try {
                return await handler()
            } catch (error) {
                console.error(`Error in IPC handler '${channel}':`, error)
                throw error
            }
        })
    })
}

export function unregisterIpcHandlers(): void {
    Object.keys(_IpcHandlers).forEach(channel => {
        ipcMain.removeHandler(channel)
    })
} 