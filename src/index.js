// import 'regenerator-runtime/runtime';
// import axios from 'axios';

// const axios = required('axios');

// Define initial state
const state = {
  temp: '',
  city: '',
};

// Select DOM elements
const currentTemp = document.getElementById('currentTemp');
// const incrementButton = document.getElementById('increaseTempButton');
// const decrementButton = document.getElementById('decreaseTempButton');
const seasonalChange = document.getElementById('seasonalChange');
const searchCity = document.getElementById('searchCity');
const cityDisplay = document.getElementById('cityDisplay');
const currentTempButton = document.getElementById('currentTempButton');
const resetButton = document.getElementById('resetBtn');

// const selectSkies = document.getElementById('skies');
// const selection = selectSkies.options[selectSkies.selectedIndex].value;
// const skyChoice = document.getElementById('skyChoice');

// Update temperature display
const updateTemp = () => {
  currentTemp.textContent = state.temp;
  alterTextColor();
};

// Update city display
const updateCity = () => {
  const currentCity = document.getElementById('searchCity').value;
  console.log(currentCity);
  state.city = currentCity;
  cityDisplay.textContent = state.city;
};

// Change sky emoji based on selected weather
const changeSky = () => {
  // let skyContent = document.getElementById('body').style.background
  //   const skyContent = document.getElementById('skyChoice');
  //   let skyScape = '';
  const selectSkies = document.getElementById('skies').value;
  //   let selection = this.value || document.getElementById('skies').value;
  let selection = selectSkies;
  if (selection === 'heartEyes') {
    console.log('changing to heart eyes emoji');
    seasonalChange.textContent = '😍';
  } else if (selection === 'kiss') {
    console.log('changing to kiss emoji');
    seasonalChange.textContent = '😘';
  } else if (selection === 'tongue') {
    console.log('changing to tongue out emoji');
    seasonalChange.textContent = '😛';
  } else if (selection === 'pigNose') {
    console.log('changing to pig nose emoji');
    seasonalChange.textContent = '🐽';
  } else if (selection === 'mushroom') {
    console.log('changing to mushroom emoji');
    seasonalChange.textContent = '🍄';
  }
};

// change the sky
// const setIcon = (icons, iconID) => {
//   const skycons = new Skycons({ color: '#2b2d42' });
//   const currentIcon = icons.replace(/-/g, '_').toUpperCase();
//   skycons.play();
//   return skycons.set(iconID, skycons[currentIcon]);
// };

// Event listener registration
const registerEventHandlers = () => {
  searchCity.addEventListener('input', updateCity);
  currentTempButton.addEventListener('click', findLatitudeAndLongitude);
  document.getElementById('skies').addEventListener('change', changeSky);
  resetButton.addEventListener('click', refreshPage);
  document.addEventListener('keypress', handleKeyPress);
  //   selectSkies.addEventListener('change', changeSky);
};

// Refresh page function
const refreshPage = () => {
  location.reload();
  console.log('refreshPage');
};

// Handle key press event
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    currentTempButton.click();
  }
};

const convertKelvinToFahrenheit = (kelvin) => {
  let fahrenheit;
  fahrenheit = parseInt(1.8 * (kelvin - 273) + 32);
  return fahrenheit;
};

// Find latitude and longitude based on city name
const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      // make the next API call here!
      findTemperature(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

// Find temperature based on latitude and longitude
const findTemperature = (latitude, longitude) => {
  console.log(latitude, longitude);
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      // console.log(response);
      // console.log(response.data.main.temp);
      const kelvin = response.data['main']['temp'];
      // const kelvin = response.data.main.temp;
      state.temp = convertKelvinToFahrenheit(kelvin);
      updateTemp();

      const weatherCondition = response.data.weather[0].main;
      console.log('Weather Condition:', weatherCondition);
      updateSeasonalChange(weatherCondition);
    })
    .catch((error) => {
      console.log('error in weather info!');
    });
};

const alterTextColor = () => {
  if (state.temp > 95) {
    console.log('changing to red');
    return (currentTemp.style.color = '#ec5766');
  } else if (state.temp >= 85) {
    console.log('changing to orange');
    return (currentTemp.style.color = '#fda187');
  } else if (state.temp >= 75) {
    console.log('changing to yellow');
    return (currentTemp.style.color = '#F1FFC4');
  } else if (state.temp >= 60) {
    console.log('changing to green');
    return (currentTemp.style.color = '#b4f9c0');
  } else if (state.temp >= 45) {
    console.log('changing to teal');
    return (currentTemp.style.color = '#5dac97');
  } else if (state.temp >= 30) {
    console.log('changing to blue');
    return (currentTemp.style.color = '#6da3ee');
  } else if (state.temp <= 29) {
    console.log('changing to ice blue');
    return (currentTemp.style.color = '#c2f6ff');
  }
  console.log('text color did not change');
};

const updateSeasonalChange = (weatherCondition) => {
  const weatherIcons = {
    rain: '🌧',
    clear: '🔆',
    thunderstorm: '⛈',
    snow: '⛄',
    clouds: '⛅',
  };

  const defaultIcon = '✨';
  const icon = weatherIcons[weatherCondition.toLowerCase()] || defaultIcon;

  seasonalChange.textContent = icon;
};

// the entry point for setting up the initial state of the app
const initialize = () => {
  changeSky();
  registerEventHandlers();
};

// When the DOMContentLoaded event is triggered, it signals that it's safe to
// manipulate the DOM and execute JavaScript code that interacts with DOM elements,
// initiating the setup process for the application by calling the initialize function
document.addEventListener('DOMContentLoaded', initialize);
