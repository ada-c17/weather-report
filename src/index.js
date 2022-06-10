// const axios = require('axios');

const state = {
  temp: 50,
  city: 'Bloomington',
};

const upButton = document.getElementById('up-arrow');
const downButton = document.getElementById('down-arrow');
const tempText = document.getElementById('current-temp');
const ground = document.getElementById('ground');
const cityHeader = document.getElementById('city-name');
const cityInput = document.getElementById('city');

cityInput.value = state['city'];

const tempColor = (temp) => {
  if (temp >= 80) {
    tempText.style.color = 'red';
  } else if (temp >= 70) {
    tempText.style.color = 'orange';
  } else if (temp >= 60) {
    tempText.style.color = 'yellow';
  } else if (temp >= 50) {
    tempText.style.color = 'green';
  } else {
    tempText.style.color = 'teal';
  }
};

const groundLayout = (temp) => {
  if (temp >= 80) {
    ground.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    ground.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    ground.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    ground.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  state['temp'] += 1;
  tempColor(state['temp']);
  tempText.textContent = state['temp'];
  groundLayout(state['temp']);
};

const decreaseTemp = () => {
  state['temp'] -= 1;
  tempColor(state['temp']);
  tempText.textContent = state['temp'];
  groundLayout(state['temp']);
};

const changeCityHeader = () => {
  cityHeader.textContent = cityInput.value;
};

upButton.addEventListener('click', increaseTemp);
downButton.addEventListener('click', decreaseTemp);
cityInput.addEventListener('input', changeCityHeader);
