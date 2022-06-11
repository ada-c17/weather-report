'use strict';

const changeColorAndLand = (t) => {
  const tempContainer = document.getElementById('temperature');
  const landScape = document.getElementById('land');
  if (t >= 80) {
    tempContainer.className = 'hottest';
    document.body.className = 'hottest-background';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (t >= 70 && t <= 79) {
    tempContainer.className = 'warm';
    document.body.className = 'warm-background';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (t >= 60 && t <= 69) {
    tempContainer.className = 'fresh';
    document.body.className = 'fresh-background';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (t >= 50 && t <= 59) {
    tempContainer.className = 'cool';
    document.body.className = 'cool-background';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempContainer.className = 'freeze';
    document.body.className = 'freeze-background';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  const tempContainer = document.getElementById('temperature');
  let currentTemp = parseInt(tempContainer.innerHTML);
  currentTemp += 1;
  tempContainer.textContent = currentTemp;
  changeColorAndLand(currentTemp);
};

const decreaseTemp = () => {
  const tempContainer = document.getElementById('temperature');
  let currentTemp = parseInt(tempContainer.innerHTML);
  currentTemp -= 1;
  tempContainer.textContent = currentTemp;
  changeColorAndLand(currentTemp);
};

const displayCity = () => {
  const cityContainer = document.getElementById('city');
  cityContainer.textContent = document.getElementById('city-name').value;
};

const getLatandLong = (query) => {
  let latitude;
  let longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: query },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      getRealTemp(latitude, longitude);
    })
    .catch((error) => {
      console.log('Error in get latitude and longitude of location!');
    });
};

const getRealTemp = (latitude, longitude) => {
  let tempK;
  let tempF;
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      tempK = response.data.current.temp;
      tempF = Math.floor(((tempK - 273.15) * 9) / 5 + 32);

      const tempContainer = document.getElementById('temperature');
      tempContainer.textContent = `${tempF}` + ' F';
      changeColorAndLand(tempF);
    })
    .catch((error) => {
      console.log('Error in get real time temperature!');
    });
};

const displayRealTemp = () => {
  const currentCity = document.getElementById('city').innerHTML;
  getLatandLong(currentCity);
};

const changeSky = () => {
  const selector = document.getElementById('skys');
  const currentSky = document.getElementById('sky');

  switch (selector.value) {
    case 'default':
      currentSky.innerHTML = '🌞🌎🌞🌍🌞🌏🌞';
      document.body.className = 'default-background';
      break;
    case 'sunny':
      currentSky.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
      document.body.className = 'sunny-background';
      break;
    case 'cloudy':
      currentSky.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
      document.body.className = 'cloudy-background';
      break;
    case 'rainy':
      currentSky.innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
      document.body.className = 'rainy-background';
      break;
    case 'snowy':
      currentSky.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
      document.body.className = 'snowy-background';
      break;
  }
};

const resetCityName = () => {
  const cityContainer = document.getElementById('city');
  cityContainer.innerHTML = 'Seattle';
  const inputContainer = document.getElementById('city-name');
  inputContainer.value = '';
  displayRealTemp();
};

const farenToC = () => {
  const currentTemp = document.getElementById('temperature');
  currentTemp.innerHTML =
    Math.floor(((parseInt(currentTemp.innerHTML) - 32) * 5) / 9) + ' °C';
};

const celToF = () => {
  displayRealTemp();
};

const registerEventHandlers = () => {
  const upButton = document.getElementById('up');
  upButton.addEventListener('click', increaseTemp);

  const downButton = document.getElementById('down');
  downButton.addEventListener('click', decreaseTemp);

  const userInput = document.getElementById('city-name');
  userInput.addEventListener('keyup', displayCity);

  const displayTemp = document.getElementById('real-time');
  displayTemp.addEventListener('click', displayRealTemp);

  const selector = document.getElementById('skys');
  selector.addEventListener('change', changeSky);

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetCityName);

  const celButton = document.getElementById('celsius');
  celButton.addEventListener('click', farenToC);

  const farenButton = document.getElementById('faren');
  farenButton.addEventListener('click', celToF);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
