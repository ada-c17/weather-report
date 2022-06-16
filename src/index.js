'use strict';

const tempDisplay = document.getElementById('temp-display');
const landscapeImg = document.getElementById('landscape-img');
const cityName = document.getElementById('city-name-display');
const cityInputBox = document.getElementById('city-name');

const state = {
  temp: 80,
  city: cityName.textContent,
  color: 'rgb(248, 163, 163)',
};

// Set default values
tempDisplay.textContent = `${state.temp}°`;
tempDisplay.style.color = state.color;

const updateTempDisplay = (x) => {
  state.temp += x;
  tempDisplay.textContent = `${state.temp}°`;

  if (state.temp > 79) {
    tempDisplay.style.color = 'rgb(248, 163, 163)';
  }
  if (state.temp < 80) {
    tempDisplay.style.color = 'orange';
    landscapeImg.src = '/images/sun.png';
    landscapeImg.alt = 'black line drawings of sun, with circle in center';
  }
  if (state.temp < 70) {
    tempDisplay.style.color = 'yellow';
    landscapeImg.src = '/images/cloudy.png';
    landscapeImg.alt = 'black line drawing of clouds in front of a sun';
  }
  if (state.temp < 60) {
    tempDisplay.style.color = 'green';
  }
  if (state.temp < 50) {
    tempDisplay.style.color = 'teal';
    landscapeImg.src = '/images/rainy.png';
    landscapeImg.alt =
      'black line drawings of cloud with strong diagonal rain falling';
  }
  if (state.temp < 40) {
    tempDisplay.style.color = '#CFF2FF';
    landscapeImg.src = '/images/snowy.png';
    landscapeImg.alt = 'black line drawings of a detailed snowflake';
  }
};

const updateCity = (e) => {
  state.city = e.target.value;
  cityName.textContent = state.city;
};

const resetCity = () => {
  state.city = 'New Orleans';
  cityName.textContent = 'New Orleans';
  cityInputBox.value = '';
};

const updateSky = () => {
  const value = document.getElementById('sky-color').value;
  if (value === 'sunny') {
    document.body.style.backgroundImage =
      'linear-gradient(to top, rgb(255, 255, 174),rgb(248, 163, 163)';
    landscapeImg.src = '/images/sun.png';
    landscapeImg.alt = 'black line drawing of sun, with circle in center';
  }
  if (value === 'cloudy') {
    document.body.style.backgroundImage =
      'linear-gradient(rgb(211, 224, 224),rgb(106, 112, 159))';
    landscapeImg.src = '/images/cloudy.png';
    landscapeImg.alt = 'black line drawing of clouds in front of a sun';
  }
  if (value === 'rainy') {
    document.body.style.backgroundImage =
      'linear-gradient( rgb(213, 251, 253),rgb(148, 55, 160))';
    landscapeImg.src = '/images/rainy.png';
    landscapeImg.alt =
      'black line drawing of cloud with strong diagonal rain falling';
  }
  if (value === 'snowy') {
    document.body.style.backgroundImage =
      'linear-gradient( rgb(255, 255, 255),rgb(211, 224, 224))';
    landscapeImg.src = '/images/snowy.png';
    landscapeImg.alt = 'black line drawing of a detailed snowflake';
  }
};

const getLatLon = (place) => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: place,
      },
    })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      return { lat, lon };
    })
    .catch((err) => console.log({ err }));
};

const getTemp = (lat, lon) => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      const temp = response.data.current.temp;
      return Math.floor((temp - 273) * 1.8 + 32);
    })
    .catch((err) => console.log({ err }));
};

const realtimeTemp = async () => {
  const place = state.city;
  const { lat, lon } = await getLatLon(place);
  state.temp = await getTemp(lat, lon);
  updateTempDisplay(0);
};

const registerEventHandlers = () => {
  const upButton = document.getElementById('up-button');
  upButton.addEventListener('click', () => {
    updateTempDisplay(1);
  });

  const downButton = document.getElementById('down-button');
  downButton.addEventListener('click', () => {
    updateTempDisplay(-1);
  });

  const cityInput = document.querySelector('input');
  cityInput.addEventListener('input', updateCity);

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', resetCity);

  const realtimeButton = document.getElementById('realtime-button');
  realtimeButton.addEventListener('click', realtimeTemp);

  const skySelector = document.getElementById('sky-color');
  skySelector.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
