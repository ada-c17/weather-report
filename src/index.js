const state = {
  temp: 79,
};

const tempIncrease = () => {
  state.temp += 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);
};

const tempDecrease = () => {
  state.temp -= 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
  changeTempColorAndGarden(state.temp);
};

const registerEventHandlers = () => {
  const tempIncreaseButton = document.querySelector('#increase');
  tempIncreaseButton.addEventListener('click', tempIncrease);
  const tempDecreaseButton = document.querySelector('#decrease');
  tempDecreaseButton.addEventListener('click', tempDecrease);
};

const changeTempColorAndGarden = (temperature) => {
  const tempContainer = document.querySelector('#temp');
  const landscapeEmojis = document.querySelector('#landscape');
  if (temperature > 79) {
    tempContainer.style.color = 'red';
    landscapeEmojis.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70 && temperature < 80) {
    tempContainer.style.color = 'orange';
    landscapeEmojis.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60 && temperature < 70) {
    tempContainer.style.color = 'yellow';
    landscapeEmojis.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50 && temperature < 60) {
    tempContainer.style.color = 'green';
    landscapeEmojis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature < 50) {
    tempContainer.style.color = 'white';
    landscapeEmojis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
