"use strict";

const state = {
  temperatureCount: 0,
};


const changeTemperatureEnvironment = (displayTemperatureEl) => {
  // displayTemperatureEl.className = "padding-5"; 
  const landscape = document.getElementById("landscape");

  if (state.temperatureCount <= 49) {
    displayTemperatureEl.classList.add("teal");
  }
  else if (state.temperatureCount <= 59) {
    displayTemperatureEl.classList.add("green");
    displayTemperatureEl.classList.remove("teal");
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  }
  else if (state.temperatureCount <= 69) {
    displayTemperatureEl.classList.add("yellow");
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    displayTemperatureEl.classList.remove("green");
  } 
  else if (state.temperatureCount <= 79) { 
    displayTemperatureEl.classList.add("orange");
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    displayTemperatureEl.classList.remove("yellow");
  }
  else {
    displayTemperatureEl.classList.add("red");
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    displayTemperatureEl.classList.remove("orange");
  }
};


const incOrDecTemperatureCount = (tempChangeValue) => {
  const displayTemperatureEl = document.getElementById('displayTemperature');
  // maybe pass operation into `tempChangeValue`?
  state.temperatureCount += tempChangeValue;
  changeTemperatureEnvironment(displayTemperatureEl);
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};


const changeCityName = (event) => {
  const cityEl = document.getElementById('city');
  cityEl.textContent = `${event.target.value}`;
};

// move the code using axios into a helper function called when the Current Temperature button is clicked
const showCurrentTemperature = () => {
  const LOCATION_KEY = process.env['LOCATION_KEY'];
  let latitude, longitude;
  const cityText = document.getElementById('city').innerHTML;

  axios.get('http://127.0.0.1:5500/location',
  {
    params: {
      key: LOCATION_KEY,
      q: cityText,
      format: 'json'
    }
  })
  .then( (response) => {
    console.log('Success. Location found.');
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log(`Latitude: ${latitude}, longitude ${longitude}`);
  })
  .catch((error) => {
    console.log('Error. Location not found.')
  });
};


const registerEventHandlers = () => {
  const upArrowEl = document.getElementById('upArrow');
  upArrowEl.addEventListener('click', () => {incOrDecTemperatureCount(1)});

  const downArrowEl = document.getElementById('downArrow');
  downArrowEl.addEventListener('click', () => {incOrDecTemperatureCount(-1)});

  const inputEl = document.getElementById('city-input');
  inputEl.addEventListener('input', changeCityName);
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);