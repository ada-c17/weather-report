'use strict';

const state = {
  temperatureCount: 0,
};

const changeTemperatureEnvironment = (displayTemperatureEl) => {
  // displayTemperatureEl.className = "padding-5";
  const landscape = document.getElementById('landscape');

  if (state.temperatureCount <= 49) {
    displayTemperatureEl.classList.add('teal');
  } else if (state.temperatureCount <= 59) {
    displayTemperatureEl.classList.add('green');
    displayTemperatureEl.classList.remove('teal');
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperatureCount <= 69) {
    displayTemperatureEl.classList.add('yellow');
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    displayTemperatureEl.classList.remove('green');
  } else if (state.temperatureCount <= 79) {
    displayTemperatureEl.classList.add('orange');
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    displayTemperatureEl.classList.remove('yellow');
  } else {
    displayTemperatureEl.classList.add('red');
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    displayTemperatureEl.classList.remove('orange');
  }
};

const incOrDecTemperatureCount = (tempChangeValue) => {
  const displayTemperatureEl = document.getElementById('displayTemperature');
  // maybe pass operation into `tempChangeValue`?
  state.temperatureCount += tempChangeValue;
  changeTemperatureEnvironment(displayTemperatureEl);
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};

const changeCityName = (event) => {
  const cityEl = document.getElementById('city');
  cityEl.textContent = `${event.target.value}`;
};

// move the code using axios into a helper function called when the Current Temperature button is clicked
const showCurrentTemperature = (city) => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      console.log('Success. Location found.');
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log(
        'The value of status inside of response is:',
        response.status
      );
      console.log(
        'The date inside header inside response is:',
        response.headers.date
      );
      console.log('The data given back by the API response is:', response.data);
      console.log(`Latitude: ${latitude}, longitude ${longitude}`);

      return axios.get('http://127.0.0.1:5000/weather', {
        params: {
          lat: latitude,
          lon: longitude,
        },
      });
    })
    .then((response) => {
      console.log('Hello Word', response.data);
      // const temp = document.getElementById('displayTemperature');
      // gotta access the temperature, try a get request in Postman
      // temp.textContent = response.data[]
    })
    .catch((error) => {
      console.log('Error. Location not found.');
    });
};

const registerEventHandlers = () => {
  const upArrowEl = document.getElementById('upArrow');
  upArrowEl.addEventListener('click', () => {
    incOrDecTemperatureCount(1);
  });

  const downArrowEl = document.getElementById('downArrow');
  downArrowEl.addEventListener('click', () => {
    incOrDecTemperatureCount(-1);
  });

  const inputEl = document.getElementById('city-input');
  inputEl.addEventListener('input', changeCityName);

  // get the curent temperature of a city
  // console.log(showCurrentTemperature("Seattle")) returns undefined;
  const currentTempButtonEl = document.getElementById('currentTemperature');
  const cityName = document.getElementById('city-input').innerHTML;
  currentTempButtonEl.addEventListener('click', () => {
    showCurrentTemperature(cityName);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
