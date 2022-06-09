const state = {
  tempChange: 68,
};

const updateColor = (temperature) => {
  let color;
  if (temperature >= 80) {
    color = 'red';
  } else if (70 <= temperature && temperature <= 79) {
    color = 'orange';
  } else if (60 <= temperature && temperature <= 69) {
    color = 'yellow';
  } else if (50 <= temperature && temperature <= 59) {
    color = 'green';
  } else {
    color = 'blue';
  }
  return color;
};

const updateImage = () => {
  const newImage = document.querySelector('#landscape');
  let name;
  let description;
  if (state.tempChange >= 80) {
    name = 'ada-project-docs/assets/hot_day.jpeg';
    description = 'a desert';
  } else if (70 <= state.tempChange && state.tempChange <= 79) {
    name = 'ada-project-docs/assets/sunny_day.jpeg';
    description = 'a sunny day';
  } else if (60 <= state.tempChange && state.tempChange <= 69) {
    name = 'ada-project-docs/assets/cloudy_day.jpeg';
    description = 'a cloudy day';
  } else {
    name = 'ada-project-docs/assets/snowy_day.jpeg';
    description = 'a snowy day';
  }
  newImage.src = name;
  newImage.alt = description;
};

const updateTemperature = () => {
  const updateTempElement = document.querySelector('#updateTemperature');
  updateTempElement.textContent = state.tempChange;
  updateTempElement.style.color = updateColor(state.tempChange);
};

const updateCity = () => {
  const updateCityElement = document.querySelector('#headerCity');
  const inputCity = document.querySelector('#inputCity');
  updateCityElement.textContent = inputCity.value;
};

const increaseTemp = () => {
  state.tempChange += 1;
  updateTemperature();
  updateImage();
};

const decreaseTemp = () => {
  state.tempChange -= 1;
  updateTemperature();
  updateImage();
};

const registerEventHandlers = () => {
  const increaseButton = document.querySelector('#increaseButton');
  increaseButton.addEventListener('click', increaseTemp);
  const decreaseButton = document.querySelector('#decreaseButton');
  decreaseButton.addEventListener('click', decreaseTemp);
  const submitCityButton = document.querySelector('#submitCityButton');
  submitCityButton.addEventListener('click', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
