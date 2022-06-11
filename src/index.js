'use strict';

// const axios = require('axios');

const state = {
  temperature: 0,
  currentColor: 'black',
};

// increase and decrease temperature
const increaseTemperature = () => {
  state.temperature += 1;
  const temperatureContainer = document.getElementById('temperature');

  temperatureContainer.textContent = `${state.temperature}° F`;
  changeTemperatureColor();
};

const decreaseTemperature = () => {
  state.temperature -= 1;
  const temperatureContainer = document.getElementById('temperature');

  temperatureContainer.textContent = `${state.temperature}° F`;
  changeTemperatureColor();
};

// helper function to change temperature text color
const changeTemperatureColor = () => {
  const temperatureContainer = document.getElementById('temperature');

  if (state.temperature >= 81) {
    state.currentColor = 'coral';
  } else if (state.temperature >= 61 && state.temperature <= 80) {
    state.currentColor = '#f5b942';
  } else if (state.temperature >= 41 && state.temperature <= 60) {
    state.currentColor = 'teal';
  } else if (state.temperature >= 21 && state.temperature <= 40) {
    state.currentColor = '#1a557d';
  } else {
    state.currentColor = '#979da1';
  }

  temperatureContainer.style.color = state.currentColor;
};

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increase-temp');
  increaseTempButton.addEventListener('click', increaseTemperature);

  const decreaseTempButton = document.getElementById('decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
