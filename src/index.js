// default values
const state = {
  temp: 79,
  city: 'Seattle',
};

const getWeather = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })

    .then((response) => {
      // we updated the flask code to be in imperial units
      state.temp = parseInt(response.data.current.temp);
      const tempContainer = document.getElementById('temp');
      tempContainer.textContent = state.temp;
      changeTempColorAndGarden(state.temp);
    })
    .catch((error) => {
      console.log("Couldn't get city temperature");
    });
};

const getCityTemp = () => {
  let city = document.getElementById('city').textContent;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      const latitude = parseFloat(response.data[0].lat);
      const longitude = parseFloat(response.data[0].lon);
      getWeather(latitude, longitude);
    })

    .catch((error) => {
      console.log('Error in finding latitude and longitude.');
    });
};

const getNewCity = () => {
  const cityName = document.getElementById('city-name').value;
  const cityContainer = document.getElementById('city');
  cityContainer.textContent =
    cityName[0].toUpperCase() + cityName.substring(1).toLowerCase();
};

const tempIncrease = () => {
  state.temp += 1;
  const tempContainer = document.getElementById('temp');
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);
};

const tempDecrease = () => {
  state.temp -= 1;
  const tempContainer = document.getElementById('temp');
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);
};

const changeTempColorAndGarden = (temperature) => {
  const tempContainer = document.getElementById('temp');
  const landscapeEmojis = document.getElementById('landscape');
  if (temperature > 79) {
    tempContainer.style.color = 'red';
    landscapeEmojis.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70 && temperature < 80) {
    tempContainer.style.color = 'orange';
    landscapeEmojis.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60 && temperature < 70) {
    tempContainer.style.color = 'yellow';
    landscapeEmojis.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50 && temperature < 60) {
    tempContainer.style.color = 'green';
    landscapeEmojis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature < 50) {
    tempContainer.style.color = 'white';
    landscapeEmojis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeSky = () => {
  const skyContainer = document.getElementById('sky');
  const skyValue = document.querySelector('select').value;
  if (skyValue === 'sunny') {
    skyContainer.textContent = '☀️ ☀️ ☀️ ☀️ ☀️ ☀️ ☀️ ☀️';
  } else if (skyValue === 'cloudy') {
    skyContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyValue === 'rainy') {
    skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyValue === 'snowy') {
    skyContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const defaultSettings = () => {
  // defaults for text for city name, input field, sky emojis
  const cityContainer = document.getElementById('city');
  cityContainer.textContent = state.city;
  const cityName = document.getElementById('city-name');
  cityName.value = ''; // input text area resets to blank
  const skyContainer = document.getElementById('sky');
  skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';

  // default for city temp and landscape emojis if flask isn't running
  const tempContainer = document.getElementById('temp');
  state.temp = 79;
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);

  // if flask is running, get realtime temp, overwrite above defaults
  getCityTemp();
};

const registerEventHandlers = () => {
  // wave 2
  const tempIncreaseButton = document.getElementById('increase');
  tempIncreaseButton.addEventListener('click', tempIncrease);
  const tempDecreaseButton = document.getElementById('decrease');
  tempDecreaseButton.addEventListener('click', tempDecrease);

  // wave 3
  const inputElement = document.getElementById('city-name');
  inputElement.addEventListener('change', getNewCity);

  // wave 4
  const getTempButton = document.getElementById('get-temp');
  getTempButton.addEventListener('click', getCityTemp);

  // wave 5
  const getSkyChanged = document.querySelector('select');
  getSkyChanged.addEventListener('change', changeSky);

  // wave 6
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', defaultSettings);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
