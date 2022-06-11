const state = {
    currentTemp: 0,
    currentLocation: " "
};

const updateColor = () => {
    const currentTempDisplay = document.getElementById("currentTemp");
    if (state.currentTemp >= 100) {
        currentTempDisplay.style.color = "brown";
    } else if (state.currentTemp >= 80){
        currentTempDisplay.style.color = "red";
    } else if (state.currentTemp >= 60){
        currentTempDisplay.style.color = "orange";
    } else if (state.currentTemp >= 40){
        currentTempDisplay.style.color = "green";
    } else if (state.currentTemp >= 20){
        currentTempDisplay.style.color = "blue";
    } else {
        currentTempDisplay.style.color = "purple";
    }
};

const updateFeelImage = () => {
    const feelImage = document.getElementById("landscape");
    if (state.currentTemp >= 100) {
        feelImage.src = "/images/venus.jpeg";
    } else if (state.currentTemp >= 80){
        feelImage.src = "/images/hotTemp.jpeg";
    } else if (state.currentTemp >= 60){
        feelImage.src = "/images/warmTemp.jpeg";
    } else if (state.currentTemp >= 40){
        feelImage.src = "/images/coolTemp.jpg";
    } else if (state.currentTemp >= 20){
        feelImage.src = "/images/coldTemp.jpeg";
    } else {
        feelImage.src = "/images/pluto.png";
    }
};

const increaseTempAction = () => {
    const currentTempDisplay = document.getElementById("currentTemp");
    state.currentTemp += 1;
    currentTempDisplay.textContent = `Current Temperature: ${state.currentTemp}`;
    updateColor()
    updateFeelImage()
};

const decreaseTempAction = () => {
    const currentTempDisplay = document.getElementById("currentTemp");
    state.currentTemp -= 1;
    currentTempDisplay.textContent = `Current Temperature: ${state.currentTemp}`;
    updateColor()
    updateFeelImage()
};

const inputLocationAction = () => {
    const inputLocation = document.getElementById("locationInput");
    state.currentLocation = inputLocation.value;
    const currentLocationDisplay = document.getElementById("myLocation");
    currentLocationDisplay.textContent = `${state.currentLocation}`;
};

const registerEventHandlers = () => {
    const increaseTempButton = document.getElementById("increaseTemp");
    increaseTempButton.addEventListener("click", increaseTempAction);

    const decreaseTempButton = document.getElementById("decreaseTemp");
    decreaseTempButton.addEventListener("click", decreaseTempAction);

    const inputLocation = document.getElementById("locationInput");
    inputLocation.addEventListener("input", inputLocationAction)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);