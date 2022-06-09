// const axios = require('axios');

const state = {
  temp: parseInt(document.getElementById('fahrenheit').innerHTML),
};

const setTemp = () => {
  const upButton = document.getElementById('up-button');
  const downButton = document.getElementById('down-button');
  const tempContainer = document.getElementById('fahrenheit');

  upButton.addEventListener('click', () => {
    state.temp += 1;
    changeGarden();
    changeTempColor(state.temp, tempContainer);
    tempContainer.textContent = `${state.temp}`;
  });
  downButton.addEventListener('click', () => {
    state.temp -= 1;
    changeGarden();
    changeTempColor(state.temp, tempContainer);
    tempContainer.textContent = `${state.temp}`;
  });
};

const changeGarden = () => {
  const landscape = document.querySelector('#landscape');

  if (state.temp >= 80) {
    landscape.textContent = '🌵🌞🌊🐍🦂🌵🌞🌊🐍🏜';
  } else if (state.temp < 80 && state.temp >= 70) {
    landscape.textContent = '🌸🌿🌼🌷🌻🌿🌱🌻🌷';
  } else if (state.temp < 70 && state.temp >= 60) {
    landscape.textContent = '🌾🌾🍃🪨🛤🌾🌾🌾🍃';
  } else {
    landscape.textContent = '🌲⛄️🌲⛄️🍂🌲🍁🌲⛄️🍂🌲';
  }
};

const changeTempColor = (temp, text) => {
  if (temp >= 80) {
    text.style.color = 'red';
  } else if (temp < 80 && temp >= 70) {
    text.style.color = 'orange';
  } else if (temp < 70 && temp >= 60) {
    text.style.color = 'yellow';
  } else if (temp < 60 && temp >= 50) {
    text.style.color = 'green';
  } else {
    text.style.color = 'blue';
  }
};

const changeCity = () => {
  const cityContainer = document.getElementById('current-city');
  const input = document.getElementById('city-selector');
  input.addEventListener('change', (e) => {
    cityContainer.textContent = e.target.value;
  });
};

const getRealTemp = () => {
  const tempContainer = document.getElementById('fahrenheit');
  const apiButton = document.getElementById('API-button');
  apiButton.addEventListener('click', apiCalls);
};

const apiCalls = () => {
  const currentCity = document.getElementById('current-city').innerHTML;
  // axios
  //   .get('https://us1.locationiq.com/v1/search.php', {
  //     params: {
  //       key: process.env['api_key'],
  //       q: currentCity,
  //       format: 'json',
  //     },
  //   })
  //   .then((response) => {
  //     console.log('Latitude ' + response.data[0].lat);
  //     console.log('Longitude ' + response.data[0].lon);
  //   })
  //   .catch((error) => {
  //     console.log('Error');
  //   });
  console.log(currentCity);
};

document.addEventListener('DOMContentLoaded', setTemp);
document.addEventListener('DOMContentLoaded', changeCity);
document.addEventListener('DOMContentLoaded', getRealTemp);
