'use strict';

const state = {
  temperature: 70,
  tempBackgroundColor: 'orange',
  landscape: '🌳🏞🌳🏞🌳🏞🌳',
  cityName: '',
  skyImageLink: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
};

const domElements = {
  currentTemp: document.querySelector('#currentTemperature'),
  slider: document.querySelector('#slider'),
  landscape: document.querySelector('#landscape'),
  cityName: document.querySelector('#city-name'),
  cityButton: document.querySelector('#city-button'),
  cityNameInput: document.querySelector('#city-name-input'),
  skySelect: document.querySelector('#choose-sky'),
  skyImage: document.querySelector('#sky-image'),
  resetButton: document.querySelector('#reset-city'),
};

const render = {
  temperature: () => {
    domElements.currentTemp.textContent = state.temperature;
  },
  tempBackgroundChange: (backgroundColor, landscape) => {
    console.log(backgroundColor);
    domElements.currentTemp.style.backgroundColor = backgroundColor;
    domElements.landscape.textContent = landscape;
  },
  cityName: () => {
    domElements.cityName.textContent = state.cityName;
  },
  skyImage: () => {
    domElements.skyImage.setAttribute("src", state.skyImageLink);
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
      lowerTemp: 80,
      color: 'red',
    },
    {
      upperTemp: 69,
      lowerTemp: 60,
      color: 'orange',
    },
    {
      upperTemp: 59,
      lowerTemp: 50,
      color: 'yellow',
    },
  ];
};


const setBackgroundColorLandscape = (temperature) => {
  if (temperature > 80) {
    state.tempBackgroundColor = 'red';
    state.landscape = '🌞🏖👙🏖👙🏖👙';
    return;
  }
  if (temperature > 70) {
    state.tempBackgroundColor = 'orange';
    state.landscape = '🌳🏞🌳🏞🌳🏞🌳';
    return;
  }
  if (temperature > 60) {
    state.tempBackgroundColor = 'yellow';
    state.landscape = '🌲🧥🌲🧥🌲🧥';
    return;
  }
  if (temperature > 50) {
    state.tempBackgroundColor = 'green';
    state.landscape = '🏔🏔🏔🏔🏔🏔';
    return;
  }
  if (temperature < 49) {
    state.tempBackgroundColor = 'blue';
    state.landscape = '☃❄☃❄☃❄';
    return;
  }

};

const setSkyImage = (skyCondition) => {
  if (skyCondition === 'Sunny') {
    state.skyImageLink = 'https://images.unsplash.com/photo-1615286628718-4a4c8924d0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    return;
  }
  if (skyCondition === 'Cloudy') {
    state.skyImageLink = 'https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80';
    return;
  }
  if (skyCondition === 'Rainy') {
    state.skyImageLink = 'https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
    return;
  }
  if (skyCondition === 'Snowy') {
    state.skyImageLink = 'https://images.unsplash.com/photo-1546023690-c2f8bcc37189?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80';
    return;
  }
};

const increaseTemp = () => {
  state.temperature += 1;
  // Ask about the temperature change
  weatherChange(state.temperature);
  render.temperature();
};

const decreaseTemp = () => {
  state.temperature -= 1;
  // Ask about the temperature change
  weatherChange(state.temperature);
  render.temperature();
};

const updateTemp = () => {
  state.temperature = domElements.slider.value;
  setBackgroundColorLandscape(state.temperature);
  render.temperature();
  render.tempBackgroundChange(state.tempBackgroundColor, state.landscape);
};

const updateCityName = () => {
  state.cityName = `City: ${domElements.cityNameInput.value}`;
  render.cityName();
};

const updateSky = () => {
const skyCondition = domElements.skySelect.options[domElements.skySelect.selectedIndex].textContent;
setSkyImage(skyCondition);
console.log(domElements.skySelect.options[domElements.skySelect.selectedIndex]);
console.log(domElements.skySelect.options[domElements.skySelect.selectedIndex].textContent);

render.skyImage();
};

const resetCity = () => {
  state.cityName = 'City:';
  domElements.cityNameInput.value='';
  render.cityName();
}


const registerEventHandlers = () => {
  // const increaseTempButton = document.querySelector("#increaseTemp");
  // increaseTempButton.addEventListener("click", increaseTemp);
  // const decreaseTempButton = document.querySelector("#decreaseTemp");
  // decreaseTempButton.addEventListener("click", decreaseTemp);
  const changeTempSlider = document.querySelector('#slider');
  changeTempSlider.addEventListener('input', updateTemp);

  const cityNameInput = document.querySelector('#city-name-input');
  cityNameInput.addEventListener('keyup', updateCityName);

  const skySelect = document.querySelector('#choose-sky');
  skySelect.addEventListener('change', updateSky);

  const resetButton = document.querySelector('#reset-city');
  resetButton.addEventListener('click', resetCity);
};


// const axios = require('axios');
const makeApiCallUsingAsync = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/location', {
      params: {  
        q: 'New York',
      },
    });
    // Code which normally appears in the `then` block.
    console.log(response.data);
  } catch (error) {
    // Code which normally appears in the `catch` block.
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

makeApiCallUsingAsync();



  

// document.body.style.backgroundColor = "navy";

// function changeColour () {
//   let red = document.getElementById('rangeRed').value;
//   let blue = document.getElementById('rangeBlue').value;
//   let green = document.getElementById('rangeGreen').value;
//   // let blue = document.getElementById('rangeRed').value;
//   let orange = document.getElementById('rangeRed').value;
// }


// axios
//   .get('https://us1.locationiq.com/v1/search.php')
//   .then((response) => {
//     console.log('SUCCESS');

//   })
//   .catch((error) => {
//     console.log('ERROR');

//   });





  // axios
  // .get('https://api.openweathermap.org/data/2.5/onecall')
  // .then((response) => {
  //   console.log('SUCCESS');

  // })
  // .catch((error) => {
  //   console.log('ERROR');

  // });
  