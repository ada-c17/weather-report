// import 'regenerator-runtime/runtime';
// import axios from 'axios';

const state = {
  temp: 70,
  color: document.getElementById('mid--color'),
  skyCondition: document.getElementById('sky--select-box'),
  skyConditionImage: document.getElementById('sky'),
  land: document.getElementById('land'),
  location: '',
  lat: 0,
  lon: 0,
  downloading: true,
};

// ********** SKY changes ***********
// change sky
const changeSky = () => {
  // SUNNY
  if (state.skyCondition.value === 'sunny') {
    state.skyConditionImage.alt = 'outline of hills with yellow sunset';

    state.skyConditionImage.title = 'Photo by Nic Y-C on Unsplash';

    state.skyConditionImage.style.background =
      "url('/assets/sky/sunny 1920x360.jpg')";

    // RAINY
  } else if (state.skyCondition.value === 'rainy') {
    state.skyConditionImage.alt = 'tree branches in a rain storm';

    state.skyConditionImage.title = 'Photo by Milin John on Unsplash';

    state.skyConditionImage.style.background =
      "url('/assets/sky/rainy 1920x360.jpg')";

    // CLOUDY
  } else if (state.skyCondition.value === 'cloudy') {
    state.skyConditionImage.alt = 'dark sky with fluffy dark clouds';

    state.skyConditionImage.title = 'Photo by Harshit Sharma on Unsplash';

    state.skyConditionImage.style.background =
      "url('/assets/sky/cloudy 1920x360.jpg')";

    // SNOWY
  } else if (state.skyCondition.value === 'snowy') {
    state.skyConditionImage.alt =
      'ice covered tree branch covered snow falling our of sky';

    state.skyConditionImage.title = 'Photo by Chandler Cruttenden on Unsplash';

    state.skyConditionImage.style.background =
      "url('/assets/sky/snowy 1920x360.jpg')";

    // CLEAR
  } else if (state.skyCondition.value === ' ') {
    state.skyConditionImage.alt = 'clear blue skies';

    state.skyConditionImage.title = 'Photo by Patrick Fore on Unsplash';

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
  changeSky();
};

// ********** TEMP changes ***********
// change TEMP displayed
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
    state.land.style.background = "url('/assets/temp/80 plus 1920x360.jpg')";
  } else if (state.temp >= 70) {
    state.color.style.backgroundColor = 'rgba(252,67,29, 0.5)';
    state.land.style.background = "url('/assets/temp/70 to 79 1920x360.jpg')";
  } else if (state.temp >= 60) {
    state.color.style.backgroundColor = 'rgba(238,170,60, 0.5)';
    state.land.style.background = "url('/assets/temp/60 to 69  1920x360.jpg')";
  } else if (state.temp >= 50) {
    state.color.style.backgroundColor = 'rgba(135,160,180, 0.5)';
    state.land.style.background =
      "url('/assets/temp/50 to below 1920x360.jpg')";
  } else {
    state.color.style.backgroundColor = 'rgba(193,205,215, 0.5)';
  }
};

// **********LOCATION INPUT changes ***********
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

// location loading text
const changeWeatherLoading = () => {
  const dlProgressContainer = document.getElementById(
    'downloading-progress-text'
  );
  dlProgressContainer.textContent = `Getting ${state.location} weather`;
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
  state.skyCondition.value = ' ';
  state.temp = 70;
  changeTempDisplay();
  changeSky();
};

// ********API CALLS*********
// get LOCATION info
const getLatLon = () => {
  const dlProgressContainer = document.getElementById(
    'downloading-progress-text'
  );
  dlProgressContainer.textContent = `Getting ${state.location} weather`;
  axios
    .get('https://weather-report-proxy-server-7n03.onrender.com/location', {
      params: {
        q: state.location,
      },
    })
    .then((response) => {
      state.lon = response.data[0].lon;
      state.lat = response.data[0].lat;
    })
    .then(() => {
      getLocationWeather(dlProgressContainer);
    })
    .catch((error) => {
      console.log(error);
      dlProgressContainer.textContent = 'Error occurred while fetching weather';
    });
};

// get WEATHER info
const getLocationWeather = (progress) => {
  axios
    .get('https://weather-report-proxy-server-7n03.onrender.com/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      condition = response.data.current.weather[0].main;
      kelvinTemp = response.data.current.temp;
    })
    .then((response) => {
      validateSkyCondition(condition);
      convertKelvin(kelvinTemp);
      progress.innerHTML = ''; // Clear loading message
      progress.appendChild(document.createElement('br'));
      changeColorTemp();
    })
    .catch((error) => {
      console.log(error);
      progress.textContent = 'Error occurred while fetching weather';
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
  // change location - RETURN key
  const enterKeyLocationSubmit = document.getElementById('location-input');
  enterKeyLocationSubmit.addEventListener(
    'keyup',
    returnKeySubmitLocationInput
  );
  // change location - NAME DISPLAY
  const locationInput = document.getElementById('location-input');
  locationInput.addEventListener('keyup', changeLocationDisplay);
  // reset page - RESET button
  const locationReset = document.getElementById('location-reset');
  locationReset.addEventListener('click', resetInput);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
