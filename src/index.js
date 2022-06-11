'use strict';
// const axios = require('axios');

// changing color of temperature value
const tempColor = (temp) => {
  if (temp >= 80) {
    document.getElementById('temp-value').style.color = 'red';
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('temp-value').style.color = 'orange';
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('temp-value').style.color = 'yellow';
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('temp-value').style.color = 'green';
  } else {
    document.getElementById('temp-value').style.color = 'teal';
  }
};

// changing landscape emojis
const landscapeChange = (temp) => {
  if (temp >= 80) {
    document.getElementById(
      'landscape'
    ).textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById(
      'landscape'
    ).textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById(
      'landscape'
    ).textContent = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
  } else {
    document.getElementById(
      'landscape'
    ).textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  }
};

// increasing/decreasing temperature value
const increaseTemp = () => {
  let temp = parseInt(document.getElementById('temp-value').textContent);
  temp++;
  document.getElementById('temp-value').textContent = temp;
  tempColor(temp);
  landscapeChange(temp);
};

const decreaseTemp = () => {
  let temp = parseInt(document.getElementById('temp-value').textContent);
  temp--;
  document.getElementById('temp-value').textContent = temp;
  tempColor(temp);
  landscapeChange(temp);
};

const upEvent = () => {
  const upButton = document.getElementById('up-button');
  upButton.addEventListener('click', increaseTemp);
};

const downEvent = () => {
  const downButton = document.getElementById('down-button');
  downButton.addEventListener('click', decreaseTemp);
};

// update city
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');

const updateCityValue = (cityInput) => {
  cityName.textContent = cityInput.target.value;

  findLatitudeAndLongitude();
};

const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  axios
    .get(`http://127.0.0.1:5000/location?q=${cityName.textContent}`)
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('found latitude and longitude');

      getWeather(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude');
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get(`http://127.0.0.1:5000/weather?lat=${latitude}&lon=${longitude}`)

    .then((response) => {
      const tempKelvin = response.data.current.temp;

      const temp = Math.floor(1.8 * (tempKelvin - 273) + 32);

      const tempVal = document.getElementById('temp-value');
      tempVal.textContent = temp;

      return temp;
    });
};

// const updateTemp = () => {
//   let tempVal = document.getElementById('temp-value');

//   findLatitudeAndLongitude();

// };

document.addEventListener('change', updateCityValue);
// document.addEventListener('change', updateTemp);

document.addEventListener('DOMContentLoaded', upEvent);
document.addEventListener('DOMContentLoaded', downEvent);
