console.log('Hello, World!');

const state = {
  temp: parseInt(document.getElementById('display-temp').innerHTML),
};

const changeTempColor = () => {
  const currentTemp = document.getElementById('display-temp');
  if (state.temp > 80) {
    currentTemp.style.color = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.color = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.color = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.color = 'green';
  } else if (state.temp <= 49) {
    currentTemp.style.color = 'teal';
  }
};

const changeTemp = () => {
  const currentTemp = document.getElementById('display-temp');
  const arrowUpButton = document.getElementById('arrow-up');
  const arrowDownButton = document.getElementById('arrow-down');
  arrowUpButton.addEventListener('click', () => {
    state.temp += 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
  });
  arrowDownButton.addEventListener('click', () => {
    state.temp -= 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
  });
};

document.addEventListener('DOMContentLoaded', changeTemp);
