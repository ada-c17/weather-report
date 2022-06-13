// --------------------------- Define state -----------------------
const state = {
  temperature: 68,
  tempColor: 'yellow',
  city: 'Sacramento',
  sky: 'cyan',
  lat: '38.5810606',
  lon: '-121.493895',
};

// ------------ Declare global vars and default state --------------
const updateCityElement = document.querySelector('#headerCity');
const updateTempElement = document.querySelector('#updateTemperature');
const inputCity = document.querySelector('#inputCity');
const updateBackgroundSky = document.querySelector('#skyBackground');
updateTempElement.textContent = `${state.temperature} ℉`;
updateCityElement.textContent = state.city;
updateBackgroundSky.style.backgroundColor = state.sky;

// ------------------------- Wave 2 --------------------------------
const updateTempColor = () => {
  if (state.temperature >= 80) {
    state.tempColor = 'red';
  } else if (70 <= state.temperature && state.temperature <= 79) {
    state.tempColor = 'orange';
  } else if (60 <= state.temperature && state.temperature <= 69) {
    state.tempColor = 'yellow';
  } else if (50 <= state.temperature && state.temperature <= 59) {
    state.tempColor = 'green';
  } else {
    state.tempColor = 'blue';
  }
  updateTempElement.style.color = state.tempColor;
};

const updateLandscape = () => {
  const updateImageElement = document.querySelector('#landscape');
  let name;
  let description;
  if (state.temperature >= 80) {
    name = 'ada-project-docs/assets/hot_day.jpeg';
    description = 'a desert';
  } else if (70 <= state.temperature && state.temperature <= 79) {
    name = 'ada-project-docs/assets/sunny_day.jpeg';
    description = 'a sunny day';
  } else if (60 <= state.temperature && state.temperature <= 69) {
    name = 'ada-project-docs/assets/cloudy_day.jpeg';
    description = 'a cloudy day';
  } else {
    name = 'ada-project-docs/assets/snowy_day.jpeg';
    description = 'a snowy day';
  }
  updateImageElement.src = name;
  updateImageElement.alt = description;
};

const increaseTemp = () => {
  state.temperature += 1;
  updateTempElement.textContent = `${state.temperature} ℉`;
  updateTempColor();
  updateLandscape();
};

const decreaseTemp = () => {
  state.temperature -= 1;
  updateTempElement.textContent = `${state.temperature} ℉`;
  updateTempColor();
  updateLandscape();
};

// ------------------------- Wave 3 --------------------------------
const updateCity = () => {
  const inputCity = document.querySelector('#inputCity');
  state.city = inputCity.value;
  updateCityElement.textContent = state.city;
};

// ------------------------- Wave 4 --------------------------------
const getRealTemp = () => {
  getTemp();
};

const getLatLon = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      console.log(response.data);
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      state.lat = latitude;
      state.lon = longitude;
      console.log('success in finding lat and lon!', state.lat, state.lon);
      // return lat, lon;
    })
    .catch((error) => {
      console.log('error in finding lat and lon!');
    });
};

const getTemp = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const tempKelvin = response.data['current']['temp'];
      const tempFaren = parseInt(((tempKelvin - 273.15) * 9) / 5 + 32);
      console.log('success in finding location weather!', tempFaren);
      state.temperature = tempFaren;
      updateTempElement.textContent = `${state.temperature} ℉`;
      updateTempColor();
      updateLandscape();
    })
    .catch((error) => {
      console.log('error in finding location weather!');
    });
};

// ------------------------- Wave 5 --------------------------------
const changeSkyColor = () => {
  const getSkySelector = document.querySelector('#skySelect');
  const updateBackgroundSky = document.querySelector('#skyBackground');
  if (getSkySelector.value === 'default') {
    state.sky = 'cyan';
  } else if (getSkySelector.value === 'sunny') {
    state.sky = 'khaki';
  } else if (getSkySelector.value === 'cloudy') {
    state.sky = 'lightgrey';
  } else if (getSkySelector.value === 'rainy') {
    state.sky = 'steelblue';
  } else if (getSkySelector.value === 'snowy') {
    state.sky = 'silver';
  }
  updateBackgroundSky.style.backgroundColor = state.sky;
};

// ------------------------- Wave 6 --------------------------------
const resetCity = () => {
  inputCity.value = '';
  state.city = 'Sacramento';
  updateCityElement.textContent = state.city;
};

// ---------------- Register Event Handlers ------------------------
const registerEventHandlers = () => {
  const increaseButton = document.querySelector('#increaseButton');
  increaseButton.addEventListener('click', increaseTemp);
  const decreaseButton = document.querySelector('#decreaseButton');
  decreaseButton.addEventListener('click', decreaseTemp);
  const submitCityButton = document.querySelector('#submitCityButton');
  submitCityButton.addEventListener('click', updateCity);
  submitCityButton.addEventListener('click', getLatLon);
  const getRealTempButton = document.querySelector('#realTempButton');
  getRealTempButton.addEventListener('click', getRealTemp);
  const getSkyButton = document.querySelector('#skySelect');
  getSkyButton.addEventListener('change', changeSkyColor);
  const resetCityButton = document.querySelector('#resetCityButton');
  resetCityButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
