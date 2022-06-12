'use strict';

const landscapes = {
  hot: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  warm: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  goldilocks: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  cool: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  cold: '❄️',
};

const weather = {
  temperature: 72,
  city: 'Atlanta',
  updating: false,
};

const tempClass = (temp) => {
  if (temp > 87) {
    return 'hot';
  }
  if (temp > 77) {
    return 'warm';
  }
  if (temp > 67) {
    return 'goldilocks';
  }
  if (temp > 57) {
    return 'cool';
  }
  return 'cold';
};

const updateTempDisplay = () => {
  document.querySelector('#temp-display h1').textContent = weather.temperature;
  document.getElementById('temp-display').classList = `${tempClass(
    weather.temperature
  )}`;
  document.querySelector('#landscape h1').textContent =
    landscapes[tempClass(weather.temperature)];
};

const changeTemp = (e) => {
  console.log(e.target.id);
  e.target.id === 'heat' ? weather.temperature++ : weather.temperature--;
  updateTempDisplay();
};

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

const updateCity = (e) => {
  if (e.keyCode === 13) {
    toggleUpdating();
    document.activeElement.blur();
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

const kTempToF = (k) => (k - 273.15) * 1.8 + 32;

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
      weather.temperature = kTempToF(response.data.current.temp).toFixed(0);
      // console.log(response);
      updateTempDisplay();
    })
    .catch((e) => console.log(e));
};

const updateSky = (e) => {
  document.querySelector('main').classList = e.target.value;
};

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

document.addEventListener('DOMContentLoaded', registerEventHandlers);
