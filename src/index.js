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

const updateTempAndColor = () => {
  document.getElementById(
    'weather'
  ).style.color = `hsl(${calculateColor()}, 75%, 50%)`;
  document.getElementById('weather').textContent = state.temperature;
};

updateTempAndColor();

const registerEventHandlers = (event) => {
  const cityField = document.querySelector('#cityButton');
  const warmer = document.querySelector('#warmer');
  const colder = document.querySelector('#colder');

  cityField.addEventListener('click', updateCity);

  warmer.addEventListener('click', raiseTemp);
  colder.addEventListener('click', lowerTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
