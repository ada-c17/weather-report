"use strict";

// const axios = require('axios');

const state = {
    temp: 23,
    city: 'city',
    lat: 'lat',
    lon: 'lon',
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
    console.log('tempThemeToggle called')

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

const cityNameResponse = () => {

    const inputCity = document.getElementById('cityText').value;
    const cityDisplay = document.getElementById('city');
    state.city = inputCity
    cityDisplay.textContent = state.city;
};

const getLatAndLong = (place) => {
    return axios
    .get('https://us1.locationiq.com/v1/search.php',{
    params: {
    q: state.city,
    },
    }).then((response) => {
      // console.log(response.data);
    const lat = response.data[0]['lat']
    const lon = response.data[0]['lon']
    return {lat, lon} 
    })
    .catch(err => console.log({err}))
};

const registerEventHandlers = () => {
    const tempUpButton = document.querySelector("#raiseTemp");
    tempUpButton.addEventListener("click", addTemp);
    tempUpButton.addEventListener("click", tempThemeToggle);

    const tempDownButton = document.querySelector("#lowerTemp");
    tempDownButton.addEventListener("click", lowerTemp);
    tempDownButton.addEventListener("click", tempThemeToggle);

    // add event handler & listener for cityNameResponse change
    // for input first
    // eventually for irlTemp button and keyboard  `enter`
    const cityNameInput = document.querySelector("#cityText");
    cityNameInput.addEventListener("change", cityNameResponse);

};

const show_sky = () => {
    let weather = document.getElementById("sky_id");

    if (weather.style.display == "block") {
        weather.style.display == "none";
    } else {
        weather.style.display = "block";
    };
};

window.onclick = function (event) {
    if (!event.target.matches('.dropdown_button')) {
        document.getElementById('sky_id')
            .style.display = "none";
    };
}


document.addEventListener("DOMContentLoaded", registerEventHandlers);