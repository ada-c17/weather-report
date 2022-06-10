'use strict';

const state = {
  temperature: 0,
}; 

// Math.floor(1.8 * (k - 273) + 32)

const increaseTemp = () => {
  state.temperature += 1;
  console.log(state.temperature);
};
console.log(state.temperature);

const decreaseTemp = () => {
  state.temperature -= 1;
  console.log(state.temperature);
};
console.log(state.temperature);


const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector("#increaseTemp");
  increaseTempButton.addEventListener("click", increaseTemp);
  const decreaseTempButton = document.querySelector("#decreaseTemp");
  decreaseTempButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);