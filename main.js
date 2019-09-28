const {app, BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

// dotenv set .env
require('dotenv').config();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

if (process.env.NODE_ENV === 'development') {
  // Adds useful debug features to your Electron app
  const debug = require('electron-debug');
  debug();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => {
      installer.default(installer[name], forceDownload);
    })
  ).catch(() => console.log());
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async() => {
  // Install extensions
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 600
  });


  const pathIndex = url.format({
    pathname: path.join(__dirname, 'public', 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  // and load the index.html of the app;
  mainWindow.loadURL(pathIndex);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

});