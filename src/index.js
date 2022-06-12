'use strict';

const state = {
  temp: 75,
  tempColor: 'warm',
  landscape: 'body_warm',
  City: 'Lexington',
  sky: 'sunny',
  lat: 38.0464066,
  lon: -84.4970393,
};

const getWeather = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: state.lat, lon: state.lon },
    })
    .then((response) => {
      const temp_k = response.data.current.temp;
      state.temp = Math.round(((temp_k - 273.15) * 9) / 5 + 32);
      const tempValue = document.getElementById('temp-value');
      tempValue.textContent = state.temp;
      tempColorLandscape();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getLatLon = () => {
  axios
    .get('http://127.0.0.1:5000/location', { params: { q: state.City } })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log(error);
    });
};

const tempColorLandscape = () => {
  let color;
  let landscape;
  if (state.temp >= 80) {
    color = 'hot';
    landscape = 'body_hot';
  } else if (state.temp >= 70 && state.temp <= 79) {
    color = 'warm';
    landscape = 'body_warm';
  } else if (state.temp >= 60 && state.temp <= 69) {
    color = 'cool';
    landscape = 'body_cool';
  } else if (state.temp >= 50 && state.temp <= 59) {
    color = 'chilly';
    landscape = 'body_chilly';
  } else if (state.temp <= 49) {
    color = 'cold';
    landscape = 'body_cold';
  }
  state.tempColor = color;
  state.landscape = landscape;
  const tempValue = document.getElementById('temp-value');
  tempValue.className = state.tempColor;
  const landscapeBody = document.getElementById('body');
  landscapeBody.className = state.landscape;
};

const increaseTemp = () => {
  state.temp += 1;
  const tempValue = document.getElementById('temp-value');
  tempValue.textContent = state.temp;
  tempColorLandscape();
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempValue = document.getElementById('temp-value');
  tempValue.textContent = state.temp;
  tempColorLandscape();
};

const changeCity = () => {
  const cityName = document.getElementById('enter-city-name');
  state.City = cityName.value;
  const displayedCity = document.getElementById('default-city');
  displayedCity.textContent = state.City;
};

const resetCity = () => {
  state.City = 'Lexington, KY';
  const defaultCity = document.getElementById('enter-city-name');
  defaultCity.value = state.City;
  changeCity();
};

const changeSky = () => {
  state.sky = document.getElementById('sky-options').value;
  const skyImage = document.getElementById('sky-image-container');
  if (state.sky === 'sunny') {
    skyImage.className = 'sunny';
  } else if (state.sky === 'cloudy') {
    skyImage.className = 'cloudy';
  } else if (state.sky === 'rainy') {
    skyImage.className = 'rainy';
  } else if (state.sky === 'snowy') {
    skyImage.className = 'snowy';
  }
};

const registerEventHandlers = (event) => {
  const upArrow = document.getElementById('up-arrow');
  upArrow.addEventListener('click', increaseTemp);

  const downArrow = document.getElementById('down-arrow');
  downArrow.addEventListener('click', decreaseTemp);

  const CityName = document.getElementById('enter-city-name');
  CityName.addEventListener('input', changeCity);

  const resetButton = document.getElementById('reset-city');
  resetButton.addEventListener('click', resetCity);

  const newSky = document.getElementById('sky-options');
  newSky.addEventListener('change', changeSky);

  const realTimeButton = document.getElementById('real-time-button');
  realTimeButton.addEventListener('click', getLatLon);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
