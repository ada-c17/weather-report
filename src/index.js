'use strict';

const temperature = document.getElementById('tempDisplay');
console.log(typeof parseInt(temperature.textContent));

const state = {
  clickCount: parseInt(temperature.textContent),
};

const increaseTemp = () => {
  const temperature = document.getElementById('tempDisplay');
  state.clickCount += 1;
  temperature.textContent = state.clickCount;
};

// if button up clicked, textcontet +=1
//  if down clicked, textcontent -= 1

const registerEventHandlers = () => {
  const upButton = document.getElementById('up');
  upButton.addEventListener('click', increaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
