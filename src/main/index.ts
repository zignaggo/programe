import { app, shell, BrowserWindow, ipcMain } from 'electron'
import crypto from 'crypto'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { ADD_TIME, GET_TIMELIST } from '../store/constants'
import { getTypeConversion } from '../store/conversions'
import { store, time } from '../store'
import icon from '../../resources/icon.ico?asset'
import { exec } from 'node:child_process'
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    show: false,
    autoHideMenuBar: false,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {icon}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    resizable: false
  })

  store.set('timelist', [
    { id: '1dasdsd', type: 'hour', number: 30 },
    { id: '2dasdsd', type: 'hour', number: 30 },
    { id: '3dasdsd', type: 'hour', number: 30 },
    { id: '34dasdsd', type: 'hour', number: 30 },
    { id: '2d4534asdsd', type: 'hour', number: 30 },
    { id: '3d5345asdsd', type: 'hour', number: 30 }
  ])

  ipcMain.on('minimize', () => {
    mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize()
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  })
  ipcMain.on('close', () => {
    mainWindow.close()
  })

  ipcMain.handle(GET_TIMELIST, (_, key) => {
    return store.get(key)
  })

  ipcMain.on('program-shutdown', (_, item) => {
    const type = item.type
    const number = item.number
    const seconds = getTypeConversion(type, number)
    exec(`shutdown -s -t ${seconds}`)
  })
  ipcMain.on('unprogram-shutdown', () => {
    exec('shutdown -a')
  })

  ipcMain.on(ADD_TIME, (_, time: time) => {
    const timelist = store.get('timelist') as time[]
    if (timelist) {
      const id = crypto.randomUUID()
      timelist.push({ ...time, id })
      store.set('timelist', timelist)
      mainWindow.emit(ADD_TIME, { saved: true })
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
