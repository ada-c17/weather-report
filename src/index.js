'use strict';

// Change temperature by clicking on an arrow

const state = {
  temp: 55,
};

const increaseTemp = (event) => {
  state.temp += 1;
  const tempContainer = document.querySelector('#current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
};
const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers);

const decreaseTemp = (event) => {
  state.temp -= 1;
  const tempContainer = document.querySelector('#current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
};
const registerEventHandlers1 = (event) => {
  const increaseTempButton = document.querySelector('#decreaseTempButton');
  increaseTempButton.addEventListener('click', decreaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers1);
