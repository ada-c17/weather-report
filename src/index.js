'use strict';
// import 'dotenv/config';
// import express from 'express';

// require('dotenv').config();

/* from reading



const axios = require('axios');

const printSucess = (response) => {
  console.log('success', response.data);
};

const printError = (error) => {
  console.log('error', error.response.data);
};

axios
  .get('https://us1.locationiq.com/v1/search.php', {
    params: {
      key: process.env['API_KEY'],
      q: 'Seattle, Washington, USA',
      format: 'json',
    }
  })
  .then(printSuccess)
  .catch(printError)
  .finally(() => {
    console.log('this is always exectued, no matter what!)
  })
  */

const state = {
  temp: 78,
  defaultCity: 'Seattle, WA',
};

const changeColor = () => {
  const tempCityBox = document.getElementById('temp_city_box_grid');
  if (state.temp >= 80) {
    tempCityBox.style.backgroundColor = 'rgba(251, 10, 18, 0.7)';
  } else if (state.temp >= 70) {
    tempCityBox.style.backgroundColor = 'rgba(255, 145, 3, 0.7)';
  } else if (state.temp >= 60) {
    tempCityBox.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
  } else if (state.temp >= 50) {
    tempCityBox.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
  } else if (state.temp >= 50) {
    tempCityBox.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
  } else if (state.temp >= 40) {
    tempCityBox.style.backgroundColor = 'rgba(0, 204, 255, 0.7)';
  } else {
    tempCityBox.style.backgroundColor = 'rgba(59, 87, 158, 0.8)';
  }
};

const changeBgImg = () => {
  let bodyBackground = document.body.style.backgroundImage;

  if (state.temp >= 80) {
    document.body.style.backgroundImage =
      "url('assets/courtney-cook-HClKQKUodF4-unsplash.jpg')";
  } else if (state.temp >= 70) {
    document.body.style.backgroundImage =
      "url('assets/clement-fusil-Fpqx6GGXfXs-unsplash.jpg')";
  } else if (state.temp >= 60) {
    document.body.style.backgroundImage =
      "url('assets/dedu-adrian-BxT5oqgztNc-unsplash.jpg')";
  } else if (state.temp >= 50) {
    document.body.style.backgroundImage =
      "url('assets/nick-scheerbart-soGoAfesWO8-unsplash.jpg')";
  } else if (state.temp >= 40) {
    document.body.style.backgroundImage =
      "url('assets/james-donovan-kFHz9Xh3PPU-unsplash.jpg')";
  } else {
    document.body.style.backgroundImage =
      "url('assets/fabien-twb-6K_WE8FB3bE-unsplash.jpg')";
  }
};

const increaseTemp = () => {
  state.temp += 1;
  const tempText = document.getElementById('temp');
  tempText.textContent = `${state.temp}°`;
  changeColor();
  changeBgImg();
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempText = document.getElementById('temp');
  tempText.textContent = `${state.temp}°`;
  changeColor();
  changeBgImg();
};

const changeCity = () => {};

const registerEventHandlers = (event) => {
  const upArrowBtn = document.getElementById('up_arrow_btn');
  upArrowBtn.addEventListener('click', increaseTemp);

  const downArrowBtn = document.getElementById('down_arrow_btn');
  downArrowBtn.addEventListener('click', decreaseTemp);

  const magnBtn = document.getElementById('magn_btn');
  magnBtn.addEventListener('click', changeCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', changeColor);
document.addEventListener('DOMContentLoaded', changeBgImg);
