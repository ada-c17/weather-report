import 'regenerator-runtime/runtime';
import axios from 'axios';

const state = {
  temp: 75,
  city: '',
};

//select elements with get the element by id
const currentTemp = document.getElementById('currentTemp');
const incrementButton = document.getElementById('increaseTempButton');
const decrementButton = document.getElementById('decreaseTempButton');
const seasonalChange = document.getElementById('seasonalChange');
const searchCity = document.getElementById('searchCity');
const cityDisplay = document.getElementById('cityDisplay');
const currentTempButton = document.getElementById('currentTempButton');
const resetButton = document.getElementById('resetBtn');

// const selectSkies = document.getElementById('skies');
// const selection = selectSkies.options[selectSkies.selectedIndex].value;
// const skyChoice = document.getElementById('skyChoice');

const updateTemp = () => {
  currentTemp.textContent = state.temp;
  alterTextColor();
};

const incrementTemp = () => {
  state.temp += 1;
  updateTemp();
  alterTextColor();
};

const decrementTemp = () => {
  state.temp -= 1;
  updateTemp();
  alterTextColor();
};

const updateCity = () => {
  const currentCity = document.getElementById('searchCity').value;
  console.log(currentCity);
  state.city = currentCity;
  cityDisplay.textContent = state.city;
};

const changeSky = () => {
  // let skyContent = document.getElementById('body').style.background
  //   const skyContent = document.getElementById('skyChoice');
  //   let skyScape = '';
  let selection = this.value || document.getElementById('skies').value;
  if (selection === 'clearDay') {
    console.log('changing to Sunny');
    seasonalChange.textContent = '🔆';
    // skyContent = 'linear-gradient(to bottom, '#daf4ff', '#d1eaff', '#bfd7ff')'
  } else if (selection === 'rain') {
    console.log('changing to rainy');
    seasonalChange.textContent = '🌧';
  } else if (selection === 'wind') {
    console.log('changing to windy');
    seasonalChange.textContent = '🌬';
  } else if (selection === 'snow') {
    console.log('changing to snowy');
    seasonalChange.textContent = '❄️';
  }
};
window.onload = changeSky;

document.getElementById('skies').addEventListener('change', changeSky);
// change the sky
// const setIcon = (icons, iconID) => {
//   const skycons = new Skycons({ color: '#2b2d42' });
//   const currentIcon = icons.replace(/-/g, '_').toUpperCase();
//   skycons.play();
//   return skycons.set(iconID, skycons[currentIcon]);
// };

const registerEventHandlers = () => {
  incrementButton.addEventListener('click', incrementTemp);
  decrementButton.addEventListener('click', decrementTemp);
  searchCity.addEventListener('input', updateCity);
  currentTempButton.addEventListener('click', findLatitudeAndLongitude);
  //   selectSkies.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const alterTextColor = () => {
  if (state.temp > 95) {
    console.log('changing to red');
    seasonalChange.textContent = '🔥';
    return (currentTemp.style.color = '#ec5766');
  } else if (state.temp >= 85) {
    console.log('changing to orange');
    seasonalChange.textContent = '🌊';
    return (currentTemp.style.color = '#fda187');
  } else if (state.temp >= 75) {
    console.log('changing to yellow');
    seasonalChange.textContent = '🌴';
    return (currentTemp.style.color = '#F1FFC4');
  } else if (state.temp >= 60) {
    seasonalChange.textContent = '🌷';
    console.log('changing to green');
    return (currentTemp.style.color = '#b4f9c0');
  } else if (state.temp >= 45) {
    seasonalChange.textContent = '🍂';
    console.log('changing to teal');
    return (currentTemp.style.color = '#5dac97');
  } else if (state.temp >= 30) {
    seasonalChange.textContent = '🌲';
    console.log('changing to blue');
    return (currentTemp.style.color = '#6da3ee');
  } else if (state.temp <= 29) {
    seasonalChange.textContent = '⛄';
    console.log('changing to ice blue');
    return (currentTemp.style.color = '#c2f6ff');
  }
  console.log('text color did not change');
};

const refreshPage = () => {
  location.reload();
};

resetButton.addEventListener('click', refreshPage);
// const setIcons = () => {
//   icons.set('clear-day', Skycons.CLEAR_DAY);
//   icons.set('rain', Skycons.RAIN);
//   icons.set('snow', Skycons.SNOW);
//   icons.set('wind', Skycons.WIND);

//   icons.play();
// };

const convertKelvinToFahrenheit = (kelvin) => {
  let fahrenheit;
  fahrenheit = parseInt(1.8 * (kelvin - 273) + 32);
  return fahrenheit;
};

// weather API
const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      // make the next API call here!
      findTemperature(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

// const temp = document.getElementById('currentTemp');

const findTemperature = (latitude, longitude) => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const kelvin = response.data['current']['temp'];
      state.temp = convertKelvinToFahrenheit(kelvin);
      updateTemp();
    })
    .catch((error) => {
      console.log('error in weather info!');
    });
};
