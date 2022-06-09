const state = {
  temperature: 75,
};

const getNewColor = () => {
  let color;
  if (state.temperature > 90) {
    color = '#c63338';
  } else if (state.temperature >= 75 && state.temperature < 90) {
    color = '#F5B070';
  } else if (state.temperature >= 65 && state.temperature < 75) {
    color = '#efe06a';
  } else if (state.temperature >= 40 && state.temperature < 60) {
    color = '#669943';
  } else if (state.temperature <= 39) {
    color = '#6ea5b5';
  }
  return color;
};

const getTempAndChangeStyle = () => {
  const tempValue = document.getElementById('temp');
  tempValue.textContent = `${state.temperature}°F`;
  let newColor = getNewColor();
  tempValue.style.color = newColor;
};

const getNewLandscape = () => {
  let image;
  if (state.temperature >= 80) {
    image = 'images/80.png';
  } else if (state.temperature >= 60 && state.temperature < 80) {
    image = 'images/60.png';
  } else if (state.temperature >= 40 && state.temperature < 60) {
    image = 'images/40.png';
  } else if (state.temperature <= 39) {
    image = 'images/39.png';
  }
  return image;
};
const changeLandscape = () => {
  const landscape = document.getElementById('landscape');
  let newLandscape = getNewLandscape();
  landscape.setAttribute('src', newLandscape);
};

const decreaseTemp = () => {
  state.temperature -= 1;
  getTempAndChangeStyle();
  changeLandscape();
};

const increaseTemp = () => {
  state.temperature += 1;
  getTempAndChangeStyle();
  changeLandscape();
};

const registerEventHandlers = () => {
  const leftArrow = document.getElementById('left-arrow');
  leftArrow.addEventListener('click', decreaseTemp);

  const rightArrow = document.getElementById('right-arrow');
  rightArrow.addEventListener('click', increaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
