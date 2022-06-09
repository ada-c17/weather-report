'use strict';

const state = {
  temp: 50,
};
///////Temperature Buttons////////////
const addTemp = (event) => {
  // Temp Behavior
  state.temp += 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = `${state.temp}`;
  changeTempColor(state.temp);
  changeLandscape(state.temp);
};
const subtractTemp = (event) => {
  // Temp Behavior
  state.temp -= 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = `${state.temp}`;
  changeTempColor(state.temp);
  changeLandscape(state.temp);
};
/////Temp color changes////////
const changeTempColor = (temp) => {
  const tempColor = document.querySelector('#temp');
  if (temp >= 80) {
    document.getElementById('temp').style.color = '#de554b';
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('temp').style.color = '#dec64b';
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('temp').style.color = '#aacf76';
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('temp').style.color = '#89c9a3';
  } else if (temp >= 40 && temp <= 49) {
    document.getElementById('temp').style.color = '#899bc9';
  } else {
    document.getElementById('temp').style.color = '#9987a8';
  }
};

const changeLandscape = (temp) => {
  const landscapeContainer = document.getElementById('landscapeContainer');
  if (temp >= 80) {
    landscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp <= 79) {
    landscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp <= 69) {
    landscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeCity = (event) => {
  const inputCity = document.getElementById('inputCity');
  inputCity.textContent = document.getElementById('city').value;
};

const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#upButton');
  const downButton = document.querySelector('#downButton');
  upButton.addEventListener('click', addTemp);
  downButton.addEventListener('click', subtractTemp);
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', changeCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
