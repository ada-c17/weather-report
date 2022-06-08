'use strict';

// 2. Change temperature by clicking on an arrow

const state = {
  temp: 55,
};

const increaseTemp = () => {
  state.temp += 1;
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  changeBackground(state.temp);
};

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers);

const decreaseTemp = () => {
  state.temp -= 1;
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  changeBackground(state.temp);
};

const registerEventHandlersDecrease = () => {
  const increaseTempButton = document.getElementById('decreaseTempButton');
  increaseTempButton.addEventListener('click', decreaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersDecrease);

// Temperature Ranges Change Landscape

const changeBackground = (temp) => {
  const element = document.getElementById('main__intro__right');
  if (temp >= 80) {
    element.classList.remove(element.className);
    element.classList.add('summer');
  } else if (temp < 80 && temp >= 70) {
    element.classList.remove(element.className);
    element.classList.add('spring');
  } else if (temp < 70 && temp >= 60) {
    element.classList.remove(element.className);
    element.classList.add('autumn');
  } else {
    element.classList.remove(element.className);
    element.classList.add('winter');
  }
};

// 3. Naming the City
//! used different syntax here

const message = document.getElementById('enter_city');
const result = document.getElementById('city_name');
message.addEventListener('input', function () {
  result.textContent = this.value.toUpperCase();
});

// 5. Selection Changes Sky

function changeModeSky(event) {
  const element = document.body;
  element.classList.remove(element.className);
  element.classList.add(`${event.target.value}`);
}

const registerEventHandlersSky = () => {
  const skyMode = document.getElementById('sky-select');
  skyMode.addEventListener('change', changeModeSky);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersSky);

// 6.Resetting the City Name

const ResetCity = () => {
  const nameContainer = document.getElementById('city_name');
  nameContainer.textContent = 'default name';
};

const registerEventHandlersReset = () => {
  const form = document.querySelector('#form');
  form.addEventListener('reset', ResetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlersReset);

// 7. convert the temperature between Celsius and Fahrenheit
// using the mode query param
// For temperature in Fahrenheit use units=imperial
// For temperature in Celsius use units=metric
