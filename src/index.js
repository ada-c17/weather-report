console.log('Hello, World!');

const state = {
  temp: parseInt(document.getElementById('display-temp').innerHTML),
  sky: '',
};

console.log(state.sky);

skyValues = {
  sunny: ['01d', '01n', '02d', '02n'],
  cloudy: ['03d', '03n', '04d', '04n', '50d', '50n'],
  raining: ['09d', '09n', '10d', '10n', '11d', '11n'],
  snowing: ['13d', '13n'],
};

const changeTempColor = () => {
  const currentTemp = document.getElementById('display-temp');
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

// Change landscape based on temperature input
const changeLandscape = () => {
  const currentTemp = document.getElementById('display-temp');
  const currentLandscape = document.getElementById('dog-container');
  const winterDog = document.getElementById('winter-dog');
  const hotDog = document.getElementById('hot-dog');
  const autumnDog = document.getElementById('autumn-dog');
  const springDog = document.getElementById('spring-dog');
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
  } else if (state.temp <= 50) {
    hotDog.style.display = 'none';
    springDog.style.display = 'none';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'block';
  }
};

const changeTemp = () => {
  const currentTemp = document.getElementById('display-temp');
  const arrowUpButton = document.getElementById('arrow-up');
  const arrowDownButton = document.getElementById('arrow-down');
  arrowUpButton.addEventListener('click', () => {
    state.temp += 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
    changeLandscape();
  });
  arrowDownButton.addEventListener('click', () => {
    state.temp -= 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
    changeLandscape();
  });
};

const changeCityName = () => {
  document.querySelector('#input-city').value = '';
  const currentCity = document.querySelector('#current-city');
  const cityInput = document.querySelector('#input-city');
  const resetButton = document.querySelector('.reset-button');
  cityInput.addEventListener('input', (e) => {
    currentCity.textContent = 'Weather for the city of: ' + e.target.value;
  });
  resetButton.addEventListener('click', () => {
    currentCity.textContent = 'Weather for the city of: Seattle, WA';
    cityInput.value = '';
  });
};

const getCurrentWeather = () => {
  const currentTemp = document.getElementById('display-temp');
  const cityButton = document.querySelector('#get-city-weather');
  const cityInput = document.querySelector('#input-city');
  cityButton.addEventListener('click', () => {
    getLatLon(cityInput.value).then((latlon) => {
      getWeather(latlon).then((data) => {
        farTemp = Math.floor(1.8 * (data.temp - 273) + 32);
        state.temp = farTemp;
        currentTemp.textContent = state.temp;
        state.sky = data.weather[0].icon;
        console.log(state.sky);
        changeTempColor();
        changeLandscape();
        getSky();
      });
    });
  });
};

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

const getSky = () => {
  const backgroundColor = document.querySelector('body');
  const currentSky = document.querySelector('#sky-select');

  for (const [condition, icons] of Object.entries(skyValues)) {
    console.log(condition);
    if (icons.includes(state.sky)) {
      currentSky.value = condition;
      if (currentSky.value === 'sunny') {
        backgroundColor.style.backgroundColor = 'goldenrod';
      } else if (currentSky.value === 'cloudy') {
        backgroundColor.style.backgroundColor = 'grey';
      } else if (currentSky.value === 'raining') {
        backgroundColor.style.backgroundColor = 'blue';
      } else if (currentSky.value === 'snowing') {
        backgroundColor.style.backgroundColor = 'white';
      }
    }
  }
};

const changeSky = () => {
  const currentSky = document.querySelector('#sky-select');
  const backgroundColor = document.querySelector('body');

  currentSky.addEventListener('change', () => {
    if (currentSky.value === 'sunny') {
      backgroundColor.style.backgroundColor = 'goldenrod';
    } else if (currentSky.value === 'cloudy') {
      backgroundColor.style.backgroundColor = 'grey';
    } else if (currentSky.value === 'raining') {
      backgroundColor.style.backgroundColor = 'blue';
    } else if (currentSky.value === 'snowing') {
      backgroundColor.style.backgroundColor = 'white';
    }
  });
};

// function calls for all defined functions
document.addEventListener('DOMContentLoaded', changeTemp);
document.addEventListener('DOMContentLoaded', changeLandscape);
document.addEventListener('DOMContentLoaded', changeCityName);
document.addEventListener('DOMContentLoaded', changeSky);
document.addEventListener('DOMContentLoaded', getCurrentWeather);
