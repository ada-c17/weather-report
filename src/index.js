"use strict";

const incTemp = document.querySelector("#increase-temp");
const decTemp = document.querySelector("#decrease-temp");
const tempDisplay = document.querySelector("#temp-display");
const landscape = document.querySelector("#landscape");

let temp = 70;

const tempColors = () => {
    if (temp >= 80){
        tempDisplay.className = "red"
    } else if (temp < 80 && temp >= 70){
        tempDisplay.className = "orange"
    }else if (temp < 70 && temp >= 60){
        tempDisplay.className = "yellow"
    }else if (temp <60 && temp >= 50){
        tempDisplay.className = "green"
    }else if (temp <= 49){
        tempDisplay.className = "teal"
    }
};

const tempLand = () => {
    if (temp >= 80){
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    } else if (temp < 80 && temp >= 70){
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    }else if (temp < 70 && temp >= 60){
        landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    }else if (temp <60 && temp >= 50){
        landscape.textContent = "🌲🌲🍁🌲🍁🍂🌲🍁🌲🌲🍂🌲"
    }else if (temp <= 49){
        landscape.textContent = "⛄️☃️__⛄️__⛄️☃️⛄️_⛄️☃️_⛄️"
    }
};

const increaseTemp = () => {
    temp += 1
    tempDisplay.textContent= temp
    tempColors();
    tempLand();
};

const decreaseTemp = () => {
    temp -= 1
    tempDisplay.textContent=temp
    tempColors();
    tempLand();
};


const changeSky = () => {
    const dropDown = document.querySelector("#sky-dropdown").value;
    const display = document.querySelector("#sky-garden")
    if (display === "Sunny"){
        display.textContent = "🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞"
    } else if (dropDown === "Cloudy"){
        display.textContent = "⛅ ⛅ ⛅ ⛅ ⛅ ⛅ ⛅ ⛅ "
    }else if (dropDown === "Rainy"){
        display.textContent = "☔ ☔ ☔ ☔ ☔ ☂️ ☂️ ☂️ ☂️ ☂️"
    }else if (dropDown === "Snowy"){
        display.textContent = "❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️"
    }
};


const cityHeader = document.querySelector("#city-header");

const cityChange = () =>{
    const cityInputValue = document.querySelector("#city-input").value;
    cityHeader.textContent = cityInputValue;
    
};

const reset= () =>{
    cityHeader.textContent = "Input You City";
    document.querySelector("#city-input").value = "Input You City"

};

const registerEventHandlers = () => {
    incTemp.addEventListener("click", increaseTemp);
    decTemp.addEventListener("click", decreaseTemp);

    const skyDrop = document.querySelector("#sky-dropdown");
    skyDrop.addEventListener("change", changeSky);

    const cityInput = document.querySelector("#city-input");
    cityInput.addEventListener("input", cityChange);

    const resetButton = document.querySelector("#city-reset")
    resetButton.addEventListener("click", reset);
    
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

