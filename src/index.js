'use strict';

axios
  .get('http://127.0.0.1:5000/') {
}
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

const gardenLayout = (temp) => {
  const floorEmojisContainer = document.querySelector('#floorEmojis');
  if (temp >= 80) {
    floorEmojisContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (70 <= temp && temp <= 79) {
    floorEmojisContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (60 <= temp && temp <= 69) {
    floorEmojisContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (50 <= temp && temp <= 59) {
    floorEmojisContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
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
  gardenLayout(state.tempCount);
};

const tempDecrease = () => {
  state.tempCount -= 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
  gardenLayout(state.tempCount);
};

const registerEventHandlers = (event) => {
  const raiseTemp = document.querySelector('#raiseTemp');
  raiseTemp.addEventListener('click', tempIncrease);
  raiseTemp.addEventListener('click', tempColor);

  const decreaseTemp = document.querySelector('#decreaseTemp');
  decreaseTemp.addEventListener('click', tempDecrease);
  decreaseTemp.addEventListener('click', tempColor);

  const cityNameid = document.querySelector('#cityNameid');
  cityNameid.addEventListener('input', updateCityname);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const defaultCity = {
  cityName: 'The amazing city of ...',
};
const updateCityname = () => {
  const nameOfCity = document.getElementById('cityNameid').value;
  console.log(nameOfCity);
  const cityContainer = document.querySelector('#amazingCity');

  cityContainer.textContent = `The amazing city of ${nameOfCity}`;

  console.log(nameOfCity);
};
