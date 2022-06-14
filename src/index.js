"use strict";

const state = {
  temperatureCount: 0,
};

const increaseTemperatureCount = (tempChangeValue) => {
  const displayTemperatureEl = document.getElementById("displayTemperature");
  state.temperatureCount += tempChangeValue;
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};

const registerEventHandlers = () => {
  const upArrowEl = document.getElementById("upArrow");
  upArrowEl.addEventListener("click", () => { increaseTemperatureCount(1)});

  const downArrowEl = document.getElementById("downArrow");
  downArrowEl.addEventListener("click", () => { increaseTemperatureCount(-1)});
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);