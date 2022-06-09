// 'use strict';

const state = {
  temp: 60,
};

const tempUp = () => {
  state.temp += 1;
  const currentTemp = document.querySelector('#temp');
  currentTemp.textContent = `{state.temp} ℉`;
};

// const updateNewBookCount = () => {
//   state.newBookCount += 1;
//   const bookCounterElement = document.querySelector('#newBookCount');
//   bookCounterElement.textContent = `New Books read: ${state.newBookCount}`;
// };

const tempDown = () => {
  //pass
};

const newReport = (event) => {
  console.log('in newReport:', event);
  const cityName = document.createElement('h3');
  const titleContainer = document.querySelector('#city-name-container');
  titleContainer.replaceWith(cityName); //adds city 1x only, won't replace
  // titleContainer.appendChild(cityName); //keeps adding cities
  cityName.textContent = document.getElementById('cityToSearch').value;
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
