// Wave 2
let state = {
  temp: 75,
};

const images = [
  'url("./images/image1.jpg")',
  'url("./images/image2.jpg")',
  'url("./images/image3.jpg")',
  'url("./images/image4.jpg")',
  'url("./images/image5.jpg")',
  'url("./images/image6.jpg")',
];

// change color by temp, change background by temp
const changeColor = () => {
  const tempColor = document.getElementById('temp');
  const gardenLandscape = document.getElementById('landscape');
  const bgColor = document.querySelector('body');
  const landscape = [
    '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
    '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
    '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
    '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
    '🥀🍃🍂🎋🥀 🪵 🪵 🥀🍃🍂🎋🥀',
  ];
  if (state.temp > 79) {
    tempColor.className = 'temp-90';
    bgColor.style.backgroundImage = images[1];
    gardenLandscape.textContent = `${landscape[4]}`;
  } else if (state.temp > 75) {
    tempColor.className = 'temp-80';
    bgColor.style.backgroundImage = images[0];
    gardenLandscape.textContent = `${landscape[0]}`;
  } else if (state.temp > 69) {
    tempColor.className = 'temp-70';
    bgColor.style.backgroundImage = images[2];
    gardenLandscape.textContent = `${landscape[1]}`;
  } else if (state.temp > 65) {
    tempColor.className = 'temp-60';
    bgColor.style.backgroundImage = images[3];
    gardenLandscape.textContent = `${landscape[2]}`;
  } else if (state.temp > 59) {
    tempColor.className = 'temp-50';
    bgColor.style.backgroundImage = images[4];
    gardenLandscape.textContent = `${landscape[3]}`;
  } else {
    tempColor.className = 'temp-49';
    bgColor.style.backgroundImage = images[5];
    gardenLandscape.textContent = `${landscape[3]}`;
  }
};

// increase temp
const increaseTemp = (event) => {
  state.temp += 1;
  const increaseTempContainer = document.querySelector('#temp');
  increaseTempContainer.textContent = `${state.temp}`;
  changeColor();
};

// decrease temp
const decreaseTemp = (event) => {
  state.temp -= 1;
  const decreaseTempContainer = document.querySelector('#temp');
  decreaseTempContainer.textContent = `${state.temp}`;
  changeColor();
};

// Wave 3
// get input city name
const getCityName = () => {
  const cityName = document.getElementById('city-name').value;
  const changeCity = document.getElementById('header-city');
  const realTimeTemp = document.getElementById('realtime-temp');
  changeCity.textContent = `✨ ${cityName} ✨`;
  realTimeTemp.textContent = `${cityName} Temp`;
};

// Wave 5
// change sky in weather garden and change background color
const changeSky = () => {
  const skyEmoji = [
    '☂️ ☂️ ☂️ ⛱  🌞  ⛱ ☂️ ☂️ ☂️ ',
    '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️ ☁️',
    '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
    '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
  ];
  const selectValue = document.getElementById('sky').value;
  const gardenSky = document.getElementById('garden-sky');
  const bgColor = document.querySelector('body');
  if (selectValue === 'Sunny') {
    gardenSky.textContent = `${skyEmoji[0]}`;
    bgColor.style.backgroundImage = images[4];
  } else if (selectValue === 'Cloudy') {
    gardenSky.textContent = `${skyEmoji[1]}`;
    bgColor.style.backgroundImage = images[2];
  } else if (selectValue === 'Rainy') {
    gardenSky.textContent = `${skyEmoji[2]}`;
    bgColor.style.backgroundImage = images[5];
  } else {
    gardenSky.textContent = `${skyEmoji[3]}`;
    bgColor.style.backgroundImage = images[0];
  }
};

// Wave 6
const resetButton = () => {
  // reset city name
  const cityName = document.getElementById('city-name');
  cityName.value = '';
  const changeCity = document.getElementById('header-city');
  changeCity.textContent = 'Seattle';
  // reset temp and temp sign for keliv
  const KelvinTemp = document.getElementById('temp-convert');
  KelvinTemp.textContent = '';
  const kelvinSign = document.querySelector('.kelvin-sign');
  kelvinSign.textContent = 'K';
  // reset body color
  const bgColor = document.querySelector('body');
  bgColor.style.backgroundImage = images[0];
  // reset temp
  const temp = document.getElementById('temp');
  temp.textContent = '75';
  temp.className = 'temp-70';
  // reset garden
  const gardenSky = document.getElementById('garden-sky');
  gardenSky.textContent = ' ☂️ ☂️ ☂️ ⛱  🌞  ⛱ ☂️ ☂️ ☂️ ';
  const landScape = document.getElementById('landscape');
  landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';

  // reset display temp to empty
  const displayTemp = document.getElementById('current-temp');
  displayTemp.textContent = '';

  // reset display current weather to empty
  const displayWeather = document.getElementById('des-weather');
  displayWeather.textContent = '';

  //reset display the humidity to empty
  const displayhumidity = document.getElementById('humidity');
  displayhumidity.textContent = '';

  // reset display wind speed to empty
  const displayWindSpeed = document.getElementById('wind-speed');
  displayWindSpeed.textContent = '';

  // reset realtime temp button
  const realTimeTemp = document.getElementById('realtime-temp');
  realTimeTemp.textContent = 'Realtim Temp';
};

//Wave 4
// get temp for each city
const getRealtimeTemp = () => {
  const cityName = document.getElementById('city-name').value;
  // call locationIQ of city to find the lat and lon
  axios
    .get('https://weather-report-sreymom-whales.herokuapp.com/location', {
      params: {
        q: cityName,
      },
    })
    .then((response) => {
      const searchLocation = response.data[0];
      console.log(response);
      const latitudeCity = searchLocation.lat;
      const longitudeCity = searchLocation.lon;
      // call weather api to find temp
      axios
        .get('https://weather-report-sreymom-whales.herokuapp.com/weather', {
          params: {
            lat: latitudeCity,
            lon: longitudeCity,
          },
        })
        .then((tempResponse) => {
          const currentTemp = Math.round(tempResponse.data.current.temp);

          // get weather from weather report
          const weatherDes = document.getElementById('des-weather');
          const curentWeather = tempResponse.data.current.weather[0].main;
          weatherDes.textContent = `Current Weather: ${curentWeather}`;

          // get temp from weather report
          const kelvinsTemp = document.getElementById('temp-convert');
          kelvinsTemp.textContent = `${currentTemp}`;
          const tempK = document.getElementById('current-temp');
          tempK.textContent = `Temperature:   ${currentTemp}   K`;

          // get humidity from weather report
          const humidity = tempResponse.data.current.humidity;
          const humidityDisplay = document.getElementById('humidity');
          humidityDisplay.textContent = `Humidity:   ${humidity}`;

          // get wind speed from weather report
          const windSpeed = tempResponse.data.current.wind_speed;
          const windSpeedDisplay = document.getElementById('wind-speed');
          windSpeedDisplay.textContent = `Wind Speed: ${windSpeed}`;

          // convert kelvin to Farenheit when click on F button
          const convertKtoF = () => {
            const farenheitSign = document.querySelector('.kelvin-sign');
            const tempF = Math.round(((currentTemp - 273.15) * 9) / 5 + 3);
            kelvinsTemp.textContent = `${tempF}`;
            farenheitSign.textContent = '\u2109';
            tempK.textContent = `Temperature:   ${tempF}  \u2109`;
          };
          const convertFarenheit = document.getElementById('farenheit');
          convertFarenheit.addEventListener('click', convertKtoF);

          // convert Kelvin to Celsius when click on C button
          const convertKtoC = () => {
            const celsiusSign = document.querySelector('.kelvin-sign');
            const tempC = Math.round(currentTemp - 273.15);
            kelvinsTemp.textContent = `${tempC}`;
            celsiusSign.textContent = '\u2103';
            tempK.textContent = `Temperature:   ${tempC}  \u2103`;
          };
          const convertCelsius = document.getElementById('degree');
          convertCelsius.addEventListener('click', convertKtoC);
        })
        .catch((e) => {
          // alert('Location does not exist!');
          //swal('Oops!', 'Location does not exist!', 'error');
          console.log(e);
        });
    })
    .catch((error) => {
      console.log(error);
      //alert('Location does not exist!');
      window.swal('Oops!', 'Location does not exist!', 'error');
    });
};

// display date on page
const setDateTime = () => {
  const date = new Date();
  const currentDate = document.getElementById('date-display');
  const day = date.toDateString();
  const time = date.toLocaleTimeString();
  currentDate.textContent = `${day}  ${time}`;
  setTimeout('setDateTime()', 1000);
};
setDateTime();

// all event listener
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
  changeReset.addEventListener('click', resetButton);

  const realTemp = document.getElementById('realtime-temp');
  realTemp.addEventListener('click', getRealtimeTemp);

  const displayDateTime = document.querySelector('body');
  displayDateTime.addEventListener('onload', setDateTime);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// change backgroun images
// const changeBgImage = () => {
//   const images = [
//     'url("../images/image1.jpg")',
//     'url("../images/image2.jpg")',
//     'url("../images/image3.jpg")',
//     'url("../images/image4.jpg")',
//     'url("../images/image5.jpg")',
//     'url("../images/image6.jpg")',
//   ];
//   const changeBg = document.querySelector('.garden');
//   const bg = images[Math.floor(Math.random() * images.length)];
//   changeBg.style.backgroundImage = bg;
// };
// setInterval(changeBgImage, 3000);
