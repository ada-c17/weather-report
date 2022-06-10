'use strict';

const landscapes = {
  hot: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  warm: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  goldilocks: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  cool: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  cold: '❄️',
};

const weather = {
  temperature: 72,
};

const tempClass = (temp) => {
  if (temp > 87) {
    return 'hot';
  }
  if (temp > 77) {
    return 'warm';
  }
  if (temp > 67) {
    return 'goldilocks';
  }
  if (temp > 57) {
    return 'cool';
  }
  return 'cold';
};

const changeTemp = (e) => {
  console.log(e.target.id);
  e.target.id === 'heat' ? weather.temperature++ : weather.temperature--;
  document.querySelector('#temp-display h1').textContent = weather.temperature;
  document.getElementById('temp-display').classList = `${tempClass(
    weather.temperature
  )}`;
  document.querySelector('#landscape h1').textContent =
    landscapes[tempClass(weather.temperature)];
};

const registerEventHandlers = () => {
  const controls = document.getElementsByClassName('temp-control');
  for (const control of controls) {
    control.addEventListener('click', changeTemp);
  }
  // document.getElementById("cool").addEventListener("click",decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
