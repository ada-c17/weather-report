'use strict';

const state = {
  temp: 20,
  city: 'New York City',
  lat: 0,
  lon: 0,
};

const updateColor = () => {
  let hex;
  if (state.temp >= 30) {
    hex = '#e30022';
  } else if (state.temp >= 25) {
    hex = '#ff4500';
  } else if (state.temp >= 20) {
    hex = '#efcc00';
  } else if (state.temp >= 15) {
    hex = '#00a550';
  } else if (state.temp < 15) {
    hex = '#0d98ba';
  }
  return hex;
};

const updateLandscape = () => {
  let emojis;
  if (state.temp >= 30) {
    emojis = '🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋🌋';
  } else if (state.temp >= 25) {
    emojis = '⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️⛰️';
  } else if (state.temp >= 20) {
    emojis = '🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️🏔️';
  } else if (state.temp < 20) {
    emojis = '🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻🗻';
  }
  return emojis;
};

const updateSky = () => {
  const selectedSky = document.querySelector('#chooseSky').value;
  const emojiSky = document.querySelector('#skyView');
  const backgroundSky = document.querySelector('#view');

  if (selectedSky === 'Sunny') {
    emojiSky.textContent = '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️';
    backgroundSky.className = 'window_view_sunny';
  } else if (selectedSky === 'Rainy') {
    emojiSky.textContent = '🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️';
    backgroundSky.className = 'window_view_rainy';
  } else if (selectedSky === 'Cloudy') {
    emojiSky.textContent = '☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️';
    backgroundSky.className = 'window_view_cloudy';
  } else if (selectedSky === 'Snowy') {
    emojiSky.textContent = '🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️🌨️';
    backgroundSky.className = 'window_view_snowy';
  }
};

const updateCity = () => {
  const city = document.querySelector('#changeCityTo');
  return city.value;
};

const tempUp = (event) => {
  const temp = document.querySelector('#temp');
  state.temp += 1;
  setTemp();
  setLandscape();
};

const tempDown = (event) => {
  const temp = document.querySelector('#temp');
  state.temp -= 1;
  setTemp();
  setLandscape();
};

const setTemp = () => {
  const temp = document.querySelector('#temp');
  temp.textContent = `${state.temp}°C`;
  temp.style.color = updateColor();
};

const setLandscape = () => {
  const landscape = document.querySelector('#landscapeView');
  landscape.textContent = updateLandscape();
};

const setCity = () => {
  state.city = updateCity();
  const city = document.querySelector('#city');
  city.textContent = state.city;
};

const resetTheCity = () => {
  const cityInput = document.querySelector('#changeCityTo');
  state.city = 'New York City';
  cityInput.value = '';
  const cityInHeader = document.querySelector('#city');
  cityInHeader.textContent = state.city;
};

const currentLatLon = () => {
  //let lat, long;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      console.log(response.data);
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      fetchTemp();
    })
    .catch((error) => {
      console.log('Error calling LocationIQ:', error);
    });
};

const fetchTemp = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const weather = response.data;
      state.temp = Math.round(weather.current.temp - 273.15);
      setTemp();
      setLandscape();
    })
    .catch((error) => {
      console.log('Error calling OpenWeather:', error);
    });
};

const registerEventHandlers = (event) => {
  const increaseTemp = document.querySelector('#increaseTemp');
  increaseTemp.addEventListener('click', tempUp);
  const decreaseTemp = document.querySelector('#decreaseTemp');
  decreaseTemp.addEventListener('click', tempDown);
  const changeCityTo = document.querySelector('#changeCityTo');
  changeCityTo.addEventListener('input', setCity);
  const resetTemp = document.querySelector('#currentTemp');
  resetTemp.addEventListener('click', currentLatLon);
  const chooseSky = document.querySelector('#chooseSky');
  chooseSky.addEventListener('change', updateSky);
  const resetCity = document.querySelector('#resetCity');
  resetCity.addEventListener('click', resetTheCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
