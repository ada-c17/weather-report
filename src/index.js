'use strict';

const state = {
  temp: 75,
};

const tempVariations = [
  {
    lowestTemp: 85,
    garden: '🌴  🌴  🦜 🪨   🌵  🌵  🪨   🥥 🌴  🌺   🌵 🪨',
    className: 'tempStyled tooHot',
  },
  {
    lowestTemp: 75,
    garden: '🌳 🌱 🌷 🌷 🌱 🌳  🌳 🌱 🌻 🌷 🌱 ⚽️  🌳 🌱 🐿 🌱',
    className: 'tempStyled warm',
  },
  {
    lowestTemp: 65,
    garden: '🌳 🦉 🍃 🌳 🌳 🌳 🍃 🌹 🌹 🌿 🌿 🌹 🌹 🍃 🌳 🍃 🌳',
    className: 'tempStyled pleasant',
  },
  {
    lowestTemp: 55,
    garden: '🌲 🍄 🍃  🌳 🍃 🦝 🌳  🥀 🥀  🌲 🌲 🍂   🌾 🌾 🌾',
    className: 'tempStyled mild',
  },
  {
    lowestTemp: 45,
    garden: '🌲 🍂 🪵 🪵 🍂  🍁 🍁  🌲 🌲 🦌 🌲 🍄  🌲 🌲 🌲 🪵',
    className: 'tempStyled chilly',
  },
  {
    lowestTemp: 35,
    garden: '🌲 🌲 🌲 🦃 🌲 🌲   🪨     🌲 🌲 🪵 🪵 🌲 🌲 🪨',
    className: 'tempStyled cold',
  },
  {
    garden: '🌲 🌲 🌲  ❄️ ❄️ ⛄️ ❄️ ⛄️ ❄️ ❄️ 🌲 🌲 ❄️ ❄️ 🌲 ❄️ ❄️ 🌲 🌲',
    className: 'tempStyled tooCold',
  },
];

let tempUpButton;
let tempDownButton;
let tempDisplay;
let gardenDisplay;
let inputText;
let cityDisplay;
let tempRealTimeButton;

const increaseTemp = () => {
  state.temp += 1;
  tempDisplay.textContent = `${state.temp}°F`;
  changeTempClass();
};

const decreaseTemp = () => {
  state.temp -= 1;
  tempDisplay.textContent = `${state.temp}°F`;
  changeTempClass();
};

const changeTempClass = () => {
  let tempClassInfo;
  for (let i = 0; i < tempVariations.length - 1; i++) {
    if (state.temp >= tempVariations[i].lowestTemp) {
      tempClassInfo = tempVariations[i];
      break;
    }
  }
  if (!tempClassInfo) {
    tempClassInfo = tempVariations.at(-1);
  }

  tempDisplay.className = tempClassInfo.className;
  gardenDisplay.className = tempClassInfo.className;
  gardenDisplay.textContent = tempClassInfo.garden;
};

const updateCity = () => {
  let newCity = inputText.value;
  cityDisplay.textContent = newCity;
  inputText.value = '';
};

const convertFromKToF = (num) => {
  const tempInF = Math.round(1.8 * (num - 273) + 32);
  return tempInF;
};

const getRealTimeTemp = (locationData) => {
  let realTimeTemp;
  axios
    .get('http://localhost:5000/weather', {
      params: {
        lat: locationData.lat,
        lon: locationData.lon,
      },
    })
    .then((response) => {
      let tempInKelvin = response.data.current.temp;
      realTimeTemp = convertFromKToF(tempInKelvin);
      state.temp = realTimeTemp;
      tempDisplay.textContent = `${state.temp}°F`;
    })
    .catch((error) => {
      console.log(
        `error in getRealTimeTemp: ${error.response.status}, ${error.response.data}`
      );
    });
};

const getLatLong = () => {
  const locationName = cityDisplay.textContent;
  let lat, lon, locationData;
  axios
    .get('http://localhost:5000/location', {
      params: {
        q: locationName,
      },
    })
    .then((response) => {
      lat = response.data[0].lat;
      lon = response.data[0].lon;
      locationData = { lat, lon };
      getRealTimeTemp(locationData);
    })
    .catch((error) => {
      console.log(
        `error in getLatLong: ${error.response.status}, ${error.response.data}`
      );
    });
};

const lookUpElements = () => {
  tempUpButton = document.getElementById('tempUp');
  tempDownButton = document.getElementById('tempDown');
  tempDisplay = document.getElementById('tempNum');
  gardenDisplay = document.getElementById('garden');
  inputText = document.getElementById('cityInput');
  cityDisplay = document.getElementById('cityDisplay');
  tempRealTimeButton = document.getElementById('realTime');
};

const registerEventHandlers = () => {
  tempUpButton.addEventListener('click', increaseTemp);
  tempDownButton.addEventListener('click', decreaseTemp);
  inputText.addEventListener('change', updateCity);
  tempRealTimeButton.addEventListener('click', getLatLong);
};

const initializePage = () => {
  lookUpElements();
  registerEventHandlers();
};

document.addEventListener('DOMContentLoaded', initializePage);
