import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      electronAPI
    })
    contextBridge.exposeInMainWorld('api', {
      api,
       getOS: () => ipcRenderer.invoke('get-os-info'),
       getCPU: () => ipcRenderer.invoke('get-cpu-info'),
       getCPULoad: () => ipcRenderer.invoke('get-cpu-load-info'),
       getCPUTemps: () => ipcRenderer.invoke('get-cpu-temp-info'),
       getCPUCurrentSpeed: () => ipcRenderer.invoke('get-cpu-speed-info'),
       getMem: () => ipcRenderer.invoke('get-mem-info'),
       getFS: () => ipcRenderer.invoke('get-fs-info'),
       getNet: () => ipcRenderer.invoke('get-net-info'),
       getGPU: () => ipcRenderer.invoke('get-gpu-info'),
       getBattery: () => ipcRenderer.invoke('get-battery-info'),
       getProcesses: () => ipcRenderer.invoke('get-processes-info')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
