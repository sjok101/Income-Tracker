const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openMonthlyWindow: (selectedMonth) => ipcRenderer.send('open-monthly-window', selectedMonth),
    openDailyWindow: () => ipcRenderer.send('open-daily-window'),
    receiveSelectedMonth: (callback) => ipcRenderer.on('selected-month', (event, selectedMonth) => callback(selectedMonth))
});
