'use strict';

const currentTempElement = document.getElementById('current-temp');
const landscapeElement = document.getElementById('landscape');
const weatherGardenElement = document.getElementById('weather-garden');
const skyOptionElement = document.getElementById('sky-select');
const input = document.querySelector('input');
const cityName = document.getElementById('city-name');
const todayDateElement = document.getElementById('today-date');
const liveTempElement = document.getElementById('live-temp');
const weatherDescription = document.getElementById('weather-description');

const getCurrentTemp = () => parseInt(currentTempElement.textContent);

const resetCityName = () => {
  cityName.textContent = 'Seattle';
  clearInput();
};

const clearInput = () => {
  input.value = '';
};

const submitCity = (event) => {
  cityName.textContent = input.value;
  clearInput();
  event.preventDefault();
};

const updateDisplay = (tempTextColor, gardenBgColor, landscapeText) => {
  currentTempElement.style.color = tempTextColor;
  weatherGardenElement.style.backgroundColor = gardenBgColor;
  landscapeElement.textContent = landscapeText;
};
const updateAll = () => {
  const currentTemp = getCurrentTemp();
  if (currentTemp >= 80) {
    updateDisplay('red', 'red', '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂');
  } else if (currentTemp >= 70) {
    updateDisplay('orange', 'yellow', '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷');
  } else if (currentTemp >= 60) {
    updateDisplay('yellow', 'pink', '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃');
  } else if (currentTemp >= 50) {
    updateDisplay('green', 'teal', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  } else {
    updateDisplay('teal', 'grey', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  }
};

const increaseTemp = () => {
  currentTempElement.textContent = `${getCurrentTemp() + 1}`;
};

const decreaseTemp = () => {
  currentTempElement.textContent = `${getCurrentTemp() - 1}`;
};

const skyMapping = {
  Sunny: '☀️☁️ ☀️☁️ ☀️ ☁️☀️ ☁️ ☀️ ☁️',
  Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  Snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const updateSky = () => {
  document.getElementById('sky').innerText = skyMapping[skyOptionElement.value];
};

const convertKToF = (kelvinTemp) => {
  return Math.floor((kelvinTemp * 9) / 5 - 459.67);
};

const getLatLongFromCityName = async () => {
  const currentCityName = cityName.textContent;
  const response = await axios.get(
    `https://weather-report-backend.herokuapp.com/location?q=${currentCityName}}`
  );

  const lat = response.data[0].lat;
  const lon = response.data[0].lon;

  return {
    lat: lat,
    lon: lon,
  };
};

const getRealWeatherInfo = async () => {
  const { lat, lon } = await getLatLongFromCityName();

  const response = await axios.get(
    `https://weather-report-backend.herokuapp.com/weather?lat=${lat}&lon=${lon}`
  );
  return response.data.current;
};
const getRealTimeTemp = async () => {
  const realWeatherInfo = await getRealWeatherInfo();
  const kelvinTemp = realWeatherInfo.temp;
  currentTempElement.textContent = convertKToF(kelvinTemp);
};

const getCurrentCity = () => {
  // using HTML Geolocation API to get current location if browser permits
  navigator.geolocation.getCurrentPosition(displayCurrentCoordinates);
};

const displayCurrentCoordinates = async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const city = await getCityFromLatLon(lat, lon);
  if (city) {
    cityName.textContent = `${city}`;
  }
};

const getCityFromLatLon = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/location/reverse?lat=${lat}&lon=${lon}`
    );
    const city = response.data.address.city;
    return city;
  } catch (error) {
    console.log(error);
    console.log('error in findLatitudeAndLongitude!');
  }
};

// Get current Date & Time
const displayCurrentDateTime = () => {
  const today = new Date();
  const dayList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday ',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = dayList[today.getDay()];
  const year = today.getFullYear();
  const month = monthList[today.getMonth()];
  const date = today.getDate();
  todayDateElement.textContent = `${day}, ${month}/${date}/${year}`;
};

const displayCurrentWeatherDescription = async () => {
  const currrentWeatherDescription = await getRealWeatherInfo();
  weatherDescription.textContent =
    currrentWeatherDescription['weather'][0]['description'];
};

const displayRealTemp = async () => {
  const realWeatherInfo = await getRealWeatherInfo();
  const kelvinTemp = realWeatherInfo.temp;
  liveTempElement.textContent = convertKToF(kelvinTemp);
};

// Display live date
const updateRealTimeInfo = () => {
  displayCurrentDateTime();
  displayRealTemp();
  (async () => {
    await displayCurrentWeatherDescription();
  })();
};
// Display live temp & weather description

updateRealTimeInfo();

const registerEventHandlers = () => {
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  const resetButton = document.getElementById('reset-button');
  const form = document.getElementById('form');
  const getRealTimeTempButton = document.getElementById('get-realtime-temp');
  const currentCityButton = document.getElementById('get-current-city-button');

  increaseButton.addEventListener('click', increaseTemp);
  increaseButton.addEventListener('click', updateAll);
  decreaseButton.addEventListener('click', decreaseTemp);
  decreaseButton.addEventListener('click', updateAll);
  resetButton.addEventListener('click', resetCityName);
  form.addEventListener('submit', submitCity);
  form.addEventListener('submit', updateRealTimeInfo),
    skyOptionElement.addEventListener('change', updateSky);
  getRealTimeTempButton.addEventListener('click', getRealTimeTemp);
  currentCityButton.addEventListener('click', getCurrentCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
