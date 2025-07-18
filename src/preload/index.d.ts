import { ElectronAPI } from '@electron-toolkit/preload'


type UseCases = {
  getSystemInfo: () => Promise<any>;
};

declare global {
  interface Window {
    electron: ElectronAPI & UseCases
    api: UseCases
  }
}
