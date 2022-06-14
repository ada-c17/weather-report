const state = {
  tempCounter: 72,
  lat: '49.7818607',
  lon: '20.9440505',
  city: 'Kąśna Dolna, Poland'
};

const increaseTemp = (event) => {
  state.tempCounter += 1;
  // not sure why we have to have this
  const tempCounterContainer = document.getElementById('tempNumber');
  tempCounterContainer.textContent = state.tempCounter + '°';
  let tempCircle = document.getElementById('circle');
  tempCircle = displayColorAndGarden(event);
  // we are changing textContent even if it's just a var?
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
    // what is the method for changing color of an html el?
    // how do we get the color red to be a value in js?
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
const toFahrenheit = function(temp) {
  return (temp - 273.15) * 9/5 + 32;
};

const getLatAndLon = () => {
  axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: state.city
    }
  })
  .then(function (response) {
    //  what are we calling back? - success message
    // console.log('success!', response);
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    console.log('success');
    getWeather(state.lat, state.lon);

  })
  .catch(function (error) {
    //what is the error message?
    // we have error message if url endpoint is incorrect for example
    console.log('error!', error.response.data);
  })
}

const getWeather = (latitude, longitude) => {
  axios.get('http://127.0.0.1:5000/weather',
  {
    params: {
      // lat: state.lat,
      // lon: state.lon
      lat: latitude,
      lon: longitude
    }
  })
  .then(function (response) {
    //  what are we calling back? - success message
    // console.log('success!', response);
    console.log('success');
    weatherResponse = response.data;
    let realTemp = weatherResponse.current.temp
    realTemp = Math.floor(toFahrenheit(realTemp));

    let tempNumElement = document.getElementById('tempNumber');
    tempNumElement.textContent = realTemp;
    state.tempCounter = realTemp;
    displayColorAndGarden(event);
  })
  .catch(function (error) {
    //what is the error message?
    // we have error message if url endpoint is incorrect for example
    console.log('error!', error)
  })
}

// getLatAndLon()

