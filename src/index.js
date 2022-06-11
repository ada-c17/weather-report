//////////////temperature section/////////////////

// Select temperature
const currentTemp = document.getElementById('current-temp');

//select weather garden bottom picture element
const weatherGardenChanger = document.getElementById('bottom-landscape');

//function to change background of the picture
const landscapeChanger = (temp) => {
  if (temp > 26) {
    weatherGardenChanger.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 21) {
    weatherGardenChanger.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 15) {
    weatherGardenChanger.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    weatherGardenChanger.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

// Function to increment temperature
const handleTempIncrement = () => {
  let temperature = currentTemp.innerHTML;
  temperature++;
  currentTemp.innerHTML = temperature;
  changeTempColor(temperature);
  landscapeChanger(temperature);
};
// Function to decrement temp
const handleTempDecrement = () => {
  let temperature = currentTemp.innerHTML;
  temperature--;
  currentTemp.innerHTML = temperature;
  changeTempColor(temperature);
  landscapeChanger(temperature);
};
// Select increment and decrement buttons
const incrementTemp = document.getElementById('increment-count');
const decrementTemp = document.getElementById('decrement-count');

// Add click event to buttons
incrementTemp.addEventListener('click', handleTempIncrement);
decrementTemp.addEventListener('click', handleTempDecrement);

//change color if the temp increases
const changeTempColor = (temp) => {
  if (temp > 26) {
    currentTemp.style.color = 'red';
  } else if (temp > 21) {
    currentTemp.style.color = 'orange';
  } else if (temp > 15) {
    currentTemp.style.color = 'gold';
  } else if (temp > 10) {
    currentTemp.style.color = 'green';
  } else {
    currentTemp.style.color = 'teal';
  }
};
//getting the city input element that needs to be changed
const cityName = document.getElementById('city-name');

//function to change city name on top of the page
function cityNameChanger(event) {
  cityNameValue = cityName.value;
  document.getElementById('top-city-name').innerHTML =
    '🌆 ' + cityNameValue + ' 🌆';
}
//comment
//listener to change city name
cityName.addEventListener('input', cityNameChanger);

//getting the button element in HTML to rerest city name
const resetCityButton = document.getElementById('city-reset-button');

//function to reset city name
function resetCityName() {
  cityName.value = '';
  document.getElementById('top-city-name').innerHTML =
    '🌆 ' + cityName.placeholder + ' 🌆';
}

//event listener for reseting the city name
resetCityButton.addEventListener('click', resetCityName);

//getting the dom element to change top sky
const skyOption = document.getElementById('sky-options');

const sky = document.getElementById('top-landscape');
//function to change sky
const updateSky = (opt) => {
  if (skyOption.value === 'sunny') {
    sky.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyOption.value === 'cloudy') {
    sky.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyOption.value === 'mostly cloudy') {
    sky.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyOption.value === 'rainy') {
    sky.innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyOption.value === 'snowy') {
    sky.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};
//add event listener for sky dropdown menu
skyOption.addEventListener('change', updateSky);

//const axios = require('axios');

async function getLatLon(place) {
  console.log(place);
  const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
    params: {
      key: 'pk.f06c8c89d5d21e12396df6e07fe686dd',
      q: place,
      format: 'json',
    },
  });

  let resp = response.data;
  const lat = resp[0].lat;
  const long = resp[0].lon;
  let latlong = {
    lat: lat,
    lon: long,
  };

  console.log(latlong);
  return latlong;
}

async function getTemp(lat, long) {
  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/onecall',
    {
      params: {
        lat: lat,
        lon: long,
        APPID: 'a63f76d71c284265bbebf86c9459a554',
        units: 'metric',
      },
    }
  );
  let parsedresp = response.data;
  let temp = parsedresp.current.temp;
  return temp;
}

//get real reamp
async function getRealTemperature() {
  cityNameValue = cityName.value;
  let latLon = await getLatLon(cityNameValue);
  let temperatureValue = await getTemp(latLon.lat, latLon.lon);
  temperatureValue = Math.round(temperatureValue);
  currentTemp.innerHTML = temperatureValue;
  updateSky(temperatureValue);
  landscapeChanger(temperatureValue);
  changeTempColor(temperatureValue);
}
const realTimeTempButton = document.getElementById('real-temp');
realTimeTempButton.addEventListener('click', getRealTemperature);

window.addEventListener('load', getRealTemperature);
