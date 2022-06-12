//temperature====================================

//temperature starting state
const state = {
  currentTemp: 0,
};

//increase temperature behavior
const addTemp = () => {
  state.currentTemp += 1;
  const currentTempContainer = document.querySelector('.currentTemp');
  currentTempContainer.textcontent = `${state.currentTemp}`;
};

//decrease temperature behavior
const subtractTemp = () => {
  state.currentTemp -= 1;
  const currentTempContainer = document.querySelector('.currentTemp');
  currentTempContainer.textcontent = `${state.currentTemp}`;
};

//register events
const registerEventHandlers = () => {
  //retrive from doc
  const upArrow = document.querySelector('.up-arrow');
  const downArrow = document.querySelector('.down-arrow');

  //attach event
  upArrow.addEventListener('click', addTemp);
  downArrow.addEventListener('click', subtractTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
