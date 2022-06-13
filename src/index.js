'use strict';

const state = {
  temp: 20,
  city: 'New York City',
};

const updateColor = () => {
  let hex;
  if (state.temp >= 30) {
    hex = '#e30022';
  } else if (state.temp >= 25) {
    hex = '#ff4500';
  } else if (state.temp >= 20) {
    hex = '#efcc00';
  } else if (state.temp >= 15) {
    hex = '#00a550';
  } else if (state.temp < 15) {
    hex = '#0d98ba';
  }
  return hex;
};

const updateLandscape = () => {
  let emojis;
  if (state.temp >= 30) {
    emojis = '🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋';
  } else if (state.temp >= 25) {
    emojis = '⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️';
  } else if (state.temp >= 20) {
    emojis = '🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️';
  } else if (state.temp < 20) {
    emojis = '🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻';
  }
  return emojis;
};

const updateCity = () => {
  const city = document.querySelector('#changeCityTo');
  return city.value;
};

const tempUp = (event) => {
  const temp = document.querySelector('#temp');
  state.temp += 1;
  setTemp();
  setLandscape();
};

const tempDown = (event) => {
  const temp = document.querySelector('#temp');
  state.temp -= 1;
  setTemp();
  setLandscape();
};

const setTemp = () => {
  const temp = document.querySelector('#temp');
  temp.textContent = `${state.temp}°C`;
  temp.style.color = updateColor();
};

const setLandscape = () => {
  const landscape = document.querySelector('#landscapeView');
  landscape.textContent = updateLandscape();
};

const setCity = () => {
  state.city = updateCity();
  const city = document.querySelector('#city');
  city.textContent = state.city;
};

const registerEventHandlers = (event) => {
  const increaseTemp = document.querySelector('#increaseTemp');
  increaseTemp.addEventListener('click', tempUp);
  const decreaseTemp = document.querySelector('#decreaseTemp');
  decreaseTemp.addEventListener('click', tempDown);
  const changeCityTo = document.querySelector('#changeCityTo');
  changeCityTo.addEventListener('input', setCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
