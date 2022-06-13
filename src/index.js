'use strict';

const state = {
  city: 'Boston',
  temp: 60,
};
console.log(state);

// Get DOM elements:
const temperature = document.querySelector('#temp');

const increaseTemp = () => {
  state.temp += 1;
  console.log(state.temp);
  updateTempInfo();
  //   displayUpdatedInfo();
};

const decreaseTemp = () => {
  state.temp -= 1;
  console.log(state.temp);
  updateTempInfo();
};

const updateTempInfo = () => {
  let landscape;
  if (state.temp >= 80) {
    temperature.className = 'red';
    landscape = '☀️__🏖__🏝__⛵️';
  } else if (state.temp >= 70) {
    temperature.className = 'orange';
    landscape = '🌷__🌤__🏔__🌄';
  } else if (state.temp >= 60) {
    temperature.className = 'yellow';
    landscape = '☔️__🍃__🌦__💨';
  } else if (state.temp >= 50) {
    temperature.className = 'green';
    landscape = '☃️__❄️__🏂__🌨';
  } else if (state.temp >= 49) {
    temperature.className = 'aqua';
    landscape = '🧊__🥶__🧊__🥶';
  }
  temperature.textContent = state.temp;
  const updatedLandscape = document.querySelector('#landscape-icons');
  updatedLandscape.textContent = landscape;
};

// Register Event Handlers:
const registerEventHandlers = () => {
  const increaseButton = document.querySelector('#increase-temp');
  increaseButton.addEventListener('click', increaseTemp);
};

const decreaseButton = document.querySelector('#decrease-temp');
decreaseButton.addEventListener('click', decreaseTemp);

// Event listener for the entire document when is reloaded
document.addEventListener('DOMContentLoaded', registerEventHandlers);
