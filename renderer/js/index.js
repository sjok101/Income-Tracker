
const monthBox = document.getElementsByClassName('box-month');


for (let i = 0; i<monthBox.length; i++){
    monthBox[i].addEventListener('click', () => {
        console.log(monthBox[i].id)
        const selectedMonth = monthBox[i].id.split('-')[1];  // Get the month number from the ID
        window.electronAPI.openMonthlyWindow(selectedMonth);  // Send the selected month to the main process
    })
}


