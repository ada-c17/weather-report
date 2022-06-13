'use strict';

// State tracking object
const weather = {
  temperature: 72,
  clouds: 0,
  condition: 'Clear',
  city: 'Atlanta',
  updating: false,
};

// Add options to select menu
const skies = ['☀️', '🌤', '⛅️', '🌥', '🌦', '🌧', '🌈'];
const skyMenu = document.getElementById('sky-selector');

const createOption = (emoji) => {
  const opt = document.createElement('option');
  opt.textContent = emoji;
  if (emoji === '☀️') {
    opt.selected = true;
  }
  return opt;
};

for (const skyOption of skies.map(createOption)) {
  skyMenu.appendChild(skyOption);
}

// Helper functions used in updates
const tempClass = () => {
  if (weather.temperature > 87) {
    return 'hot';
  }
  if (weather.temperature > 77) {
    return 'warm';
  }
  if (weather.temperature > 67) {
    return 'goldilocks';
  }
  if (weather.temperature > 57) {
    return 'cool';
  }
  return 'cold';
};

const skyClass = () => {
  if (weather.clouds < 11) {
    return '☀️';
  }
  if (weather.clouds < 25) {
    return '🌤';
  }
  if (weather.clouds < 51) {
    return '⛅️';
  }
  if (
    weather.clouds < 85 &&
    weather.condition in { Rain: '', Drizzle: '', Thunderstorm: '' }
  ) {
    return '🌦';
  }
  if (
    weather.clouds >= 85 &&
    weather.condition in { Rain: '', Drizzle: '', Thunderstorm: '' }
  ) {
    return '🌧';
  }
  return '🌥';
};

// Manual triggering of change event on select menu
const changeSkySelection = () => {
  const selectElement = document.querySelector('#sky-selector');
  selectElement.value = `${skyClass()}`;
  selectElement.dispatchEvent(new Event('change'));
};

// Update temperature display and landscape
const updateTempDisplay = () => {
  document.querySelector('#temp-display h1').textContent = weather.temperature;
  document.getElementById('temp-display').classList = `${tempClass()}`;
  document.getElementById('landscape').classList = tempClass(
    weather.temperature
  );
};

// Handles clicks on temp controls
const changeTemp = (e) => {
  console.log(e.target.id);
  e.target.id === 'heat' ? weather.temperature++ : weather.temperature--;
  updateTempDisplay();
};

// Toggles visibility of input box for editing City value
const toggleUpdating = () => {
  weather.updating = !weather.updating;
  const inputArea = document.getElementById('city-input');
  const inputBox = document.getElementById('input-box');
  if (weather.updating) {
    inputArea.classList = 'updating';
    inputBox.value = '';
    inputBox.focus();
  } else {
    inputArea.classList = '';
  }
};

// Processes text entered in input box at each keypress
const updateCity = (e) => {
  if (e.keyCode === 13) {
    toggleUpdating();
    document.activeElement.blur();
    realWeatherQuery();
  } else {
    let val = e.target.value;
    const last = /^\p{L}$/iu.test(e.key) ? e.key : '';
    if (e.key === 'Backspace') {
      val = val.substring(0, val.length - 1);
    }
    weather.city = `${val}${last}`;
    document.getElementById('city-name').textContent = weather.city;
  }
};

// Temperature conversion from Kelvin for API call
const kTempToF = (k) => (k - 273.15) * 1.8 + 32;

// API call when user wants reality-check
const realWeatherQuery = () => {
  const realWeather = axios
    .get(`http://127.0.0.1:5000/location?q=${weather.city}`)
    .then((response) =>
      axios.get('http://127.0.0.1:5000/weather', {
        params: {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
          units: 'imperial',
        },
      })
    )
    .catch((e) => console.log(e))
    .then((response) => {
      weather.clouds = response.data.current.clouds;
      weather.condition = response.data.current.weather[0].main;
      weather.temperature = kTempToF(response.data.current.temp).toFixed(0);
      updateTempDisplay();
      changeSkySelection();
    })
    .catch((e) => console.log(e));
};

// Adds elements to page for rain effect
const makeRain = () => {
  const wrapper = document.createElement('div');
  wrapper.classList = 'drop-row';
  wrapper.id = 'rain-overlay';
  [...Array(5)].forEach((_, i) => {
    const drop = document.createElement('div');
    drop.classList = 'drop';
    wrapper.appendChild(drop);
  });
  document.querySelector('main').appendChild(wrapper);
};

// Handles 'change' event on select menu and updates background
const updateSky = (e) => {
  document.querySelector('main').classList = e.target.value;
  if (e.target.value === '🌦' || e.target.value === '🌧') {
    if (document.getElementsByClassName('drop-row').length === 0) {
      makeRain();
    }
  } else {
    if (document.getElementsByClassName('drop-row').length > 0) {
      document.getElementById('rain-overlay').remove();
    }
  }
};

// Resets city name
const defaultCity = () => {
  weather.city = 'Atlanta';
  document.getElementById('city-name').textContent = weather.city;
};

const registerEventHandlers = () => {
  const controls = document.getElementsByClassName('temp-control');
  for (const control of controls) {
    control.addEventListener('click', changeTemp);
  }
  document
    .getElementById('city-name')
    .addEventListener('click', toggleUpdating);

  document
    .querySelector('#city-input input')
    .addEventListener('keydown', updateCity);

  document
    .getElementById('reality-check')
    .addEventListener('click', realWeatherQuery);

  document.getElementById('city-reset').addEventListener('click', defaultCity);

  document.getElementById('sky-selector').addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
