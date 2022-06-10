const GARDENSKIES = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};
const state = {
  tempValue: 60,
};

const incrementTemp = () => {
  state.tempValue += 1;
  const tempValue = document.querySelector('.tempValue');
  tempValue.textContent = state.tempValue;
  helperTempDependentLayout(state.tempValue, tempValue);
};

const decrementTemp = () => {
  state.tempValue -= 1;
  const tempValue = document.querySelector('.tempValue');
  tempValue.textContent = state.tempValue;
  helperTempDependentLayout(state.tempValue, tempValue);
};

const helperTempDependentLayout = (temp, el) => {
  const landscapeLayout = document.querySelector('#gardenLandscape');
  let color = '';
  let landscape = '';
  if (temp >= 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp < 80 && temp >= 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp < 70 && temp >= 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp < 60 && temp >= 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp < 50) {
    color = 'teal';
    landscape = '❄️🌲⛄️🌲❄️❄️🏂⛄️🌲❄️⛷🌲❄️❄️🌲';
  }
  el.style.color = color;
  landscapeLayout.textContent = landscape;
};

const updateTitleCity = () => {
  let titleCity = document.querySelector('#titleCity');
  console.log(cityName.value);
  titleCity.textContent = `${cityName.value}`;
};

const resetCity = () => {
  document.querySelector('#titleCity').textContent = 'Seattle';
  document.querySelector('#cityName').value = '';
const updateWeatherGardenSky = () => {
  let gardenSky = document.querySelector('#gardenSky');
  console.log(`${weatherSelector.value}`);
  gardenSky.textContent = GARDENSKIES[weatherSelector.value];
};

const registerEventHandlers = () => {
  const cityInput = document.querySelector('#cityName');
  cityInput.addEventListener('input', updateTitleCity);
  const resetBtn = document.querySelector('#resetBtn');
  resetBtn.addEventListener('click', resetCity);
  const weatherSelector = document.querySelector('#weatherSelector');
  weatherSelector.addEventListener('change', updateWeatherGardenSky);
  const incrementButton = document.querySelector('#tempUp');
  incrementButton.addEventListener('click', incrementTemp);
  const decrementButton = document.querySelector('#tempDown');
  decrementButton.addEventListener('click', decrementTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
