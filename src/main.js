const { app, BrowserWindow, Tray, Menu } = require('electron')

const path = require('path')
const url = require('url')
const isDev = process.env.NODE_ENV == 'development'
if(isDev){
    require('electron-reload')(__dirname, {
        electron: require('electron-prebuilt')
    })
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 400, 
        height: 381,
        maxwidth: 400,
        maxheight: 381, 
        minwidth: 400,
        minheight: 381, 
        show: false,
        maximizable: false,
        resizable: false
    })
    let content = isDev ? 'http://localhost:3000' : url.format({
        pathname: path.join(path.dirname(__dirname), 'public/index.html'),
        protocol: 'file:',
        slashes: true
    })
    // and load the index.html of the app.
    mainWindow.loadURL(content);
    mainWindow.once('ready-to-show', () => mainWindow.show())
    if (isDev) mainWindow.webContents.openDevTools();

    let tray;
    let trayMenu = [
        {
            label: 'Show/Hide',
            click: () => {
                tray.destroy()
                tray = null
                mainWindow.show()
                mainWindow.setMaximizable(false)
                mainWindow.setResizable(false)
            }
        },
        { role: 'quit' }
    ]
    mainWindow.on('minimize', (e) => {
        tray = new Tray(path.join(path.dirname(__dirname), 'public/tray.png'))
        tray.setToolTip('Baby Git v2')
        tray.setContextMenu(Menu.buildFromTemplate(trayMenu))
        mainWindow.hide()
        mainWindow.setMaximizable(false)
        mainWindow.setResizable(false)
    })

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
