'use strict';
const tempColor = (temp) => {
  const colorCode = document.getElementById('tempCount');
  if (temp >= 80) {
    colorCode.className = 'hotTemp';
  } else if (70 <= temp && temp <= 79) {
    colorCode.className = 'warmTemp';
  } else if (60 <= temp && temp <= 69) {
    colorCode.className = 'mildTemp';
  } else if (50 <= temp && temp <= 59) {
    colorCode.className = 'chillTemp';
  } else if (-100 <= temp && temp <= 49) {
    colorCode.className = 'coldTemp';
  }
};

const state = {
  tempCount: 65,
};

const tempIncrease = () => {
  state.tempCount += 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
};

const tempDecrease = () => {
  state.tempCount -= 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
};

const registerEventHandlers = (event) => {
  const raiseTemp = document.querySelector('#raiseTemp');
  raiseTemp.addEventListener('click', tempIncrease);
  raiseTemp.addEventListener('click', tempColor);

  const decreaseTemp = document.querySelector('#decreaseTemp');
  decreaseTemp.addEventListener('click', tempDecrease);
  decreaseTemp.addEventListener('click', tempColor);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
