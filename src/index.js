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

const skyVariations = [
  {
    sky: 'sunny',
    garden: '☀️',
    alt: 'a black and white icon of the sun',
    src: './weather-icons/sunny.png',
  },
  {
    sky: 'cloudy',
    garden: '☁️ ☁️ ☁️   ☁️ ☁️  ☁️   ☁️ ☁️  ☁️  ☁️ ☁️ ☁️  🌥',
    alt: 'a black and white icon of clouds',
    src: './weather-icons/cloudy.png',
  },
  {
    sky: 'rainy',
    garden: '🌧 🌧 🌧 🌧 💧 💧 🌧 💧 💧 🌧 🌧 🌧 🌧',
    alt: 'a black and white icon of a raincloud',
    src: './weather-icons/rainy.png',
  },
  {
    sky: 'snowy',
    garden: '🌨 🌨 🌨 ❄️ 🌨 ❄️ 🌨 ❄️ 🌨 🌨 🌨',
    alt: 'a black and white icon of snow falling from a cloud',
    src: './weather-icons/snowy.png',
  },
  {
    sky: 'windy',
    garden: '🌬     💨 💨 💨 ',
    alt: 'a black and white icon of a cloud and wind',
    src: './weather-icons/windy.png',
  },
  {
    sky: 'thunderstorms',
    garden: '🌩 ⛈ ⛈ 🌩 ⛈ ⛈ 🌩',
    alt: 'a black and white icon of a thundercloud',
    src: './weather-icons/thunder.png',
  },
];

// initialize all variables
let tempUpButton;
let tempDownButton;
let tempDisplay;
let tempRealTimeButton;
let gardenDisplay;
let cityInput;
let cityDisplay;
let cityResetButton;
let skyIcon;
let gardenSky;
let skyDropdown;

// temp functions
const increaseTemp = () => {
  state.temp += 1;
  updateTemp();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTemp();
};

const updateTemp = () => {
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

// city functions
const updateCity = () => {
  let newCity = cityInput.value;
  cityDisplay.textContent = newCity;
  cityInput.value = '';
};

const resetCity = () => {
  cityDisplay.textContent = 'Rochester, NY';
  cityInput.value = '';
};

// I thought about having the reset city button reset the temp and sky info as well
// but since they're not otherwise linked, I ended up removing the functionality
// left the code here just in case I wanted to refer to how I did it another time.

// const resetTempToDefault = () => {
//   state.temp = 75;
//   updateTemp()
// };

// const resetSkyToDefault = () => {
//   skyDropdown.value = 'default';
//   updateSky()
// };

// sky functions
const updateSky = () => {
  const skyValue = skyDropdown.value;

  if (skyValue === 'default') {
    gardenSky.textContent = skyVariations[0].garden;
    skyIcon.src = skyVariations[0].src;
    skyIcon.alt = skyVariations[0].alt;
  }

  for (let sky of skyVariations) {
    if (sky.sky === skyValue) {
      gardenSky.textContent = sky.garden;
      skyIcon.src = sky.src;
      skyIcon.alt = sky.alt;
    }
  }
};

// realtime temperature functions
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
      state.temp = convertFromKToF(tempInKelvin);
      updateTemp();
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

// set variables to html elements
const lookUpElements = () => {
  tempUpButton = document.getElementById('tempUp');
  tempDownButton = document.getElementById('tempDown');
  tempDisplay = document.getElementById('tempNum');
  gardenDisplay = document.getElementById('garden');
  cityInput = document.getElementById('cityInput');
  cityDisplay = document.getElementById('cityDisplay');
  tempRealTimeButton = document.getElementById('realTime');
  skyIcon = document.getElementById('skyIcon');
  gardenSky = document.getElementById('gardenSky');
  skyDropdown = document.getElementById('skySelect');
  cityResetButton = document.getElementById('resetCity');
};

// register events
const registerEventHandlers = () => {
  tempUpButton.addEventListener('click', increaseTemp);
  tempDownButton.addEventListener('click', decreaseTemp);
  cityInput.addEventListener('change', updateCity);
  tempRealTimeButton.addEventListener('click', getLatLong);
  skyDropdown.addEventListener('change', updateSky);
  cityResetButton.addEventListener('click', resetCity);
};

const initializePage = () => {
  lookUpElements();
  registerEventHandlers();
};

document.addEventListener('DOMContentLoaded', initializePage);
