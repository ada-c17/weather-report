// const { default: axios } = require('axios');

const newCity = () => {
  const cityValue = document.getElementById('cname').value;
  console.log(cityValue);
  const headerCity = document.getElementById('city-name');
  headerCity.textContent = cityValue;
};

const API = 'http://127.0.0.1:5000';

const getCityLoc = () => {
  // const API = 'http://127.0.0.1:5000';
  const city = document.getElementById('cname').value;
  const tempValue = document.getElementById('currentTemp');
  console.log(city);

  axios
    .get(`${API}/location`, { params: { q: city, format: 'JSON' } })
    .then((response) => {
      console.log('Success');
      // console.log(response.data[0].lat);
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      console.log(lat);
      console.log(lon);
      axios
        .get(`${API}/weather`, { params: { lat: lat, lon: lon } })
        .then((response) => {
          const tempK = response.data.current.temp;
          const tempF = Math.floor(1.8 * (tempK - 273) + 32);
          tempValue.textContent = tempF;
          console.log(tempK);
          console.log(tempF);
        })
        .catch((error) => {
          console.log('Conversion Error');
          console.log(error.response.statusText);
        })
        // getWeather(response.data[0].lat, response.data[0].lon);
        .catch((error) => {
          console.log('Error');
          console.log(error.response.statusText);
        });
    });
};
// const getWeather = async (lat, lon) => {
//   console.log(lat);
//   console.log(lon);
//   const response = await axios.get(`${API}/weather`, {
//     params: {
//       lat: lat,
//       lon: lon,
//       format: 'JSON',
//     },
//   });
//   console.log('Weather!');
//   console.log(response.data.current.temp);
//   convertTemp(response.data.current.temp);
//   // convertTemp(response.data.current.temp);
//   // tempTextColor(convertTemp(response.data.current.temp));
//   // tempGround(newTemp);
// };

const convertTemp = (temp) => {
  const displayTemp = document.getElementById('currentTemp');
  const farenheit = Math.floor(1.8 * (temp - 273) + 32);
  displayTemp.textContent = farenheit;
};

// convertTemp(0);

// getCityLoc();

let currentTemp = 41; //is could be hardcoded?

const newTemp = (currentTemp) => {
  let temperatureValue = document.getElementById('currentTemp');
  temperatureValue.textContent = currentTemp;
  tempTextColor(currentTemp);
  tempGround(currentTemp);
};

const upTemp = () => {
  currentTemp += 1;
  newTemp(currentTemp);
};

const downTemp = () => {
  currentTemp -= 1;
  newTemp(currentTemp);
};

const tempTextColor = (currentTemp) => {
  const tempContainer = document.getElementById('currentTemp');
  let textColor;
  if (currentTemp >= 80) {
    textColor = 'red';
  } else if (currentTemp >= 70) {
    textColor = 'orange';
  } else if (currentTemp >= 60) {
    textColor = 'yellow';
  } else if (currentTemp >= 50) {
    textColor = 'green';
  } else if (currentTemp <= 59) {
    textColor = 'teal';
  }
  tempContainer.className = textColor;
};

const tempGround = (currentTemp) => {
  // let temperatureValue = document.getElementById('currentTemp').textContent;
  // let temperatureContainer = document.getElementById('currentTemp');
  // console.log(temperatureValue);
  // console.log(temperatureContainer);

  let gardenBottomValue = document.getElementById('ground').textContent;
  let gardenBottomValueContainer = document.getElementById('ground');
  // console.log(gardenBottomValue);
  // console.log(gardenBottomValueContainer);

  // Just for fun added special bottom for Seattle
  // const headerCity = document.getElementById('city-name').textContent;
  // if (headerCity === 'Seattle') {
  //   gardenBottomValueContainer.textContent = '☕☔🌸🏔️🦦💕🐳🍎🌲🎡⛴️';
  // }

  if (currentTemp > 80) {
    // temperatureContainer.className = 'red';
    gardenBottomValueContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    // console.log(temperatureContainer);
  } else if (currentTemp >= 70) {
    // temperatureContainer.className = 'orange';
    gardenBottomValueContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60) {
    // temperatureContainer.className = 'yellow';
    gardenBottomValueContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (currentTemp >= 50) {
    // temperatureContainer.className = 'green';
    gardenBottomValueContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲⛰️🍁🌲⛄️🍂🌲';
  } else if (currentTemp <= 49) {
    // temperatureContainer.className = 'teal';
    gardenBottomValueContainer.textContent = '❄️🏂⛄️🌲⛄️❄️🌲🏔️⛷️🌲❄️⛄️❄️';
  }
};

const changeSky = () => {
  let optionSelected = document.getElementById('skySelector');
  let skyOption = optionSelected.options[optionSelected.selectedIndex].text;

  const gardenContent = document.getElementById('sky');

  let currentSky = '🌧 🌈 🌧 🛸 🌤 🌈 🌧 🌈 🌧';

  if (skyOption === 'Sunny') {
    currentSky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyOption === 'Cloudy') {
    currentSky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyOption === 'Rainy') {
    currentSky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyOption === 'Snowy') {
    currentSky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  gardenContent.textContent = currentSky;
};

const reset = () => {
  document.getElementById('cname').value = '';
  const headerCity = document.getElementById('city-name');
  headerCity.textContent = 'Seattle';
};

const registerEventHandlers = () => {
  const newCityUpdate = document.getElementById('cname');
  newCityUpdate.addEventListener('input', newCity);

  newTemp(currentTemp);

  const upButton = document.querySelector('#upArrow');
  upButton.addEventListener('click', upTemp);
  // upButton.addEventListener('click', tempColor);

  const downButton = document.querySelector('#downArrow');
  downButton.addEventListener('click', downTemp);
  // downButton.addEventListener('click', tempColor);

  const getCurrentTempButton = document.getElementById('realTempButton');
  getCurrentTempButton.addEventListener('click', getCityLoc);

  const changeSkyIfSelected = document.getElementById('skySelector');
  changeSkyIfSelected.addEventListener('change', changeSky);

  const getResetButton = document.getElementById('inputButton');
  getResetButton.addEventListener('click', reset);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// if (document.readyState !== 'loading') {
//   newTemp();
//   upTemp();
//   downTemp = ()
// } else {
//   document.addEventListener('DOMContentLoaded', newTemp);
//   document.addEventListener('DOMContentLoaded', upTemp);
// document.addEventListener('DOMContentLoaded', downTemp);
// }
