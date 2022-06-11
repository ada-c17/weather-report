const state = {
  tempChange: 68,
  cityChange: 'Sacramento',
  lat: 0,
  lon: 0,
};

const updateColor = (temperature) => {
  let color;
  if (temperature >= 80) {
    color = 'red';
  } else if (70 <= temperature && temperature <= 79) {
    color = 'orange';
  } else if (60 <= temperature && temperature <= 69) {
    color = 'yellow';
  } else if (50 <= temperature && temperature <= 59) {
    color = 'green';
  } else {
    color = 'blue';
  }
  return color;
};

const updateImage = () => {
  const newImage = document.querySelector('#landscape');
  let name;
  let description;
  if (state.tempChange >= 80) {
    name = 'ada-project-docs/assets/hot_day.jpeg';
    description = 'a desert';
  } else if (70 <= state.tempChange && state.tempChange <= 79) {
    name = 'ada-project-docs/assets/sunny_day.jpeg';
    description = 'a sunny day';
  } else if (60 <= state.tempChange && state.tempChange <= 69) {
    name = 'ada-project-docs/assets/cloudy_day.jpeg';
    description = 'a cloudy day';
  } else {
    name = 'ada-project-docs/assets/snowy_day.jpeg';
    description = 'a snowy day';
  }
  newImage.src = name;
  newImage.alt = description;
};

const updateTempElement = document.querySelector('#updateTemperature');
const updateTemperature = () => {
  const updateTempElement = document.querySelector('#updateTemperature');
  updateTempElement.textContent = state.tempChange;
  updateTempElement.style.color = updateColor(state.tempChange);
};

const updateCity = () => {
  const inputCity = document.querySelector('#inputCity');
  state.cityChange = inputCity.value;
  const updateCityElement = document.querySelector('#headerCity');
  updateCityElement.textContent = state.cityChange;
};

const increaseTemp = () => {
  state.tempChange += 1;
  updateTemperature();
  updateImage();
};

const decreaseTemp = () => {
  state.tempChange -= 1;
  updateTemperature();
  updateImage();
};

const getRealTemp = () => {
  updateCity();
  getLatLon();
};

const registerEventHandlers = () => {
  const increaseButton = document.querySelector('#increaseButton');
  increaseButton.addEventListener('click', increaseTemp);
  const decreaseButton = document.querySelector('#decreaseButton');
  decreaseButton.addEventListener('click', decreaseTemp);
  const submitCityButton = document.querySelector('#submitCityButton');
  submitCityButton.addEventListener('click', updateCity);
  submitCityButton.addEventListener('click', getLatLon);
  const getRealTempButton = document.querySelector('#realTempButton');
  getRealTempButton.addEventListener('click', getRealTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// API calls - Wave 4

const getLatLon = () => {
  // const response = await axios;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityChange,
      },
    })
    .then((response) => {
      console.log(response.data);
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      console.log('success in finding lat and lon!', lat, lon);
      getTemp(lat, lon);
    })
    .catch((error) => {
      console.log('error in finding lat and lon!');
    });
};

const getTemp = (lat, lon) => {
  // const response = await axios;
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      const tempKelvin = response.data['current']['temp'];
      const tempFaren = parseInt(((tempKelvin - 273.15) * 9) / 5 + 32);
      console.log('success in finding location weather!', tempFaren);
      state.tempChange = tempFaren;
      updateTempElement.textContent = state.tempChange;
      updateTempElement.style.color = updateColor(state.tempChange);
      updateImage();
    })
    .catch((error) => {
      console.log('error in finding location weather!');
    });
};
