'use strict';

const state = {
  tempValue: 75,
  color: 'orange',
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  skyscape: '',
  background: "url('../assets/summer.jpg')",
  city: 'Orlando',
  lat: '',
  lon: '',
};

// API calls
const getLatLon = () => {
  const inputCityElement = document.getElementById('inputCity').value;
  axios
    .get('http://127.0.0.1:5000/location', { params: { q: state.city } })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      console.log(state.lat);
      console.log(state.lon);
      getRealTemp();
    })
    .catch((error) => {
      console.log('Error!', error);
    });
};

const getRealTemp = () => {
  console.log(state.lat);
  console.log(state.lon);
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      console.log(response);
      // const tempValueK = response.data.current.temp;
      const tempValueK = response.data.current.temp;
      const tempValueF = ((tempValueK - 273.15) * 9) / 5 + 32;
      const tempF = Math.floor(tempValueF);
      state.tempF = tempF;
      displayRealTemp(tempF);
      landscapeChangeAction();
      tempValueColorAction();
    })
    .catch((error) => {
      console.log('Error!', error);
    });
};

const displayRealTemp = (tempF) => {
  const tempValueElement = document.getElementById('tempValue');
  // tempValueElement.textContent = state.tempF;
  tempValueElement.textContent = tempF;
};

// Function to increase temp Value by clicking up arrow
const incTempAction = () => {
  state.tempValue += 1;
  const tempDigit = document.getElementById('tempValue');
  tempDigit.textContent = state.tempValue;
  tempValueColorAction();
  landscapeChangeAction();
};

// Function to decrease temp Value by clicking up arrow
const decTempAction = () => {
  state.tempValue -= 1;
  const tempDigit = document.getElementById('tempValue');
  tempDigit.textContent = state.tempValue;
  tempValueColorAction();
  landscapeChangeAction();
};

// Function to change color of temp value according to temp range
const tempValueColorAction = () => {
  console.log('tempValueColor being called');
  // document.getElementById('tempValue').style.color = 'orange';
  // state.color = 'orange';
  const tempColorElement = document.getElementById('tempValue');
  // tempColorElement.style.color = 'orange';
  // tempColorElement.className = color;
  if (state.tempValue <= 49) {
    tempColorElement.style.color = 'teal';
  } else if (50 <= state.tempValue && state.tempValue <= 59) {
    tempColorElement.style.color = 'green';
  } else if (60 <= state.tempValue && state.tempValue <= 69) {
    tempColorElement.style.color = 'yellow';
  } else if (70 <= state.tempValue && state.tempValue <= 79) {
    tempColorElement.style.color = 'orange';
  } else {
    tempColorElement.style.color = 'red';
  }
};

// Function to change landscape of temp value according to temp range
const landscapeChangeAction = () => {
  const landscapeElement = document.getElementById('landscape');
  landscapeElement.textContent = state.landscape;

  if (state.tempValue <= 59) {
    landscapeElement.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    state.background = "url('../assets/winter.jpg')";
    document.querySelector('html').style.backgroundImage =
      "url('../assets/winter.jpg')";
  } else if (60 <= state.tempValue && state.tempValue <= 69) {
    landscapeElement.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    state.background = "url('../assets/autumn.jpg')";
    document.querySelector('html').style.backgroundImage =
      "url('../assets/autumn.jpg')";
  } else if (70 <= state.tempValue && state.tempValue <= 79) {
    landscapeElement.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    state.background = "url('../assets/summer.jpg')";
    document.querySelector('html').style.backgroundImage =
      "url('../assets/summer.jpg')";
  } else if (80 <= state.tempValue) {
    landscapeElement.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    // state.background = url('../assets/desert.jpg');
    document.querySelector('html').style.backgroundImage =
      "url('../assets/desert.jpg')";
    // document.html.style.backgroundImage = "url('../assets/desert.jpg')";
  }
};

const updateSkyAction = () => {
  const skyscapeElement = document.getElementById('skyscape');
  const skyDropdownElement = document.getElementById('skyDropdown');
  if (skyDropdownElement.value === 'sunny') {
    state.skyscape = '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️';
    skyscapeElement.textContent = state.skyscape;
  } else if (skyDropdownElement.value === 'cloudy') {
    state.skyscape = '☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️🌦☁️☁️☁️☁️☁️☁️☁️☁️☁️';
    skyscapeElement.textContent = state.skyscape;
  } else if (skyDropdownElement.value === 'rainy') {
    state.skyscape = '🌧🌈⛈🌧💧🌧🌦🌧💧🌧⛈🌈🌧';
    skyscapeElement.textContent = state.skyscape;
  } else {
    state.skyscape = '🌨❄️🌨🌨❄️❄️🌨❄️❄️🌨❄️❄️🌨🌨❄️🌨';
    skyscapeElement.textContent = state.skyscape;
  }
  // skyscapeElement.textContent = state.skyscape;
  // skyscapeElement === state.skyscape.textContent;
};

// result.textContent = `${updateSkyAction.target.value}`;
// state.skyscape = `${updateSkyAction.target.value}`;
// `string interpolation
// ${} this will get value
// Function to display city letter by letter as inputting

function updateOutputCity(event) {
  const outputCityElement = document.getElementById('outputCity');
  // state.city = event.target.value;
  state.city = document.getElementById('inputCity').value;
  outputCityElement.textContent = state.city;
}

// Function to reset the output city by clicking reset button
// const resetCityAction = () => {
//   // const cityResetElement = document.getElementById('cityReset');
//   const inputCityElement = document.getElementById('inputCity');
//   inputCityElement.value = 'Orlando';

//   const outputCityElement = document.getElementById('outputCity');
//   outputCityElement.textContent = 'Orlando';
//   state.city = 'Orlando';
// };

const resetCityAction = () => {
  state.city = 'Orlando';
  const inputCityElement = document.getElementById('inputCity');
  inputCityElement.value = state.city;
  updateOutputCity();
  getLatLon();
};

const registerEventHandler = () => {
  // event listener for clicking up arrow
  const upTempElement = document.getElementById('upTemp');
  upTempElement.addEventListener('click', incTempAction);

  // event listener for clicking down arrow
  const downTempElement = document.getElementById('downTemp');
  downTempElement.addEventListener('click', decTempAction);

  // event listener for dropdown so sky can change
  const skyDropdownElement = document.getElementById('skyDropdown');
  skyDropdownElement.addEventListener('change', updateSkyAction);

  // event listener for inputting city so can display city
  const inputCityElement = document.querySelector('input');
  const outputCityElement = document.getElementById('outputCity');
  inputCityElement.addEventListener('input', updateOutputCity);
  inputCityElement.addEventListener('change', getLatLon);

  // event listener for clicking city reset button
  const cityResetElement = document.getElementById('cityReset');
  cityResetElement.addEventListener('click', resetCityAction);

  const realTimeTempElement = document.getElementById('realTimeTemp');
  realTimeTempElement.addEventListener('click', getRealTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandler);

/* <label>Choose an ice cream flavor:
  <select class="ice-cream" name="ice-cream">
    <option value="">Select One …</option>
    <option value="chocolate">Chocolate</option>
    <option value="sardine">Sardine</option>
    <option value="vanilla">Vanilla</option>
  </select>
</label>

<div class="result"></div>

JavaScript
const selectElement = document.querySelector('.ice-cream');

selectElement.addEventListener('change', (event) => {
  const result = document.querySelector('.result');
  result.textContent = `You like ${event.target.value}`;
}); */

// const arrowEx = () => {
//   // state.arrow += "⬆"
//   const upTempElement = document.getElementById('upTemp');
//   upTempElement.textContent += '⬆';
// };

// upTempElement.addEventListener('click', arrowEx);
