'use strict';

const tempDisplay = document.getElementById('temp-display');
const landscapeImg = document.getElementById('landscape-img');

const state = {
  temp: parseInt(tempDisplay.textContent),
  landscape: landscapeImg.src,
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
  const log = document.getElementById('city-name-display');
  log.textContent = e.target.value;
};

const resetCity = () => {};

const updateSky = (value) => {
  const skyColor = document.querySelector('.sky-container');
  if (value === 'sunny') {
    skyColor.style.backgroundColor = rgb(255, 255, 174);
  }
  if (value === 'cloudy') {
    skyColor.style.backgroundColor = 'grey';
  }
  if (value === 'rainy') {
    skyColor.body.style.backgroundColor = 'blue';
  }
  if (value === 'snowy') {
    skyColor.body.style.backgroundColor = 'white';
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

  const skySelector = document.getElementById('sky-color');
  skySelector.addEventListener('change', updateSky(skySelector.value));
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
