const state = {
  fahrenheit: 60,
  city: 'Edmonds',
  sky: 'Sunny',
};
let num = state.fahrenheit;
const tempUp = (event) => {
  state.fahrenheit += 1;
  tempChangeColor(state.fahrenheit);
  weatherGarden();
  const increase = document.getElementById('f');
  increase.textContent = `Degrees Fahrenheit:${state.fahrenheit}`;
  return increase.textContent;
};

const tempDown = (event) => {
  state.fahrenheit--;
  tempChangeColor(state.fahrenheit);
  weatherGarden();
  const decrease = document.getElementById('f');
  decrease.textContent = `Degrees Fahrenheit:${state.fahrenheit}`;
  return decrease.textContent;
};

const cityInput = (event) => {
  let cityInput = document.getElementById('input').value;
  state.city = cityInput;
  let cityHeader = document.getElementById('city');
  cityHeader.textContent = `${state.city}`;
  getCityWeather();
};

const tempChangeColor = (num) => {
  let element = document.getElementById('temperatureContainer');
  if (state.fahrenheit >= 80) {
    element.style.backgroundColor = 'red';
  } else if (80 > state.fahrenheit && state.fahrenheit >= 70) {
    element.style.backgroundColor = 'orange';
  } else if (70 > state.fahrenheit && state.fahrenheit >= 60) {
    element.style.backgroundColor = 'yellow';
  } else if (60 > state.fahrenheit && state.fahrenheit >= 50) {
    element.style.backgroundColor = 'green';
  } else if (50 > state.fahrenheit && state.fahrenheit >= 33) {
    element.style.backgroundColor = 'teal';
  } else if (state.fahrenheit <= 32) {
    element.style.backgroundColor = 'blue';
  }
};

const weatherGarden = () => {
  let num = state.fahrenheit;
  let conditions = document.getElementById('conditions');
  if (num >= 80) {
    conditions.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (80 > num && num >= 70) {
    conditions.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (70 > num && num >= 60) {
    conditions.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (60 > num && num >= 50) {
    conditions.textContent = '🌲🌲🌲🍂🌲🍁🌲🌲🍂🌲🍂🍁🍂';
  } else if (50 > num && num >= 33) {
    conditions.textContent = '🍂🍁🍂🍂🍁🍂🍂🍁🍂🍂🍁🍂';
  } else if (num < 32) {
    conditions.textContent = '⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️';
  }
};

const getCityWeather = () => {
  const q = state.city;
  axios
    .get('http://localhost:5000/location', { params: { q } })
    .then((response) => {
      console.log('success!', response.data);
      console.log(response.data[0]['lat']);
      let lat = response.data[0]['lat'];
      console.log(lat);
      let lon = response.data[0]['lon'];
      axios
        .get('http://localhost:5000/weather', { params: { lat, lon } })
        .then((response) => {
          console.log('success!', response.data);
          console.log(response.data['current']['temp']);
          let degrees = response.data['current']['temp'];
          let degreesF = (degrees - 273) * 1.8 + 32;
          state.fahrenheit = parseInt(degreesF);
          updateTemp();
        })
        .catch((error) => {
          console.log(error);
          console.log('error!', error.response.data);
        });
    })
    .catch((error) => {
      console.log('error!', error);
    });
};

const selectSky = (event) => {
  const sky = document.getElementById('sky').value;
  state.sky = sky;
  const skies = document.getElementById('skies');
  if (state.sky === 'Sunny') {
    skies.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === 'Cloudy') {
    skies.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === 'Rainy') {
    skies.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.sky === 'Snowy') {
    skies.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const resetCity = (event) => {
  const resetInput = document.getElementById('input');
  resetInput.value = 'Edmonds';
  cityInput();
  state.fahrenheit = 60;
  updateTemp();
};

const updateTemp = () => {
  const update = document.getElementById('f');
  update.textContent = `Degrees Fahrenheit:${state.fahrenheit}`;
};
const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#upButton');
  upButton.addEventListener('click', tempUp);

  const downButton = document.querySelector('#downButton');
  downButton.addEventListener('click', tempDown);

  const changeCity = document.getElementById('enter');
  changeCity.addEventListener('click', cityInput);

  selectSky();
  const changeSky = document.getElementById('sky');
  changeSky.addEventListener('change', selectSky);

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetCity);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers);
