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
    console.log('tempThemeToggle called');

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
    // console.log('skyToggle called');

    const skySelectElement = document.getElementById("sky-id");
    const weatherLandscape = document.getElementById("sky");

    if (skySelectElement.value === "sunny") {
        weatherLandscape.className = "skySunny";
        console.log("SUNNY")
    } else if (skySelectElement.value === "partlyCloudy") {
        weatherLandscape.className = "skyPartlyCloudy";
    } else if (skySelectElement.value === "overcast") {
        weatherLandscape.className = "skyOvercast";
    } else if (skySelectElement.value === "rainy") {
        weatherLandscape.className = "skyRainy";
    } else if (skySelectElement.value === "snow"){
        weatherLandscape.className = "skySnow";
    };
};
// create a skyToggle function that changes the images of the sky
// it will be almost the same as tempTheme, getting element id #sky
// and then if one of the buttons from select_sky function is called
// if that list element (doc.getElementbyId) sky-id 
// is equal to rain change className to skyRainy
// if that list elelment sky-id is equal to snow
// change className to skySnow
// if sky-id is equal to partyCloudy, change classname to skyPartlyCloudy
// if sky-id is equal to sunny, change className to skySunny


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

// const show_sky = () => {
//     let weather = document.getElementById("sky-id");
    
//     if (weather.style.display == "block") {
//         weather.style.display == "none";
//     } else {
//         weather.style.display = "block";
//     };
// };

// window.onclick = function (event) {
//     if (!event.target.matches('.dropdown_button')) {
//         document.getElementById('sky-id')
//         .style.display = "none";
//     };
// }

const registerEventHandlers = () => {
    const tempUpButton = document.querySelector("#raiseTemp");
    tempUpButton.addEventListener("click", addTemp);
    tempUpButton.addEventListener("click", tempThemeToggle);

    const tempDownButton = document.querySelector("#lowerTemp");
    tempDownButton.addEventListener("click", lowerTemp);
    tempDownButton.addEventListener("click", tempThemeToggle);

    // add event handler & listener for cityNameResponse change
    // for input first
    // eventually for irlTemp button (call api) and keyboard  `enter`
    const cityNameInput = document.querySelector("#cityText");
    cityNameInput.addEventListener("change", cityNameResponse);

    const changeSky = document.querySelector(".weather");
    changeSky.addEventListener("change", skyToggle);

    // event handler for API calls lat/long and weather
    const irlTempButton = document.querySelector("#irlTemp");
    irlTempButton.addEventListener("click", getLatAndLong);

    // show_sky();
    // const skySelect = document.querySelector("#sky-id");
    // skySelect.addEventListener("change", show_sky);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);