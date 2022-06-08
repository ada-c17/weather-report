'use strict';
const state = {
  temp: 0,
};

const increaseTemp = () => {
  state.temp += 1;
  const tempContainer = document.getElementById('temperature');
  const landScape = document.getElementById('picture');

  tempContainer.textContent = `${state.temp}`;

  if (state.temp >= 80) {
    tempContainer.className = 'hottest';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp < 79) {
    tempContainer.className = 'warm';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp < 69) {
    tempContainer.className = 'fresh';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp < 59) {
    tempContainer.className = 'cool';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempContainer.className = 'freeze';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempContainer = document.getElementById('temperature');
  tempContainer.textContent = `${state.temp}`;

  if (state.temp >= 80) {
    tempContainer.className = 'hottest';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp < 79) {
    tempContainer.className = 'warm';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp < 69) {
    tempContainer.className = 'fresh';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp < 59) {
    tempContainer.className = 'cool';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempContainer.className = 'freeze';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const displayCity = () => {
  const cityContainer = document.getElementById('city');
  cityContainer.textContent = document.getElementById('city-name').value;
};

const registerEventHandlers = () => {
  const upButton = document.getElementById('up');
  upButton.addEventListener('click', increaseTemp);

  const downButton = document.getElementById('down');
  downButton.addEventListener('click', decreaseTemp);

  const searchButton = document.getElementById('search');
  searchButton.addEventListener('click', displayCity);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
