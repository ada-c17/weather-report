const setTemp = () => {
  let displayedTemp = document.getElementById('fahrenheit').innerHTML;
  const upButton = document.getElementById('up-button');
  const downButton = document.getElementById('down-button');
  const tempContainer = document.getElementById('fahrenheit');
  const state = {
    temp: parseInt(displayedTemp),
  };
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
