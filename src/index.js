'use strict';

const state = {
  city: 'new milford, ct',
  temperature: 0,
};

const updateCity = (event) => {
  city = document.getElementById('city').value;

  let searchparams = {
    q: city,
  };

  axios
    .get('http://127.0.0.1:5000/location', { params: searchparams })

    .then((response) => {
      getWeather(response.data[0]['lat'], response.data[0]['lon']);
    })
    .catch((error) => {
      console.log('error!', error.response.data);
    });
};

const getWeather = (lattitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lattitude,
        lon: longitude,
      },
    })

    .then((response) => {
      console.log('success!', response.data.current.temp);
      kelvinToF(response.data.current.temp);
      updateTempAndColor();
    })
    .catch((error) => {
      console.log('error!', error.response.data);
    });
};

const raiseTemp = (event) => {
  state.temperature += 1;
  updateTempAndColor();
};

const lowerTemp = (event) => {
  state.temperature -= 1;
  updateTempAndColor();
};

const kelvinToF = (tempInK) => {
  state.temperature = Math.round(1.8 * (tempInK - 273) + 32);
};

const calculateColor = () => {
  let colorPercent;
  if (state.temperature > 110) {
    colorPercent = (110 + 10) / 120;
  } else if (state.temperature < -10) {
    colorPercent = (-10 + 10) / 120;
  } else {
    colorPercent = (state.temperature + 10) / 120;
  }
  let colorRotate = (100 - colorPercent) * 240;
  return Math.round(colorRotate);
};

const updateLandscape = () => {
  let mountains;
  if (state.temperature > 110) {
    mountains = '/images/hot_mountains.svg';
  } else if (state.temperature > 85) {
    mountains = '/images/less_hot_mountains.svg';
  } else if (state.temperature > 32) {
    mountains = '/images/green_mountains.svg';
  } else if (state.temperature > -10) {
    mountains = '/images/snowy_mountains.svg';
  } else {
    mountains = '/images/ice_mountains.svg';
  }
  document.querySelector('#mountain').src = mountains;
};

const updateTempAndColor = () => {
  document.getElementById(
    'weather'
  ).style.color = `hsl(${calculateColor()}, 75%, 50%)`;
  document.getElementById('weather').textContent = state.temperature;
  updateLandscape();
};

const updateCityText = (event) => {
  document.getElementById('cityDisplay').textContent =
    document.getElementById('city').value;
};

updateTempAndColor();

const registerEventHandlers = (event) => {
  const cityField = document.querySelector('#cityButton');
  const warmer = document.querySelector('#warmer');
  const colder = document.querySelector('#colder');
  const cityChange = document.querySelector('#city');

  cityField.addEventListener('click', updateCity);
  cityChange.addEventListener('keydown', updateCityText);
  warmer.addEventListener('click', raiseTemp);
  colder.addEventListener('click', lowerTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
