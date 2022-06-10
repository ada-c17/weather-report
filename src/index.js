'use strict';

const state = {
  temperature: 0
};

const domElements = {
  currentTemp: document.querySelector("#currentTemperature"),
}

const render = {
  temperature: function () {
    domElements.currentTemp.textContent = state.temperature;
  }
}

// if (temperature > 40) {
 
// }

// Math.floor(1.8 * (k - 273) + 32)

const weatherChange = (temperature) => {
  // What season goes with this temperature?
  // Given a temperature access the season data structure 
  // Set uppper and lower bounds
  const weatherReference = [
    {
      upperTemp: 80,
      lowerTemp:70,
      color: 'red'
    },
    {
      upperTemp: 69,
      lowerTemp:60,
      color: 'orange'
    },
    {
      upperTemp: 59,
      lowerTemp: 50,
      color: 'yellow'
    }
  ]
}

const increaseTemp = () => {
  state.temperature += 1;
  // Ask about the temperature change 
  weatherChange(state.temperature);
  render.temperature();
};
// console.log(state.temperature);

const decreaseTemp = () => {
  state.temperature -= 1;
// Ask about the temperature change 
  weatherChange(state.temperature);
  render.temperature();
  
};
// console.log(state.temperature);


const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector("#increaseTemp");
  increaseTempButton.addEventListener("click", increaseTemp);
  const decreaseTempButton = document.querySelector("#decreaseTemp");
  decreaseTempButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

const renderTemperature = () => {
  const temperatureContainer = document.querySelector("#currentTemperature");
  temperatureContainer.textContent = state.temperature;
}

// document.body.style.backgroundColor = "navy";