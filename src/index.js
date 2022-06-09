const state = {
  temp: 50,
};

const colorTempChange = () => {
  let temp = state.temp;
  let color = 'tempRed';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (temp >= 80) {
    color = 'tempRed';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    color = 'tempOrange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    color = 'tempYellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    color = 'tempGreen';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp < 50) {
    color = 'tempTeal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const tempDisplay = document.querySelector('#tempValue');
  tempDisplay.textContent = `${state.temp}`;
  tempDisplay.className = color;
  const gardenLandscape = document.querySelector('#garden');
  gardenLandscape.textContent = landscape;
};

const increaseTemp = () => {
  state.temp += 1;
  colorTempChange();
};

const decreaseTemp = () => {
  state.temp -= 1;
  colorTempChange();
};

const registerEventHandlers = () => {
  const upArrow = document.querySelector('#increaseTemp');
  const downArrow = document.querySelector('#decreaseTemp');
  upArrow.addEventListener('click', increaseTemp);
  downArrow.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
