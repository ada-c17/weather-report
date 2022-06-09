const state = {
  temp: 79,
};

// const axios = require('axios');
const getWeather = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
    })
    .then((response) => {
      const temp = response.current.temp;
      console.log(temp);
      // const tempContainer = document.querySelector('#temp');
      // tempContainer.textContent = temp;
      // changeTempColorAndGarden(temp);
    })
    .catch((error) => {
      console.log("Couldn't get city temperature");
    });
};
const getCityTemp = () => {
  let city = document.getElementById('city').textContent;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      console.log(latitude);
      console.log(longitude);
      getWeather(latitude, longitude);
      // axios
      //   .get('http://127.0.0.1:5000/weather', {
      //     params: {
      //       lat: parseFloat(latitude),
      //       lon: parseFloat(longitude),
      //     },
      //   })
      //   .then((response) => {
      //     const temp = response.current.temp;
      //     console.log(temp);
      //     // const tempContainer = document.querySelector('#temp');
      //     // tempContainer.textContent = temp;
      //     // changeTempColorAndGarden(temp);
      //   })
      //   .catch((error) => {
      //     console.log("Couldn't get city temperature");
      //   });
    })

    .catch((error) => {
      console.log('Error in finding latitude and longitude.');
    });
};

const getNewCity = () => {
  const cityName = document.getElementById('city-name').value;
  const cityContainer = document.querySelector('#city');
  cityContainer.textContent = cityName;
};

const tempIncrease = () => {
  state.temp += 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);
};

const tempDecrease = () => {
  state.temp -= 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);
};

const registerEventHandlers = () => {
  // wave 2
  const tempIncreaseButton = document.querySelector('#increase');
  tempIncreaseButton.addEventListener('click', tempIncrease);
  const tempDecreaseButton = document.querySelector('#decrease');
  tempDecreaseButton.addEventListener('click', tempDecrease);

  // wave 3
  const inputElement = document.querySelector('#city-name');
  inputElement.addEventListener('change', getNewCity);

  // wave 4
  const getTempButton = document.querySelector('#get-temp');
  getTempButton.addEventListener('click', getCityTemp);
};

const changeTempColorAndGarden = (temperature) => {
  const tempContainer = document.querySelector('#temp');
  const landscapeEmojis = document.querySelector('#landscape');
  if (temperature > 79) {
    tempContainer.style.color = 'red';
    landscapeEmojis.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70 && temperature < 80) {
    tempContainer.style.color = 'orange';
    landscapeEmojis.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60 && temperature < 70) {
    tempContainer.style.color = 'yellow';
    landscapeEmojis.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50 && temperature < 60) {
    tempContainer.style.color = 'green';
    landscapeEmojis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature < 50) {
    tempContainer.style.color = 'white';
    landscapeEmojis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
