'use strict';

const temperature = document.getElementById('tempDisplay');

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

const registerEventHandlers = () => {
  const upButton = document.getElementById('upButton');
  upButton.addEventListener('click', () => {
    updateTemp(1);
  });
  const downButton = document.getElementById('downButton');
  downButton.addEventListener('click', () => {
    updateTemp(-1);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
