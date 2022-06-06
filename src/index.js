'use strict';

// Change temperature by clicking on an arrow

const state = {
  temp: 55,
};

const increaseTemp = () => {
  state.temp += 1;
  const tempContainer = document.querySelector('#current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  changeBackground(state.temp);
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers);

const decreaseTemp = () => {
  state.temp -= 1;
  const tempContainer = document.querySelector('#current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  changeBackground(state.temp);
};
const registerEventHandlers1 = () => {
  const increaseTempButton = document.querySelector('#decreaseTempButton');
  increaseTempButton.addEventListener('click', decreaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers1);

// background will be changed depending on temp

const changeBackground = (temp) => {
  var element = document.querySelector('#main__intro__right');
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

// Naming the City

const message = document.querySelector('#enter_city');
const result = document.querySelector('#city_name');
message.addEventListener('input', function () {
  result.textContent = this.value;
});

// Selection Changes Sky

function changeModeSky(event) {
  console.log('in changeModeSummer:', event);
  var element = document.body;
  element.classList.remove(element.className);
  element.classList.add(`${event.target.value}`);
}
const registerEventHandlersSky = (event) => {
  console.log('in registerEventHandlers1:', event);
  const skyMode = document.querySelector('#sky-select');
  skyMode.addEventListener('change', changeModeSky);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersSky);
