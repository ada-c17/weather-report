'use strict';

// import axios from '.node_modules/axios';

const state = {
  temperature: 70,
  tempBackgroundColor: 'orange',
  landscape: '🌳🏞🌳🏞🌳🏞🌳',
  cityName: 'New York', //Put in a default city name and pass the state in rather than using a parameter
  lat: 47.6038321,
  long: -122.3300624,
  skyImageLink:
    'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
};

const domElements = {
  currentTemp: document.querySelector('#currentTemperature'),
  slider: document.querySelector('#slider'),
  landscape: document.querySelector('#landscape'),
  cityName: document.querySelector('#city-name'),
  cityButton: document.querySelector('#city-button'),
  cityNameInput: document.querySelector('#city-name-input'),
  skySelect: document.querySelector('#choose-sky'),
  skyImage: document.querySelector('#sky-image'),
  resetButton: document.querySelector('#reset-city'),
};

const render = {
  temperature: () => {
    domElements.currentTemp.textContent = state.temperature;
  },
  tempBackgroundChange: (backgroundColor, landscape) => {
    console.log(backgroundColor);
    domElements.currentTemp.style.backgroundColor = backgroundColor;
    domElements.landscape.textContent = landscape;
  },
  cityName: () => {
    domElements.cityName.textContent = state.cityName;
  },
  skyImage: () => {
    domElements.skyImage.setAttribute('src', state.skyImageLink);
  },
};

// if (temperature > 40) {

// }

const convertKtoF= (kelvin) => {
  return Math.floor(1.8 * (kelvin - 273) + 32)
  
}
const setBackgroundColorLandscape = (temperature) => {
  if (temperature > 80) {
    state.tempBackgroundColor = 'red';
    state.landscape = '🌞🏖👙🏖👙🏖👙';
    return;
  }
  if (temperature > 70) {
    state.tempBackgroundColor = 'orange';
    state.landscape = '🌳🏞🌳🏞🌳🏞🌳';
    return;
  }
  if (temperature > 60) {
    state.tempBackgroundColor = 'yellow';
    state.landscape = '🌲🧥🌲🧥🌲🧥';
    return;
  }
  if (temperature > 50) {
    state.tempBackgroundColor = 'green';
    state.landscape = '🏔🏔🏔🏔🏔🏔';
    return;
  }
  if (temperature < 49) {
    state.tempBackgroundColor = 'blue';
    state.landscape = '☃❄☃❄☃❄';
    return;
  }
};

const setSkyImage = (skyCondition) => {
  if (skyCondition === 'Sunny') {
    state.skyImageLink =
      'https://images.unsplash.com/photo-1615286628718-4a4c8924d0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    return;
  }
  if (skyCondition === 'Cloudy') {
    state.skyImageLink =
      'https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80';
    return;
  }
  if (skyCondition === 'Rainy') {
    state.skyImageLink =
      'https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    return;
  }
  if (skyCondition === 'Snowy') {
    state.skyImageLink =
      'https://images.unsplash.com/photo-1546023690-c2f8bcc37189?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80';
    return;
  }
};

const increaseTemp = () => {
  state.temperature += 1;
  // Ask about the temperature change
  weatherChange(state.temperature);
  render.temperature();
};

const decreaseTemp = () => {
  state.temperature -= 1;
  // Ask about the temperature change
  weatherChange(state.temperature);
  render.temperature();
};

const updateTemp = () => {
  state.temperature = domElements.slider.value;
  setBackgroundColorLandscape(state.temperature);
  render.temperature();
  render.tempBackgroundChange(state.tempBackgroundColor, state.landscape);
};

const updateCityTemp = () => {
state.temperature = domElements.cityNameInput.value;
setBackgroundColorLandscape(state.temperature);
render.temperature();
render.tempBackgroundChange(state.tempBackgroundColor, state.landscape);
};

const updateCityName = () => {
  state.cityName = `City: ${domElements.cityNameInput.value}`;
  render.cityName();
};

const updateSky = () => {
  const skyCondition =
    domElements.skySelect.options[domElements.skySelect.selectedIndex]
      .textContent;
  setSkyImage(skyCondition);
  console.log(
    domElements.skySelect.options[domElements.skySelect.selectedIndex]
  );
  console.log(
    domElements.skySelect.options[domElements.skySelect.selectedIndex]
      .textContent
  );

  render.skyImage();
};

const resetCity = () => {
  state.cityName = 'City:';
  domElements.cityNameInput.value = '';
  render.cityName();
};

const registerEventHandlers = () => {
  // const increaseTempButton = document.querySelector("#increaseTemp");
  // increaseTempButton.addEventListener("click", increaseTemp);
  // const decreaseTempButton = document.querySelector("#decreaseTemp");
  // decreaseTempButton.addEventListener("click", decreaseTemp);
  const changeTempSlider = document.querySelector('#slider');
  changeTempSlider.addEventListener('input', updateTemp);

  const cityNameInput = document.querySelector('#city-name-input');
  cityNameInput.addEventListener('keyup', updateCityName);

  const skySelect = document.querySelector('#choose-sky');
  skySelect.addEventListener('change', updateSky);

  const resetButton = document.querySelector('#reset-city');
  resetButton.addEventListener('click', resetCity);

  const getLocationTemp = document.querySelector('#city-button');
  getLocationTemp.addEventListener('click', getLatitudeLongitude);
};

// const axios = require('axios');
const getLatitudeLongitude = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityName,
      },
    });
    // Code which normally appears in the `then` block.
    console.log(response.data);
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    getTemperature(state.lat, state.lon)
    console.log('success in findLatitudeAndLongitude!', state.lat, state.lon);
  } catch (error) {
    // Code which normally appears in the `catch` block.
    console.log(error);
  }
};

const getTemperature = async (lat, lon) => {

  try {
    const response = await axios.get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    });
    console.log(response.data.current.temp)
    state.temperature = convertKtoF(response.data.current.temp);
    console.log(state.temperature)
    setBackgroundColorLandscape(state.temperature)
    updateCityTemp()
    updateSky()
  
  } catch (error) {
    console.log(`error in getTemperature:${error}`);
  }
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

let latLon = getLatitudeLongitude('New York');
getTemperature(latLon.latitude, latLon.longitude);
// What will do I want to do with the temperature now that i have it? return it

// const getTemperature = () => {
//   axios
//   .get('http://127.0.0.1:5000/weather', {
//     params: {
//       lat: state.lat,
//       lon:state.lon,
//     },
//   })
//   .then((response) => {
//     console.log('SUCCESS' + JSON.stringify(Response.data.currentTemp.temperature)
//     )
//   })
// .catch((error) => {
//     console.log('ERROR');
// }
