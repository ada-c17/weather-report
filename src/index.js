'use strict';

const state = {
  temperature: 40,
};

// function to display the realtime temperature and update the color/landscape with the new temperature
const getLiveTemp = (event) => {
  //get the city name we want to search
  const cityTitleName = document.getElementById('city-title-name');
  // get the actual string of the city name
  const city = cityTitleName.textContent;
  //get the temperature we want to change
  const tempNumber = document.getElementById('temperature-number');
  // run the location API to get lat long, then run the weather API using lat long, then reassign the temp
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      const searchResult = response.data[0];
      const latitude = searchResult.lat;
      const longitude = searchResult.lon;
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: latitude,
            lon: longitude,
          },
        })
        .then((response) => {
          const tempKelvin = response.data.current.temp;
          const tempFahr = Math.round((tempKelvin - 273.15) * 1.8 + 32);
          tempNumber.textContent = `${tempFahr}°F`;
          state.temperature = tempFahr;
          //re-running the temp color and landscape function with our new temp
          changeTempColor();
          changeLandscape();
        })
        .catch((error) => {
          console.log('error with weather API!', error.response.data);
        });
    })
    .catch((error) => {
      console.log('error with location API!', error.response.data);
    });
};

// function to change temp color
const changeTempColor = (event) => {
  const tempNumber = document.getElementById('temperature-number');
  let tempColor = 'black';
  if (state.temperature >= 80) {
    tempColor = 'red';
  } else if (state.temperature >= 70) {
    tempColor = 'orange';
  } else if (state.temperature >= 60) {
    tempColor = 'yellow';
  } else if (state.temperature >= 50) {
    tempColor = 'green';
  } else if (state.temperature <= 49) {
    tempColor = 'teal';
  }
  tempNumber.className = tempColor;
  // tempNumber.setAttribute(color, tempColor); can't get this to work, will use class instead
};

// function to change landscape emojis
const changeLandscape = (event) => {
  const landscape = document.getElementById('landscape');
  let landscapeToDisplay = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  if (state.temperature >= 80) {
    landscapeToDisplay = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70) {
    landscapeToDisplay = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60) {
    landscapeToDisplay = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature <= 59) {
    landscapeToDisplay = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  landscape.textContent = `${landscapeToDisplay}`;
};

// function to change sky emojis
const updateSky = (event) => {
  const skyButton = document.getElementById('sky-button').value;
  const defaultSky = document.getElementById('sky');
  let sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  if (skyButton === 'Sunny') {
    sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyButton === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyButton === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyButton === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  defaultSky.textContent = sky;
};

// function to change city name
const changeCityName = (event) => {
  const cityName = document.getElementById('city-name');
  let cityInput = cityName.value;
  const cityTitleName = document.getElementById('city-title-name');
  cityTitleName.textContent = `${cityInput}`;
};

// function to reset city
const resetCityName = (event) => {
  const cityNameInput = document.getElementById('city-name');
  cityNameInput.value = '';
  changeCityName();
};

//  function to decrease temp
const decreaseTemp = (event) => {
  state.temperature -= 1;
  const temperatureContainer = document.querySelector('#temperature-number');
  temperatureContainer.textContent = `${state.temperature}°F`;
};

//  function to increase temp
const increaseTemp = (event) => {
  state.temperature += 1;
  const temperatureContainer = document.querySelector('#temperature-number');
  temperatureContainer.textContent = `${state.temperature}°F`;
};

// Register the event listener
const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#up-button');
  upButton.addEventListener('click', increaseTemp);
  upButton.addEventListener('click', changeTempColor);
  upButton.addEventListener('click', changeLandscape);

  const downButton = document.querySelector('#down-button');
  downButton.addEventListener('click', decreaseTemp);
  downButton.addEventListener('click', changeTempColor);
  downButton.addEventListener('click', changeLandscape);

  const cityInput = document.querySelector('#city-name');
  cityInput.addEventListener('input', changeCityName);

  const cityNameResetBtn = document.getElementById('reset-button');
  cityNameResetBtn.addEventListener('click', resetCityName);

  const realCityButton = document.querySelector('#realtimeTemp');
  realCityButton.addEventListener('click', getLiveTemp);

  const skyButton = document.getElementById('sky-button');
  skyButton.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
