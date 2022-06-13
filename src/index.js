// state
const state = {
  temp: 74,
  tempColor: 'orange',
  sky: '/assets/sunny.png',
  landscape: '/assets/pleasant.jpg',
  city: 'New Orleans',
};

// default values on load
const setDefaults = () => {
  const cityHeader = document.querySelector('#cityHeader');
  const tempContainer = document.querySelector('#temp');
  const skyImage = document.querySelector('#sky-image');
  cityHeader.textContent = state.city;
  tempContainer.textContent = state.temp;
  tempContainer.style.color = state.tempColor;
  skyImage.src = state.sky;
};

// city
const setCity = () => {
  const cityInputValue = document.querySelector('#city-input').value;
  state.city = cityInputValue;
  const cityHeader = document.querySelector('#cityHeader');
  cityHeader.textContent = state.city;
};
const resetCity = () => {
  state.city = 'New Orleans';
  const cityInput = document.querySelector('#city-input');
  cityInput.value = state.city;
  const cityHeader = document.querySelector('#cityHeader');
  cityHeader.textContent = state.city;
};

// get current temp button
const convertKToF = (k) => {
  f = (k - 273.15) * 1.8 + 32;
  return Math.round(f);
};
const getLatLonTemp = async () => {
  let lat, lon, locationArray;
  const city = state.city;
  try {
    const response = await axios.get('http://localhost:5000/location', {
      params: {
        q: city,
      },
    });
    lat = response.data[0].lat;
    lon = response.data[0].lon;
    locationArray = [lat, lon];
    getTemp(...locationArray);
  } catch (error) {
    console.log(`error in getLatLon: ${error}`);
  }
};

const getTemp = async (lat, lon) => {
  let temp;
  try {
    const response = await axios.get('http://localhost:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    });
    temp = convertKToF(response.data.current.temp);
  } catch (error) {
    console.log(`error in getTemp:${error}`);
  }
  state.temp = temp;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
};

// temperature increase
const incTemp = () => {
  state.temp += 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
};
// temperature decrease
const decTemp = () => {
  state.temp -= 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
};
// temperature color behavior
const tempChangeBehavior = () => {
  const tempContainer = document.querySelector('#temp');
  const background = document.body;
  if (state.temp >= 80) {
    state.tempColor = 'red';
    state.landscape = '/assets/hot.jpg';
  } else if (state.temp >= 70) {
    state.tempColor = 'orange';
    state.landscape = '/assets/pleasant.jpg';
  } else if (state.temp >= 60) {
    state.tempColor = 'yellow';
    state.landscape = '/assets/chilly.png';
  } else if (state.temp >= 50) {
    state.tempColor = 'green';
  } else if (state.temp <= 49) {
    state.landscape = '/assets/cold.png';
    state.tempColor = 'cyan';
  }
  tempContainer.style.color = state.tempColor;
  background.style.backgroundImage = `url(${state.landscape})`;
};
setInterval(tempChangeBehavior, 50);
// sky select
const setSky = () => {
  const skySelectValue = document.querySelector('#select-sky').value;
  const skyImage = document.querySelector('#sky-image');
  switch (skySelectValue) {
    case 'Sunny':
      state.sky = '/assets/sunny.png';
      break;
    case 'Cloudy':
      state.sky = '/assets/cloudy.png';
      break;
    case 'Rainy':
      state.sky = '/assets/rainy.png';
      break;
    case 'Snowy':
      state.sky = '/assets/snowy.png';
      break;
  }
  skyImage.src = state.sky;
};

// register handlers
const registerEventHandlers = () => {
  // city change
  const cityInput = document.querySelector('#city-input');
  cityInput.addEventListener('input', setCity);
  // city reset
  const cityReset = document.querySelector('#reset');
  cityReset.addEventListener('click', resetCity);
  // inc
  const incButton = document.querySelector('#inc');
  incButton.addEventListener('click', incTemp);
  // dec
  const decButton = document.querySelector('#dec');
  decButton.addEventListener('click', decTemp);
  // get current
  const currentButton = document.querySelector('#current');
  currentButton.addEventListener('click', getLatLonTemp);
  // sky select
  const skySelect = document.querySelector('#select-sky');
  skySelect.addEventListener('change', setSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', setDefaults);
