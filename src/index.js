const state = {
  tempCounter: 72,
  lat: '49.7818607',
  lon: '20.9440505',
  city: 'Kąśna Dolna, Poland'
};

const increaseTemp = (event) => {
  state.tempCounter += 1;
  const tempCounterContainer = document.getElementById('tempNumber');
  tempCounterContainer.textContent = state.tempCounter + '°';
  let tempCircle = document.getElementById('circle');
  tempCircle = displayColorAndGarden(event);
};

const decreaseTemp = (event) => {
  state.tempCounter -= 1;
  const tempCounterContainer = document.querySelector('#tempNumber');
  tempCounterContainer.textContent = state.tempCounter +'°';
  let tempCircle = document.getElementById('circle');
  tempCircle = displayColorAndGarden(event);
};

const displayColorAndGarden = (event) => {
  let tempCircleColor = document.getElementById('tempNumber');
  let gardenContainer = document.getElementById('earthGarden')
  if (state.tempCounter >= 80) {
    tempCircleColor.style.color = 'red';
    gardenContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.tempCounter <= 79 && state.tempCounter >= 70) {
    tempCircleColor.style.color = 'orange';
    gardenContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.tempCounter <= 69 && state.tempCounter >= 60) {
    tempCircleColor.style.color = 'yellow';
    gardenContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.tempCounter <= 59 && state.tempCounter >= 50) {
    tempCircleColor.style.color = 'aquamarine';
    gardenContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.tempCounter <= 49 && state.tempCounter >= 30) {
    tempCircleColor.style.color = 'teal';
    gardenContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const displaySky = (event) => {
  const selectSkyEl = document.querySelector('option');
  // console.log(selectSkyEl);
  let changeSkyEl = document.getElementById('skyGarden');
  if (selectSkyEl.value === 'sunny') {
    changeSkyEl.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️'
  } else if (selectSkyEl.value === 'cloudy') {
    changeSkyEl.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️'
  } else if (selectSkyEl.value === 'rainy') {
    changeSkyEl.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (selectSkyEl.value === 'snowy') {
    changeSkyEl.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
  }
//   Cloudy	"☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
// Rainy	"🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
// Snowy	"🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
};

// displaySky()

function changeCity(e) {
  const changeHeading = document.getElementById('miniheader');
  changeHeading.textContent = e.target.value;
  state.city = changeHeading.textContent;
}

const registerEventHandlers = (event) => {
  const tempButtonUp = document.getElementById('tempButtonUp');
  tempButtonUp.addEventListener('click', increaseTemp);

  const tempButtonDown = document.querySelector('#tempButtonDown');
  tempButtonDown.addEventListener('click', decreaseTemp);

  const cityInput = document.querySelector('input');
  const changeHeading = document.getElementById('miniheader');
  cityInput.addEventListener('input', changeCity);

  const getRealTempButton = document.getElementById('getRealTemp');
  getRealTempButton.addEventListener('click', getLatAndLon);

  const skySelector = document.querySelector('option');
  getRealTempButton.addEventListener('change', displaySky)

};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// translate from Kelvin
const fromKelvinToFahrenheit = function(temp) {
  return (temp - 273.15) * 9/5 + 32;
};

const getLatAndLon = () => {
  axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: state.city
    }
  })
  .then(function (response) {
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    console.log('success');
    getWeather(state.lat, state.lon);

  })
  .catch(function (error) {
    console.log('error!', error.response.data);
  })
}

const getWeather = (latitude, longitude) => {
  axios.get('http://127.0.0.1:5000/weather',
  {
    params: {
      lat: latitude,
      lon: longitude
    }
  })
  .then(function (response) {
    console.log('success');
    weatherResponse = response.data;
    let realTemp = weatherResponse.current.temp
    realTemp = Math.floor(fromKelvinToFahrenheit(realTemp));

    let tempNumElement = document.getElementById('tempNumber');
    tempNumElement.textContent = realTemp;
    state.tempCounter = realTemp;
    displayColorAndGarden(event);
  })
  .catch(function (error) {
    console.log('error!', error)
  })
}

// getLatAndLon()

