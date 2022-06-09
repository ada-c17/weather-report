'use strict';
const tempColor = (temp) => {
  const colorCode = document.getElementById('tempCount');
  if (temp >= 80) {
    colorCode.style.color = 'red';
  } else if (70 <= temp <= 79) {
    //color has to be orange
    colorCode.style.color = 'orange';
  } else if (60 <= temp <= 69) {
    //color is yellow
    colorCode.style.color = 'yellow';
  } else if (50 <= temp <= 59) {
    //color is green
    colorCode.style.color = 'green';
  } else {
    colorCode.style.color = 'teal';
  }
};

document.addEventListener('DOMContentLoaded', tempColor(45));

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
