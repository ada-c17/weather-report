'use strict';

const state = {
  temp: 75,
};

const increaseTemp = () => {
  state.temp += 1;
  const tempDisplay = document.getElementById('tempNum');
  tempDisplay.textContent = state.temp;
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempDisplay = document.getElementById('tempNum');
  tempDisplay.textContent = state.temp;
};

const registerEventHandlers = (event) => {
  const tempUpButton = document.getElementById('tempUp');
  tempUpButton.addEventListener('click', increaseTemp);
  const tempDownButton = document.getElementById('tempDown');
  tempDownButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
