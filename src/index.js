const state = {
  temperature: 75,
  city: 'Brownsville',
};

const getNewColor = () => {
  let color;
  if (state.temperature > 90) {
    color = '#c63338';
  } else if (state.temperature >= 75 && state.temperature < 90) {
    color = '#F5B070';
  } else if (state.temperature >= 65 && state.temperature < 75) {
    color = '#efe06a';
  } else if (state.temperature >= 40 && state.temperature < 60) {
    color = '#669943';
  } else if (state.temperature <= 39) {
    color = '#6ea5b5';
  }
  return color;
};

const getTempAndChangeStyle = () => {
  const tempValue = document.getElementById('temp');
  tempValue.textContent = `${state.temperature}°F`;
  let newColor = getNewColor();
  tempValue.style.color = newColor;
};

const getNewLandscape = () => {
  let image;
  if (state.temperature >= 80) {
    image = 'images/80.png';
  } else if (state.temperature >= 60 && state.temperature < 80) {
    image = 'images/60.png';
  } else if (state.temperature >= 40 && state.temperature < 60) {
    image = 'images/40.png';
  } else if (state.temperature <= 39) {
    image = 'images/39.png';
  }
  return image;
};
const changeLandscape = () => {
  const landscape = document.getElementById('landscape');
  let newLandscape = getNewLandscape();
  landscape.setAttribute('src', newLandscape);
};

const decreaseTemp = () => {
  state.temperature -= 1;
  getTempAndChangeStyle();
  changeLandscape();
};

const increaseTemp = () => {
  state.temperature += 1;
  getTempAndChangeStyle();
  changeLandscape();
};

const getCity = () => {
  const cityInput = document.querySelector('input');
  return cityInput.value;
};

const changeCity = () => {
  state.city = getCity();
  let subheader = document.getElementById('subheader');
  subheader.textContent = `What I Wish The Weather Was Like in ${state.city}`;
};

const getWeather = async (cityName) => {
  try {
    response = await axios.get('http://localhost:5000/location', {
      params: { q: cityName },
    });
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    weather = await axios.get('http://localhost:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    });
    return weather.data.current;
  } catch (error) {
    console.log(error);
  }
};

const convertKToF = (temp) => {
  return Math.round(temp * 1.8 - 459.67);
};

let changeWeather = () => {
  let newCity = getCity();
  if (newCity) {
    state.city = newCity;
  }
  let weatherPromise = getWeather(state.city);
  weatherPromise.then((weather) => {
    newTemp = convertKToF(weather.temp);
    state.temperature = newTemp;
    getTempAndChangeStyle();
  });
};

const changeSky = (event) => {
  const background = document.getElementById('center-section');

  if (event.target.value == 'cloudy') {
    background.className = 'cloudy-background';
  } else if (event.target.value == 'rainy') {
    background.className = 'rainy-background';
  } else if (event.target.value == 'snowy') {
    background.className = `snowy-background`;
  } else {
    background.className = 'background';
  }
};

const resetCity = () => {
  const cityInput = document.querySelector('input');
  cityInput.value = '';
  state.city = 'Brownsville';
  const subheader = document.getElementById('subheader');
  subheader.textContent = `What I Wish The Weather Was Like in ${state.city}`;
};

const registerEventHandlers = () => {
  const leftArrow = document.getElementById('left-arrow');
  leftArrow.addEventListener('click', decreaseTemp);

  const rightArrow = document.getElementById('right-arrow');
  rightArrow.addEventListener('click', increaseTemp);

  const cityInput = document.querySelector('input');
  cityInput.addEventListener('input', changeCity);

  const weatherButton = document.getElementById('get-weather-button');
  weatherButton.addEventListener('click', changeWeather);

  const skySelection = document.getElementById('sky-select');
  skySelection.addEventListener('change', changeSky);

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
