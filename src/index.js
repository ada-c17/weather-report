"use strict";



const state = {
    temperature: 71,
    lat: '29.949731',
    lon: '-90.070164',
    city : "New Orleans"
  };


const tempDisplayed = document.querySelector("#tempDisplayed")
tempDisplayed.textContent = state.temperature;


const updateCityName = () => {
    const inputName = document.getElementById('cityName').value;
    const headerCityName = document.getElementById('headerCity');
    state.city = inputName;
    headerCityName.textContent = state.city;
    getWeather();
};

const resetCityName = () => {
    const cityNameInput = document.getElementById('cityName');
    cityNameInput.value = 'New Orleans';

    updateCityName();
    // getWeather();



    };  


const findLatAndLong = () => {
    console.log(state.city);
    axios
        .get('http://localhost:5000/location', {
            params: {
 
                q: state.city,
    
            },
        })
        .then((response) => {

            state.lat = response.data[0]['lat'];
            state.lon = response.data[0]['lon'];
            console.log(state.lat , state.lon);
            getWeather();
        })
        .catch((error) => {

        console.log('error finding lat and long:', error.response.data);
        });
};    


const getWeather = () => {
    axios
        .get('http://localhost:5000/weather', {
        params: {
            lat: state.lat,
            lon: state.lon,
            units: 'imperial'
                },
        })
        .then((response) => {
        console.log(response.data);
        console.log(response.data.current.weather[0]['main']);

        const weather = response.data.hourly[0]['temp'];
        state.temperature = Math.round(1.8*(weather-273.15)+32);
        formatTemp();
        updateSky();
        })
        .catch((error) => {
        console.log('unable to get the weather:', error);
        });
};

  
// INCREASE TEMP 
  const increaseTemp = (event) => {
      console.log(event)

    state.temperature += 1;

    formatTemp();
  };


const decreaseTemp = (event) => {
    state.temperature -=1;
    formatTemp();
};



// LANDSCAPE & TEMP COLOR CHANGE 
const formatTemp = () => {
    // const backgroundColor= document.getElementById('changeSky').value;
    let temp = state.temperature;
    let color = '';
    // let backgroundColor = ''
    
    let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    if (temp >= 80) {
      color = 'red';
    //   backgroundColor = 'cloudy';
      landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
      
    } else if (temp >= 70) {
      color = 'orange';
    //   backgroundColor = 'cloudy'
  
      landscape = '🌸🌿🌿🌱🌷';
    } else if (temp >= 60) {
      color = 'yellow';
      landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';

    } else {
      color = 'teal';
      landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
  
    const newLandscape = document.getElementById('landscape');
    newLandscape.textContent = landscape;
    const temperature = document.getElementById('tempDisplayed');
    temperature.className = color;
    temperature.textContent = String(state.temperature);
  };
  
  
const updateSky = () => {
    const inputSky = document.getElementById('changeSky').value;
    const skyContainer = document.getElementById('sky');
    
    let sky = '';
    let skyColor = '';
    if (inputSky === 'cloudy') {
        sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        skyColor = 'cloudy';
    } else if (inputSky === 'sunny') {
        sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
        skyColor = 'sunny';
    } else if (inputSky === 'raining') {
        sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
        skyColor = 'rainy';
    } else if (inputSky === 'snowing') {
        sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨🌨🌨';
        skyColor = 'snowy';
    }
    skyContainer.textContent = sky;
    const gardenContent = document.getElementById('gardenSection');
    gardenContent.classList = `garden__content ${skyColor}`;
    };




  
const registerEventHandlers = (event) => {


    // INCREASE TEMP
    const increaseTempButton = document.querySelector("#increaseTempButton");
    increaseTempButton.addEventListener("click", increaseTemp);
    // DECREASE TEMP
    const decreaseTempButton = document.querySelector("#decreaseTempButton");
    decreaseTempButton.addEventListener("click", decreaseTemp);

    updateCityName();
    
    const cityNameInput = document.getElementById('cityName');
    cityNameInput.addEventListener('input', updateCityName);


    const realTempButton = document.getElementById("realTempButton");
    realTempButton.addEventListener('click', findLatAndLong);
  
    const cityNameResetBtn = document.getElementById('cityNameReset');
    cityNameResetBtn.addEventListener('click', resetCityName);

    updateSky();
    const changeSky = document.getElementById('changeSky');
    changeSky.addEventListener('change', updateSky);

    formatTemp();

    getWeather();
  

    
  };
  
  document.addEventListener("DOMContentLoaded", registerEventHandlers);