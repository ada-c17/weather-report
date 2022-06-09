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
  temp: 60,
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

// const axios = require('axios'); //Per README, may cause an error?

let city = document.getElementById('newCity').textContent;

axios
  .get(
    'http://127.0.0.1:5000/location',
    { params: { q: city } }
    // `http://127.0.0.1:5000/location?q=${city}`
  )
  //when do I pass in response and error?
  .then((response) => {
    const latt = response.data[0].lat;
    const long = response.data[0].lon;
    console.log(latt, long);
    //make another axios request here... calling weather api with lon & lat params
    axios
      .get(
        'http://127.0.0.1:5000/weather',
        {
          params: { lat: latt, lon: long },
        }
        // `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
      )
      .then((response) => {
        console.log(latt);
        console.log(long);
      })
      .catch((error) => {
        console.log('Error occured with weather API request');
      });
  })
  .catch((error) => {
    console.log('Error occured with location API request'); // Do i need a .catch() here?
  });

// axios
//   .get('some URL')
//   .then((response) => {
//     // Code that executes with a successful response goes here
//   })
//   .catch((error) => {
//     // Code that executes with an unsuccessful response goes here
//   });

// http://127.0.0.1:5000/location
// http://127.0.0.1:5000/location?q='seattle, wa'

// http://127.0.0.1:5000/weather
// http://127.0.0.1:5000/weather?lat=47.6484673&lon=-122.3790015

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
