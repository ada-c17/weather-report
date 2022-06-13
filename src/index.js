'use strict';

const state = {
  temp: 65,
  city: 'Houston',
};

const tempColor = () => {
  const currentTemp = document.getElementById('temp-display');
  if (state.temp >= 80) {
    currentTemp.style.backgroundColor = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.backgroundColor = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.backgroundColor = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.backgroundColor = 'green';
  } else {
    currentTemp.style.backgroundColor = 'teal';
  }
};

const landscapeImage = () => {
  const landscape = document.getElementById('landscape');
  let pic;
  if (state.temp >= 80) {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/desert.jpg')";
  } else if (state.temp >= 70) {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/flowers.jpg')";
  } else if (state.temp >= 60) {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/grass.jpg')";
  } else {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/snow.jpg')";
  }
  landscape.style.backgroundImage = pic;
};

const updateTheme = () => {
  const currentTemp = document.getElementById('temp-display');
  currentTemp.textContent = `${state.temp}`;
  tempColor();
  landscapeImage();
};

const increaseTemp = () => {
  state.temp += 1;
  updateTheme();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTheme();
};

const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById('increase');
  tempIncreaseButton.addEventListener('click', increaseTemp);

  const tempDecreaseButton = document.getElementById('decrease');
  tempDecreaseButton.addEventListener('click', decreaseTemp);

  const cityInput = document.getElementById('city-input');
  cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateCity();
    }
  });
};

const updateCity = () => {
  const cityInput = document.getElementById('city-input').value;
  state.city = cityInput || 'Houston';
  const cityName = document.getElementById('city-name');
  cityName.textContent = `${state.city}`;
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
