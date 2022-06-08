"use strict";

const setColor = temp => {
  let color = 'orange';

  if (temp <= 49) {
    color = 'teal';
  } else if (temp >= 50 && temp <= 59) {
    color = 'darkblue';
  } else if (temp >= 60 &&  temp <= 69) {
    color = 'gold';
  } else if (temp >= 70 &&  temp <= 79) {
    color = 'orange';
  } else if (temp >= 80) {
    color = 'red';
  }
  
  return color;
};

const setLandscape = temp => {
  let landscape = '';

  if (temp <= 59) {
    landscape = '️🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp >= 60 && temp <= 69) {
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 70 &&  temp <= 79) {
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 80) {
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
  
  return landscape;
};

const state = {
  tempCount: 0
};

const lowerTemp = event => {
  let temp = document.querySelector("#tempDisplay").innerHTML;
  state.tempCount = parseInt(temp, 10) - 1;

  const displayCounter = document.querySelector("#tempDisplay");
  let tempColor = setColor(state.tempCount)
  displayCounter.className = tempColor;
  displayCounter.textContent = `${state.tempCount}`;

  const landscape = document.querySelector("#landscape");
  let tempLandscape = setLandscape(state.tempCount)
  landscape.textContent = `${tempLandscape}`;  
};

const raiseTemp = event => {
  let temp = document.querySelector("#tempDisplay").innerHTML;
  state.tempCount = parseInt(temp, 10) + 1;

  const displayCounter = document.querySelector("#tempDisplay");
  let tempColor = setColor(state.tempCount)
  displayCounter.className = tempColor;
  displayCounter.textContent = `${state.tempCount}`;

  const landscape = document.querySelector("#landscape");
  let tempLandscape = setLandscape(state.tempCount)
  landscape.textContent = `${tempLandscape}`;  
};


const registerEventHandlers = (event) => {
  const leftArrow = document.querySelector("#leftArrow");
  leftArrow.addEventListener("click", lowerTemp);    

  const rightArrow = document.querySelector("#rightArrow");
  rightArrow.addEventListener("click", raiseTemp); 
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);