"use strict";

// const axios = require('axios');

const state = {
    temp: 0,
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

    const tempAdjustElement = document.getElementsByClassName("tempAdjust");
    const tempElement = document.getElementById("temp");

    if (state.temp >= 32){
        // change background, #tempAdjust,
        tempAdjustElement.textContent = "tooHot";
        
        // and #tempAdjust h2 color -> too hot
    }
    else if (state.temp >= 25 && state.temp < 32){
        // change background, #tempAdjust,
        // and #tempAdjust h2 color -> hot
    }
    else if (state.temp > 0 && state.temp <= 11) {
        // change background, #tempAdjust,
        // and #tempAdjust h2 color -> cold
    }
    else if (state.temp <= 0){
        // change background, #tempAdjust,
        // and #tempAdjust h2 color -> freezing
    }
}

const registerEventHandlers = () => {
    const tempUpButton = document.querySelector("#raiseTemp");
    tempUpButton.addEventListener("click", addTemp);

    const tempDownButton = document.querySelector("#lowerTemp");
    tempDownButton.addEventListener("click", lowerTemp);
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);