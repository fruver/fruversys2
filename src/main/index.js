import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import {format as formatUrl} from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: global.MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  mainWindow.loadURL(global.MAIN_WINDOW_WEBPACK_ENTRY);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // create main BrowserWindow when electron is ready
  mainWindow = createWindow();
  // Install extensions
  if (isDevelopment) {
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map((ext) => {
      installExtension(ext).then((extName) => {
        console.log(`Added Extension: ${extName}`);
      }).catch((err) => {
        console.log(`An error ocurred: ${err}`);
      });
    });
  }
});

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});
