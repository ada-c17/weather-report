'use strict';

const state = {
  temperature: 0,
  landscape: document.getElementById('landscape'),
  location: '',
  skyType: document.getElementById('sky-type'),
  skyDisplay: document.getElementById('sky-landscape'),
};

const changeTemperatureEnvironment = (displayTemperatureEl) => {
  displayTemperatureEl.className = 'padding-5';

  const landscape = {
    cold: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
    warm: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
    veryWarm: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
    hot: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  };

  if (state.temperature <= 49) {
    displayTemperatureEl.classList.add('teal');
  } else if (state.temperature <= 59) {
    displayTemperatureEl.classList.remove('teal');
    displayTemperatureEl.classList.add('green');
    state.landscape.textContent = landscape.cold;
  } else if (state.temperature <= 69) {
    displayTemperatureEl.classList.remove('green');
    displayTemperatureEl.classList.add('yellow');
    state.landscape.textContent = landscape.warm;
  } else if (state.temperature <= 79) {
    displayTemperatureEl.classList.remove('yellow');
    displayTemperatureEl.classList.add('orange');
    state.landscape.textContent = landscape.veryWarm;
  } else {
    displayTemperatureEl.classList.remove('orange');
    displayTemperatureEl.classList.add('red');
    state.landscape.textContent = landscape.hot;
  }
};

const incOrDecTemp = (tempChangeValue) => {
  state.temperature += tempChangeValue;
  updateDisplayedTemp();
};

const updateDisplayedTemp = () => {
  const displayTemperatureEl = document.getElementById('display-temperature');
  changeTemperatureEnvironment(displayTemperatureEl);
  displayTemperatureEl.textContent = `Temperature: ${state.temperature}`;
};

const changeCityDisplay = (event) => {
  const cityEl = document.getElementById('city--name');
  cityEl.textContent = `${event.target.value}`;
};

const updateCity = () => {
  state.location = document.getElementById('city--input').value;
  getLatLon();
};

const getSkyType = () => {
  const skyAppearance = {
    sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
    cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
    rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
    snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
  };

  if (state.skyType.value === 'sunny') {
    state.skyDisplay.textContent = skyAppearance.sunny;
  } else if (state.skyType.value === 'cloudy') {
    state.skyDisplay.textContent = skyAppearance.cloudy;
  } else if (state.skyType.value === 'rainy') {
    state.skyDisplay.textContent = skyAppearance.rainy;
  } else if (state.skyType.value === 'snowy') {
    state.skyDisplay.textContent = skyAppearance.snowy;
  }
};

const getLatLon = () => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.location,
      },
    })
    .then((response) => {
      console.log(response);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      return [latitude, longitude];
    })
    .then((response) => {
      getWeather(response[0], response[1]);
    })
    .catch((error) => {
      const errorMessage = document.getElementById('city--error-message');
      errorMessage.textContent = 'Error, location not found.';
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const tempKelvin = response.data.current.temp;
      state.temperature = Math.floor(((tempKelvin - 273.15) * 9) / 5 + 32);
      updateDisplayedTemp();
    });
};

const registerEventHandlers = () => {
  const upArrowEl = document.getElementById('up-arrow');
  upArrowEl.addEventListener('click', () => {
    incOrDecTemp(1);
  });

  const downArrowEl = document.getElementById('down-arrow');
  downArrowEl.addEventListener('click', () => {
    incOrDecTemp(-1);
  });

  const inputEl = document.getElementById('city--input');
  inputEl.addEventListener('input', changeCityDisplay);

  const currentTempButtonEl = document.getElementById('current-temperature');
  currentTempButtonEl.addEventListener('click', updateCity);

  const selectEl = document.getElementById('sky-type');
  selectEl.addEventListener('change', getSkyType);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
