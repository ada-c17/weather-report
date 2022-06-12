"use strict";

const state = {
    city: 'San Francisco',
    temperature: 75
  };

  const temperatureDisplay = document.getElementById('temperature');
  const landscape = document.getElementById('landscape')

  const displayTemperature = () => {
    temperatureDisplay.textContent = `${state.temperature} °F`;
  };

  const increaseTemperature = () => {
    state.temperature ++;
    displayTemperature();
    changeTemperatureDecor();
  };

  const decreaseTemperature = () => {
    state.temperature --;
    displayTemperature();
    changeTemperatureDecor();
  };

  const changeTemperatureDecor = () => {
;
    if (state.temperature >= 80) {
      temperatureDisplay.className = 'hot_color';
      landscape.className = 'hot';
    } else if (state.temperature >= 70 && state.temperature < 80) {
      temperatureDisplay.className = 'warm_color';
      landscape.className = 'warm';
    } else if (state.temperature >= 60 && state.temperature < 70) {
      temperatureDisplay.className = 'cool_color';
      landscape.className = 'cool';
    } else if (state.temperature >= 50 && state.temperature < 60) {
      temperatureDisplay.className = 'chilly_color';
      landscape.className = 'cold';
    } else {
      temperatureDisplay.className = 'cold_color';
      landscape.className = 'cold';
    }
  };

  const registerEventHandlers = () => {
    const temperatureUp = document.getElementById('up_temperature');
    temperatureUp.addEventListener('click', increaseTemperature);

    const temperatureDown = document.getElementById('down_temperature');
    temperatureDown.addEventListener('click', decreaseTemperature);
  };

  document.addEventListener('DOMContentLoaded', registerEventHandlers);
