let currentTemp = 54;
let city = 'Seattle';

const newCity = () => {
  const cityValue = document.getElementById('cname').value;
  console.log(cityValue);
  const headerCity = document.getElementById('city-name');
  headerCity.textContent = cityValue;
};

const API = 'http://127.0.0.1:5000';
// const API = 'https://vera-and-diana-weather-report.surge.sh/';
// city = document.getElementById('cname').value;

const getCityLoc = () => {
  city = document.getElementById('cname').value;
  // if (city !== 'Seattle') {
  //   city = document.getElementById('cname').value;
  // } else {
  //   city = 'Seattle';
  // }
  console.log(city);
  const tempValue = document.getElementById('currentTemp');

  axios
    .get(`${API}/location`, { params: { q: city, format: 'JSON' } })
    .then((response) => {
      console.log('Success');
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
          currentTemp = tempF;
          newTemp(tempF);
          // upTemp();
          // downTemp();
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

const convertTemp = (temp) => {
  const displayTemp = document.getElementById('currentTemp');
  const farenheit = Math.floor(1.8 * (temp - 273) + 32);
  displayTemp.textContent = farenheit;
};

console.log(currentTemp);

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
  let gardenBottomValue = document.getElementById('ground').textContent;
  let gardenBottomValueContainer = document.getElementById('ground');

  const headerCity = document.getElementById('city-name').textContent;
  if (headerCity === 'Seattle') {
    gardenBottomValueContainer.textContent = '☕☔🌸🏔️🦦💕🐳🍎🌲🎡⛴️';
  } else {
    if (currentTemp > 80) {
      gardenBottomValueContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (currentTemp >= 70) {
      gardenBottomValueContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (currentTemp >= 60) {
      gardenBottomValueContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (currentTemp >= 50) {
      gardenBottomValueContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲⛰️🍁🌲⛄️🍂🌲';
    } else if (currentTemp <= 49) {
      gardenBottomValueContainer.textContent = '❄️🏂⛄️🌲⛄️❄️🌲🏔️⛷️🌲❄️⛄️❄️';
    }
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
  let gardenBottomValueContainer = document.getElementById('ground');
  gardenBottomValueContainer.textContent = '☕☔🌸🏔️🦦💕🐳🍎🌲🎡⛴️';
  const displayTemp = document.getElementById('currentTemp');
  tempTextColor((displayTemp.textContent = 54));
  // city = 'Seattle'; #tried to get api to call Seatle by default
  // getCityLoc(city);
};

const registerEventHandlers = () => {
  const newCityUpdate = document.getElementById('cname');
  newCityUpdate.addEventListener('input', newCity);

  newTemp(currentTemp);

  const upButton = document.querySelector('#upArrow');
  upButton.addEventListener('click', upTemp);

  const downButton = document.querySelector('#downArrow');
  downButton.addEventListener('click', downTemp);

  const getCurrentTempButton = document.getElementById('realTempButton');
  getCurrentTempButton.addEventListener('click', getCityLoc);

  const changeSkyIfSelected = document.getElementById('skySelector');
  changeSkyIfSelected.addEventListener('change', changeSky);

  const getResetButton = document.getElementById('inputButton');
  getResetButton.addEventListener('click', reset);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
