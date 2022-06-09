// 'use strict';

//write conditional statements to change backgroundColor based on temp
// 95+	Red
// 80-95	Orange
// 70-80	green
// 55-70	teal
// 55 or below	whitish

// To see whats within an element:
// console.log(document.getElementById('temp').innerHTML);
console.log(document.getElementById('landscapeContainer'));

const state = {
  temp: 80,
};

// Example to re-assign the color:
// document.getElementById("p2").style.color = "blue";

const updateTempBackground = () => {
  const landscape = document.querySelector('#landscapeContainer');
  if (state.temp >= 90) {
    document.getElementById('temp').style.backgroundColor = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🍳';
  } else if (state.temp >= 80 && state.temp < 90) {
    document.getElementById('temp').style.backgroundColor = 'orange';
    landscape.textContent = '🌴🌳🌿__🍁🌴__🐶🦮__🤾🏼‍♀️__🏊🏻‍♀️_🌴🌳🌿';
  } else if (state.temp >= 70 && state.temp < 80) {
    document.getElementById('temp').style.backgroundColor = 'green';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 55 && state.temp < 70) {
    document.getElementById('temp').style.backgroundColor = 'teal';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp < 55) {
    document.getElementById('temp').style.backgroundColor = '#F2EBE9';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const tempUp = () => {
  state.temp += 1;
  const currentTemp = document.querySelector('#temp');
  currentTemp.textContent = `${state.temp} ℉`;
  updateTempBackground();
};

const tempDown = () => {
  state.temp -= 1;
  const currentTemp = document.querySelector('#temp');
  currentTemp.textContent = `${state.temp} ℉`;
  updateTempBackground();
};

const newReport = (event) => {
  console.log('in newReport:', event);
  const titleContainer = document.querySelector('#newCity');
  titleContainer.textContent = document.getElementById('cityToSearch').value;
};

const registerEventHandlers = (event) => {
  console.log('in event handler:', event);
  const tempUpButton = document.querySelector('#tempUp');
  tempUpButton.addEventListener('click', tempUp);
  const tempDownButton = document.querySelector('#tempDown');
  tempDownButton.addEventListener('click', tempDown);
  const cityChageButton = document.querySelector('#changeCity');
  cityChageButton.addEventListener('click', newReport);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

//examples:

// const registerEventHandlers = (event) => {
//   console.log('in event handler:', event);
//   const bookButton = document.querySelector('#addBook');
//   bookButton.addEventListener('click', addBook);
// };

// const state = {
//   newBookCount: 0,
// };

// const updateNewBookCount = () => {
//   state.newBookCount += 1;
//   const bookCounterElement = document.querySelector('#newBookCount');
//   bookCounterElement.textContent = `New Books read: ${state.newBookCount}`;
// };

// const addBook = (event) => {
//   console.log('in addBook:', event);
//   const newBook = document.createElement('li');
//   newBook.textContent = document.getElementById('bookTitle').value;
//   const bookList = document.getElementsByTagName('ul')[0];
//   bookList.appendChild(newBook);
//   updateNewBookCount();
// };
