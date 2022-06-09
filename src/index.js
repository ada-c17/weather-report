const temp = {
  fahrenheit: 55,
};
const tempCheck = (element) => {
  if (element.textContent >= 80) {
    element.className = 'veryHot';
  } else if (element.textContent >= 70) {
    element.className = 'hot';
  } else if (element.textContent >= 60) {
    element.className = 'warm';
  } else if (element.textContent >= 50) {
    element.className = 'cool';
  } else {
    element.className = 'cold';
  }
};

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
