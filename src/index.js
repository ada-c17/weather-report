"use strict";

const state = {
    currentTemp: 0,
    clicked: false,
    city: "Arcadia",
    sky: "sunny",
};

const increaseTemp = () => {
    const tempContainer = document.getElementById("tempDisplay");
    state.currentTemp +=1;
    tempContainer.textContent = state.currentTemp;
    tempColor();
    addLandscape();
    
};

const descreaseTemp = () => {
    const tempContainer = document.getElementById("tempDisplay");
    state.currentTemp -=1;
    tempContainer.textContent = state.currentTemp;
    tempColor();
    addLandscape();
};

const tempColor =() => {
    if (state.currentTemp <= 49){
        tempDisplay.style.backgroundColor = "teal";
    }
    else if ((state.currentTemp > 49) && (state.currentTemp <= 59)){
        tempDisplay.style.backgroundColor = "green";
    }
    else if ((state.currentTemp > 59) && (state.currentTemp <= 69)){
        tempDisplay.style.backgroundColor = "yellow";
    }
    else if ((state.currentTemp > 69) && (state.currentTemp <= 79)){
        tempDisplay.style.backgroundColor = "orange";
    }
    else if (state.currentTemp >= 80){
        tempDisplay.style.backgroundColor = "red";
    }
};

const addLandscape = () => {
    const newLandscape = document.createElement("span");
    const landscapeContainer = document.querySelector("#landscapeContainer");
    let landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    if (state.currentTemp <= 59){
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
    else if ((state.currentTemp > 59) && (state.currentTemp <= 69)){
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    }
    else if ((state.currentTemp > 69) && (state.currentTemp <= 79)){
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    }
    else if (state.currentTemp >= 80){
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }
    landscapeContainer.textContent = landscape;
}
const getCityName = () => {
    const cityNameInput = document.getElementById('textbox_id').value;
    const cityNameHeader = document.getElementById("cityName");
    cityNameHeader.textContent = cityNameInput;

}
const resetCity = () => {
    state.city = "Arcadia";
    const cityName = document.getElementById("cityName");
    cityName.textContent = state.city;

}
// const axios = require('axios');

// axios.get('https://us1.locationiq.com/v1/search.php',{
//     params: {
//         key: process.env['api_key'],
//         q: 'state.city', // will update once have city name
//         format: 'json',
//     },
// })
// .then((response) => {
//     console.log('sucess!', response.data);
// })
// .catch((error) => {
//     console.log('error',error.response.data);
// });

// axios.get('https://us1.locationiq.com/v1/search.php',{
//     params: {
//         key: process.env['api_key'],
//         q: 'cityName', // will update once have city name
//         format: 'json',
//     },
// })
// .then((response) => {
//     console.log('sucess!', response.data);
// })
// .catch((error) => {
//     console.log('error',error.response.data);
// });

const getSkyElement = () => {
    const skyColor = document.getElementById('sky_id'); 
    const skylandscapeContainer = document.querySelector("#skylandscapeContainer");
    state.sky = "sunny";
    let sky = skyColor.options[skyColor.selectedIndex].text;
    if (state.sky == "sunny"){
        skyLandscape = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️"
    }
    else if (state.sky == "cloudy"){
        skyLandscape = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️'
    }
    else if (state.sky == "rainy"){
        skyLandscape = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
    }
    else if (state.sky == "snowy"){
        skyLandscape = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
    }
    skylandscapeContainer.textContent = skyLandscape;
}
const registerEventHandlers = () => {
    const increaseTempButton = document.querySelector("#increaseTempButton");
    increaseTempButton.addEventListener("click", increaseTemp);
    const decreaseTempButton = document.querySelector("#decreaseTempButton");
    decreaseTempButton.addEventListener("click", descreaseTemp);
    const landscapeContainer = document.querySelector("#landscapeContainer");
    landscapeContainer.addEventListener("click", addLandscape);
    const cityName = document.getElementById("textbox_id");
    cityName.addEventListener("keyup",getCityName);
    const reset = document.getElementById("resetButton");
    reset.addEventListener("click", resetCity);
    
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

{/* <script src="./node_modules/axios/dist/axios.min.js"></script> */}
