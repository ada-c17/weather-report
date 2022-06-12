const rangeElement = document.getElementById('range');
rangeElement.addEventListener('input', rangeSlide);
function rangeSlide(event) {
  const value = event.currentTarget.value;
  document.getElementById('rangeValue').textContent = value;
}

const inputBox = document.getElementById('city');

inputBox.onkeyup = function () {
  document.getElementById('city-name').innerHTML = inputBox.value;
};
const input = document.getElementById('range');
input.addEventListener('input', (event) => {
  if (input.value >= 80) {
    document.getElementById('city-circle').style.background = 'red';
    document.getElementById('temp-circle').style.background = 'red';
    document.getElementById('sky-circle').style.background = 'red';
    document.getElementById('weather').style.color = 'red';
  } else if (input.value < 80 && input.value >= 70) {
    document.getElementById('city-circle').style.background = 'purple';
    document.getElementById('temp-circle').style.background = 'purple';
    document.getElementById('sky-circle').style.background = 'purple';
    document.getElementById('weather').style.color = 'purple';
  } else if (input.value < 70 && input.value >= 60) {
    document.getElementById('city-circle').style.background = 'yellow';
    document.getElementById('temp-circle').style.background = 'yellow';
    document.getElementById('sky-circle').style.background = 'yellow';
    document.getElementById('weather').style.color = 'yellow';
  } else if (input.value < 60 && input.value >= 50) {
    document.getElementById('city-circle').style.background = 'green';
    document.getElementById('temp-circle').style.background = 'green';
    document.getElementById('sky-circle').style.background = 'green';
    document.getElementById('weather').style.color = 'green';
  } else if (input.value < 50) {
    document.getElementById('city-circle').style.background = 'teal';
    document.getElementById('temp-circle').style.background = 'teal';
    document.getElementById('sky-circle').style.background = 'teal';
  }
});

// const tempChange = () => {
//   if (state.temp >= 80) {
//     console.log(state.temp);
//   }
// };

function skyChange(event) {
  const skyButton = document.getElementById('skyButton');
  document.body.style.backgroundColor = event.target.value;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('skySelect').addEventListener('change', skyChange);
  // const tempSlider = document.getElementById('range');
  // tempSlider.addEventListener('change', tempChange);
});
