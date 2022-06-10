const temp = {
  fahrenheit: 55,
};
const tempCheck = (element) => {
//   let landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  if (element.textContent >= 80) {
    element.className = 'veryHot';
    // landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (element.textContent >= 70) {
    element.className = 'hot';
    // landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (element.textContent >= 60) {
    element.className = 'warm';
    // landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
  } else if (element.textContent >= 50) {
    element.className = 'cool';
    // landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  } else {
    element.className = 'cold';
    // landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }
};

const cityNameReset = () => {
    
}

const getTemp = () => {
  const tempUl = document.getElementById('tempDisplay');
  const tempLi = document.createElement('li');
  tempLi.textContent = temp.fahrenheit;
  tempUl.appendChild(tempLi);
  tempCheck(tempLi);

  const upUl = document.getElementById('increaseTempButton');
  const upLi = document.createElement('li');
  upLi.textContent = '⬆️';
  upLi.addEventListener('click', () => {
    tempLi.textContent = temp.fahrenheit += 1;
    tempCheck(tempLi);
  });
  upUl.appendChild(upLi);

  const downUl = document.getElementById('decreaseTempButton');
  const downLi = document.createElement('li');
  downLi.textContent = '⬇️';
  downLi.addEventListener('click', () => {
    tempLi.textContent = temp.fahrenheit -= 1;
    tempCheck(tempLi);
  });
  downUl.appendChild(downLi);
};

if (document.readyState !== 'loading') {
  getTemp();
} else {
  document.addEventListener('DOMContentLoaded', getTemp);
}
