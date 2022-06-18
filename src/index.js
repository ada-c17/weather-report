'use strict';

// creating state, holds temperature
const state = {
  temperatureCount: 0,
  landscape: document.getElementById('landscape'),
  location: '',
};

// ******TEMP control********
const changeTemperatureEnvironment = (displayTemperatureEl) => {
  // displayTemperatureEl.className = "padding-5";

  if (state.temperatureCount <= 49) {
    displayTemperatureEl.classList.add('teal');
  } else if (state.temperatureCount <= 59) {
    displayTemperatureEl.classList.add('green');
    displayTemperatureEl.classList.remove('teal');
    state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperatureCount <= 69) {
    displayTemperatureEl.classList.add('yellow');
    state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    displayTemperatureEl.classList.remove('green');
  } else if (state.temperatureCount <= 79) {
    displayTemperatureEl.classList.add('orange');
    state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    displayTemperatureEl.classList.remove('yellow');
  } else {
    displayTemperatureEl.classList.add('red');
    state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    displayTemperatureEl.classList.remove('orange');
  }
};

// CHANGING TEMP
const incOrDecTemperatureCount = (tempChangeValue) => {
  state.temperatureCount += tempChangeValue;
  updateDisplayedTemp();
};

const updateDisplayedTemp = () => {
  const displayTemperatureEl = document.getElementById('displayTemperature');
  changeTemperatureEnvironment(displayTemperatureEl);
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};

// ***** change CITY*******
const changeCityDisplay = (event) => {
  const cityEl = document.getElementById('city');
  cityEl.textContent = `${event.target.value}`;
};

const updateCity = () => {
  state.location = document.getElementById('city-input').value;
  console.log(state.location);
  getLatLon();
};

//****** API calls ********
// move the code using axios into a helper function called when the Current Temperature button is clicked
const getLatLon = () => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.location,
      },
    })
    .then((response) => {
      console.log(response);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      return [latitude, longitude];
    })
    .then((response) => {
      getWeather(response[0], response[1]);
    })
    .catch((error) => {
      console.log('Error. Location not found.');
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const tempKelvin = response.data.current.temp;
      state.temperatureCount = Math.floor(((tempKelvin - 273.15) * 9) / 5 + 32);
      updateDisplayedTemp();
    });
};

//***** EVENT HANDLERS********
const registerEventHandlers = () => {
  // arrow click increases or decreases temperature
  const upArrowEl = document.getElementById('upArrow');
  upArrowEl.addEventListener('click', () => {
    incOrDecTemperatureCount(1);
  });

  const downArrowEl = document.getElementById('downArrow');
  downArrowEl.addEventListener('click', () => {
    incOrDecTemperatureCount(-1);
  });

  // Updates the display of city name
  const inputEl = document.getElementById('city-input');
  inputEl.addEventListener('input', changeCityDisplay);

  // clicking 'Current Temperature' button should display the current temperature
  const currentTempButtonEl = document.getElementById('currentTemperature');
  const cityName = document.getElementById('city-input').innerHTML;
  currentTempButtonEl.addEventListener('click', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
