/* Wave2 
1. increase and decrease temperature on click 
2. temperature # change text color and background color accordingly
3. temperature range changes garden emoji at bottom
*/


const state = {
  tempIncrement: 77,
};

const adjustTemp = () => {
  state.tempIncrement += 1;
  const tempText = document.querySelector('#temperature');
  tempText.textContent = `${state.tempIncrement} °C`;
};

const temperaturePlusClickHandler = () => {
  const tempPlus = document.querySelector('#left-arrow-btn');
  tempPlus.addEventListener('click', adjustTemp);
};

const changeBackColorPlusMinusBtn = () => {
  if (state.tempIncrement >= 80) {
    document.body.style.backgroundColor = 'red';
    gardenEmoji.textContent =
      '🌵_🐍_🦂_🌵🌵__🐍_🏜_🦂🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.tempIncrement <= 79 && state.tempIncrement >= 70) {
    document.body.style.backgroundColor = 'orange';
    gardenEmoji.textContent =
      '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.tempIncrement <= 69 && state.tempIncrement >= 60) {
    document.body.style.backgroundColor = 'yellow';
    gardenEmoji.textContent =
      '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.tempIncrement <= 59 && state.tempIncrement >= 50) {
    document.body.style.backgroundColor = 'green';
    gardenEmoji.textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    document.body.style.backgroundColor = 'teal';
    gardenEmoji.textContent =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
}

//register events to html element(minus button)
const temperatureMinusClickHandler = () => {
  const tempMinus = document.querySelector('#right-arrow-btn');
  //similar to callback function, instead anoynymous func
  tempMinus.addEventListener('click', () => {
    state.tempIncrement -= 1;
    const tempText = document.querySelector('#temperature');
    tempText.textContent = `${state.tempIncrement} °C`;

    const gardenEmoji = document.querySelector('#temp-emoji');
    changeBackColorPlusMinusBtn();
  });
};

const temperatureNumber = () => {
  const tempPlus = document.querySelector('#left-arrow-btn');
  const gardenEmoji = document.querySelector('#temp-emoji');
  tempPlus.addEventListener('click', () => {
    state.tempIncrement += 1;
    if (state.tempIncrement >= 80) {
      document.body.style.backgroundColor = 'red';
      gardenEmoji.textContent =
        '🌵_🐍_🦂_🌵🌵__🐍_🏜_🦂🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (state.tempIncrement <= 79 && state.tempIncrement >= 70) {
      document.body.style.backgroundColor = 'orange';
      gardenEmoji.textContent =
        '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (state.tempIncrement <= 69 && state.tempIncrement >= 60) {
      document.body.style.backgroundColor = 'yellow';
      gardenEmoji.textContent =
        '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (state.tempIncrement <= 59 && state.tempIncrement >= 50) {
      document.body.style.backgroundColor = 'green';
      gardenEmoji.textContent =
        '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
      document.body.style.backgroundColor = 'teal';
      gardenEmoji.textContent =
        '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
  });
};

//content load
document.addEventListener('DOMContentLoaded', temperaturePlusClickHandler);
document.addEventListener('DOMContentLoaded', temperatureMinusClickHandler);
document.addEventListener('DOMContentLoaded', temperatureNumber);
//document.addEventListener("DOMContentLoaded", gardenEmojiHandler);

/* Wave3 
An element that displays a city name
A text input element that allows the user to change the city name
*/

const cityWeatherHandler = () => {
  const weatherReport = document.querySelector('#weather-report');
  const cityName = document.createElement('p');
  //cityName.setAttribute('id', 'cityWeather')
  cityName.id = 'cityWeather';
  weatherReport.appendChild(cityName);
  const inputCity = document.querySelector('#city-input');
  inputCity.addEventListener('input', () => {
    cityName.textContent = `For the city of ${inputCity.value}`;
  });
};

document.addEventListener('DOMContentLoaded', cityWeatherHandler);

/** Wave4 Calling API 
  when click get real-time temp button, displays city name and temp accordingly
*/

//LIQ_API = "https://us1.locationiq.com/v1/search.php"
//WO_API = "https://api.openweathermap.org/data/2.5/onecall"
LIQ_API = "http://localhost:5000"
WO_API = "http://localhost:5000"

const getRealTimeTemp = () => {
  const inputCity = document.querySelector('#city-input');
  let latitude;
  let longtitude;
  let currentTemp;
  console.log(inputCity.value);
  axios.get(`${LIQ_API}/location`, {
        params: {'q': inputCity.value}}) //pass in html city input, API key is calling through proxy server
       .then((response) => {
         console.log(response.data[0].lat, response.data[0].lon);
          latitude = response.data[0].lat;
          longtitude = response.data[0].lon;
          
        axios.get(`${WO_API}/weather`, {
          params: { //pass in lat and long got from previous call
            'lat':latitude,
            'lon': longtitude }})
             .then((response) => {
              console.log(response.data["current"]["temp"])
              currentTemp = response.data["current"]["temp"] ;
              const temp = document.getElementById("temperature");
              currentTemp = Math.floor((currentTemp - 273.15) * 9/5 + 32);
              temp.textContent = currentTemp;
              //change background color as we get real time temp
              if (currentTemp >= 80){
                document.body.style.backgroundColor = "red";
              }else if (currentTemp <= 79 && currentTemp >= 70){
                document.body.style.backgroundColor = "orange";
              }else if (currentTemp <= 69 && currentTemp >= 60){
                document.body.style.backgroundColor = "yellow";
              }else if(currentTemp <= 59 && currentTemp >= 50){
                document.body.style.backgroundColor = "green";
              }else{
                document.body.style.backgroundColor = "teal";
              }
             })
             .catch((error) => {
               console.log(error)
               console.log("Error2");
        })
       }).catch((error) => {
         console.log(error)
         console.log("Error1")
      })
};

const getRealTimeTempBtnHandler = () => {
  const realTimeTempBtn = document.getElementById("real-temp-button");
  
  realTimeTempBtn.addEventListener("click", getRealTimeTemp);
  
}

document.addEventListener('DOMContentLoaded', getRealTimeTempBtnHandler);



/** Wave5 Option	Sky*/

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
