'use strict';

const temperature = document.getElementById('temp-display');

const state = {
  clickCount: parseInt(temperature.textContent),
};

const updateTemp = (x) => {
  state.clickCount += x;
  temperature.textContent = `${state.clickCount}°`;
  if (state.clickCount > 79) {
    temperature.style.color = 'red';
  }
  if (state.clickCount < 80) {
    temperature.style.color = 'orange';
  }
  if (state.clickCount < 70) {
    temperature.style.color = 'yellow';
  }
  if (state.clickCount < 60) {
    temperature.style.color = 'green';
  }
  if (state.clickCount < 50) {
    temperature.style.color = 'teal';
  }
};

const updateSky = (value) => {
  const skyColor = document.querySelector('.sky-container');
  if (value === 'sunny') {
    skyColor.style.backgroundColor = 'red';
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
    updateTemp(1);
  });
  const downButton = document.getElementById('down-button');
  downButton.addEventListener('click', () => {
    updateTemp(-1);
  });
  const skySelector = document.getElementById('sky-color');
  skySelector.addEventListener('change', updateSky(skySelector.value));
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
