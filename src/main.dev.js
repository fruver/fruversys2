const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

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
  // if (process.env.NODE_ENV === 'development') {
  //   await installExtensions();
  // }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 600
  });

  // and load the index.html of the app;
  let indexPath;

  if (process.env.NODE_ENV !== 'development') {
    indexPath = url.format({
      protocol: 'http',
      host: 'localhost:9001'
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'app', 'index.html'),
      slashes: true
    });
  }

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (process.env.NODE_ENV === 'development') {
      let contents = mainWindow.webContents;
      console.log(contents)
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

});
