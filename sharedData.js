// sharedData.js
let sharedData = {
    monthlyEarnings: {},
    monthlySpendings: {},
};

// Function to get the current shared data
function getSharedData() {
    return sharedData;
}

// Function to update the shared data
function updateSharedData(newData) {
    sharedData = { ...sharedData, ...newData };
}

// Function to subscribe to data changes (for real-time updates)
const listeners = [];

function subscribe(listener) {
    listeners.push(listener);
}

function notifyListeners() {
    listeners.forEach(listener => listener(sharedData));
}

// Export functions
module.exports = {
    getSharedData,
    updateSharedData,
    subscribe,
    notifyListeners
};
