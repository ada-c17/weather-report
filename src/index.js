const temp = {
  fahrenheit: 55,
};

const increaseTemp = () => {
  temp.fahrenheit += 1;
};

const decreaseTemp = () => {
  temp.fahrenheit -= 1;
};

const getTemp = () => {
  const tempUl = document.getElementById('tempDisplay');
  const tempLi = document.createElement('li');
  tempLi.textContent = temp.fahrenheit;

  tempUl.appendChild(tempLi);
};

if (document.readyState !== 'loading') {
  getTemp();
} else {
  document.addEventListener('DOMContentLoaded', getTemp);
}
