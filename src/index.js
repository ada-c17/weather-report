// The state object is designed to be on global scope and helps us track anything we want to change after our page is loaded. We can add and use its key:value pairs in any fx
const state = {
  temp: parseInt(document.getElementById('fahrenheit').innerHTML),
};

const setTemp = () => {
  const upButton = document.getElementById('up-button');
  const downButton = document.getElementById('down-button');
  const tempContainer = document.getElementById('fahrenheit');

  upButton.addEventListener('click', () => {
    state.temp += 1;
    console.log('add one');
    changeGarden();
    changeTempColor(state.temp, tempContainer);
    tempContainer.textContent = `${state.temp}`;
  });
  downButton.addEventListener('click', () => {
    state.temp -= 1;
    console.log('subtract one');
    changeGarden();
    changeTempColor(state.temp, tempContainer); 
    tempContainer.textContent = `${state.temp}`;
  });
};
document.addEventListener('DOMContentLoaded', setTemp);

const changeGarden = () => {
  const landscape = document.querySelector('#landscape')

  if (state.temp >= 80) {
    landscape.textContent = '🌵🌞🌊🐍🦂🌵🌞🌊🐍🏜'
  } else if (state.temp < 80 && state.temp >= 70) {
    landscape.textContent = '🌸🌿🌼🌷🌻🌿🌱🌻🌷'
  } else if (state.temp < 70 && state.temp >= 60) {
    landscape.textContent = '🌾🌾🍃🪨🛤🌾🌾🌾🍃'
  } else {
    landscape.textContent = '🌲⛄️🌲⛄️🍂🌲🍁🌲⛄️🍂🌲'
  }
}

const changeTempColor = (temp, text) => {
  if (temp >= 80) {
    text.style.color = 'red'
  } else if (temp < 80 && temp >= 70) {
    text.style.color = 'orange'
  } else if (temp < 70 && temp >= 60) {
    text.style.color = 'yellow'
  } else if (temp < 60 && temp >= 50){
    text.style.color = 'green'
  } else {
    text.style.color = 'blue'
  }
}

