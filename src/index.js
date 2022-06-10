const state = {
  currentTemp: 80,
};

const tempColor = function (temperature) {
  if (temperature >= 100) {
    return 'color:red;';
  } else if (temperature >= 90) {
    return 'color:orange;';
  } else if (temperature >= 80) {
    return 'color:skyblue;';
  } else if (temperature >= 70) {
    return 'color:green;';
  } else {
    return 'color:teal;';
  }
};

const tempPic = function (temperature) {
  if (temperature >= 100) {
    return 'red-sand.jpeg';
  } else if (temperature >= 90) {
    return 'orange-park.jpeg';
  } else if (temperature >= 80) {
    return 'summer-beach.jpeg';
  } else if (temperature >= 70) {
    return 'bow-lake.jpeg';
  } else {
    return 'sunset.jpeg';
  }
};

const changeTempUp = function () {
  const tempDisplay = document.getElementById('tempDisplay');
  const landScape = document.getElementById('landScape');
  state.currentTemp += 1;
  const color = tempColor(currentTemp);
  const imgFileName = tempPic(currentTemp);
  tempDisplay.innerHTML = `<p style="${color}">Current Temperature: ${currentTemp} F</p>`;
  landScape.innerHTML = `<img alt="Nice Landscape" src="assets/${imgFileName}">`;
};

const changeTempDown = function () {
  const tempDisplay = document.getElementById('tempDisplay');
  const landScape = document.getElementById('landScape');
  state.currentTemp -= 1;
  const color = tempColor(currentTemp);
  const imgFileName = tempPic(currentTemp);
  tempDisplay.innerHTML = `<p style="${color}">Current Temperature: ${currentTemp} F</p>`;
  landScape.innerHTML = `<img alt="summer-beach" src="assets/${imgFileName}">`;
};

const changeCity = function () {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value;
  const titleCityName = document.getElementById('titleCityName');
  titleCityName.innerHTML = `Weather Report for ${cityName}`;
};

const registerEventHandlers = function () {
  const increaseTempButton = document.getElementById('increaseTemp');
  increaseTempButton.addEventListener('click', changeTempUp);
  const decreaseTempButton = document.getElementById('decreaseTemp');
  decreaseTempButton.addEventListener('click', changeTempDown);
  const enterCityButton = document.getElementById('enterCityName');
  enterCityButton.addEventListener('click', changeCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
