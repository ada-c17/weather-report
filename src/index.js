// function rn(from, to) {
//   return ~~(Math.random() * (to - from + 1)) + from;
// }

// function rs() {
//   return arguments[rn(1, arguments.length) - 1];
// }

// function boxShadows(max) {
//   let ret = [];
//   for (let i = 0; i < max; ++i) {
//     ret.push(`
//     ${rn(1, 100)}vw ${rn(1, 100)}vh ${rn(20, 40)}vmin ${rn(1, 20)}vmin
//     ${rs('#11cbd7', '#c6f1e7', '#f0fff3', '#fa4659')}
//     `);
//   }
//   return ret.join(',');
// }

// const cloud = document.querySelector('#cloud');
// function update() {
//   cloud.style.boxShadow = boxShadows(100);
// }

// window.addEventListener('load', update);
// document.addEventListener('click', update);

const state = {
  temp: 75,
};

//select elements with get the element by id
const currentTemp = document.getElementById('currentTemp');
const incrementButton = document.getElementById('increaseTempButton');
const decrementButton = document.getElementById('decreaseTempButton');
const seasonalChange = document.getElementById('seasonalChange');

const updateTemp = () => {
  currentTemp.textContent = state.temp;
  // alterTextColor()
};

const incrementTemp = () => {
  state.temp += 1;
  updateTemp();
  alterTextColor();
};

const decrementTemp = () => {
  state.temp -= 1;
  updateTemp();
  alterTextColor();
};

const registerEventHandlers = () => {
  incrementButton.addEventListener('click', incrementTemp);
  decrementButton.addEventListener('click', decrementTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const alterTextColor = () => {
  if (state.temp > 95) {
    console.log('changing to red');
    seasonalChange.innerText = '🔥';
    return (currentTemp.style.color = '#ec5766');
  } else if (state.temp >= 85) {
    console.log('changing to orange');
    seasonalChange.innerText = '🌊';
    return (currentTemp.style.color = '#fda187');
  } else if (state.temp >= 75) {
    console.log('changing to yellow');
    seasonalChange.innerText = '🌴';
    return (currentTemp.style.color = '#faf59e');
  } else if (state.temp >= 60) {
    seasonalChange.innerText = '🌷';
    console.log('changing to green');
    return (currentTemp.style.color = '#b4f9c0');
  } else if (state.temp >= 45) {
    seasonalChange.innerText = '🍂';
    console.log('changing to teal');
    return (currentTemp.style.color = '#5dac97');
  } else if (state.temp >= 30) {
    seasonalChange.innerText = '🌲';
    console.log('changing to blue');
    return (currentTemp.style.color = '#479aff');
  } else if (state.temp <= 29) {
    seasonalChange.innerText = '⛄';
    console.log('changing to ice blue');
    return (currentTemp.style.color = '#c2f6ff');
  }
  console.log('text color did not change');
};
