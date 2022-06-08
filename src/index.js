"use strict";

const state = {
  tempValue: 65
};

const increaseTemp = (event) => {
  state.tempValue++;
  const increaseT = document.getElementById('tValue');
  increaseT.textContent = `${state.tempValue}`;
};

const decreaseTemp = (event) => {
  console.log(state.tempValue);
  --state.tempValue;
  const decreaseT = document.getElementById('tValue');
  decreaseT.textContent = `${state.tempValue}`;
};

// change only 2 colors: red and orange, why?
const changeTempColor = () => {
  // const temp = document.getElementById("tValue");
  // if (temp.textContent >= 80) {
  //   temp.className = 'red';
  // } else if (70 <= temp.textContent <= 79) {
  //   temp.className = 'orange';
  // } else if (60 <= temp.textContent  <= 69) {
  //   temp.className = 'yellow';
  // } else if (50 <= temp.textContent <= 59) {
  //   temp.className = 'green';
  // } else if (temp.textContent < 49) {
  //   temp.className = 'teal';
  // }
  const temp = document.getElementById("tValue");
  if (temp.textContent >= 80) {
    temp.style.color = 'red';
  } else if (70 <= temp.textContent &&  temp.textContent <= 79) {
    temp.style.color = 'orange';
  } else if (60 <= temp.textContent &&  temp.textContent <= 69) {
    temp.style.color = 'yellow';
  } else if (50 <= temp.textContent <= 59) {
    temp.style.color = 'green';
  } else if (temp.textContent < 49) {
    temp.style.color = 'teal';
  }
}

const updateTemp = () => {
  if (document.getElementById('increase').innerText === "⬆️") {
    increaseTemp();
  } else if (document.getElementById('decrease').innerText === "⬇️") {
    decreaseTemp();
  }
  // changeTempColor();
}

const addEvents = () => {
  const arrowUp = document.getElementById('increase');
  arrowUp.addEventListener('click', updateTemp);
  // arrowUp.addEventListener('click', changeTempColor);

  const arrowDown = document.getElementById('decrease');
  arrowDown.addEventListener('click', updateTemp);
  // arrowDown.addEventListener('click', changeTempColor);
};


document.addEventListener('DOMContentLoaded', addEvents);
