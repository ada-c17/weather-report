const state = {
  temp: 50,
  defaultCity: 'Bloomington',
  currentCity: 'Bloomington',
  lat: 39.1670396,
  lon: -86.5342881,
  sky: 'sunny',
};

const upButton = document.getElementById('up-arrow');
const downButton = document.getElementById('down-arrow');
const tempText = document.getElementById('current-temp');
const ground = document.getElementById('ground');
const cityHeader = document.getElementById('city-name');
const cityInput = document.getElementById('city');
const realTemp = document.getElementById('realtime-temp');
const skySelect = document.getElementById('sky-select');
const skyLine = document.getElementById('sky');

cityInput.value = state['defaultCity'];

const setTempColor = (temp) => {
  if (temp >= 80) {
    tempText.style.color = 'red';
  } else if (temp >= 70) {
    tempText.style.color = 'orange';
  } else if (temp >= 60) {
    tempText.style.color = 'yellow';
  } else if (temp >= 50) {
    tempText.style.color = 'green';
  } else {
    tempText.style.color = 'teal';
  }
};

const setGroundLayout = (temp) => {
  if (temp >= 80) {
    ground.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    ground.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    ground.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    ground.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const setSkyLayout = (sky) => {
  if (sky === 'sunny') {
    skyLine.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (sky === 'cloudy') {
    skyLine.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (sky === 'rainy') {
    skyLine.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (sky === 'snowy') {
    skyLine.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const increaseTemp = () => {
  state['temp'] += 1;
  setTempColor(state['temp']);
  tempText.textContent = state['temp'];
  setGroundLayout(state['temp']);
};

const decreaseTemp = () => {
  state['temp'] -= 1;
  setTempColor(state['temp']);
  tempText.textContent = state['temp'];
  setGroundLayout(state['temp']);
};

const changeCityHeader = () => {
  cityHeader.textContent = cityInput.value;
};

const getCityLatAndLon = () => {
  state['currentCity'] = cityInput.value;

  axios
    .get('http://localhost:5000/location', {
      params: { q: state['currentCity'] },
    })
    .then((response) => {
      state['lat'] = response.data[0].lat;
      state['lon'] = response.data[0].lon;
    });
};

const changeToRealTemp = () => {
  axios
    .get('http://localhost:5000/weather', {
      params: { lat: state['lat'], lon: state['lon'] },
    })
    .then((response) => {
      const newTempKelvin = response.data.current.temp;
      const newTempF = 1.8 * (newTempKelvin - 273) + 32;
      state['temp'] = Math.round(newTempF);
      setTempColor(state['temp']);
      tempText.textContent = state['temp'];
      setGroundLayout(state['temp']);
    });
};

const newSkyLayout = (event) => {
  state['sky'] = event.target.value;
  setSkyLayout(state['sky']);
};

const setStartValues = () => {
  cityHeader.textContent = state['defaultCity'];
  tempText.textContent = state['temp'];
  setTempColor(state['temp']);
  setGroundLayout(state['temp']);
  cityInput.textContent = state['defaultCity'];
  setGroundLayout(state['temp']);
  setSkyLayout(state['sky']);
  skySelect.value = state['sky'];
};

const registerEventHandlers = () => {
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  cityInput.addEventListener('input', changeCityHeader);
  cityInput.addEventListener('change', getCityLatAndLon);
  realTemp.addEventListener('click', changeToRealTemp);
  skySelect.addEventListener('change', newSkyLayout);
};

document.addEventListener('DOMContentLoaded', () => {
  setStartValues();
  registerEventHandlers();
});
