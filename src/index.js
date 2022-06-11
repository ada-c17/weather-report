const GARDENSKIES = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const CONDITIONS = {
  hot: { landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂', text: 'red' },
  warm: { landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷', text: 'orange' },
  moderate: { landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃', text: 'yellow' },
  chilly: { landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲', text: 'green' },
  cold: { landscape: '❄️🌲⛄️🌲❄️🏂⛄️🌲❄️⛷🌲❄️🌲', text: 'teal' },
};

const state = {
  tempValue: 60,
};

const kelvinToFahrenheit = (temperature) =>
  (temperature - 273.15) * (9 / 5) + 32;

const updateTemp = () => {
  const tempValue = document.querySelector('#tempValue');
  tempValue.textContent = state.tempValue;
  conditionLayout(state.tempValue, tempValue);
};

const incrementTemp = () => {
  state.tempValue += 1;
  updateTemp();
};

const decrementTemp = () => {
  state.tempValue -= 1;
  updateTemp();
};

const conditionLayout = (temp, el) => {
  const landscapeLayout = document.querySelector('#gardenLandscape');
  let currentCondition = '';
  if (temp >= 80) {
    currentCondition = CONDITIONS.hot;
  } else if (temp < 80 && temp >= 70) {
    currentCondition = CONDITIONS.warm;
  } else if (temp < 70 && temp >= 60) {
    currentCondition = CONDITIONS.moderate;
  } else if (temp < 60 && temp >= 50) {
    currentCondition = CONDITIONS.chilly;
  } else if (temp < 50) {
    currentCondition = CONDITIONS.cold;
  }
  el.style.color = currentCondition.text;
  landscapeLayout.textContent = currentCondition.landscape;
};

const updateTitleCity = () => {
  let titleCity = document.querySelector('#titleCity');
  // console.log(cityName.value);
  titleCity.textContent = `${cityName.value}`;
};

const resetCity = () => {
  document.querySelector('#titleCity').textContent = 'Seattle';
  document.querySelector('#cityName').value = '';
};

const updateWeatherGardenSky = () => {
  let gardenSky = document.querySelector('#gardenSky');
  console.log(`${weatherSelector.value}`);
  gardenSky.textContent = GARDENSKIES[weatherSelector.value];
};

const getCityWeather = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: `${cityName.value}` },
    })
    .then((response) => {
      // console.log(response.data);
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: response.data[0]['lat'],
            lon: response.data[0]['lon'],
          },
        })
        .then((response) => {
          // console.log(response.data);
          console.log(
            `temp in ${cityName.value} is ${response.data.current.temp}`
          );
          console.log(
            `temp in ${cityName.value} is ${Math.round(
              kelvinToFahrenheit(response.data.current.temp)
            )}`
          );
          state.tempValue = Math.round(
            kelvinToFahrenheit(response.data.current.temp)
          );
          console.log(state.tempValue);
          updateTemp();
        });
    });
};

const registerEventHandlers = () => {
  const cityInput = document.querySelector('#cityName');
  cityInput.addEventListener('input', updateTitleCity);
  const resetBtn = document.querySelector('#resetBtn');
  resetBtn.addEventListener('click', resetCity);
  const weatherSelector = document.querySelector('#weatherSelector');
  weatherSelector.addEventListener('change', updateWeatherGardenSky);
  const incrementButton = document.querySelector('#tempUp');
  incrementButton.addEventListener('click', incrementTemp);
  const decrementButton = document.querySelector('#tempDown');
  decrementButton.addEventListener('click', decrementTemp);
  const getTempButton = document.querySelector('#getTemp');
  getTempButton.addEventListener('click', getCityWeather);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
