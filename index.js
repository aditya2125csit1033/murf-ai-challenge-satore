const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let nodeServer;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const indexPath = path.join(__dirname, 'frontend', 'build', 'index.html');

  win.loadFile(indexPath)
    .then(() => {
      console.log('✅ React frontend loaded successfully.');
    })
    .catch((err) => {
      console.error(' Error loading frontend:', err);
    });

  win.webContents.on('did-fail-load', (event, errorCode, errorDesc) => {
    console.error(`Frontend load failed: ${errorDesc} (code: ${errorCode})`);
  });

  win.on('closed', () => {
    console.log('Window closed');
  });
}

function startNodeServer() {
  const serverPath = path.join(__dirname, 'Server', 'Server.js');

  nodeServer = spawn('node', [serverPath], {
    stdio: 'inherit', // Logs from server.js will show directly in Electron console
    shell: true,
  });

  nodeServer.on('error', (err) => {
    console.error('Failed to start backend server:', err);
  });

  nodeServer.on('exit', (code) => {
    console.log(`Node server exited with code ${code}`);
  });

  console.log('Backend server started.');
}

app.whenReady().then(() => {
  startNodeServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (nodeServer) {
    nodeServer.kill();
    console.log('Backend server stopped.');
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
