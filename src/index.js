'use strict';
// const tempColor = (temp) => {
//   if (temp >= 80) {
//     //color has to be red
//   } else if (70 <= temp <= 79) {
//     //color has to be orange
//   } else if (60 <= temp <= 69) {
//     //color is yellow
//   } else if (50 <= temp <= 59) {
//     //color is green
//   } else ( temp <= 49 ) {
//   } //color is teal

//const getTemp = () =>
const state = {
  tempCount: 65,
};

const tempIncrease = (event) => {
  state.tempCount += 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
};

const tempDecrease = (event) => {
  state.tempCount -= 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
};

const registerEventHandlers = (event) => {
  const raiseTemp = document.querySelector('#raiseTemp');
  raiseTemp.addEventListener('click', tempIncrease);

  const decreaseTemp = document.querySelector('#decreaseTemp');
  decreaseTemp.addEventListener('click', tempDecrease);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
