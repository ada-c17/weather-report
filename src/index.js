const state = {
  temp: 70,
  color: document.getElementById('mid--color'),
  skyCondition: document.getElementById('sky--select-box'),
  skyConditionImage: document.getElementById('sky'),
  land: document.getElementById('land'),
  location: '',
  lat: 0,
  lon: 0,
};

// ********** SKY changes***********
// change sky
const changeSky = () => {
  if (state.skyCondition.value === 'sunny') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/sunny 1920x360.jpg')";
  } else if (state.skyCondition.value === 'rainy') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/rainy 1920x360.jpg')";
  } else if (state.skyCondition.value === 'cloudy') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/cloudy 1920x360.jpg')";
  } else if (state.skyCondition.value === 'snowy') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/snowy 1920x360.jpg')";
  } else if (state.skyCondition.value === ' ') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/clear 1920x360.jpg')";
  }
};

const validateSkyCondition = (condition) => {
  if (condition === 'Clear') {
    state.skyCondition.value = 'sunny';
  } else if (
    condition === 'Rain' ||
    condition === 'Drizzle' ||
    condition === 'Thunderstorm'
  ) {
    state.skyCondition.value = 'rainy';
  } else if (condition === 'Clouds') {
    state.skyCondition.value = 'cloudy';
  } else if (condition === 'Snow') {
    state.skyCondition.value = 'snowy';
  }
};

// ********** TEMP changes***********
// change TEMP
const changeTempDisplay = () => {
  const tempContainer = document.getElementById('temperature');
  tempContainer.textContent = `${state.temp}°F`;
};

const incTemp = () => {
  state.temp++;
  changeTempDisplay();
};
const decTemp = () => {
  state.temp--;
  changeTempDisplay();
};

const convertKelvin = (temp) => {
  state.temp = Math.floor(((temp - 273.15) * 9) / 5 + 32);
  changeTempDisplay();
};

// change BOTTOM image and MIDDLE color based on temp
const changeColorTemp = () => {
  if (state.temp >= 80) {
    state.color.style.backgroundColor = 'rgba(140,114,89, 0.5)';
    document.getElementById('land').style.background =
      "url('/assets/temp/80 plus 1920x360.jpg')";
  } else if (state.temp >= 70) {
    state.color.style.backgroundColor = 'rgba(252,67,29, 0.5)';
    document.getElementById('land').style.background =
      "url('/assets/temp/70 to 79 1920x360.jpg')";
  } else if (state.temp >= 60) {
    state.color.style.backgroundColor = 'rgba(238,170,60, 0.5)';
    document.getElementById('land').style.background =
      "url('/assets/temp/60 to 69  1920x360.jpg')";
  } else if (state.temp >= 50) {
    state.color.style.backgroundColor = 'rgba(135,160,180, 0.5)';
    document.getElementById('land').style.background =
      "url('/assets/temp/50 to below 1920x360.jpg')";
  } else {
    state.color.style.backgroundColor = 'rgba(193,205,215, 0.5)';
  }
};

// **********LOCATION INPUT changes***********
// location name updates in REAL TIME
const changeLocationDisplay = () => {
  const inputText = document.getElementById('location-input');
  const newLocationName = document.getElementById(
    'location-display--display-name'
  );
  newLocationName.textContent = inputText.value;
};

// location NAME UPDATES with RETURN key
const returnKeySubmitLocationInput = (event) => {
  if (event.key == 'Enter') {
    submitLocationInput();
  }
};

// location NAME UPDATES with SUBMIT button
const submitLocationInput = () => {
  state.location = document.getElementById('location-input').value;
  getLatLon();
};

// ******** RESET *********
// location NAME RESET
const resetInput = () => {
  const newLocationName = document.getElementById(
    'location-display--display-name'
  );
  document.getElementById('land').style.background =
    "url('/assets/temp/default 1920x360.jpg')";
  state.color.style.backgroundColor = 'rgba(255,255,255, 0.5)';
  const inputText = document.getElementById('location-input');

  inputText.value = '';
  newLocationName.textContent = 'Earth';
  state.skyCondition = ' ';
  state.temp = 70;
  changeTempDisplay();
  changeSky();
};

// ********API CALLS*********
// get LOCATION info
const getLatLon = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
      params: {
        q: state.location,
      },
    })
    .then((response) => {
      console.log(response);
      state.lon = response.data[0].lon;
      state.lat = response.data[0].lat;
      getLocationWeather();
    })
    .catch((error) => {
      console.log(error);
    });
};

// get WEATHER info
const getLocationWeather = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      condition = response.data.current.weather[0].main;
      kelvinTemp = response.data.current.temp;
      validateSkyCondition(condition);
      convertKelvin(kelvinTemp);
      changeSky();
      changeColorTemp();
    })
    .catch((error) => {
      console.log(error);
    });
};

const registerEventHandlers = () => {
  // change sky
  const makeSkyChange = document.getElementById('sky--select-box');
  makeSkyChange.addEventListener('change', changeSky);
  // increase temp
  const tempInc = document.getElementById('arrow-increase');
  tempInc.addEventListener('click', incTemp);
  tempInc.addEventListener('click', changeColorTemp);
  // decrease temp
  const tempDec = document.getElementById('arrow-decrease');
  tempDec.addEventListener('click', decTemp);
  tempDec.addEventListener('click', changeColorTemp);
  // change location - SUBMIT button
  const locationSubmit = document.getElementById('location-submit');
  locationSubmit.addEventListener('click', submitLocationInput);
  // change location - SUBMIT - RETURN
  const enterKeyLocationSubmit = document.getElementById('location-input');
  enterKeyLocationSubmit.addEventListener(
    'keyup',
    returnKeySubmitLocationInput
  );
  // change location - NAME DISPLAY
  const locationInput = document.getElementById('location-input');
  locationInput.addEventListener('keyup', changeLocationDisplay);
  // change location - RESET button
  const locationReset = document.getElementById('location-reset');
  locationReset.addEventListener('click', resetInput);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
