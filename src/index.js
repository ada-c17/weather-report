'use strict';

const state = {
  city: 'Boston',
  temp: 60,
};

const increaseTemp = () => {
  state.temp += 1;
  updateTempInfo();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTempInfo();
};

const updateTempInfo = () => {
  const temperature = document.querySelector('#temp');
  let landscape;
  if (state.temp >= 80) {
    temperature.className = 'red';
    landscape = '☀️🏖☀️🏝☀️⛵️';
  } else if (state.temp >= 70) {
    temperature.className = 'orange';
    landscape = '🏕🌤💐🏔🌤';
  } else if (state.temp >= 60) {
    temperature.className = 'yellow';
    landscape = '☔️🍃🌦🍃💨🌦';
  } else if (state.temp >= 50) {
    temperature.className = 'green';
    landscape = '☃️❄️🏂⛄️🌨🎄';
  } else if (state.temp <= 49) {
    temperature.className = 'aqua';
    landscape = '🧊🧊🥶🧊🧊🥶';
  }
  temperature.textContent = state.temp;
  const updatedLandscape = document.querySelector('#landscape-icons');
  updatedLandscape.textContent = landscape;
};

const updateCityName = () => {
  const cityName = document.querySelector('#city-name');
  const cityInput = document.querySelector('#city-input');
  state.city = cityInput.value;
  cityName.textContent = state.city;
};

const KelvinToFarenheit = (kelvin) => {
  return 1.8 * (kelvin - 273.15) + 32;
};

const getLatAndLong = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      console.log(response);
      const lat = response.data[0].lat;
      const long = response.data[0].lon;
      //   return { lat, long };
      getWeatherForCity(lat, long);
    })
    .catch((error) => {
      console.log('Error in getLatAndLong', error.respose);
    });
};

const getTempForCity = (lat, long) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: long,
      },
    })
    .then((response) => {
      console.log(response.data);
      const kelvin = response.data['current']['temp'];
      console.log(kelvin);
      state.temp = KelvinToFarenheit(kelvin);
      updateTempInfo();
    })
    .catch((error) => {
      console.log('Error in getTempForCity', error.response);
    });
};

const displaySkySelection = (sky) => {
  let skyIcon;
  if (sky === 'Sunny') {
    skyIcon = '🌞☀️🌞☀️🌞☀️';
    console.log('sunny');
  } else if (sky === 'Cloudy') {
    skyIcon = '🌥⛅️🌤🌥⛅️🌥';
  } else if (sky === 'Rainy') {
    skyIcon = '🌧☔️⛈🌧☔️⛈';
  } else if (sky === 'Snowy') {
    skyIcon = '🌨❄️☃️🌨☃️❄️';
  }
  const updatedSky = document.querySelector('#sky-icons');
  updatedSky.textContent = skyIcon;
};

const selectSkyOption = () => {
  const skySelection = document.querySelector('#select-sky');
  displaySkySelection(skySelection.value);
};

const resetCityName = () => {
  const cityInput = document.querySelector('#city-input');
  const cityName = document.querySelector('#city-name');
  cityInput.value = '';
  state.city = 'Boston';
  cityName.textContent = state.city;
  getTempForCity();
};

// Register Event Handlers:
const registerEventHandlers = () => {
  const increaseButton = document.querySelector('#increase-temp');
  increaseButton.addEventListener('click', increaseTemp);
};

const decreaseButton = document.querySelector('#decrease-temp');
decreaseButton.addEventListener('click', decreaseTemp);

const inputCity = document.querySelector('#city-input');
inputCity.addEventListener('input', updateCityName);

const getTempButton = document.querySelector('#get-temp-button');
getTempButton.addEventListener('click', getLatAndLong);

const selectSkyMenu = document.querySelector('#select-sky');
selectSkyMenu.addEventListener('change', selectSkyOption);

// Event listener for the entire document when is reloaded
document.addEventListener('DOMContentLoaded', registerEventHandlers);
