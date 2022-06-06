'use strict';

let temperature = 79;

const increaseTemp = function () {
  temperature += 1;
  newTemperature();
};

const decreaseTemp = function () {
  temperature -= 1;
  newTemperature();
};

const newTemperature = function () {
  const temperatureMessage = 'Temperature: ' + temperature + '\u00B0F';
  document.getElementById('temperature').innerHTML = temperatureMessage;
  setTextColorLandscapeBasedOnTemp();
};

window.onload = function () {
  newTemperature();
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
