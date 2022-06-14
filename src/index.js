// import axios from 'axios'
const state = {
  fahrenheit: 60,
  city: 'Edmonds',
};
let num = state.fahrenheit;
const tempUp = (event) => {
  state.fahrenheit += 1;
  tempChangeColor(state.fahrenheit);
  const increase = document.getElementById('f');
  increase.textContent = `Degrees Fahrenheit:${state.fahrenheit}`;
  return increase.textContent;
};

const tempDown = (event) => {
  state.fahrenheit--;
  tempChangeColor(state.fahrenheit);
  const decrease = document.getElementById('f');
  decrease.textContent = `Degrees Fahrenheit:${state.fahrenheit}`;
  return decrease.textContent;
};

const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#upButton');
  upButton.addEventListener('click', tempUp);

  const downButton = document.querySelector('#downButton');
  downButton.addEventListener('click', tempDown);
};

const tempChangeColor = (num) => {
  let element = document.getElementById('temperatureContainer');
  if (state.fahrenheit >= 80) {
    element.style.backgroundColor = 'red';
  } else if (70 < state.fahrenheit < 80) {
    element.style.backgroundColor = 'orange';
  } else if (60 < state.fahrenheit < 70) {
    element.style.backgroundColor = 'yellow';
  } else if (49 < state.fahrenheit < 60) {
    element.style.backgroundColor = 'green';
  } else if (33 <= state.fahrenheit < 50) {
    element.style.backgroundColor = 'teal';
  } else if (state.fahrenheit < 32) {
    element.style.backgroundColor = 'blue';
  }
};

const weatherGarden = () => {
  let num = state.fahrenheit;
  let conditions = document.querySelector('#conditions');
  if (num >= 80) {
    conditions.textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (70 <= num < 80) {
    conditions.textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (60 <= num < 70) {
    conditions.textContent = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
  } else if (50 <= num < 60) {
    conditions.textContent = `"🌲🌲🌲🍂🌲🍁🌲🌲🍂🌲🍂🍁🍂"`;
  } else if (33 <= num < 50) {
    conditions.textContent = `"🍂🍁🍂🍂🍁🍂🍂🍁🍂🍂🍁🍂"`;
  } else if (num < 32) {
    conditions.textContent = `"⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️"`;
  }
};

const cityInput = (event) => {
  let cityInput = document.getElementById('input').value;
  console.log(cityInput);
  state.city = cityInput;
  let cityHeader = document.querySelector('#city');
  cityHeader.textContent = `${state.celsius}`;
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
