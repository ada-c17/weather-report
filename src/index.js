const state = {
  skyCondition: document.querySelector('#sky'),
};
console.log(document.getElementById('select-sky-box').value);
// console.log(state.skyCondition);
// console.log(document.getElementsByClassName('.sky'));

const changeSky = () => {
  if (document.getElementById('select-sky-box').value === 'sunny') {
    state.skyCondition.style.background =
      "url('/assets/sky/sunny 1920x360.jpg')";
  } else if (document.getElementById('select-sky-box').value === 'rainy') {
    state.skyCondition.style.background =
      "url('/assets/sky/rainy 1920x360.jpg')";
  } else if (document.getElementById('select-sky-box').value === 'cloudy') {
    state.skyCondition.style.background =
      "url('/assets/sky/cloudy 1920x360.jpg')";
  } else if (document.getElementById('select-sky-box').value === 'snowy') {
    state.skyCondition.style.background =
      "url('/assets/sky/snowy 1920x360.jpg')";
  }
};

const registerEventHandlers = () => {
  const makeSkyChange = document.getElementById('select-sky-box');
  makeSkyChange.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
