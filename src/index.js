const temp = {
  fahrenheit: 55,
};

const getTemp = () => {
  const tempUl = document.getElementById('tempDisplay');
  const tempLi = document.createElement('li');
  tempLi.textContent = temp.fahrenheit;
  tempUl.appendChild(tempLi);

  const upUl = document.getElementById('increaseTempButton');
  const upLi = document.createElement('li');
  upLi.textContent = '⬆️';
  upLi.addEventListener('click', () => {
    tempLi.textContent = temp.fahrenheit += 1;
  });
  upUl.appendChild(upLi);

  const downUl = document.getElementById('decreaseTempButton');
  const downLi = document.createElement('li');
  downLi.textContent = '⬇️';
  downLi.addEventListener('click', () => {
    tempLi.textContent = temp.fahrenheit -= 1;
  });
  downUl.appendChild(downLi);
};

if (document.readyState !== 'loading') {
  getTemp();
} else {
  document.addEventListener('DOMContentLoaded', getTemp);
}
