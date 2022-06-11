let currentTemp = 41; //is could be hardcoded?

const newTemp = (currentTemp) => {
  let temperatureValue = document.getElementById('currentTemp');
  temperatureValue.textContent = currentTemp;
  tempTextColor(currentTemp);
  tempGround(currentTemp);
};

const upTemp = () => {
  currentTemp += 1;
  newTemp(currentTemp);
};

const downTemp = () => {
  currentTemp -= 1;
  newTemp(currentTemp);
};

const tempTextColor = (currentTemp) => {
  const tempContainer = document.getElementById('currentTemp');
  if (currentTemp >= 80) {
    textColor = 'red';
  } else if (currentTemp >= 70) {
    textColor = 'orange';
  } else if (currentTemp >= 60) {
    textColor = 'yellow';
  } else if (currentTemp >= 50) {
    textColor = 'green';
  } else if (currentTemp <= 59) {
    textColor = 'teal';
  }
  tempContainer.className = textColor;
};

const tempGround = (currentTemp) => {
  // let temperatureValue = document.getElementById('currentTemp').textContent;
  // let temperatureContainer = document.getElementById('currentTemp');
  // console.log(temperatureValue);
  // console.log(temperatureContainer);

  let gardenBottomValue = document.getElementById('ground').textContent;
  let gardenBottomValueContainer = document.getElementById('ground');
  console.log(gardenBottomValue);
  console.log(gardenBottomValueContainer);

  if (currentTemp > 80) {
    // temperatureContainer.className = 'red';
    gardenBottomValueContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    console.log(temperatureContainer);
  } else if (currentTemp >= 70) {
    // temperatureContainer.className = 'orange';
    gardenBottomValueContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60) {
    // temperatureContainer.className = 'yellow';
    gardenBottomValueContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (currentTemp >= 50) {
    // temperatureContainer.className = 'green';
    gardenBottomValueContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (currentTemp <= 49) {
    // temperatureContainer.className = 'teal';
    gardenBottomValueContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const newCity = () => {
  const cityValue = document.getElementById('cname').value;
  const headerCity = document.getElementById('city-name');
  headerCity.textContent = cityValue;
};

const registerEventHandlers = () => {
  const newCityUpdate = document.getElementById('cname');
  newCityUpdate.addEventListener('input', newCity);

  newTemp(currentTemp);

  const upButton = document.querySelector('#upArrow');
  upButton.addEventListener('click', upTemp);
  // upButton.addEventListener('click', tempColor);

  const downButton = document.querySelector('#downArrow');
  downButton.addEventListener('click', downTemp);
  // downButton.addEventListener('click', tempColor);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Temperature (F)	Color
// 80+	Red
// 70-79	Orange
// 60-69	Yellow
// 50-59	Green
// 49 or below	Teal

// if (document.readyState !== 'loading') {
//   newTemp();
//   upTemp();
//   downTemp = ()
// } else {
//   document.addEventListener('DOMContentLoaded', newTemp);
//   document.addEventListener('DOMContentLoaded', upTemp);
// document.addEventListener('DOMContentLoaded', downTemp);
// }
