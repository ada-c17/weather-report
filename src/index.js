//temperature

//temperature starting state
const state = {
  currentTemp: 0,
};

//increase temperature behavior
const addTemp = () => {
  state.currentTemp += 1;
  const currentTempContainer = document.querySelector('#currentTemp');
  currentTempContainer.textcontent = `${state.currentTemp}`;
};

//register event
const registerEventHandlers = () => {
  const upArrow = document.querySelector('.up-arrow');
  upArrow.addEventListener('click', addTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
