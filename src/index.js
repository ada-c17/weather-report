'use strict';

const state = {
  temp: 65,
  city: 'Houston',
  lat: 0,
  lon: 0,
};

const tempColor = () => {
  const currentTemp = document.getElementById('temp-display');
  if (state.temp >= 80) {
    currentTemp.style.backgroundColor = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.backgroundColor = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.backgroundColor = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.backgroundColor = 'green';
  } else {
    currentTemp.style.backgroundColor = 'teal';
  }
};

const landscapeImage = () => {
  const landscape = document.getElementById('landscape');
  let pic;
  if (state.temp >= 80) {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/desert.jpg')";
  } else if (state.temp >= 70) {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/flowers.jpg')";
  } else if (state.temp >= 60) {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/grass.jpg')";
  } else {
    pic =
      "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/snow.jpg')";
  }
  landscape.style.backgroundImage = pic;
};

const updateTheme = () => {
  const currentTemp = document.getElementById('temp-display');
  currentTemp.textContent = `${state.temp}`;
  tempColor();
  landscapeImage();
};

const increaseTemp = () => {
  state.temp += 1;
  updateTheme();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTheme();
};

const updateCity = () => {
  const cityInput = document.getElementById('city-input').value;
  state.city = cityInput || 'Houston';
  const cityName = document.getElementById('city-name');
  cityName.textContent = `${state.city}`;
};

const getCoordinates = (city) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: 'Houston',
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      getRealtimeTemp();
    })
    .catch((error) => {
      console.log('Error getting coordinates.');
      console.log(error.response);
    });
};

const getRealtimeTemp = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const tempKelvin = response.data.current.temp;
      state.temp = toFahrenheit(tempKelvin);
      updateTheme();
    })
    .catch((error) => {
      console.log('Error getting weather data');
      console.log(error.response.data);
    });
};

const toFahrenheit = (temp) => {
  return Math.floor(1.8 * (temp - 273) + 32);
};

const changeSky = () => {
  const selectedOption = document.getElementById('sky-dropdown').selectedIndex;
  let pic;
  switch (selectedOption) {
    case 0:
      pic =
        "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/sunny.jpg')";
      break;
    case 1:
      pic =
        "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/cloudy.jpg')";
      break;
    case 2:
      pic =
        "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/rainy.jpg')";
      break;
    case 3:
      pic =
        "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/snowy.jpg')";
      break;
    default:
      pic =
        "url('/Users/daniellewhyte/Developer/projects/weather-report/assets/sunny.jpg')";
  }

  const sky = document.getElementById('sky');
  sky.style.backgroundImage = pic;
};

const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById('increase');
  tempIncreaseButton.addEventListener('click', increaseTemp);

  const tempDecreaseButton = document.getElementById('decrease');
  tempDecreaseButton.addEventListener('click', decreaseTemp);

  const cityInput = document.getElementById('city-input');
  cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateCity();
    }
  });

  const realtimeTemp = document.getElementById('realtime-temp');
  realtimeTemp.addEventListener('click', getCoordinates);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
