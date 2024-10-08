const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const sharedData = require('./sharedData')

const isDev = process.env.NODE_ENV !== 'development';

function createMainWindow() {
    const mainWindow = new BrowserWindow ({
        webPreferences: {  // Ensure that preload is inside webPreferences
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
        },
        title: 'Income Tracker',
        width: isDev ? 1000:500,
        height: 500
    });

    //Open devtools if in  dev
    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    //load into main window
    mainWindow.loadFile(path.join(__dirname, './renderer/annualReview.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}

function createMonthlyWindow(selectedMonth){
    monthlyWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
        },
        title: 'Monthly Review',
        width: 600,
        height: 400
    });

       //Open devtools if in  dev
       if(isDev){
        monthlyWindow.webContents.openDevTools();
    }

    monthlyWindow.loadFile(path.join(__dirname, './renderer/windows/monthlyReview.html'));

    
    // Once the monthly window is ready, send the selected month data
    monthlyWindow.webContents.on('did-finish-load', () => {
        monthlyWindow.webContents.send('selected-month', selectedMonth);
    });
    monthlyWindow.on('closed', () => {
        monthlyWindow = null;
    })
}

function createDailyWindow(){
    dailyWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
        },
        title: 'Daily Review',
        width: 600,
        height: 400
    });

    dailyWindow.loadFile(path.join(__dirname, './renderer/windows/dailyReview.html'))
    dailyWindow.webContents.on('did-finish-load', () => {

    })

    dailyWindow.on('closed', () => {
        dailyWindow = null;
    })
    
}


app.whenReady().then(() => {
    createMainWindow();
    
    
    // Listen for a month selection from annualReview
    ipcMain.on('open-monthly-window', (event, selectedMonth) => {
    createMonthlyWindow(selectedMonth);
    });

    ipcMain.on('open-daily-window', () => {
        createDailyWindow();
    })

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);


})

//Menu
const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit(),
                accelerator: 'Ctrl+W'
            }
        ]
    }
]
