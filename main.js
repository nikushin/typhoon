const { app, BrowserWindow } = require('electron');

function createWindow () {
    // Создаем окно браузера.
    let win = new BrowserWindow({
        width: 1980,
        height: 1024,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // и загрузить index.html приложения.
    win.loadURL('http://localhost:3000/');
    // win.loadFile('src/index.html')
    win.setMenu(null);
    win.setFullScreen(true);
}

app.whenReady().then(createWindow);
