'use strict';
const state = {
  temp: 50,
};

const colorTempChange = () => {
  let temp = state.temp;
  let color = 'tempRed';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (temp >= 80) {
    color = 'tempRed';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    color = 'tempOrange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    color = 'tempYellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    color = 'tempGreen';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp < 50) {
    color = 'tempTeal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const tempDisplay = document.querySelector('#tempValue');
  tempDisplay.textContent = `${state.temp}`;
  tempDisplay.className = color;
  const gardenLandscape = document.querySelector('#landscape');
  gardenLandscape.textContent = landscape;
};

const increaseTemp = () => {
  state.temp += 1;
  colorTempChange();
};

const decreaseTemp = () => {
  state.temp -= 1;
  colorTempChange();
};

const changeSky = () => {
  const skySelect = document.getElementById('skySelect').value;
  let sky = '';
  if (skySelect === 'Sunny') {
    sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skySelect === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skySelect === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skySelect === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  const gardenSky = document.getElementById('sky');
  gardenSky.textContent = sky;
};

const inputElement = document.querySelector('#userInput');

const registerEventHandlers = () => {
  colorTempChange();
  const upArrow = document.querySelector('#increaseTemp');
  upArrow.addEventListener('click', increaseTemp);

  const downArrow = document.querySelector('#decreaseTemp');
  downArrow.addEventListener('click', decreaseTemp);

  inputElement.addEventListener('change', changeCityName);
  const resetButton = document.querySelector('#resetButton');
  resetButton.addEventListener('click', resetInput);

  changeSky();
  const skyControls = document.getElementById('skySelect');
  skyControls.addEventListener('change', changeSky);
};

const changeCityName = (event) => {
  const cityName = document.querySelector('#cityName');
  const result = event.target.value;
  cityName.textContent = result;
};

const resetInput = () => {
  inputElement.value = '';
  cityName.textContent = 'Seattle';
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
