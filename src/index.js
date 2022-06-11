'use strict';
const state = {
  temp: 0,
};
function rangeSlide(value) {
  document.getElementById('rangeValue').textContent = value;
  // onChange="rangeSlide(this.value)" onmousemove="rangeSlide(this.value)"
}

// function skyClick(event) {
//   // event.target.style.display = 'none';
//   const skySelect = document.getElementById('skySelect');
//   // skySelect.style.display = 'flex';
//   skySelect.click();
// }

const tempChange = () => {
  if (state.temp >= 80) {
    console.log(state.temp);
  }
};

function skyChange(event) {
  const skyButton = document.getElementById('skyButton');
  document.body.style.backgroundColor = event.target.value;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('skySelect').addEventListener('change', skyChange);
  const tempSlider = document.getElementById('range');
  tempSlider.addEventListener('change', tempChange);
  // tempSlider.addEventListener('change', rangeSlide);
});
