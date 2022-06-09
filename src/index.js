'use strict';

const state = {
  temp: 50,
};

const changeLandscape = (temp) => {
  const landscapeContainer = document.getElementById('landscapeContainer');
  if (temp >= 80) {
    landscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp <= 79) {
    landscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp <= 69) {
    landscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  const temperature = document.querySelector('#temperature');
  state.temp += 1;
  temperature.textContent = `${state.temp}`;
  changeLandscape(state.temp);
};

const decreaseTemp = () => {
  const temperature = document.querySelector('#temperature');
  state.temp -= 1;
  temperature.textContent = `${state.temp}`;
  changeLandscape(state.temp);
};

const registerEventHandlers = () => {
  const upButton = document.querySelector('#tempUpButton');
  upButton.addEventListener('click', increaseTemp);

  const downButton = document.querySelector('#tempDownButton');
  downButton.addEventListener('click', decreaseTemp);
};

if (document.readState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContent Loaded', registerEventHandlers);
}
