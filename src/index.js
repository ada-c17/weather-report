'use strict';

// State tracking object
const weather = {
  temperature: 72,
  clouds: 0,
  condition: 'Clear',
  city: 'Atlanta',
  updating: false,
};

// Dynamically create sky-selection menu based on emoji array
const createSkyOption = (emoji) => {
  const opt = document.createElement('option');
  opt.textContent = emoji;
  if (emoji === '☀️') {
    opt.selected = true;
  }
  return opt;
};

const createSkyMenu = (skies) => {
  const skyMenu = document.getElementById('sky-selector');
  for (const skyOption of skies.map(createSkyOption)) {
    skyMenu.appendChild(skyOption);
  }
};

createSkyMenu(['☀️', '🌤', '⛅️', '🌥', '🌦', '🌧', '🌈']);

// Helper functions used during updates to set css classes
const tempClass = () => {
  const BOUNDS = [
    { upperBound: 57, color: 'cold' },
    { upperBound: 67, color: 'cool' },
    { upperBound: 77, color: 'goldilocks' },
    { upperBound: 87, color: 'warm' },
    { upperBound: Infinity, color: 'hot' },
  ];
  for (const { upperBound, color } of BOUNDS) {
    if (weather.temperature < upperBound) {
      return color;
    }
  }
};

const skyClass = () => {
  const BOUNDS = [
    { upperBound: 11, rain: false, sky: '☀️' },
    { upperBound: 25, rain: false, sky: '🌤' },
    { upperBound: 51, rain: false, sky: '⛅️' },
    { upperBound: 85, rain: true, sky: '🌦' },
    { upperBound: Infinity, rain: true, sky: '🌧' },
    { upperBound: Infinity, rain: false, sky: '🌥' },
  ];
  const isRaining =
    weather.condition in { Rain: '', Drizzle: '', Thunderstorm: '' };
  for (const { upperBound, rain, sky } of BOUNDS) {
    if (weather.clouds < upperBound && isRaining === rain) {
      return sky;
    }
  }
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
  document.getElementById('temp-display').classList = tempClass();
  document.getElementById('landscape').classList = tempClass();
};

// Handles clicks on temp controls
const changeTemp = (e) => {
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
const PROXY_URL = 'https://wr-proxy.herokuapp.com';
const realWeatherQuery = () => {
  axios
    .get(`${PROXY_URL}/location`, {
      params: {
        q: weather.city,
      },
    })
    .then((response) =>
      axios.get(`${PROXY_URL}/weather`, {
        params: {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
          units: 'imperial',
        },
      })
    )
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
