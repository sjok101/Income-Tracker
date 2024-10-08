
const dayBox = document.getElementsByClassName('box-day');
const monthDays = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

// Function to generate the day divs
function generateDays(selectedMonth) {
    const container = document.getElementById('container-month');
    container.innerHTML = '';  // Clear the container

    const daysInMonth = monthDays[selectedMonth];
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('box-day');
        dayDiv.textContent = `Day ${day}`;
        container.appendChild(dayDiv);
    }

}

function attachEvents(length){
    for (let i=0; i<length; i++){
        dayBox[i].addEventListener('click', () => {
            window.electronAPI.openDailyWindow();
        })
    }
}

// Receive the selected month from the main process
window.electronAPI.receiveSelectedMonth((selectedMonth) => {
    generateDays(selectedMonth);  // Generate days dynamically
    attachEvents(dayBox.length)
});

console.log(dayBox.length)

