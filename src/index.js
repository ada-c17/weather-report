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

const skyVariations = {
  sunny: {
    sky: 'sunny',
    garden: '☀️',
    alt: 'a black and white icon of the sun',
    src: './weather-icons/sunny.png',
  },
  cloudy: {
    sky: 'cloudy',
    garden: '☁️ ☁️ ☁️   ☁️ ☁️  ☁️   ☁️ ☁️  ☁️  ☁️ ☁️ ☁️  🌥',
    alt: 'a black and white icon of clouds',
    src: './weather-icons/cloudy.png',
  },
  rainy: {
    sky: 'rainy',
    garden: '🌧 🌧 🌧 🌧 💧 💧 🌧 💧 💧 🌧 🌧 🌧 🌧',
    alt: 'a black and white icon of a raincloud',
    src: './weather-icons/rainy.png',
  },
  snowy: {
    sky: 'snowy',
    garden: '🌨 🌨 🌨 ❄️ 🌨 ❄️ 🌨 ❄️ 🌨 🌨 🌨',
    alt: 'a black and white icon of snow falling from a cloud',
    src: './weather-icons/snowy.png',
  },
  windy: {
    sky: 'windy',
    garden: '🌬     💨 💨 💨 ',
    alt: 'a black and white icon of a cloud and wind',
    src: './weather-icons/windy.png',
  },
  thunderstorms: {
    sky: 'thunderstorms',
    garden: '🌩 ⛈ ⛈ 🌩 ⛈ ⛈ 🌩',
    alt: 'a black and white icon of a thundercloud',
    src: './weather-icons/thunder.png',
  },
};

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

// set variables to html elements
const lookUpElements = () => {
  tempUpButton = document.getElementById('tempUp');
  tempDownButton = document.getElementById('tempDown');
  tempDisplay = document.getElementById('tempNum');
  tempRealTimeButton = document.getElementById('realTime');
  skyIcon = document.getElementById('skyIcon');
  skyDropdown = document.getElementById('skySelect');
  gardenSky = document.getElementById('gardenSky');
  gardenDisplay = document.getElementById('garden');
  cityInput = document.getElementById('cityInput');
  cityDisplay = document.getElementById('cityDisplay');
  cityResetButton = document.getElementById('resetCity');
};

// temp functions
// const increaseTemp = () => {
//   state.temp += 1;
//   updateTemp();
// };

// const decreaseTemp = () => {
//   state.temp -= 1;
//   updateTemp();
// };

const setTemp = (tempChange) => {
  state.temp += tempChange;
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
// but since they're not otherwise linked, I ended up removing the functionality.
// I left the code here just in case I wanted to refer to how I did it another time.

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
  let skyValue = skyDropdown.value;

  if (skyValue === 'default') {
    skyValue = 'sunny';
  }

  gardenSky.textContent = skyVariations[skyValue].garden;
  skyIcon.src = skyVariations[skyValue].src;
  skyIcon.alt = skyVariations[skyValue].alt;
};

// realtime temperature functions
const convertFromKToF = (num) => {
  const tempInF = Math.round(1.8 * (num - 273) + 32);
  return tempInF;
};

const getRealTimeTemp = (locationData) => {
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

// register events
const registerEventHandlers = () => {
  tempUpButton.addEventListener('click', () => {
    setTemp(1);
  });
  tempDownButton.addEventListener('click', () => {
    setTemp(-1);
  });
  tempRealTimeButton.addEventListener('click', getLatLong);
  cityInput.addEventListener('change', updateCity);
  cityResetButton.addEventListener('click', resetCity);
  skyDropdown.addEventListener('change', updateSky);
};

const initializePage = () => {
  lookUpElements();
  registerEventHandlers();
};

document.addEventListener('DOMContentLoaded', initializePage);
