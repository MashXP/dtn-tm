// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('DTNexposedAPI', {
  showConfirmationBox: (x) => ipcRenderer.invoke('showRevertConfirmation', x)
})