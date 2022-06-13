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

//change city display
const cityDisplay = () => {
  let currentCityContainer = document.querySelector('.cityDisplay');
  currentCityContainer.innerHTML = document.querySelector('.textBox').value;
  document.querySelector('.textBox').value = '';
};

const refreshCity = () => {
  document.querySelector('.cityDisplay').style.display = 'none';
};

//register events
const registerEventHandlers = () => {
  //retrive from doc
  const upArrow = document.querySelector('#upArrow');
  const downArrow = document.querySelector('#downArrow');
  const searchBtn = document.querySelector('.searchIcon');
  const refreshBtn = document.querySelector('.refreshBtn');

  //attach event
  upArrow.addEventListener('click', addTemp);
  downArrow.addEventListener('click', subtractTemp);
  searchBtn.addEventListener('click', cityDisplay);
  refreshBtn.addEventListener('click', refreshCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
