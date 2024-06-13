const { app, BrowserWindow } = require('electron');
// const { screen } = require('electron').remote;
const path = require('path');

function createWindow () {
    // 获取主显示器的尺寸
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    icon: path.join(__dirname, '/logo.png'), // 指定图标路径
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      devTools: true
    },
        // 隐藏菜单栏
        menuBarVisibility: 'hidden',
        // 隐藏标题栏
        titleBarStyle: 'hidden'
  });

  mainWindow.loadURL('http://localhost:3000');
}

app.on('ready', () => {
  createWindow();

  // // 在 macOS 上实现 applicationSupportsSecureRestorableState 方法
  // if (process.platform === 'darwin') {
  //   const { systemPreferences } = require('electron');
  //   systemPreferences.setUserDefault('applicationSupportsSecureRestorableState', true);
  // }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
