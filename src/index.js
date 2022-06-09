const temp = {
  fahrenheit: 55,
};

const increaseTemp = () => {
  temp += 1;
};

const decreaseTemp = () => {
  temp.fahrenheit -= 1;
};

const getTemp = () => {
  const tempUl = document.getElementById('tempDisplay');
  const tempLi = document.createElement('li');
  tempLi.textContent = temp.fahrenheit;
  tempUl.appendChild(tempLi);

  const upUl = document.getElementById('increaseTempButton');
  const upLi = document.createElement('li');
  upLi.textContent = '⬆️';
  upLi.addEventListener('click', increaseTemp);
  upUl.appendChild(upLi);
};

if (document.readyState !== 'loading') {
  getTemp();
} else {
  document.addEventListener('DOMContentLoaded', getTemp);
}
