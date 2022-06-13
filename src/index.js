'use strict';

let city = 'Seattle';
let temperature = 79;

window.onload = function () {
  newTemperature();
  changeCity();
  changeSky();
  getCurrentTemp();
};

const increaseTemp = function () {
  temperature += 1;
  newTemperature();
};

const decreaseTemp = function () {
  temperature -= 1;
  newTemperature();
};

const getCurrentTemp = function () {
  let latitude;
  let longitude;

  axios
    .get('http://localhost:5000/location', { params: { q: city } })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      axios
        .get('http://localhost:5000/weather', {
          params: { lat: latitude, lon: longitude },
        })
        .then((response) => {
          // set temperature to the temp returned converted to fahrenheit
          const kelvin = response.data.current.temp;
          const fahrenheit = (9 / 5) * (kelvin - 273) + 32;
          temperature = Math.round(fahrenheit);

          // change the sky image based on the current weather data returned
          const sky = response.data.current.weather[0].main;
          document.querySelector('#skytype-select').value = sky;
          document.querySelector('#sky').src = getSky(sky);
          changeSky();

          // update temperature
          newTemperature();
        })
        .catch((error) => {
          console.log('errorrrr');
        });
    })
    .catch((error) => {
      console.log('error :(');
    });
};

const resetCity = function () {
  city = 'Seattle';
  document.querySelector('#cityname').value = '';
  const curWeatherHeader = document.getElementById('cityheader');
  curWeatherHeader.textContent = 'Current Weather for ' + city;
};

const changeCity = function () {
  // if the #cityname element is changed
  const input = document.querySelector('#cityname');
  input.addEventListener('change', updateValue);

  // update header to display city name and update city variable
  const curWeatherHeader = document.getElementById('cityheader');
  function updateValue(e) {
    city = e.target.value;
    curWeatherHeader.textContent = 'Current Weather for ' + city;
  }
};

const changeSky = function () {
  const input = document.querySelector('#skytype-select');

  // if the #skytype-select selection changes, change the image
  input.addEventListener('change', (event) => {
    const skyImage = document.querySelector('#sky');
    skyImage.src = getSky(event.target.value);
  });
};

const newTemperature = function () {
  // change temperature message and landscape based on the temperature
  const temperatureMessage = temperature + '\u00B0F';
  document.getElementById('temperature').innerHTML = temperatureMessage;
  setTextColorLandscapeBasedOnTemp();
};

const setTextColorLandscapeBasedOnTemp = function () {
  let landscape;
  let tempColor;

  if (temperature >= 80) {
    tempColor = 'maroon';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70) {
    tempColor = 'coral';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60) {
    tempColor = 'goldenrod';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50) {
    tempColor = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature < 50) {
    tempColor = 'teal';
    landscape = '⛄🥶 ❄️🥶 ❄️ 🧤 🧥🧣❄️🥶 ❄️🥶 ⛄';
  }
  document.getElementById('temperature').style.color = tempColor;
  document.getElementById('landscape').innerHTML = landscape;
};

const getSky = function (skyType) {
  let sky;

  if (skyType === 'cloudy' || skyType === 'Clouds') {
    sky = './assets/cloud.webp';
  } else if (
    skyType === 'rainy' ||
    skyType === 'Rain' ||
    skyType === 'Drizzle' ||
    skyType === 'Thunderstorm'
  ) {
    sky = './assets/rain.png';
  } else if (skyType === 'snowy' || skyType === 'Snow') {
    sky = './assets/snow.png';
  } else if (skyType === 'sunny' || skyType === 'Clear') {
    sky = './assets/sun.webp';
  } else {
    sky = './assets/unknown_weather.png';
  }

  return sky;
};
