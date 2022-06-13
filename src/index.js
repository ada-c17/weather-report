//temperature====================================

//temperature starting state
const state = {
  currentTemp: 0,
};

//increase temperature behavior
const addTemp = () => {
  state.currentTemp += 1;
  let currentTempContainer = document.querySelector('#currentTemp');
  currentTempContainer.innerHTML = `${state.currentTemp}`;
  changeTempColor();
};

//decrease temperature behavior
const subtractTemp = () => {
  state.currentTemp -= 1;
  let currentTempContainer = document.querySelector('#currentTemp');
  currentTempContainer.innerHTML = `${state.currentTemp}`;
  changeTempColor();
};
//change temperature color
const changeTempColor = () => {
  if (state.currentTemp >= 80) {
    document.querySelector('.temperature').style.background = 'red';
    changeLandScape('#hot');
  } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
    document.querySelector('.temperature').style.background = 'orange';
    changeLandScape('#warm');
  } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
    document.querySelector('.temperature').style.background = 'yellow';
    changeLandScape('#windy');
  } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
    document.querySelector('.temperature').style.background = 'green';
    changeLandScape('#cold');
  } else {
    document.querySelector('.temperature').style.background = 'Teal';
    changeLandScape('#cold');
  }
};

//change landscape
const changeLandScape = (query) => {
  const weatherChildren = document.querySelector('.weather').children;

  for (let child = 0; child < weatherChildren.length; child++) {
    weatherChildren[child].style.display = 'none';
  }
  document.querySelector(query).style.display = 'inline';
};

//register events
const registerEventHandlers = () => {
  //retrive from doc
  const upArrow = document.querySelector('#upArrow');
  const downArrow = document.querySelector('#downArrow');

  //attach event
  upArrow.addEventListener('click', addTemp);
  downArrow.addEventListener('click', subtractTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
