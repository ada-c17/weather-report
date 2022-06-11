const raiseTemp = () => {
  const temperature = document.getElementById('display-temp');
  temperature.innerText++;
  changeTempColor();
  changeLandscape();
};

const lowerTemp = () => {
  const temperature = document.getElementById('display-temp');
  temperature.innerText--;
  changeTempColor();
  changeLandscape();
};

//TODO: change temp.style.color in CSS and not in here
const changeTempColor = () => {
  const temperature = document.getElementById('display-temp');
  if (temperature.innerText >= 80) {
    temperature.style.color = 'red';
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    temperature.style.color = 'blue';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    temperature.style.color = 'purple';
  } else if (temperature.innerText >= 50 && temperature.innerText <= 59) {
    temperature.style.color = 'green';
  } else {
    temperature.style.color = 'teal';
  }
};

const changeLandscape = () => {
  const temperature = document.getElementById('display-temp'); // should I be using const or let - since it changes?
  let landscape = document.getElementById('landscape');
  if (temperature.innerText >= 80) {
    landscape.textContent = '🌵_🐍_🌴_🦂_🌴_🌵🌵_🌴_🐍_🏜_🌴_🦂';
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    landscape.textContent = '🌸🌿🌼🍀🌷🌻🌿🍀🌱🍀🌻🌷';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    landscape.textContent = '🌾🌾🪴🍃🪴🪨🪴🛤🪴🌾🌾🌾🪴🍃';
  } else {
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const updateCityName = () => {
  let currentCityName = document.getElementById('city-name-display'); // where city name is currently displayed
  let cityNameUserInput = document.getElementById('city-name').value; // should give value of input
  currentCityName.textContent = cityNameUserInput;
};

const realTimeTemp = () => {
  const updateWeatherCity = document.getElementById('city-name').value;
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: updateWeatherCity,
      },
    })
    .then((response) => {
      const locationResult = response.data[0];
      latitude = locationResult.lat;
      longitude = locationResult.lon;

      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            units: 'imperial', // added extra param in weather-report-proxy-server
          },
        })
        .then((response) => {
          const weatherResult = response.data.current['temp'];
          document.getElementById('display-temp').textContent =
            Math.round(weatherResult);
          changeTempColor();
          changeLandscape();
        });
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        alert('Please enter a valid city.');
        return false;
      } else {
        console.log('error:', error.response.data);
        throw error;
      }
    });
};

const changeSky = () => {
  const skySelection = document.getElementById('sky');
  const chosenSky =
    skySelection.options[skySelection.selectedIndex].textContent;
  let skyDisplay = document.getElementById('sky-emojis');
  if (chosenSky === 'Sunny') {
    skyDisplay.textContent = '🌈🌤🌈🌤🌈🌤🌈🌤🌈';
  } else if (chosenSky === 'Cloudy') {
    skyDisplay.textContent = '🌤🌥🌤🌥🌤🌥🌤🌥🌤🌥';
  } else if (chosenSky === 'Rainy') {
    skyDisplay.textContent = '🌧🌦🌧🌦🌧🌦🌧🌦🌧🌦';
  } else if (chosenSky === 'Snowy') {
    skyDisplay.textContent = '🌨🌨🌨🌨🌨🌨🌨🌨🌨🌨';
  }
};

const resetCityName = () => {
  document.getElementById('city-name-display').textContent = 'Seattle'; // where default name is currently displayed
};

const clearInputField = () => {
  document.getElementById('city-name').value = '';
};

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('adjust-temp-up');
  const decreaseTemp = document.getElementById('adjust-temp-down');
  const cityName = document.querySelector('input');
  const cityRealTimeTemp = document.getElementById('real-time-temp');
  const changingSky = document.getElementById('sky-emojis');
  const resettingCity = document.getElementById('reset-button');
  increaseTemp.addEventListener('click', () => {
    raiseTemp();
  });
  decreaseTemp.addEventListener('click', () => {
    lowerTemp();
  });
  cityName.addEventListener('keyup', () => {
    updateCityName();
  });
  cityRealTimeTemp.addEventListener('click', () => {
    realTimeTemp();
    clearInputField();
  });
  changingSky.addEventListener('change', () => {
    changeSky();
  });
  resettingCity.addEventListener('click', () => {
    resetCityName();
    clearInputField();
  });
};

// document.addEventListener('DOMContentLoaded', registerEventHandlers);
