// Tasks to finish:
// Realtime temp button isn't working right?
// reset sky button needs functionality

const state = {
  temp: parseInt(document.querySelector('#display-temp').innerHTML),
  sky: '',
};

skyValues = {
  sunny: ['01d', '01n', '02d', '02n'],
  cloudy: ['03d', '03n', '04d', '04n', '50d', '50n'],
  raining: ['09d', '09n', '10d', '10n', '11d', '11n'],
  snowing: ['13d', '13n'],
};

/* || TEMPERATURE */

// Change color of temperature, based on current temperature
const changeTempColor = () => {
  const currentTemp = document.querySelector('#display-temp');
  if (state.temp >= 80) {
    currentTemp.style.color = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.color = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.color = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.color = 'green';
  } else if (state.temp <= 49) {
    currentTemp.style.color = 'teal';
  }
};

// Change landscape imagebased on temperature input
const changeLandscape = () => {
  const currentTemp = document.querySelector('#display-temp');
  const currentLandscape = document.getElementById('dog-container');
  const winterDog = document.getElementById('winter-dog');
  const hotDog = document.getElementById('hot-dog');
  const autumnDog = document.getElementById('autumn-dog');
  const springDog = document.getElementById('spring-dog');
  console.log("breaking point")
  if (state.temp >= 80) {
    hotDog.style.display = 'block';
    springDog.style.display = 'none';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'none';
  } else if (state.temp >= 70) {
    hotDog.style.display = 'none';
    springDog.style.display = 'block';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'none';
  } else if (state.temp >= 60) {
    hotDog.style.display = 'none';
    springDog.style.display = 'none';
    autumnDog.style.display = 'block';
    winterDog.style.display = 'none';
  } else if (state.temp >= 50) {
    hotDog.style.display = 'none';
    springDog.style.display = 'none';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'block';
  }
};

// Increase and decrease temperature button events
function tempButtons() {
  const currentTemp = document.querySelector('#display-temp');
  const arrowUpButton = document.getElementById('arrow-up');
  const arrowDownButton = document.getElementById('arrow-down');
  const resetTempButton = document.querySelector('#reset-temp');
  // Arrow up click events
  arrowUpButton.addEventListener('click', () => {
    state.temp += 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
    changeLandscape();
  });
  // Arrow down click events
  arrowDownButton.addEventListener('click', () => {
    state.temp -= 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
    changeLandscape();
  });
}

// "Get realtime temperature" click event
const getRealtimeTemp = () => {
  const cityInput = document.querySelector('#input-city');
  const currentTemp = document.querySelector('#display-temp');
  const resetTempButton = document.querySelector('#reset-temp');
  // Reset temperature to currently displayed city
  resetTempButton.addEventListener('click', () => {
    console.log(cityInput.value);
    console.log(cityInput.placeholder);
    getLatLon(cityInput.value).then((latlon) => {
      getWeather(latlon).then((data) => {
        farTemp = Math.floor(1.8 * (data.temp - 273) + 32);
        state.temp = farTemp;
        currentTemp.textContent = state.temp;
        state.sky = data.weather[0].icon;
        changeTempColor();
        changeLandscape();
        changeSky();
      });
    });
  });
};

/* || WEATHER */

// API call to retrieve latitude and longitude of input city
const getLatLon = (cityInput) => {
  let latitude, longitude;
  return axios
    .get(`http://127.0.0.1:5000/location?q=${cityInput}`)
    .then((response) => {
      console.log(response);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      return [latitude, longitude];
    })
    .catch((error) => {
      console.log(`The city ${cityInput.value} doesn't exist, ${error}`);
    });
};

// API call to retrieve weather at given latitude and longitude
const getWeather = ([latitude, longitude]) => {
  return axios
    .get(`http://127.0.0.1:5000/weather?lat=${latitude}&lon=${longitude}`)
    .then((response) => {
      return response.data.current;
    })
    .catch((error) => {
      console.log(`${error}`);
    });
};

// Change city in heading according to text input
const changeCityInput = () => {
  const currentCity = document.querySelector('#current-city');
  const cityInput = document.querySelector('#input-city');
  // 'Enter city name' input box
  cityInput.addEventListener('input', (e) => {
    currentCity.textContent = 'Weather for the city of: ' + e.target.value;
  });
};

// Get weather for city in text input box
const getCurrentCityWeather = () => {
  const currentTemp = document.querySelector('#display-temp');
  const cityButton = document.querySelector('#get-city-weather');
  const cityInput = document.querySelector('#input-city');
  // 'Get the weather!' click event
  cityButton.addEventListener('click', () => {
    getLatLon(cityInput.value).then((latlon) => {
      getWeather(latlon).then((data) => {
        farTemp = Math.floor(1.8 * (data.temp - 273) + 32);
        state.temp = farTemp;
        currentTemp.textContent = state.temp;
        state.sky = data.weather[0].icon;
        changeTempColor();
        changeLandscape();
        changeSky();
      });
    });
  });
};

// Get Seattle weather on page load
const getdefaultWeather = () => {
  const currentTemp = document.querySelector('#display-temp');
  getLatLon('Seattle').then((latlon) => {
    getWeather(latlon).then((data) => {
      farTemp = Math.floor(1.8 * (data.temp - 273) + 32);
      state.temp = farTemp;
      currentTemp.textContent = state.temp;
      state.sky = data.weather[0].icon;
      changeTempColor();
      changeLandscape();
      changeSky();
    });
  });
};

// Reset page to Seattle weather and conditions
const resetToSeattle = () => {
  document.querySelector('#input-city').value = '';
  const currentCity = document.querySelector('#current-city');
  const cityInput = document.querySelector('#input-city');
  const resetButton = document.querySelector('#reset-to-seattle');
  // 'reset to Seattle' click event
  resetButton.addEventListener('click', () => {
    currentCity.textContent = 'Weather for the city of: Seattle';
    cityInput.value = 'Seattle';
    getdefaultWeather();
  });
};

/* || SKY */

// Updates sky according to conditions
const updateSky = (currentSkyValue) => {
  const backgroundColor = document.querySelector('body');
  if (currentSkyValue === 'sunny') {
    backgroundColor.style.backgroundColor = 'goldenrod';
  } else if (currentSkyValue === 'cloudy') {
    backgroundColor.style.backgroundColor = 'lightgrey';
  } else if (currentSkyValue === 'raining') {
    backgroundColor.style.backgroundColor = 'lightblue';
  } else if (currentSkyValue === 'snowing') {
    backgroundColor.style.backgroundColor = 'whitesmoke';
  }
};

// Changes sky according to weather or 'change' event on drop-down menu
const changeSky = () => {
  const currentSky = document.querySelector('#sky-select');
  for (const [condition, icons] of Object.entries(skyValues)) {
    if (icons.includes(state.sky)) {
      currentSky.value = condition;
      updateSky(condition);
    }
  }
  // Drop-down feature updates the sky
  currentSky.addEventListener('change', () => {
    updateSky(currentSky.value);
  });
};

// Function calls required on page load
document.addEventListener('DOMContentLoaded', tempButtons);
document.addEventListener('DOMContentLoaded', getRealtimeTemp);
document.addEventListener('DOMContentLoaded', changeLandscape);
document.addEventListener('DOMContentLoaded', changeCityInput);
document.addEventListener('DOMContentLoaded', getCurrentCityWeather);
document.addEventListener('DOMContentLoaded', getdefaultWeather);
document.addEventListener('DOMContentLoaded', resetToSeattle);
document.addEventListener('DOMContentLoaded', updateSky);
document.addEventListener('DOMContentLoaded', changeSky);
