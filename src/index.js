'use strict';

const state = {
  temp: 65,
};

const tempColor = () => {
  const currentTemp = document.getElementById('temp-display');
  switch (Math.floor(state.temp / 10)) {
    case 10:
    case 9:
    case 8:
      currentTemp.style.backgroundColor = 'red';
      break;
    case 7:
      currentTemp.style.backgroundColor = 'orange';
      break;
    case 6:
      currentTemp.style.backgroundColor = 'yellow';
      break;
    case 5:
      currentTemp.style.backgroundColor = 'green';
      break;
    default:
      currentTemp.style.backgroundColor = 'teal';
      break;
  }
};

const landscapeImage = () => {
  const landscape = document.getElementById('landscape');
  switch (Math.floor(state.temp / 10)) {
    case 10:
    case 9:
    case 8:
      landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
      break;
    case 7:
      landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
      break;
    case 6:
      landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
      break;
    default:
      landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
      break;
  }
};

const increaseTemp = () => {
  state.temp += 1;
  updateTheme();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTheme();
};

const updateTheme = () => {
  const currentTemp = document.getElementById('temp-display');
  currentTemp.textContent = `${state.temp}`;
  tempColor();
  landscapeImage();
}

const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById('increase');
  tempIncreaseButton.addEventListener('click', increaseTemp);

  const tempDecreaseButton = document.getElementById('decrease');
  tempDecreaseButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
