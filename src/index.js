'use strict';
// const axios = require('axios');

const increaseTemp = () => {
  let temp = parseInt(document.getElementById('temp-value').textContent);
  temp++;
  document.getElementById('temp-value').textContent = temp;

  if (temp >= 80) {
  }
};

const decreaseTemp = () => {
  let temp = parseInt(document.getElementById('temp-value').textContent);
  temp--;
  document.getElementById('temp-value').textContent = temp;
};

const upEvent = () => {
  const upButton = document.getElementById('up-button');
  upButton.addEventListener('click', increaseTemp);
};

const downEvent = () => {
  const downButton = document.getElementById('down-button');
  downButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', upEvent);
document.addEventListener('DOMContentLoaded', downEvent);
