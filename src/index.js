'use strict';

const state = {
  temp: 0,
};

const changeColorAndLand = (t) => {
  const tempContainer = document.getElementById('temperature');
  const landScape = document.getElementById('picture');
  if (t >= 80) {
    tempContainer.className = 'hottest';
    landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (t >= 70 && t < 79) {
    tempContainer.className = 'warm';
    landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (t >= 60 && t < 69) {
    tempContainer.className = 'fresh';
    landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (t >= 50 && t < 59) {
    tempContainer.className = 'cool';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempContainer.className = 'freeze';
    landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  //state.temp += 1;
  const tempContainer = document.getElementById('temperature');
  let currentTemp = parseInt(tempContainer.innerHTML);
  currentTemp += 1;
  //tempContainer.textContent = `${state.temp}`;
  tempContainer.textContent = currentTemp;
  //changeColorAndLand(state.temp);
  changeColorAndLand(currentTemp);
};

const decreaseTemp = () => {
  //state.temp -= 1;
  const tempContainer = document.getElementById('temperature');
  let currentTemp = parseInt(tempContainer.innerHTML);
  currentTemp -= 1;
  //tempContainer.textContent = `${state.temp}`;
  tempContainer.textContent = currentTemp;
  //changeColorAndLand(state.temp);
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
      console.log('error in findLatitudeAndLongitude!');
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
      tempContainer.textContent = `${tempF}`;
      changeColorAndLand(tempF);

      //return tempF;
    });
};

const displayRealTemp = () => {
  const currentCity = document.getElementById('city').innerHTML;
  getLatandLong(currentCity);
};

const registerEventHandlers = () => {
  const upButton = document.getElementById('up');
  upButton.addEventListener('click', increaseTemp);

  const downButton = document.getElementById('down');
  downButton.addEventListener('click', decreaseTemp);

  const userInput = document.getElementById('city-name');
  userInput.addEventListener('keyup', displayCity);
  //userInput.addEventListener('change', displayCity);
  //const searchButton = document.getElementById('search');
  //searchButton.addEventListener('click', displayCity);

  const displayTemp = document.getElementById('real-time');
  displayTemp.addEventListener('click', displayRealTemp);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
