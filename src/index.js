'use strict';
const tempColor = (temp) => {
  const colorCode = document.getElementById('tempCount');
  if (temp >= 80) {
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
  const colorCode = document.getElementById('tempCount');
  if (state.tempCount >= 80) {
    colorCode.style.color = 'red';
    console.log("Red");
  } else if (70 <= state.tempCount && state.tempCount <= 79) {
    //color has to be orange
    colorCode.style.color = 'orange';
    console.log("orange");
  } else if (60 <= state.tempCount && state.tempCount <= 69) {
    //color is yellow
    colorCode.style.color = 'yellow';
    console.log("yellow");
  } else if (50 <= state.tempCount && state.tempCount <= 59) {
    //color is green
    colorCode.style.color = 'green';
    console.log("green");
  } else {
    colorCode.style.color = 'teal';
  }
  console.log("hello");
};

const tempDecrease = () => {
  state.tempCount -= 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
  console.log("hegood morningllo");
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
