'use strict';

const axios = require('axios');

const state = {
  temperature: 0,
};

// increase and decrease temperature
const increaseTemperature = () => {
  state.temperature += 1;
  const temperatureContainer = document.getElementById('temperature');

  temperatureContainer.textContent = `${state.temperature}°`;
};

const decreaseTemperature = () => {
  state.temperature -= 1;
  const temperatureContainer = document.getElementById('temperature');

  temperatureContainer.textContent = `${state.temperature}°`;
};

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increase-temp');
  increaseTempButton.addEventListener('click', increaseTemperature);

  const decreaseTempButton = document.getElementById('decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
