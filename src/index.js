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

const registerEventHandlers = () => {
    const tempUpButton = document.querySelector("#raiseTemp");
    tempUpButton.addEventListener("click", addTemp);

    const tempDownButton = document.querySelector("#lowerTemp");
    tempDownButton.addEventListener("click", lowerTemp);
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);