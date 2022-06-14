"use strict";

const state = {
  temperatureCount: 0,
};

const changeTemperatureColor = (displayTemperatureEl) => {
  // if temperature value is 0 put (class)
  displayTemperatureEl.className = "padding-5";
  if (state.temperatureCount <= 49) {
   displayTemperatureEl.classList.add("teal");
  }
  else if (state.temperatureCount <= 59) {
    displayTemperatureEl.classList.add( "green");
  }
  else if (state.temperatureCount <= 69) {
    displayTemperatureEl.classList.add( "yellow");
  } 
  else if (state.temperatureCount <= 79) { displayTemperatureEl.classList.add( "orange");
  }
  else {
   displayTemperatureEl.classList.add( "red");
 }
};

const increaseTemperatureCount = (tempChangeValue) => {
  const displayTemperatureEl = document.getElementById("displayTemperature");
  state.temperatureCount += tempChangeValue;
  changeTemperatureColor(displayTemperatureEl);
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};

const registerEventHandlers = () => {
  const upArrowEl = document.getElementById("upArrow");
  upArrowEl.addEventListener("click", () => { increaseTemperatureCount(1)});

  const downArrowEl = document.getElementById("downArrow");
  downArrowEl.addEventListener("click", () => { increaseTemperatureCount(-1)});
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);