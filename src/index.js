"use strict";


const state = {
    tempDegrees: 50,
};

// increase temperature 
const increaseTemp = () => {
    state.tempDegrees += 1;
    const tempContainer = document.getElementById('temp-number');
    tempContainer.textContent = state.tempDegrees;
    changesByTemp();
};

// decrease temperature
const decreaseTemp = () => {
    state.tempDegrees -= 1;
    const tempContainer = document.getElementById('temp-number');
    tempContainer.textContent = state.tempDegrees;
    changesByTemp();
};

// change temperature display color & ground weather garden by temperature number
const changesByTemp = () => {
    const tempContainer = document.getElementById('temp-number');
    const gardenContainer = document.getElementById('ground-garden')
    if(state.tempDegrees >= 80) {
        tempContainer.style.color = '#d04123';
        gardenContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    } else if(state.tempDegrees >= 70 && state.tempDegrees <= 79) {
        tempContainer.style.color = '#f29f4e';
        gardenContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
    } else if(state.tempDegrees >= 60 && state.tempDegrees <= 69) {
        tempContainer.style.color = '#f1d42d';
        gardenContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
    } else if(state.tempDegrees >= 50 && state.tempDegrees <= 59) {
        tempContainer.style.color = '#7caf4e';
        gardenContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    } else if(state.tempDegrees <= 49) {
        tempContainer.style.color = '#73a3bb';
        gardenContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    }
};

const changeCityName = () => {
    const cityInput = document.getElementById('city-input').value;
    const currentCityName = document.getElementById('city-name');
    currentCityName.textContent = cityInput;
};

const registerEventHandlers = () => {
    const increaseTempButton = document.querySelector("#increase-temp-button");
    increaseTempButton.addEventListener("click", increaseTemp);

    const decreaseTempButton = document.querySelector("#decrease-temp-button");
    decreaseTempButton.addEventListener("click", decreaseTemp);

    const cityInput = document.getElementById('city-input');
    cityInput.addEventListener('input', changeCityName);

};

document.addEventListener("DOMContentLoaded", registerEventHandlers);