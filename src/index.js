console.log('Hello, World!');

const state = {
  temp: parseInt(document.getElementById('display-temp').innerHTML),
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

// Get weather! We should add a <button> element that when clicked updates
// and displays the realtime temperature of the currently displayed city name.

// getLatLon should:
// take the current input from the box
// use it to make a GET request with Location IQ
// return lat, long

// getWeather should:
// add event listener on click, event is getWeather function
// call getLatLon
// use the return value make GET request for weather at those coordinates
// return temperature to state variable for temp

const getLatLon = () => {
  const cityInput = document.querySelector('#input-city');
  let latitude, longitude;
  axios
    .get('https://us1.locationiq.com/v1/search.php', {
      params: {
        key: LOCATIONIQ_KEY,
        city: cityInput,
        format: 'json',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('successful getWeather request', latitude, longitude);
      return [latitude, longitude];
    })
    .catch((error) => {
      console.log("that city doesn't exist");
    });
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
