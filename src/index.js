'use strict';
const tempColor = (temp) => {
  const colorCode = document.getElementById('tempCount');
  if (temp.innerHTML >= 80) {
    colorCode.style.color = 'red';
  } else if (70 <= temp && temp <= 79) {
    //color has to be orange
    colorCode.style.color = 'orange';
  } else if (60 <= temp && temp <= 69) {
    //color is yellow
    colorCode.style.color = 'yellow';
  } else if (50 <= temp && temp <= 59) {
    //color is green
    colorCode.style.color = 'green';
  } else {
    colorCode.style.color = 'teal';
  }
};

const state = {
  tempCount: 65,
};

const tempIncrease = () => {
  state.tempCount += 1;
  console.log(state.tempCount);
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  // tempColor(state.tempCount);
  // console.log("Hello");
};

const tempDecrease = () => {
  state.tempCount -= 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
  console.log('hegood morningllo');
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
