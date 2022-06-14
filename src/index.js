"use strict";

const state = {
  temperatureCount: 0,
};

const increaseTemperatureCount = () => {
  const displayTemperatureEl = document.getElementById("displayTemperature");
  state.temperatureCount += 1;
  displayTemperatureEl.textContent = `Temperature: ${state.temperatureCount}`;
};

const registerEventHandlers = () => {
  const upArrowEl = document.getElementById("upArrow");
  upArrowEl.addEventListener("click", increaseTemperatureCount);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);