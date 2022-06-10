// Wave 2
let state = {
  temp: 75,
  city: 'Seattle',
};

const changeColor = () => {
  const tempColor = document.getElementById('temp');
  const gardenLandscape = document.getElementById('landscape');
  const landscape = [
    '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
    '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
    '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
    '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  ];

  if (state.temp > 79) {
    tempColor.className = 'temp-80';
    console.log(tempColor.className);
    gardenLandscape.textContent = `${landscape[0]}`;
  } else if (state.temp > 69) {
    tempColor.className = 'temp-70';
    gardenLandscape.textContent = `${landscape[1]}`;
  } else if (state.temp > 59) {
    tempColor.className = 'temp-60';
    gardenLandscape.textContent = `${landscape[2]}`;
  } else if (state.temp > 49) {
    tempColor.className = 'temp-50';
    gardenLandscape.textContent = `${landscape[3]}`;
  } else {
    tempColor.className = 'temp-49';
    gardenLandscape.textContent = `${landscape[3]}`;
  }
};

const increaseTemp = (event) => {
  state.temp += 1;
  const increaseTempContainer = document.querySelector('#temp');
  increaseTempContainer.textContent = `${state.temp}`;
  changeColor();
};

const decreaseTemp = (event) => {
  state.temp -= 1;
  const decreaseTempContainer = document.querySelector('#temp');
  decreaseTempContainer.textContent = `${state.temp}`;
  changeColor();
};

const registerEventHandlers = (event) => {
  const increaseTempButton = document.getElementById('increase-temp');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.getElementById('decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const cityName = document.getElementById('city-name');
  cityName.addEventListener('input', getCityName);

  const selectSky = document.getElementById('sky');
  selectSky.addEventListener('change', changeSky);

  const changeReset = document.getElementById('reset-btn');
  changeReset.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Wave 3

// const getCityName = () => {
//   const cityName = document.getElementById('city-name').value;
//   const changeCity = document.getElementById('header-city');
//   changeCity.textContent = `for the city of ${cityName}`;
// };

const updateCity = () => {
  const cityInput = document.getElementById('city-input').value;
  const headerCity = document.getElementById('header-city');
  state.city = cityInput;
  headerCity.textContent = `For the city of ${state.city}`;
};

// Wave 5
const skyEmoji = [
  '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
];

const changeSky = () => {
  const selectValue = document.getElementById('sky').value;
  const gardenSky = document.getElementById('garden-sky');
  if (selectValue === 'Sunny') {
    gardenSky.textContent = `${skyEmoji[0]}`;
  } else if (selectValue === 'Cloudy') {
    gardenSky.textContent = `${skyEmoji[1]}`;
  } else if (selectValue === 'Rainy') {
    gardenSky.textContent = `${skyEmoji[2]}`;
  } else {
    gardenSky.textContent = `${skyEmoji[3]}`;
  }
};

// Wave 6
const resetCity = () => {
  const cityName = document.getElementById('city-name');
  const changeCity = document.getElementById('header-city');
  cityName.value = '';
  changeCity.textContent = 'for the city of Seattle';
};

//Wave 4
//const axios = require('axios');
const getRealtimeTemp = () => {
  const cityName = document.getElementById('city-name').value;
  axios
    .get('https://us1.locationiq.com/v1/search', {
      params: {
        key: process.env['LOCATION_KEY'],
        q: cityName,
        format: 'json',
      },
    })
    .then((response) => {
      const searchLocation = response.data[0];
      const latitudeCity = searchLocation.lat;
      const longtitudeCity = searchLocation.longtitudeCity;
      axios
        .get('https://api.openweathermap.org/data/2.5/onecall', {
          params: {
            key: process.env['WEATHER_KEY'],
            lat: latitudeCity,
            lon: longtitudeCity,
            format: 'json',
          },
        })
        .then((temResponse) => {
          const currentTemp = temResponse.current.temp;
          const temp = document.getElementById('temp');
          temp.textContent = `${currentTemp}`;
          const realTemp = document.getElementById('realtime-temp');
          realTemp.addEventListener('click', getRealtimeTemp);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
