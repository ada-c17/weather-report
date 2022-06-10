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

  const realTemp = document.getElementById('realtime-temp');
  realTemp.addEventListener('click', getRealtimeTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Wave 3

const getCityName = () => {
  const cityName = document.getElementById('city-name').value;
  const changeCity = document.getElementById('header-city');
  changeCity.textContent = `for the city of ${cityName}`;
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
// Convert Kelvins -> Fahrenheit
const convertKtoF = (tempK) => {
  const tempF = Math.round(((tempK - 273.15) * 9) / 5 + 3);
  return tempF;
};

const getRealtimeTemp = () => {
  const cityName = document.getElementById('city-name').value;
  console.log(cityName);
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: cityName,
      },
    })
    .then((response) => {
      const searchLocation = response.data[0];
      console.log(response);
      const latitudeCity = searchLocation.lat;
      const longitudeCity = searchLocation.lon;
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: latitudeCity,
            lon: longitudeCity,
          },
        })
        .then((tempResponse) => {
          console.log(tempResponse);
          const currentTemp = tempResponse.data.current.temp;
          const temp = document.getElementById('temp');
          const tempF = convertKtoF(currentTemp);
          temp.textContent = `${tempF}`;
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
