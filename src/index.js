const state = {
  temp: 50,
};

const colorTempChange = (temp) => {
  if (temp >= 80) {
    tempDisplay.classList.add('tempRed');
  } else if (temp >= 70) {
    tempDisplay.classList.add('tempOrange');
  } else if (temp >= 60) {
    tempDisplay.classList.add('tempYellow');
  } else if (temp >= 50) {
    tempDisplay.classList.add('tempGreen');
  } else if (temp < 50) {
    tempDisplay.classList.add('tempTeal');
  }
};

const increaseTemp = () => {
  state.temp += 1;
  const tempDisplay = document.querySelector('#tempValue');
  tempDisplay.textContent = `${state.temp}`;
};

const decreaseTemp = () => {
  state.temp -= 1;
  const tempDisplay = document.querySelector('#tempValue');
  tempDisplay.textContent = `${state.temp}`;
};

const registerEventHandlers = () => {
  const upArrow = document.querySelector('#increaseTemp');
  const downArrow = document.querySelector('#decreaseTemp');
  upArrow.addEventListener('click', increaseTemp);
  downArrow.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
