'use strict';

const state = {
  temp: 75,
};

const increaseTemp = () => {
  state.temp += 1;
  const tempDisplay = document.getElementById('tempNum');
  tempDisplay.textContent = state.temp;
  tempDisplay.dispatchEvent(new Event('tempChange'));
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempDisplay = document.getElementById('tempNum');
  tempDisplay.textContent = state.temp;
  tempDisplay.dispatchEvent(new Event('tempChange'));
};

const changeTempClass = () => {
  const tempStyling = document.getElementsByClassName('tempStyled');
  if (state.temp >= 85) {
    for (let element of tempStyling) {
      element.className = 'tempStyled tooHot';
    }
  } else if (state.temp >= 75 && state.temp <= 84) {
    for (let element of tempStyling) {
      element.className = 'tempStyled warm';
    }
  } else if (state.temp >= 65 && state.temp <= 74) {
    for (let element of tempStyling) {
      element.className = 'tempStyled pleasant';
    }
  } else if (state.temp >= 55 && state.temp <= 64) {
    for (let element of tempStyling) {
      element.className = 'tempStyled mild';
    }
  } else if (state.temp >= 45 && state.temp <= 54) {
    for (let element of tempStyling) {
      element.className = 'tempStyled chilly';
    }
  } else if (state.temp >= 35 && state.temp <= 44) {
    for (let element of tempStyling) {
      element.className = 'tempStyled cold';
    }
  } else if (state.temp <= 34) {
    for (let element of tempStyling) {
      element.className = 'tempStyled tooCold';
    }
  }
};

const registerEventHandlers = (event) => {
  const tempUpButton = document.getElementById('tempUp');
  tempUpButton.addEventListener('click', increaseTemp);
  const tempDownButton = document.getElementById('tempDown');
  tempDownButton.addEventListener('click', decreaseTemp);
  const tempDisplay = document.getElementById('tempNum');
  tempDisplay.addEventListener('tempChange', changeTempClass);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
