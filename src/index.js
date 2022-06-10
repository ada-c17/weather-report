let currentTemp = 41; //is could be hardcoded?

const newTemp = (currentTemp) => {
  let temperatureValue = document.getElementById('currentTemp');
  temperatureValue.textContent = currentTemp;
};

const upTemp = () => {
  currentTemp += 1;
  newTemp(currentTemp);
};

const downTemp = () => {
  currentTemp -= 1;
  newTemp(currentTemp);
};

const registerEventHandlers = () => {
  const upButton = document.querySelector('#upArrow');
  const downButton = document.querySelector('#downArrow');
  upButton.addEventListener('click', upTemp);
  downButton.addEventListener('click', downTemp);
  upButton.addEventListener('click', tempColor);
  downButton.addEventListener('click', tempColor);
};

const tempColor = () => {
  let temperatureValue = document.getElementById('currentTemp').textContent;
  console.log(temperatureValue);
  let temperatureContainer = document.getElementById('currentTemp');
  console.log(temperatureContainer);
  // temperatureContainer.className = 'green';
  // console.log(temperatureContainer);

  if (temperatureValue > 80) {
    temperatureContainer.className = 'red';
    console.log(temperatureContainer);
  } else if (temperatureValue >= 70 && temperatureValue <= 79) {
    temperatureContainer.className = 'orange';
  } else if (temperatureValue >= 60 && temperatureValue <= 69) {
    temperatureContainer.className = 'yellow';
  } else if (temperatureValue >= 50 && temperatureValue <= 59) {
    temperatureContainer.className = 'green';
  } else if (temperatureValue <= 49) {
    temperatureContainer.className = 'teal';
  }
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
newTemp(currentTemp);

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
