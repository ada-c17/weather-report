/* WEATHER REPORT JAVASCRIPT FILE */

//////////*    API CALLS & ASSIGNING API VALUES    *///////////////////////////

const serverAddress = 'http://127.0.0.1:5000';

const populateWeatherReport = function (weatherData) {
  const tempKelvin = weatherData.current.temp;
  const tempFahrenheit = Math.floor((tempKelvin - 273.15) * 1.8 + 32);
  const skyDescription = weatherData.current.weather[0].description;
  //const cloudCoverage = `${weatherData.current.clouds}%`;

  //populate sky and temp variables with api data
  state.temp = tempFahrenheit;
  colorTempChange();
};

const cityCallWeather = function (serverAddress, city) {
  axios
    .get(`${serverAddress}/location`, {
      params: {
        q: city,
      },
    })
    .then((response) => {
      let longitude = response.data[0].lon;
      let latitude = response.data[0].lat;

      axios
        .get(`${serverAddress}/weather`, {
          params: {
            lat: latitude,
            lon: longitude,
          },
        })
        .then((response) => {
          populateWeatherReport(response.data);
        })
        .catch((response) => {
          console.log(response.status);
          console.log('There was an issue with the request [weather API].');
        });
    })
    .catch((response) => {
      console.log(response.status);
      console.log('There was an issue with the request [location API].');
    });
};

//////////*    CITY NAME ENTRY    *////////////////////////////////////////////

const inputElement = document.querySelector('#userInput');

const resetInput = () => {
  const cityName = document.querySelector('#cityName');
  inputElement.value = '';
  cityName.textContent = 'Seattle';
  cityCallWeather(serverAddress, cityName.textContent);
};

const changeCityName = (event) => {
  const cityName = document.querySelector('#cityName');
  const inputCityName = event.target.value;
  if (inputCityName === '') {
    cityName.textContent = 'Seattle';
  } else {
    normalizeCityName(inputCityName);
  }
  cityCallWeather(serverAddress, cityName.textContent);
};

normalizeCityName = (inputCityName) => {
  const normalizedCityName = inputCityName
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  cityName.textContent = normalizedCityName;
  cityCallWeather(serverAddress, cityName.textContent);
};

const getRealTemp = () => {
  const cityName = document.querySelector('#cityName');
  cityCallWeather(serverAddress, cityName.textContent);
};

//////////*    TEMPERATURE DIFFERENCE    */////////////////////////////////////
('use strict');
const state = {
  temp: 50,
};

const increaseTemp = () => {
  state.temp += 1;
  colorTempChange();
};

const decreaseTemp = () => {
  state.temp -= 1;
  colorTempChange();
};

const colorTempChange = () => {
  let temp = state.temp;
  let color = 'tempRed';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (temp >= 80) {
    color = 'tempRed';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    color = 'tempOrange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    color = 'tempYellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    color = 'tempGreen';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp < 50) {
    color = 'tempTeal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const tempDisplay = document.querySelector('#tempValue');
  tempDisplay.textContent = `${state.temp}`;
  tempDisplay.className = color;
  const gardenLandscape = document.querySelector('#landscape');
  gardenLandscape.textContent = landscape;
};

const changeSky = () => {
  const skySelect = document.getElementById('skySelect').value;
  let sky = '';
  if (skySelect === 'Sunny') {
    sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skySelect === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skySelect === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skySelect === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  const gardenSky = document.getElementById('sky');
  gardenSky.textContent = sky;
};

/*    EVENT HANDLERS, OTHER MISC    */ /////////////////////////////////////////

const registerEventHandlers = () => {
  cityCallWeather(serverAddress, 'Seattle');

  const upArrow = document.querySelector('#increaseTemp');
  upArrow.addEventListener('click', increaseTemp);

  const downArrow = document.querySelector('#decreaseTemp');
  downArrow.addEventListener('click', decreaseTemp);

  const realTempButton = document.getElementById('realTempButton');
  realTempButton.addEventListener('click', getRealTemp);

  inputElement.addEventListener('change', changeCityName);
  const resetButton = document.querySelector('#resetButton');
  resetButton.addEventListener('click', resetInput);

  changeSky();
  const skyControls = document.getElementById('skySelect');
  skyControls.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
