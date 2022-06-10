'use strict';

const temperature = document.getElementById('tempDisplay');
console.log(typeof parseInt(temperature.textContent));

const state = {
  ClickCount: parseInt(temperature.textContent),
};

const increaseTemp = () => {
  const temperature = document.getElementById('tempDisplay');
  state.ClickCount += 1;
  temperature.textContent = `${state.ClickCount}°`;
};
const decreaseTemp = () => {
  const temperature = document.getElementById('tempDisplay');
  state.ClickCount -= 1;
  temperature.textContent = `${state.ClickCount}°`;
};

const registerEventHandlers = () => {
  const upButton = document.getElementById('upButton');
  upButton.addEventListener('click', increaseTemp);
  const downButton = document.getElementById('downButton');
  downButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
