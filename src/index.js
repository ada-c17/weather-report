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
    const tempElement = document.getElementByClassName("tempBox");

    if (state.temp >= 32){
        // change background, #tempAdjust,
        tempAdjustElement.className = "tooHot";
        // and #tempAdjust h2 color -> too hot
        tempElement.className = "tooHot";
    } else if (state.temp >= 25 && state.temp < 32){
        // change background, #tempAdjust,
        tempAdjustElement.className = "hot";
        // and #tempAdjust h2 color -> hot
        tempElement.className = "hot";
    } else if (state.temp > 0 && state.temp <= 11) {
        // change background, #tempAdjust,
        tempAdjustElement.className = "cold";
        // and #tempAdjust h2 color -> cold
        tempElement.className = "cold";
    } else if (state.temp <= 0){
        // change background, #tempAdjust,
        tempAdjustElement.className = "freezing";
        // and #tempAdjust h2 color -> freezing
        tempElement.className = "freezing";
    };
};

const registerEventHandlers = () => {
    const tempUpButton = document.querySelector("#raiseTemp");
    tempUpButton.addEventListener("click", addTemp);
    tempUpButton.addEventListener("click", tempThemeToggle);

    const tempDownButton = document.querySelector("#lowerTemp");
    tempDownButton.addEventListener("click", lowerTemp);
    tempDownButton.addEventListener("click", tempThemeToggle);

};


document.addEventListener("DOMContentLoaded", registerEventHandlers);