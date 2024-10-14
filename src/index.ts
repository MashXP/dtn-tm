import {app, BrowserWindow, dialog, ipcMain} from "electron"
import path from 'node:path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() : BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    maximizable: true,
    icon: path.join(__dirname, 'res/nerd.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'main.html'));
  mainWindow.maximize()
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let window = createWindow();
  ipcMain.handle("showRevertConfirmation", (e, msg : string) => {
    let respone_indx = dialog.showMessageBoxSync(window!, {
      message: msg,
      buttons: ["Yes", "No"],
      cancelId: 1
    });
    if (respone_indx == 0) {
      return true;
    }
    return false;
  });

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
