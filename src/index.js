'use strict';
// const axios = require('axios');

const state = {
  location: '',
  temp: 70,
  weather: '',
  lat: 0,
  lon: 0,
};

const getTemp = () => {
  axios
    .get('http://localhost:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      state.temp = parseInt(
        ((response.data['current'].temp - 273) * 9) / 5 + 32
      );
      state.weather = response.data['current']['weather'][0].main;
      console.log('success in finding weather!', state.temp, state.weather);
      tempChange(state.temp, true);
    })
    .catch((error) => {
      console.log('error in weather');
    });
  return state.temp;
};

const tempToColor = () => {
  let newTemp = state.temp;
  //I became aware after the fact I could set 'hsl()'
  const toHex = (dec) => (dec < 16 ? '0' + dec.toString(16) : dec.toString(16));
  const normalize = (newTemp) => (newTemp % 35) / 35;

  let color = [];
  if (newTemp <= -35) {
    color = ['00', '00', 'FF'];
  } else if (newTemp < 0) {
    color = ['00', toHex(parseInt(255 * (1 + normalize(newTemp)))), 'FF'];
  } else if (newTemp < 35) {
    color = ['00', 'FF', toHex(parseInt(255 * (1 - normalize(newTemp))))];
  } else if (newTemp < 70) {
    color = [toHex(parseInt(255 * normalize(newTemp))), 'FF', '00'];
  } else if (newTemp < 105) {
    color = ['FF', toHex(parseInt(255 * (1 - normalize(newTemp)))), '00'];
  } else {
    color = ['FF', '00', '00'];
  }
  return ['#', ...color].join('');
};

const tempChange = (temp, set) => {
  const currentTemp = document.querySelector('#temp');
  if (set) {
    currentTemp.textContent = temp;
  } else {
    state.temp += temp;
    currentTemp.textContent = state.temp;
  }
  currentTemp.style.color = tempToColor();

  seasonChange();
};

const seasonChange = () => {
  const currentSeason = document.querySelector('#season');
  if (state.temp < 30) {
    season = '🌲🌲⛄️🍂🍁🌲⛄️🍂🌲';
  } else if (state.temp < 60) {
    season = '🌾_🍃_🪨__🛤_🌾_🍃';
  } else if (state.temp < 90) {
    season = '🌸🌿_🌱_🌻🌷_🌼__🌷';
  } else {
    season = '🌵_🐍🌵__🐍_🏜_🦂🌵';
  }
  currentSeason.textContent = season;
};

const weatherChange = () => {
  const currentWeather = document.querySelector('#weatherBox');
  const setWeather = document.querySelector('#weather');
  let weatherLookup = {
    Sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
    Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
    Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
    Snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
  };

  state.weather = currentWeather.value;

  setWeather.textContent = weatherLookup[state.weather];
};
/////////////////////////////////////////////
const getLocation = () => {
  print;
  axios
    .get('http://localhost:5000/location', {
      params: {
        q: state.location,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      console.log('success in finding location!', state.lat, state.lon);
    })
    .catch((error) => {
      console.log('error in location');
    });
  return {};
};

const locationChange = () => {
  const currentLocation = document.querySelector('#location');
  const locationButton = document.querySelector('#locationReset');

  state.location = currentLocation.value;
  getLocation();
  locationButton.textContent = state.location;
  currentLocation.value = '';
};

const clearLocation = () => {
  const locationButton = document.querySelector('#locationReset');
  locationButton.textContent = 'Reset Location';
  state.location = '';
  state.lat = 0;
  state.lon = 0;
};

const registerEventHandlers = () => {
  const upTempButton = document.querySelector('#up_temp');
  upTempButton.addEventListener('click', (event) => tempChange(1, false));
  const downTempButton = document.querySelector('#down_temp');
  downTempButton.addEventListener('click', (event) => tempChange(-1, false));
  const setTempButton = document.querySelector('#lookup_temp');
  setTempButton.addEventListener('click', (event) => getTemp());

  const updateLocation = document.querySelector('#location');
  updateLocation.addEventListener('change', (event) => locationChange());
  const updateWeather = document.querySelector('#weatherBox');
  updateWeather.addEventListener('change', (event) => weatherChange());

  const locationResetButton = document.querySelector('#locationReset');
  locationResetButton.addEventListener('click', (event) => clearLocation());
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
tempChange(0, false);
