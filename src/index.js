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

  if (state.temperature <= 49) {
    displayTemperatureEl.classList.add('teal');
  } else if (state.temperature <= 59) {
    displayTemperatureEl.classList.add('green');
    displayTemperatureEl.classList.remove('teal');
    state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 69) {
    displayTemperatureEl.classList.add('yellow');
    state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    displayTemperatureEl.classList.remove('green');
  } else if (state.temperature <= 79) {
    displayTemperatureEl.classList.add('orange');
    state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    displayTemperatureEl.classList.remove('yellow');
  } else {
    displayTemperatureEl.classList.add('red');
    state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    displayTemperatureEl.classList.remove('orange');
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
  const cityEl = document.getElementById('city');
  cityEl.textContent = `${event.target.value}`;
};

const updateCity = () => {
  state.location = document.getElementById('city-input').value;
  console.log(state.location);
  getLatLon();
};

const getSkyType = () => {
  if (state.skyType.value === 'sunny') {
    state.skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.skyType.value === 'cloudy') {
    state.skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.skyType.value === 'rainy') {
    state.skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.skyType.value === 'snowy') {
    state.skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
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
      console.log('Error, longitude or latitude not found.');
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
  const upArrowEl = document.getElementById('upArrow');
  upArrowEl.addEventListener('click', () => {
    incOrDecTemp(1);
  });

  const downArrowEl = document.getElementById('downArrow');
  downArrowEl.addEventListener('click', () => {
    incOrDecTemp(-1);
  });

  const inputEl = document.getElementById('city-input');
  inputEl.addEventListener('input', changeCityDisplay);

  const currentTempButtonEl = document.getElementById('current-temperature');
  currentTempButtonEl.addEventListener('click', updateCity);

  const skyContainer = document.getElementById('sky-type');
  skyContainer.addEventListener('change', getSkyType);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
