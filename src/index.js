'use strict';
const state = {
  temp: 0,
};

const changeColorAndLand = (t) => {
  const tempContainer = document.getElementById('temperature');
  const landScape = document.getElementById('picture');
  if (t >= 80) {
    tempContainer.className = 'hottest';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (t >= 70 && t < 79) {
    tempContainer.className = 'warm';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (t >= 60 && t < 69) {
    tempContainer.className = 'fresh';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (t >= 50 && t < 59) {
    tempContainer.className = 'cool';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempContainer.className = 'freeze';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  state.temp += 1;
  const tempContainer = document.getElementById('temperature');
  tempContainer.textContent = `${state.temp}`;
  changeColorAndLand(state.temp);
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempContainer = document.getElementById('temperature');
  tempContainer.textContent = `${state.temp}`;
  changeColorAndLand(state.temp);
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
