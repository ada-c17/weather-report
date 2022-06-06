'use strict';

window.onload = function () {
  newTemperature();
  changeCity();
};

let temperature = 79;
let city = '';

const increaseTemp = function () {
  temperature += 1;
  newTemperature();
};

const decreaseTemp = function () {
  temperature -= 1;
  newTemperature();
};

// const resetCity = function () {
//   city = 'new city';
// };

const changeCity = function () {
  // if the #cityname element is changed
  const input = document.querySelector('#cityname');
  input.addEventListener('change', updateValue);
  const curWeatherHeader = document.getElementById('cityheader');

  // update header to display city name and update city variable
  function updateValue(e) {
    city = e.target.value;
    curWeatherHeader.textContent = 'Current Weather for ' + city;
  }
};

const newTemperature = function () {
  const temperatureMessage = 'Temperature: ' + temperature + '\u00B0F';
  document.getElementById('temperature').innerHTML = temperatureMessage;
  setTextColorLandscapeBasedOnTemp();
};

const setTextColorLandscapeBasedOnTemp = function () {
  let landscape = 'landscape';
  if (temperature >= 80) {
    document.getElementById('temperature').style.color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70) {
    document.getElementById('temperature').style.color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60) {
    document.getElementById('temperature').style.color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50) {
    document.getElementById('temperature').style.color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature < 50) {
    document.getElementById('temperature').style.color = 'teal';
    landscape = '⛄🥶 ❄️🥶 ❄️ 🧤 🧥🧣❄️🥶 ❄️🥶 ⛄';
  }
  document.getElementById('landscape').innerHTML = landscape;
};
