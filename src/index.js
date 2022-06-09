// The state object is designed to be on global scope and helps us track anything we want to change after our page is loaded. We can add and use its key:value pairs in any fx
const state = {
  temp: parseInt(document.getElementById('fahrenheit').innerHTML),
};

const setTemp = () => {
  const upButton = document.getElementById('up-button');
  const downButton = document.getElementById('down-button');
  const tempContainer = document.getElementById('fahrenheit');

  upButton.addEventListener('click', () => {
    state.temp += 1;
    console.log('add one');
    tempContainer.textContent = `${state.temp}`;
  });
  downButton.addEventListener('click', () => {
    state.temp -= 1;
    console.log('subtract one');
    tempContainer.textContent = `${state.temp}`;
  });
};
document.addEventListener('DOMContentLoaded', setTemp);
