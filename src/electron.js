const {app, BrowserWindow} = require('electron');

createWindow = () => {
    let win = new BrowserWindow({ width: 800, height: 600,frame:true, webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      } })

    win.loadURL("http://localhost:3000");
}

app.on('ready', createWindow);