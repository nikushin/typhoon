const { app, BrowserWindow } = require('electron');

function createWindow () {
    // Создаем окно браузера.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // и загрузить index.html приложения.
    win.loadURL('http://localhost:3000/');
    win.setMenu(null);
    win.setFullScreen(true);
}

app.whenReady().then(createWindow);
