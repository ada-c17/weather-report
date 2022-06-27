"use strict";

// const { default: axios } = require("axios");

// const axios = require('axios');

const state = {
    temp: 23,
    city: 'Seattle',
    lat: 47.6038321,
    lon: -122.3300624,
    weather: 'rainy',
};

const addTemp = () => {
    state.temp += 1;
    const tempCount = document.querySelector("#temp");
    tempCount.textContent = `${state.temp}`;
};

const lowerTemp = () => {
    state.temp -= 1;
    const tempCount = document.querySelector("#temp");
    tempCount.textContent = `${state.temp}`;
};

const tempThemeToggle = () => {
    addTemp();
    lowerTemp();

    const tempAdjustElement = document.getElementById("tempAdjust");
    const tempAdjustLandscape = document.getElementById("landScape");

    if (state.temp >= 32){
        tempAdjustElement.className = "tooHot";
        tempAdjustLandscape.className = "landHot";
    } else if (state.temp >= 25 && state.temp < 32){
        tempAdjustElement.className = "hot";
        tempAdjustLandscape.className = "landTemperate";
    } else if (state.temp > 0 && state.temp <= 11) {
        tempAdjustElement.className = "cold";
        tempAdjustLandscape.className = "landCold";
    } else if (state.temp <= 0){
        tempAdjustElement.className = "freezing";
        tempAdjustLandscape.className = "landFreezing";
    };
};

const skyToggle = () => {
    const skySelectElement = document.getElementById("sky-id");
    const weatherLandscape = document.getElementById("sky");

    if (skySelectElement.value === "sunny") {
        weatherLandscape.className = "skySunny";
    } else if (skySelectElement.value === "partlyCloudy") {
        weatherLandscape.className = "skyPartlyCloudy";
    } else if (skySelectElement.value === "rainy") {
        weatherLandscape.className = "skyRainy";
    } else if (skySelectElement.value === "snow"){
        weatherLandscape.className = "skySnow";
    };
};

const cityNameResponse = () => {
    const inputCity = document.getElementById('cityText').value;
    const cityDisplay = document.getElementById('city');
    state.city = inputCity
    cityDisplay.textContent = state.city;
};

const getLatAndLong = () => {
    axios
    .get('http://localhost:5000/location',{
    params: {
    q: state.city,
    },
    }).then((response) => {
    state.lat = response.data[0]['lat'];
    state.lon = response.data[0]['lon'];
    getWeather();
    })
    .catch(err => console.log('error finding latitude and longitude', {err}));
};

const getIRLTemp = () => {
    state.city = document.getElementById("cityText").value;
    getLatAndLong();
};

const tempKtoC = (temp) => {
    return (temp - 273.15);
};

const tempKtoF = (temp) => {
    return (temp-273.15) * (9/5) + 32;
}

const getWeather = () => {
    axios
    .get(`http://localhost:5000/weather`,{
    params: {
        lat: state.lat,
        lon: state.lon,
    },
    }).then((response) => {
        const weather = response.data;
        console.log(weather)
        state.temp = Math.round(tempKtoC(weather.current.temp));
        tempThemeToggle();
        // add validate weather call here
    })
    .catch(err => console.log('error finding weather data', {err}));
};


// create a validate weather function tfor sky

const registerEventHandlers = () => {
    const tempUpButton = document.querySelector("#raiseTemp");
    tempUpButton.addEventListener("click", addTemp);
    tempUpButton.addEventListener("click", tempThemeToggle);

    const tempDownButton = document.querySelector("#lowerTemp");
    tempDownButton.addEventListener("click", lowerTemp);
    tempDownButton.addEventListener("click", tempThemeToggle);


    const cityNameInput = document.querySelector("#cityText");
    cityNameInput.addEventListener("change", cityNameResponse);

    const changeSky = document.querySelector(".weather");
    changeSky.addEventListener("change", skyToggle);

    // event handler for API calls lat/long and weather
    const irlTempButton = document.querySelector("#irlTemp");
    irlTempButton.addEventListener("click", getLatAndLong);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);