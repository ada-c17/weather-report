const state = {
  currentTemp: 80,
  lat: 40.594,
  lon: -74.6049,
};

const tempConvert = function (K) {
  F = Math.round(((K - 273.15) * 9) / 5 + 32);

  return F;
};

const setCurrentTemp = function (temp) {
  state.currentTemp = tempConvert(temp);
};

const tempColor = function (temperature) {
  if (temperature >= 80) {
    return 'text-color-red';
  } else if (temperature >= 70) {
    return 'text-color-orange';
  } else if (temperature >= 60) {
    return 'text-color-skyblue';
  } else if (temperature >= 50) {
    return 'text-color-green';
  } else {
    return 'text-color-plum';
  }
};

const tempPic = function (temperature) {
  if (temperature >= 80) {
    return 'red-sand.jpeg';
  } else if (temperature >= 70) {
    return 'orange-park.jpeg';
  } else if (temperature >= 60) {
    return 'summer-beach.jpeg';
  } else if (temperature >= 50) {
    return 'bow-lake.jpeg';
  } else {
    return 'sunset.jpeg';
  }
};

const displayTemperature = function (temperature) {
  const tempDisplay = document.getElementById('tempDisplay');
  const landScape = document.getElementById('landScape');
  const color = tempColor(temperature);
  const imgFileName = tempPic(temperature);
  const displayString = `<p class="${color}">Current Temperature: ${temperature} F</p>`;
  const imgFileNameString = `<img alt="Nice Landscape" src="assets/${imgFileName}">`;
  tempDisplay.innerHTML = displayString;
  landScape.innerHTML = imgFileNameString;
};

const getTemp = function () {
  const p = {
    params: {
      lat: state.lat,
      lon: state.lon,
    },
  };
  axios.get('http://127.0.0.1:5000/weather', p).then((response) => {
    console.log(response);
    state.currentTemp = tempConvert(response.data.current.temp);
    displayTemperature(state.currentTemp);
  });
};

const getLocationAndTemp = function (place) {
  const p = {
    params: {
      q: place,
    },
  };
  axios.get('http://127.0.0.1:5000/location', p).then((response) => {
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    getTemp();
  });
};

const changeTempUp = function () {
  state.currentTemp += 1;
  displayTemperature(state.currentTemp);
};

const changeTempDown = function () {
  state.currentTemp -= 1;
  displayTemperature(state.currentTemp);
};

const changeCity = function () {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value;
  getLocationAndTemp(cityName);
  const titleCityName = document.getElementById('titleCityName');
  titleCityName.innerHTML = `Weather Report for ${cityName}`;
};

const resetCity = function () {
  state.lat = 40.594;
  state.lon = -74.6049;
  getTemp();
  const titleCityName = document.getElementById('titleCityName');
  titleCityName.innerHTML = 'Weather Report for Bridgewater';
  const cityInput = document.getElementById('cityInput');
  cityInput.value = 'Bridgewater';
};

const changeSky = function () {
  const skySelect = document.getElementById('sky-select');
  const skyType = skySelect.value;
  let imgFileName = '';
  if (skyType == 'sun') {
    imgFileName = 'sky-sun.jpeg';
  } else if (skyType == 'cloud') {
    imgFileName = 'sky-cloud.jpeg';
  } else if (skyType == 'rain') {
    imgFileName = 'sky-rain.jpeg';
  } else {
    imgFileName = 'sky-snow.jpeg';
  }
  const sky = document.getElementById('sky');
  sky.innerHTML = `<img alt="Nice Sky" src="assets/${imgFileName}">`;
};

const registerEventHandlers = function () {
  const increaseTempButton = document.getElementById('increaseTemp');
  increaseTempButton.addEventListener('click', changeTempUp);
  const decreaseTempButton = document.getElementById('decreaseTemp');
  decreaseTempButton.addEventListener('click', changeTempDown);
  const enterCityButton = document.getElementById('enterCityName');
  enterCityButton.addEventListener('click', changeCity);
  const resetCityE = document.getElementById('resetCity');
  resetCityE.addEventListener('click', resetCity);
  const selectSky = document.getElementById('sky-select');
  selectSky.addEventListener('change', changeSky);
  getTemp();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
