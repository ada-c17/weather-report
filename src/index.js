'use strict';

const state = {
  temperature: 75,
  defaultCity: 'Tampa, FL',
};

// api call to locationiq
const getLatAndLon = (query) => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: query,
      },
    })
    .then((response) => {
      console.log(response.data);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      updateWeather(latitude, longitude);
    });
};

// api call to openweather
const updateWeather = (latitude, longitude) => {
  console.log(latitude, longitude);
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      console.log(response.data);
      let kelvinTemp = response.data.current.temp;

      let farTemp = Math.round((9 / 5) * (kelvinTemp - 273)) + 32;
      console.log(farTemp);

      setTemp(farTemp);
    });
};

// change landscape
const background = document.getElementById('main-container');
background.style.width = '100%';
background.style.height = '500px';

// helper function setTemp
// take current temp as parameter
const setTemp = (temp) => {
  state.temperature = temp;
  updateTempDisplay();
};

const updateTempDisplay = () => {
  const tempContainer = document.getElementById('temp');
  tempContainer.textContent = `${state.temperature}`;

  if (state.temperature >= 80) {
    tempContainer.style.color = 'red';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/desert_landscape.jpg')";
  } else if (state.temperature >= 70) {
    tempContainer.style.color = 'orange';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/spring_landscape.jpg')";
  } else if (state.temperature >= 60) {
    tempContainer.style.color = '#FFEA00';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/fall_landscape.jpg')";
  } else if (state.temperature >= 50) {
    tempContainer.style.color = '#50C878';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/winter_landscape.jpg')";
  } else {
    tempContainer.style.color = 'teal';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/winter_landscape.jpg')";
  }
};

const increaseTemp = () => {
  setTemp(state.temperature + 1);
};

const decreaseTemp = () => {
  setTemp(state.temperature - 1);
};

// change text to reflect search input
const updateCity = (event) => {
  const log = document.getElementById('city-name');
  log.textContent = event.target.value;
};

const findSearchCity = () => {
  let cityName = document.getElementById('city-name');
  getLatAndLon(cityName.textContent);
};

// change sky
const updateSky = (event) => {
  const skySelection = event.target.value;
  const sky = document.getElementById('sky-container');
  if (skySelection === 'Rainy') {
    sky.innerHTML = '🌧🌈⛈🌧💧⛈🌧🌦💧🌧🌧';
  } else if (skySelection === 'Sunny') {
    sky.innerHTML = '☁️ ☁️ ☁️ ☁️  ☀️ ☀️ ☀️ ☁️ ☁️ ☁️ ☁️';
  } else if (skySelection === 'Cloudy') {
    sky.innerHTML = '☁️☁️☁️ ☁️ 🌤 🌤 🌤 ☁️ ☁️☁️☁️';
  } else if (skySelection === 'Snowy') {
    sky.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const resetCity = (city) => {
  let cityName = document.getElementById('city-name');
  cityName.innerHTML = state.defaultCity;
  findSearchCity();
};

const registerEventHandlers = () => {
  const tempUp = document.getElementById('up-arrow');
  tempUp.addEventListener('click', increaseTemp);

  const tempDown = document.getElementById('down-arrow');
  tempDown.addEventListener('click', decreaseTemp);

  const input = document.querySelector('input');
  input.addEventListener('input', updateCity);

  const realtimeWeather = document.getElementById('realtime-button');
  realtimeWeather.addEventListener('click', findSearchCity);

  const skySelect = document.getElementById('sky-select');
  skySelect.addEventListener('change', updateSky);

  const reset = document.getElementById('reset-button');
  reset.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
