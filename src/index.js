'use strict';

const state = {
  temperature: 79,
  city: 'London',
  isF: true,
};

const convertKtoC = (temp) => temp - 273.15;
const convertKtoF = (temp) => (temp - 273.15) * (9 / 5) + 32;
const convertCtoF = (temp) => temp * (9 / 5) + 32;
const convertFtoC = (temp) => (temp - 32) * (5 / 9);

const getLatAndLon = (city) => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      console.log(response.data);
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    })
    .catch((error) => {
      console.log('Error finding the latitude and longitude:', error.response);
    });
};

const getWeatherKelvin = (lat, lon) => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data.current.temp;
    })
    .catch((error) => {
      console.log('Error finding the latitude and longitude:', error.response);
    });
};

const handleCityEntered = (event) => {
  console.log(`City entered ${event}`);
  const inputCityName = event.target.value;
  const displayCityName = document.getElementById('cityDisplay');
  state.city = inputCityName;
  displayCityName.textContent = state.city;
};

const increaseTemp = (event) => {
  state.temperature += 1;
  colorChange();
};

const decreaseTemp = (event) => {
  state.temperature -= 1;
  colorChange();
};

const reset = (event) => {
  // state.temperature = 79; //change it after API
  state.city = 'London';
  document.getElementById('city').value = state.city;
  document.getElementById('cityDisplay').textContent = state.city;

  go(event);
};

const go = (event) => {
  event.preventDefault()
  console.log(`Getting lat/lon and weather for city ${state.city}`);
  getLatAndLon(state.city)
    .then((latLon) => getWeatherKelvin(latLon.lat, latLon.lon))
    .then((temp) => {
      state.temperature = state.isF ? convertKtoF(temp) : convertKtoC(temp);
      colorChange();
    });
};

const changeSky = (event) => {
  const inputSky = document.getElementById('skySelect');

  const bg = document.getElementsByTagName('body')[0];

  switch (inputSky.value) {
    case 'Lover':
      bg.style.background = 'url("assets/lover.jpeg")';
      break;
    case 'rep':
      bg.style.background = 'url("assets/rep backup.jpeg")';
      break;
    case '1989':
      bg.style.background = 'url("assets/1989 sky.jpeg")';
      break;
    case 'Red':
      bg.style.background = 'url("assets/red.jpeg")';
      break;
    case 'Speak Now':
      bg.style.background = 'url("assets/speak now.jpeg")';
      break;
    case 'fearless':
      bg.style.background = 'url("assets/fearless.jpeg")';
      break;
  }

  bg.style.backgroundSize = 'cover';
};

const colorChange = () => {
  let tempColor;
  let currentOutfit;
  let lyric;

  let temp = state.temperature;
  if (!state.isF) {
    temp = convertCtoF(temp);
  }

  if (temp >= 80) {
    tempColor = 'red';
    currentOutfit = 'assets/80.jpeg';
    lyric = 'Shake it Off';
  } else if (temp >= 70) {
    tempColor = 'orange';
    currentOutfit = 'assets/75.jpeg';
    lyric = 'It feels like a perfect night to dress up like hipsters';
  } else if (temp >= 60) {
    tempColor = 'yellow';
    currentOutfit = 'assets/50.jpeg';
    lyric = 'Autumn leaves falling down like pieces into place';
  } else if (temp >= 50) {
    tempColor = 'green';
    currentOutfit = 'assets/60.jpg';
    lyric = 'There is something about the rain';
  } else {
    tempColor = 'teal';
    currentOutfit = 'assets/49.jpeg';
    lyric = 'Forever Winter if you go';
  }

  const newOutfit = document.getElementById('outfits');
  newOutfit.src = currentOutfit;

  const temperature = document.getElementById('degrees');
  temperature.style.color = tempColor;
  temperature.textContent = String(Math.round(state.temperature));

  const lyricChange = document.getElementById('lyrics')
  lyricChange.textContent = lyric
};

const switchCAndF = (event) => {
  state.temperature = state.isF
    ? convertFtoC(state.temperature)
    : convertCtoF(state.temperature);
  state.isF = !state.isF;

  const unit = document.getElementById('unit');
  unit.textContent = state.isF ? '°F' : '°C';

  colorChange();
};

const registerEventHandlers = (event) => {
  colorChange();

  const increaseButton = document.querySelector('#right');
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#left');
  decreaseButton.addEventListener('click', decreaseTemp);

  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', reset);

  const goButton = document.querySelector('#search');
  goButton.addEventListener('submit', go);

  const newSky = document.querySelector('#skySelect');
  newSky.addEventListener('change', changeSky);

  const city = document.querySelector('#city');
  city.addEventListener('input', handleCityEntered);

  const fOrC = document.querySelector('#fOrC');
  fOrC.addEventListener('click', switchCAndF);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
