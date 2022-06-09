'use strict';

const state = {
  temp: 75,
};

const tempVariations = [
  {
    lowestTemp: 85,
    garden: '🌴  🌴  🦜 🪨   🌵  🌵  🪨   🥥 🌴  🌺   🌵 🪨',
    className: 'tempStyled tooHot',
  },
  {
    lowestTemp: 75,
    garden: '🌳 🌱 🌷 🌷 🌱 🌳  🌳 🌱 🌻 🌷 🌱 ⚽️  🌳 🌱 🐿 🌱',
    className: 'tempStyled warm',
  },
  {
    lowestTemp: 65,
    garden: '🌳 🦉 🍃 🌳 🌳 🌳 🍃 🌹 🌹 🌿 🌿 🌹 🌹 🍃 🌳 🍃 🌳',
    className: 'tempStyled pleasant',
  },
  {
    lowestTemp: 55,
    garden: '🌲 🍄 🍃  🌳 🍃 🦝 🌳  🥀 🥀  🌲 🌲 🍂   🌾 🌾 🌾',
    className: 'tempStyled mild',
  },
  {
    lowestTemp: 45,
    garden: '🌲 🍂 🪵 🪵 🍂  🍁 🍁  🌲 🌲 🦌 🌲 🍄  🌲 🌲 🌲 🪵',
    className: 'tempStyled chilly',
  },
  {
    lowestTemp: 35,
    garden: '🌲 🌲 🌲 🦃 🌲 🌲   🪨     🌲 🌲 🪵 🪵 🌲 🌲 🪨',
    className: 'tempStyled cold',
  },
  {
    garden: '🌲 🌲 🌲  ❄️ ❄️ ⛄️ ❄️ ⛄️ ❄️ ❄️ 🌲 🌲 ❄️ ❄️ 🌲 ❄️ ❄️ 🌲 🌲',
    className: 'tempStyled tooCold',
  },
];

let tempUpButton;
let tempDownButton;
let tempDisplay;
let gardenDisplay;

const increaseTemp = () => {
  state.temp += 1;
  tempDisplay.textContent = `${state.temp}°F`;
  changeTempClass();
};

const decreaseTemp = () => {
  state.temp -= 1;
  tempDisplay.textContent = `${state.temp}°F`;
  changeTempClass();
};

const changeTempClass = () => {
  let tempClassInfo;
  for (let i = 0; i < tempVariations.length - 1; i++) {
    if (state.temp >= tempVariations[i].lowestTemp) {
      tempClassInfo = tempVariations[i];
      break;
    }
  }
  if (!tempClassInfo) {
    tempClassInfo = tempVariations.at(-1);
  }

  tempDisplay.className = tempClassInfo.className;
  gardenDisplay.className = tempClassInfo.className;
  gardenDisplay.textContent = tempClassInfo.garden;
};

const lookUpElements = () => {
  tempUpButton = document.getElementById('tempUp');
  tempDownButton = document.getElementById('tempDown');
  tempDisplay = document.getElementById('tempNum');
  gardenDisplay = document.getElementById('garden');
};

const registerEventHandlers = () => {
  tempUpButton.addEventListener('click', increaseTemp);
  tempDownButton.addEventListener('click', decreaseTemp);
};

const initializePage = () => {
  lookUpElements();
  registerEventHandlers();
};

document.addEventListener('DOMContentLoaded', initializePage);
