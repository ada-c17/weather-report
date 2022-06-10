'use strict';
// const axios = require('axios');

const tempColor = (temp) => {
	if (temp >= 80) {
		document.getElementById('temp-value').style.color = "red";
  } else if (temp >= 70 && temp <= 79) {
		document.getElementById('temp-value').style.color = "orange";
	} else if (temp >= 60 && temp <= 69) {
		document.getElementById('temp-value').style.color = "yellow";
	} else if (temp >= 50 && temp <= 59) {
		document.getElementById('temp-value').style.color = "green";
	} else {
	document.getElementById('temp-value').style.color = "teal";
	}
}

const landscapeChange = (temp) => {
	if (temp >= 80) {
		document.getElementById('landscape').textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (temp >= 70 && temp <= 79) {
		document.getElementById('landscape').textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
	} else if (temp >= 60 && temp <= 69) {
		document.getElementById('landscape').textContent = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`; 
	} else {
		document.getElementById('landscape').textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
	}
}

const increaseTemp = () => {
  let temp = parseInt(document.getElementById('temp-value').textContent);
  temp++;
  document.getElementById('temp-value').textContent = temp;
	tempColor(temp);
	landscapeChange(temp);
};

const decreaseTemp = () => {
  let temp = parseInt(document.getElementById('temp-value').textContent);
  temp--;
  document.getElementById('temp-value').textContent = temp;
	tempColor(temp);
	landscapeChange(temp);
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
