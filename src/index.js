'use strict';

const tempColor = (temp) => {
  const colorCode = document.getElementById('tempCount');
  if (temp >= 80) {
    colorCode.className = 'hotTemp';
  } else if (70 <= temp && temp <= 79) {
    colorCode.className = 'warmTemp';
  } else if (60 <= temp && temp <= 69) {
    colorCode.className = 'mildTemp';
  } else if (50 <= temp && temp <= 59) {
    colorCode.className = 'chillTemp';
  } else if (-100 <= temp && temp <= 49) {
    colorCode.className = 'coldTemp';
  }
};

const gardenLayout = (temp) => {
  const floorEmojisContainer = document.querySelector('#floorEmojis');
  if (temp >= 80) {
    floorEmojisContainer.textContent = '🌵🦂🐍🏜🦂🏜🌵🌵🌵🐍_🏜_🦂';
  } else if (70 <= temp && temp <= 79) {
    floorEmojisContainer.textContent = '🌸🌿🌼🌸🌿🌷🌻🌿🌱☘️🌱🌻🌷🌻🌷';
  } else if (60 <= temp && temp <= 69) {
    floorEmojisContainer.textContent = '🌾🌾🍃🍃🛤🌾🛤🌾🌾🌾🍃🌾🍃🌾';
  } else if (50 <= temp && temp <= 59) {
    floorEmojisContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const skyLayout = () => {
  const skyEmojisContainer = document.querySelector('#skyEmojis');
  const skySelect = document.getElementById('skySelect');
  const skyValue = skySelect.options[skySelect.selectedIndex].value;

  if (skyValue === 'sunny') {
    skyEmojisContainer.textContent = '🔅🔅🔅🔅🔅🔅🔅🔅🔅🔅🔅🔅';
  } else if (skyValue === 'cloudy') {
    skyEmojisContainer.textContent = '☁️🌥️☁️🌥️☁️🌥️☁️🌥️☁️🌥️☁️🌥️🌥️☁️🌥️';
  } else if (skyValue === 'rainy') {
    skyEmojisContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧';
  } else if (skyValue === 'snowy') {
    skyEmojisContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨❄️❄️';
  }
};

const state = {
  tempCount: 65,
};

const tempIncrease = () => {
  state.tempCount += 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
  gardenLayout(state.tempCount);
};

const tempDecrease = () => {
  state.tempCount -= 1;
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  tempColor(state.tempCount);
  gardenLayout(state.tempCount);
};

const registerEventHandlers = () => {
  const raiseTemp = document.querySelector('#raiseTemp');
  raiseTemp.addEventListener('click', tempIncrease);
  raiseTemp.addEventListener('click', tempColor);

  const decreaseTemp = document.querySelector('#decreaseTemp');
  decreaseTemp.addEventListener('click', tempDecrease);
  decreaseTemp.addEventListener('click', tempColor);

  const cityNameid = document.querySelector('#cityNameid');
  cityNameid.addEventListener('input', updateCityname);

  const getRealWeather = document.querySelector('#realCityWeather');
  getRealWeather.addEventListener('click', getLocation);

  const changeSky = document.querySelector('#skySelect');
  changeSky.addEventListener('change', skyLayout);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const clearCityName = () => {
  const nameOfCity = (document.getElementById('cityNameid').value = 'Seattle');
  const cityContainer = document.querySelector('#amazingCity');
  cityContainer.textContent = `Welcome to ${nameOfCity}!`;
  getLocation();
};

const updateCityname = () => {
  const nameOfCity = document.getElementById('cityNameid').value;
  const cityContainer = document.querySelector('#amazingCity');
  cityContainer.textContent = `Welcome to ${nameOfCity}!`;
};

const getLocation = () => {
  const nameOfCity = document.getElementById('cityNameid').value;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: nameOfCity,
        format: 'json',
      },
    })
    .then((response) => {
      const cityLocationLat = response.data[0].lat;
      const cityLocationLon = response.data[0].lon;

      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: cityLocationLat,
            lon: cityLocationLon,
          },
        })
        .then((response) => {
          const cityLocationWeather = response.data.current.temp;
          const realCityTemp = document.getElementById('tempCount');
          const tempFahren = Math.round(
            (cityLocationWeather - 273.15) * 1.8 + 32
          );
          realCityTemp.textContent = Math.round(
            (cityLocationWeather - 273.15) * 1.8 + 32
          );
          gardenLayout(tempFahren);
          tempColor(tempFahren);
        });
    });
};
