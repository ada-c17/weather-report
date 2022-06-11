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
    temperature.style.color = 'orange';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    temperature.style.color = 'yellow';
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
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
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
  console.log(updateWeatherCity); // works
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
      console.log(latitude); // works
      longitude = locationResult.lon;
      console.log(longitude); // works

      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            units: 'metric', // added extra param in weather-report-proxy-server
          },
        })
        .then((response) => {
          const weatherResult = response.data.current['temp'];
          console.log(weatherResult); // works, just returns in Kelvin
          document.getElementById('display-real-time-temp').textContent =
            weatherResult;
        });
    })
    .catch((error) => {
      console.log('error', error.response.data);
    });
};

const changeSky = () => {
  let skySelection = document.getElementById('sky');
  let chosenSky = skySelection.options[skySelection.selectedIndex].textContent;
  let skyDisplay = document.getElementById('sky-emojis');
  if (chosenSky === 'Sunny') {
    skyDisplay.textContent = 'sunny emojis';
  } else if (chosenSky === 'Cloudy') {
    skyDisplay.textContent = 'cloudy emojis';
  } else if (chosenSky === 'Rainy') {
    skyDisplay.textContent = 'rainy emojis';
  } else if (chosenSky === 'Snowy') {
    skyDisplay.textContent = 'snowy emojis';
  }
};

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('adjust-temp-up');
  const decreaseTemp = document.getElementById('adjust-temp-down');
  const cityName = document.querySelector('input');
  const cityRealTimeTemp = document.getElementById('real-time-temp');
  const changingSky = document.getElementById('sky-emojis');
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
  });
  changingSky.addEventListener('change', () => {
    changeSky();
  });
};

// document.addEventListener('DOMContentLoaded', registerEventHandlers);
