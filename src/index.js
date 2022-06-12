'use strict';

const state = {
  temperature: 75,
};

//variables to target background
const background = document.getElementById('main-container');
background.style.width = '100%';
background.style.height = 'auto';

// TODO: Refactor
// increase temp, change text color, and background
const increaseTemp = () => {
  console.log(state.temperature);
  const tempContainer = document.getElementById('temp');
  state.temperature += 1;
  tempContainer.textContent = `${state.temperature}`;
  if (state.temperature >= 80) {
    tempContainer.style.color = 'red';
    // const background = document.getElementById('main-container');
    // background.style.width = '100%';
    // background.style.height = 'auto';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/desert_landscape.jpg')";
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    tempContainer.style.color = 'orange';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/spring_landscape.jpg')";
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    tempContainer.style.color = '#FFEA00';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/fall_landscape.jpg')";
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    tempContainer.style.color = '#50C878';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/winter_landscape.jpg')";
  } else {
    tempContainer.style.color = 'teal';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/winter_landscape.jpg')";
  }
};

// TODO: Refactor
// decrease temp, change text color, and background
const decreaseTemp = () => {
  const tempContainer = document.getElementById('temp');
  state.temperature -= 1;
  tempContainer.textContent = `${state.temperature}`;
  if (state.temperature >= 80) {
    tempContainer.style.color = 'red';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/desert_landscape.jpg')";
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    tempContainer.style.color = 'orange';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/spring_landscape.jpg')";
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    tempContainer.style.color = '#FFEA00';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/fall_landscape.jpg')";
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    tempContainer.style.color = 'green';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/winter_landscape.jpg')";
  } else {
    tempContainer.style.color = 'teal';
    background.style.backgroundImage =
      "url('ada-project-docs/assets/winter_landscape.jpg')";
  }
};

// change text to reflect search input
const updateCity = (event) => {
  const log = document.getElementById('city-name');
  log.textContent = event.target.value;
};

const registerEventHandlers = () => {
  const tempUp = document.getElementById('up-arrow');
  tempUp.addEventListener('click', increaseTemp);

  const tempDown = document.getElementById('down-arrow');
  tempDown.addEventListener('click', decreaseTemp);

  const input = document.querySelector('input');
  input.addEventListener('input', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
