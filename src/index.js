"use strict";

const state = {
  temperatureCount: 0,
};


const changeTemperatureEnvironment = (displayTemperatureEl) => {
  // displayTemperatureEl.className = "padding-5";
  const landscape = document.getElementById("landscape");

  if (state.temperatureCount <= 49) {
    displayTemperatureEl.classList.add("teal");
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  }
  else if (state.temperatureCount <= 59) {
    displayTemperatureEl.classList.add("green");
  }
  else if (state.temperatureCount <= 69) {
    displayTemperatureEl.classList.add("yellow");
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
  } 
  else if (state.temperatureCount <= 79) { 
    displayTemperatureEl.classList.add("orange");
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
  }
  else {
    displayTemperatureEl.classList.add("red");
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
  }
};

const incOrDecTemperatureCount = (tempChangeValue) => {
  const displayTemperatureEl = document.getElementById("displayTemperature");
  state.temperatureCount += tempChangeValue;
  changeTemperatureEnvironment(displayTemperatureEl);
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};

const registerEventHandlers = () => {
  const upArrowEl = document.getElementById("upArrow");
  upArrowEl.addEventListener("click", () => {incOrDecTemperatureCount(1)});

  const downArrowEl = document.getElementById("downArrow");
  downArrowEl.addEventListener("click", () => {incOrDecTemperatureCount(-1)});
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);