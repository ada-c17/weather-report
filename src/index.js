console.log('Hello, World!');

const state = {
  temp: parseInt(document.getElementById('display-temp').innerHTML),
};

const changeTemp = () => {
  const currentTemp = document.getElementById('display-temp');
  const arrowUpButton = document.getElementById('arrow-up');
  const arrowDownButton = document.getElementById('arrow-down');
  arrowUpButton.addEventListener('click', () => {
    state.temp += 1;
    currentTemp.textContent = state.temp;
  });
  arrowDownButton.addEventListener('click', () => {
    state.temp -= 1;
    currentTemp.textContent = state.temp;
  });
};

document.addEventListener('DOMContentLoaded', changeTemp);
