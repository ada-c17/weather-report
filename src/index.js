'use strict';

const cityID = document.getElementById('cityid');
const displayName = document.getElementById('display-name');
const displaySky = document.getElementById('display-sky');
const skyType = document.getElementById('skytype');
const reset = document.getElementById('reset');
const defaultCity = '...';
const defaultTemp = '65 ℉';
const tempBtn = document.getElementById('realtime-temp');
let temperature = document.getElementById('amountSpan');

let state = {
  city: '',
  temperature: 65,
};

const addBtn = () => {
  state.temperature += 1;
  console.log(state);
  const currentTemperature = document.querySelector('#amountSpan');
  currentTemperature.textContent = `${state.temperature} ℉`;
};

const subBtn = () => {
  state.temperature -= 1;
  const currentTemperature = document.querySelector('#amountSpan');
  currentTemperature.textContent = `${state.temperature} ℉`;
};

const changeColorAndLandscapeBasedOnTemp = () => {
  let tempColor = document.getElementById('amountSpan');
  let landscape = document.querySelector('#landscape-container');
  if (state.temperature >= 80) {
    tempColor.className = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🍳';
  } else if (state.temperature >= 70 && state.temperature < 80) {
    tempColor.className = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature < 70) {
    tempColor.className = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature < 60) {
    tempColor.className = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature < 50) {
    tempColor.className = 'teal';
    landscape.textContent = '⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️';
  }
};

let lat;
let lon;
const getLocation = () => {
  axios
    .get('http://localhost:5000/location', {
      params: { q: displayName.textContent },
    })
    .then((response) => {
      console.log(response);
      lat = response.data[0].lat;
      lon = response.data[0].lon;
      state.city = displayName.textContent;
      getWeather(lat, lon);
      console.log('Location: ', displayName.textContent);
      console.log(lat, lon);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getWeather = () => {
  axios
    .get('http://localhost:5000/weather', { params: { lat: lat, lon: lon } })
    .then((response) => {
      console.log(response);
      const kelvin = response.data.current.temp;
      const fahrenheit = Math.floor(((kelvin - 273.15) * 9) / 5 + 32);
      temperature.textContent = `${fahrenheit} ℉`;
      changeColorAndLandscapeBasedOnTemp();
      console.log(`Temp in fahrenheit: ${fahrenheit}`);

      state.temperature = fahrenheit;
    })
    .catch((error) => {
      console.log(error);
    });
};


const updateCity = () => {
  displayName.textContent = cityID.value;
};

const resetCity = () => {
  cityID.value = '';
  displayName.textContent = defaultCity;
  temperature.textContent = defaultTemp;
};

const changeSky = (e) => {
  const skyType = e.target.value;
  if (skyType == 'cloudy') {
    displaySky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  }
  if (skyType == 'rainy') {
    displaySky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  }
  if (skyType == 'snowy') {
    displaySky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  if (skyType == 'sunny') {
    displaySky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  }
};

const updateTemp = () => {
  getLocation();
  console.log('after getLocation()');
  changeColorAndLandscapeBasedOnTemp();
};

const registerEventHandlers = () => {
  const increaseTemperature = document.querySelector('#add');
  increaseTemperature.addEventListener('click', addBtn);
  increaseTemperature.addEventListener(
    'click',
    changeColorAndLandscapeBasedOnTemp
  );
  const decreaseTemperature = document.querySelector('#sub');
  decreaseTemperature.addEventListener('click', subBtn);
  decreaseTemperature.addEventListener(
    'click',
    changeColorAndLandscapeBasedOnTemp
  );

  cityID.addEventListener('input', updateCity);

  skyType.addEventListener('change', changeSky);

  reset.addEventListener('click', resetCity);
  tempBtn.addEventListener('click', updateTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers);
