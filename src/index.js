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
          const kelvin = response.data.current.temp;
          const fahrenheit = (9 / 5) * (kelvin - 273) + 32;
          temperature = Math.round(fahrenheit);
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

  input.addEventListener('change', (event) => {
    const skyImage = document.querySelector('#sky');
    skyImage.src = getSky(event.target.value);
  });
};

const newTemperature = function () {
  const temperatureMessage = temperature + '\u00B0F';
  document.getElementById('temperature').innerHTML = temperatureMessage;
  setTextColorLandscapeBasedOnTemp();
};

const setTextColorLandscapeBasedOnTemp = function () {
  let landscape = 'landscape';
  let tempColor = '';
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
  let sky = '';
  if (skyType === 'cloudy') {
    sky = './assets/cloud.webp';
  } else if (skyType === 'rainy') {
    sky = './assets/rain.png';
  } else if (skyType === 'snowy') {
    sky = './assets/snow.png';
  } else if (skyType === 'sunny') {
    sky = './assets/sun.webp';
  }
  return sky;
};
