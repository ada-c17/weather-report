"use strict";

const state = {
    title: 'Weather Wonderland',
    temp: 60,
    sky: 'Sunny',
    unit: 'F',
    city: null,
    // sky: 'white',
    // land: 'white'
};

const tempDisplay = document.getElementById('city-temp');
const tempBar = document.getElementById('temp-bar');
const increaseTempBtn = document.getElementById('increase-temp');
const decreaseTempBtn = document.getElementById('decrease-temp');
const textInputBox = document.getElementById('text-input');
const cityDisplay = document.getElementById('city-name');
const bodyMain = document.getElementById('body');
const skyInput = document.getElementById('skies');

const increaseTemp = event => {
    state.temp += 1;
    displayStates();
    updateColor();
    updateLandState();
}

const decreaseTemp = event => {
    state.temp -= 1;
    displayStates();
    updateColor();
    updateLandState();
}

const updateColor = () => {
    if (state.temp < 50) {
        tempBar.className = 'teal';
    } else if (state.temp < 60) {
        tempBar.className = 'green';
    } else if (state.temp < 70) {
        tempBar.className = 'yellow';
    } else if (state.temp < 80) {
        tempBar.className = 'orange';
    } else {
        tempBar.className = 'red';
    }
}

const updateTitle = () => {
    state.title = textInputBox.value;
    cityDisplay.textContent = state.title;
}

const updateSkyState = () => {
    if (skyInput.value === "Sunny") {
        state.sky = "LightGoldenRodYellow";
    } else if (skyInput.value === "Cloudy") {
        state.sky = "PowderBlue";
        // "LightCyan"
    } else if (skyInput.value === "Rainy") {
        state.sky = "DarkSeaGreen";
    } else if (skyInput.value === "Snowy") {
        state.sky = "White";
    }
    updateBackground();
}

const updateLandState = () => {
    if (state.temp < 60) {
        state.land = "Gainsboro";
    } else if (state.temp < 70) {
        state.land = "MistyRose";
    } else if (state.temp < 80) {
        state.land = "Pink";
    } else {
        state.land = "Tomato";
    }
    updateBackground();
}

const updateBackground = () => {
    bodyMain.style.backgroundImage = "linear-gradient(to bottom, "+ state.sky +", "+ state.land +")"};

const registerEventHandlers = () => {
    increaseTempBtn.addEventListener('click', increaseTemp);
    decreaseTempBtn.addEventListener('click', decreaseTemp);
    textInputBox.addEventListener('input', updateTitle);
    skyInput.addEventListener('change', updateSkyState);
}

const displayStates = () => {
    tempDisplay.textContent = state.temp;
    updateColor();
    cityDisplay.textContent = state.title;
    updateLandState();
    updateSkyState();
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', displayStates);