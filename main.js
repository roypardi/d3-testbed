'use strict';

//todo: use package.json to populate values here

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const path = require('path');

var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 768,
        minWidth: 400,
        minHeight: 200,
        resizable: true,
        backgroundColor: 'green',
        center: true
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    // 
    const menuTemplate = [
        {
            label: 'template',
            submenu: [
                { role: 'about' },
                { label: 'Toggle Developer Tools', click: () => { toggleDevTools() }, accelerator: 'CmdOrCtrl+d' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }, {
            label: 'File',
            submenu: [
                { label: 'Select JSON...', click: () => { showFilePicker(); }, accelerator: 'CmdOrCtrl+o' }
            ]
        }, {
            label: "Edit",
             submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        }, {
            label: 'View',
                submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        }];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
        
    //mainWindow.maximize();
    // mainWindow.loadURL('file://' + __dirname + '/app/index.html');
    // mainWindow.loadURL('file://' + __dirname + '/app/resize.html');
    // mainWindow.loadURL('file://' + __dirname + '/app/transform.html');
    mainWindow.loadURL('file://' + __dirname + '/app/bounding2.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});

function toggleFullscreen() {
    if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
    } else {
        mainWindow.setFullScreen(true);
    }
}

function toggleDevTools() {
    if (mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.closeDevTools();
    } else {
        mainWindow.webContents.openDevTools();
    }
}

function showFilePicker() {
    var options = {
        title: "Select Image",
        properties: ['openFile'],
        filters: [
            { name: 'Images', extensions: ['jpg', 'png'] },
        ],
    }
    dialog.showOpenDialog(mainWindow, options, filePickerCallback);
}

function filePickerCallback(filenames) {
    if (filenames && filenames.length > 0) {
        mainWindow.webContents.send('file-selected', filenames[0]);
    }
}

