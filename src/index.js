// ********** ELEMENTS ***********
const midColor = document.getElementById('mid--color');
const sky = document.getElementById('sky--select-box');
const skyImage = document.getElementById('sky');
const land = document.getElementById('land');
const tempContainer = document.getElementById('temperature');
const locationInputText = document.getElementById('location-input');
const newLocationName = document.getElementById(
  'location-display--display-name'
);
const dlProgressContainer = document.getElementById(
  'downloading-progress-text'
);
const tempInc = document.getElementById('arrow-increase');
const tempDec = document.getElementById('arrow-decrease');
const locationSubmit = document.getElementById('location-submit');
const locationReset = document.getElementById('location-reset');

// ********** STATE ***********
const state = {
  temp: 70,
  color: midColor,
  sky,
  skyImage,
  land,
  location: '',
  lat: 0,
  lon: 0,
};

// ********** SKY changes ***********
// validate sky
const validatesky = (condition) => {
  if (condition === 'Clear') {
    state.sky.value = 'sunny';
  } else if (
    condition === 'Rain' ||
    condition === 'Drizzle' ||
    condition === 'Thunderstorm'
  ) {
    state.sky.value = 'rainy';
  } else if (condition === 'Clouds') {
    state.sky.value = 'cloudy';
  } else if (condition === 'Snow') {
    state.sky.value = 'snowy';
  } else if (condition === 'Foggy') {
    state.sky.value = 'foggy';
  } else if (condition === 'Clear') {
    state.sky.value = 'clear';
  } else if (condition === 'Tornado') {
    state.sky.value = 'tornado';
  } else {
    state.sky.value = 'other';
  }
  changeSky();
};

// change sky
const changeSky = () => {
  // SUNNY
  if (state.sky.value === 'sunny') {
    state.skyImage.ariaLabel = 'outline of hills with yellow sunset';
    state.skyImage.title = 'Photo by Nic Y-C on Unsplash';
    state.skyImage.style.background = "url('/assets/sky/sunny 1920x360.jpg')";

    // RAINY
  } else if (state.sky.value === 'rainy') {
    state.skyImage.ariaLabel = 'tree branches in a rain storm';
    state.skyImage.title = 'Photo by Milin John on Unsplash';
    state.skyImage.style.background = "url('/assets/sky/rainy 1920x360.jpg')";

    // CLOUDY
  } else if (state.sky.value === 'cloudy') {
    state.skyImage.ariaLabel = 'dark sky with fluffy dark clouds';
    state.skyImage.title = 'Photo by Harshit Sharma on Unsplash';
    state.skyImage.style.background = "url('/assets/sky/cloudy 1920x360.jpg')";

    // SNOWY
  } else if (state.sky.value === 'snowy') {
    state.skyImage.ariaLabel =
      'ice covered tree branch covered snow falling our of sky';
    state.skyImage.title = 'Photo by Chandler Cruttenden on Unsplash';
    state.skyImage.style.background = "url('/assets/sky/snowy 1920x360.jpg')";

    // TORNADO
  } else if (state.sky.value === 'tornado') {
    state.skyImage.ariaLabel =
      'dark sky with tornado to the left and lightning to the right over green hills';
    state.skyImage.title = 'Photo by Ralph W. lambrecht on Pexels';
    state.skyImage.style.background = "url('/assets/sky/tornado 1920x360.jpg')";

    // FOGGY
  } else if (state.sky.value === 'foggy') {
    state.skyImage.ariaLabel =
      'dark sky with tornado to the left and lightning to the right over green hills';
    state.skyImage.title = 'Photo by Axel Holen on Unsplash';
    state.skyImage.style.background = "url('/assets/sky/foggy 1920x360.jpg')";

    // CLEAR
  } else if (state.sky.value === 'clear' || state.sky.value === ' ') {
    state.skyImage.ariaLabel = 'clear blue skies';
    state.skyImage.title = 'Photo by Patrick Fore on Unsplash';
    state.skyImage.style.background = "url('/assets/sky/clear 1920x360.jpg')";

    // OTHER
  } else {
    state.skyImage.ariaLabel =
      'dark sky with tornado to the left and lightning to the right over green hills';
    state.skyImage.title = 'Photo by Xiomara R.';
    state.skyImage.style.background = "url('/assets/sky/other 1920x360.jpg')";
  }
};

// ********** TEMP changes ***********
// change TEMP displayed
const changeTempDisplay = () => {
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
    state.land.ariaLabel = 'tan dry desert ground';
    state.landgit = 'Photo by Ivars Krutainis on Unsplash';
    state.land.style.background = "url('/assets/temp/80 plus 1920x360.jpg')";
  } else if (state.temp >= 70) {
    state.color.style.backgroundColor = 'rgba(252,67,29, 0.5)';
    state.land.ariaLabel = "a field of red poppy flowers')";
    state.land.title = 'Photo by Marten Bjork on Unsplash';
    state.land.style.background = "url('/assets/temp/70 to 79 1920x360.jpg')";
  } else if (state.temp >= 60) {
    state.color.style.backgroundColor = 'rgba(238,170,60, 0.5)';
    state.land.ariaLabel = "golden wheat in a field bathed in sunlight')";
    state.land.title = 'Photo by Dan Smedley on Unsplash';
    state.land.style.background = "url('/assets/temp/60 to 69  1920x360.jpg')";
  } else if (state.temp >= 50) {
    state.color.style.backgroundColor = 'rgba(135,160,180, 0.5)';
    state.land.ariaLabel = "mountain floor covered in snow and ice')";
    state.land.title = 'Photo by Thomas Hetzler on Unsplash';
    state.land.style.background =
      "url('/assets/temp/50 to below 1920x360.jpg')";
  } else {
    state.color.style.backgroundColor = 'rgba(193,205,215, 0.5)';
  }
};

// **********LOCATION INPUT changes ***********
// location name updates in REAL TIME
const changeLocationDisplay = () => {
  newLocationName.textContent = locationInputText.value;
};

// location NAME UPDATES with RETURN key
const returnKeySubmitLocationInput = (event) => {
  if (event.key == 'Enter') {
    submitLocationInput();
  }
};

// location NAME UPDATES with SUBMIT button
const submitLocationInput = () => {
  state.location = locationInputText.value;
  getLatLon();
};

// ******** RESET *********
// location NAME RESET
const resetInput = () => {
  state.land.style.background = "url('/assets/temp/default 1920x360.jpg')";
  state.color.style.backgroundColor = 'rgba(255,255,255, 0.5)';

  locationInputText.value = '';
  newLocationName.textContent = 'Earth';
  state.sky.value = ' ';
  state.temp = 70;
  changeTempDisplay();
  changeSky();
};

// ********API CALLS*********
// get LOCATION info
const getLatLon = () => {
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
      dlProgressContainer.textContent =
        'Error occurred while fetching location coordinates';
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
      console.log(response.data.current.weather[0].main);
      condition = response.data.current.weather[0].main;
      kelvinTemp = response.data.current.temp;
    })
    .then((response) => {
      validatesky(condition);
      convertKelvin(kelvinTemp);
      progress.innerHTML = '';
      progress.appendChild(document.createElement('br'));
      changeColorTemp();
    })
    .catch((error) => {
      console.log(error);
      progress.textContent = 'Error occurred while fetching weather conditions';
    });
};

const registerEventHandlers = () => {
  // change sky
  sky.addEventListener('change', changeSky);
  // increase temp
  tempInc.addEventListener('click', incTemp);
  tempInc.addEventListener('click', changeColorTemp);
  // decrease temp
  tempDec.addEventListener('click', decTemp);
  tempDec.addEventListener('click', changeColorTemp);
  // change location - SUBMIT button
  locationSubmit.addEventListener('click', submitLocationInput);
  // change location - RETURN key
  locationInputText.addEventListener('keyup', returnKeySubmitLocationInput);
  // change location - NAME DISPLAY
  locationInputText.addEventListener('keyup', changeLocationDisplay);
  // reset page - RESET button
  locationReset.addEventListener('click', resetInput);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
