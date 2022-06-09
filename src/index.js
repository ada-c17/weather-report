const raiseTemp = () => {
  const temperature = document.getElementById('display-temp');
  temperature.innerText++;
  changeTempColor();
  changeLandscape();
};

const lowerTemp = () => {
  const temperature = document.getElementById('display-temp');
  temperature.innerText--;
  changeTempColor();
  changeLandscape();
};

const changeTempColor = () => {
  const temperature = document.getElementById('display-temp');
  if (temperature.innerText >= 80) {
    temperature.style.color = 'red';
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    temperature.style.color = 'orange';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    temperature.style.color = 'yellow';
  } else if (temperature.innerText >= 50 && temperature.innerText <= 59) {
    temperature.style.color = 'green';
  } else {
    temperature.style.color = 'teal';
  }
};

const changeLandscape = () => {
  const temperature = document.getElementById('display-temp'); // should I be using const or let - since it changes?
  let landscape = document.getElementById('landscape');
  if (temperature.innerText >= 80) {
    landscape.textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    landscape.textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    landscape.textContent = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
  } else {
    landscape.textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  }
};

const updateCityName = () => {
  let currentCityName = document.getElementById('city-name-display'); // where city name is currently displayed
  let cityNameUserInput = document.getElementById('city-name').value; // should give value of input
  currentCityName.textContent = cityNameUserInput;
};

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('adjust-temp-up');
  const decreaseTemp = document.getElementById('adjust-temp-down');
  const input = document.querySelector('input');
  increaseTemp.addEventListener('click', () => {
    raiseTemp();
  });
  decreaseTemp.addEventListener('click', () => {
    lowerTemp();
  });
  input.addEventListener('keyup', () => {
    updateCityName();
  });
};

// document.addEventListener('DOMContentLoaded', registerEventHandlers);
