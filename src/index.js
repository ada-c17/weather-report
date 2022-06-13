'use strict';

const tempDisplay = document.getElementById('temp-display');
const landscapeImg = document.getElementById('landscape-img');
const cityName = document.getElementById('city-name-display');

const state = {
  temp: parseInt(tempDisplay.textContent),
  landscape: landscapeImg.src,
  city: cityName.textContent,
};

const updateTempDisplay = (x) => {
  state.temp += x;
  tempDisplay.textContent = `${state.temp}°`;

  if (state.temp > 79) {
    tempDisplay.style.color = 'rgb(248, 163, 163)';
    landscapeImg.src = '/images/sun.png';
  }
  if (state.temp < 80) {
    tempDisplay.style.color = 'orange';
    landscapeImg.src = '/images/cloudy.png';
  }
  if (state.temp < 70) {
    tempDisplay.style.color = 'yellow';
  }
  if (state.temp < 60) {
    tempDisplay.style.color = 'green';
    landscapeImg.src = '/images/rainy.png';
  }
  if (state.temp < 40) {
    tempDisplay.style.color = 'teal';
    landscapeImg.src = '/images/snowy.png';
  }
};

const updateCity = (e) => {
  cityName.textContent = e.target.value;
};

const resetCity = () => {
  cityName.textContent = 'New Orleans';
};

const updateSky = () => {
  const value = document.getElementById('sky-color').value;
  if (value === 'sunny') {
    document.body.style.backgroundImage =
      'linear-gradient(to top, rgb(255, 255, 174),rgb(248, 163, 163)';
  }
  if (value === 'cloudy') {
    document.body.style.backgroundImage =
      'linear-gradient(rgb(211, 224, 224),rgb(106, 112, 159))';
  }
  if (value === 'rainy') {
    document.body.style.backgroundImage =
      'linear-gradient( rgb(213, 251, 253),rgb(148, 55, 160))';
  }
  if (value === 'snowy') {
    document.body.style.backgroundImage =
      'linear-gradient( rgb(255, 255, 255),rgb(211, 224, 224))';
  }
};

const registerEventHandlers = () => {
  const upButton = document.getElementById('up-button');
  upButton.addEventListener('click', () => {
    updateTempDisplay(1);
  });

  const downButton = document.getElementById('down-button');
  downButton.addEventListener('click', () => {
    updateTempDisplay(-1);
  });

  const cityInput = document.querySelector('input');
  cityInput.addEventListener('input', updateCity);

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', resetCity);

  const skySelector = document.getElementById('sky-color');
  skySelector.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
