/**
 * Marlyn Lopez, Liqing Li
 * 6/10/2022
 * Weather report pair project
 * Finished all wave 1-wave 6 features development.
 * Note: plus, minus, get real time temp, city selection bar and input bar buttons
 * are set as position relative(parent) and absolute(child) in css file. 
 * So as window size changes these buttons move around, we know it's not the best implementation.
 * We were trying to focus on practicing html event handling with javascript for this project.
 * 
 */

/* Wave2 
1. increase and decrease temperature on click 
2. temperature # change text color and background color accordingly
3. temperature range changes garden emoji at bottom
*/

const state = {
  tempIncrement: 77,
};

//check background color when click temperature +/- button
const changeBackColorPlusMinusBtn = () => {
  const gardenEmoji = document.querySelector('#temp-emoji');
  if (state.tempIncrement >= 80) {
    document.body.style.backgroundColor = 'red';
    gardenEmoji.textContent =
      '🌵 🐍 🦂 🌵🌵  🐍 🏜 🦂🌵  🐍 🦂 🌵🌵  🐍 🏜 🦂🐍 🦂 🌵🌵  🐍';
  } else if (state.tempIncrement <= 79 && state.tempIncrement >= 70) {
    document.body.style.backgroundColor = 'orange';
    gardenEmoji.textContent =
      '🌸🌿🌼  🌷🌻🌿_☘️🌱 🌻🌷🌸🌿🌼  🌷🌻🌿 ☘️🌱 🌻🌷🌸🌿🌼  🌷🌻🌿_☘️';
  } else if (state.tempIncrement <= 69 && state.tempIncrement >= 60) {
    document.body.style.backgroundColor = '#d2d233';
    gardenEmoji.textContent =
      '🌾🌾 🍃 🪨 🛤 🌾🌾🌾 🍃🌾🌾 🍃 🪨  🛤 🌾🌾🌾 🍃🌾🌾 🍃 🪨 🛤 🌾';
  } else if (state.tempIncrement <= 59 && state.tempIncrement >= 50) {
    document.body.style.backgroundColor = 'green';
    gardenEmoji.textContent =
      '🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂';
  } else {
    document.body.style.backgroundColor = 'teal';
    gardenEmoji.textContent =
      '🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂';
  }
};

//even handler for + temp button to change background color and garden emojis
const temperaturePlusClickHandler = () => {
  const tempPlus = document.querySelector('#right-arrow-btn');
  tempPlus.addEventListener('click', () => {
    state.tempIncrement += 1;
    const tempText = document.querySelector('#temperature');
    tempText.textContent = `${state.tempIncrement} °F`;
    changeBackColorPlusMinusBtn();
  });
};

//even handler for - temp button to change background color and garden emojis
const temperatureMinusClickHandler = () => {
  const tempMinus = document.querySelector('#left-arrow-btn');
  //similar to callback function, instead anoynymous func
  tempMinus.addEventListener('click', () => {
    state.tempIncrement -= 1;
    const tempText = document.querySelector('#temperature');
    tempText.textContent = `${state.tempIncrement} °F`;
    changeBackColorPlusMinusBtn();
  });
};

//content load
document.addEventListener('DOMContentLoaded', temperaturePlusClickHandler);
document.addEventListener('DOMContentLoaded', temperatureMinusClickHandler);
// document.addEventListener('DOMContentLoaded', temperatureNumber);
//document.addEventListener("DOMContentLoaded", gardenEmojiHandler);


/* Wave3 
An element that displays a city name
A text input element that allows the user to change the city name
*/
//event handler that adds text element when user types city name
const cityWeatherHandler = () => {
  const weatherReport = document.querySelector('#weather-report');
  const cityName = document.createElement('p');
  //cityName.setAttribute('id', 'cityWeather')
  cityName.id = 'cityWeather';
  weatherReport.appendChild(cityName);
  const inputCity = document.querySelector('#city-input');
  inputCity.addEventListener('input', () => {
    cityName.textContent = `For the city of 🪴 ${inputCity.value} 🪴`;
    document.getElementbyID("city-input").style.color = "#233067"
  });
};

document.addEventListener('DOMContentLoaded', cityWeatherHandler);


/** Wave4 Calling API 
  when click get real-time temp button, displays city name and temp accordingly
*/

//LIQ_API = "https://us1.locationiq.com/v1/search.php"
//WO_API = "https://api.openweathermap.org/data/2.5/onecall"
LIQ_API = 'http://127.0.0.1:5000';
WO_API = 'http://127.0.0.1:5000';

//calls location iq api and open weather map api through flask proxy server api
const getRealTimeTemp = () => {
  const inputCity = document.querySelector('#city-input');
  let latitude;
  let longtitude;
  let currentTemp;
  //console.log(inputCity.value);
  //pass in html city input as parameter to call location iq api to get lat, lon of the city
  axios
    .get(`${LIQ_API}/location`, {
      params: { q: inputCity.value },
    }) 
    .then((response) => {
      //console.log(response.data[0].lat, response.data[0].lon);
      latitude = response.data[0].lat;
      longtitude = response.data[0].lon;
      //pass in lat, lon of city input as part of params and call open weather map api
      axios.get(`${WO_API}/weather`, {
          params: {
            lat: latitude,
            lon: longtitude,
          },
        })
        .then((response) => {
          //console.log(response.data['current']['temp']);
          currentTemp = response.data['current']['temp'];
          const temp = document.getElementById('temperature');
          currentTemp = Math.floor(((currentTemp - 273.15) * 9) / 5 + 32);
          temp.textContent = ` ${currentTemp} °F`;
          
          //changes background color as user click get real time temp button accordingly
          const skyEmoji = document.querySelector('#sky-emoji');
          const gardenEmoji = document.querySelector('#temp-emoji');
          if (currentTemp >= 80) {
            document.body.style.backgroundColor = 'red';
            skyEmoji.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️☀️☀️☀️☀️☀️☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️';
            gardenEmoji.textContent ='🌵 🐍 🦂 🌵🌵  🐍 🏜 🦂🌵  🐍 🦂 🌵🌵  🐍 🏜 🦂🐍 🦂 🌵🌵  🐍';
          } else if (currentTemp <= 79 && currentTemp >= 70) {
            document.body.style.backgroundColor = 'orange';
            skyEmoji.textContent =
            '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
            gardenEmoji.textContent = '🌸🌿🌼  🌷🌻🌿_☘️🌱 🌻🌷🌸🌿🌼  🌷🌻🌿 ☘️🌱 🌻🌷🌸🌿🌼  🌷🌻🌿_☘️';
          } else if (currentTemp <= 69 && currentTemp >= 60) {
            document.body.style.backgroundColor = 'yellow';
            skyEmoji.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
            gardenEmoji.textContent =
            '🌾🌾 🍃 🪨 🛤 🌾🌾🌾 🍃🌾🌾 🍃 🪨  🛤 🌾🌾🌾 🍃🌾🌾 🍃 🪨 🛤 🌾';
          } else if (currentTemp <= 59 && currentTemp >= 50) {
            document.body.style.backgroundColor = 'green';
            '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
            gardenEmoji.textContent =
            '🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂';
          } else {
            document.body.style.backgroundColor = 'teal';
            '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
            gardenEmoji.textContent =
            '🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂';
          }

        })
        .catch((error) => {
          console.log(error);
          console.log('Error2');
        });
    })
    .catch((error) => {
      console.log(error);
      console.log('Error1');
    });
};

const getRealTimeTempBtnHandler = () => {
  const realTimeTempBtn = document.getElementById('real-temp-button');

  realTimeTempBtn.addEventListener('click', getRealTimeTemp);
};

document.addEventListener('DOMContentLoaded', getRealTimeTempBtnHandler);


/** Wave5 Option	Sky*/
//event handler that changes sky emojis after selecting from drop down button
const dropDownSelection = () => {
  const selectElement = document.querySelector('#drop-down');
  const skyEmoji = document.querySelector('#sky-emoji');
  selectElement.addEventListener('change', () => {
    if (selectElement.value === 'Sunny') {
      document.body.style;
      skyEmoji.textContent =
        '☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️☀️☀️☀️☀️☀️☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️';
    } else if (selectElement.value === 'Cloudy') {
      document.body.style;
      skyEmoji.textContent =
        '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (selectElement.value === 'Rainy') {
      document.body.style;
      skyEmoji.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (selectElement.value === 'Snowy') {
      document.body.style;
      skyEmoji.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
  });
};

document.addEventListener('DOMContentLoaded', dropDownSelection);


/** Wave6 Resetting the City Name */
//event handler that reset input value and text to none after clicking reset button
const resetBtnHandler = () => {
  const resetBtn = document.getElementById('reset-btn');
  const inputBox = document.getElementById('city-input');
  const cityWeather = document.getElementById('cityWeather');

  resetBtn.addEventListener('click', () => {
    inputBox.value = '';
    cityWeather.textContent = '';
    //cityWeather.remove(); didn't work
  });
};

document.addEventListener('DOMContentLoaded', resetBtnHandler);
