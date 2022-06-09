console.log('conneted');

const temperature = document.querySelector('#temp-value');
const landscape = document.querySelector('#temp-display');

const getEffectByTempRange = (effects) => {
  const value = parseInt(temperature.innerText);
  let effect;
  switch (true) {
    case value <= 59:
      effect = effects[0];
      break;
    case value <= 69:
      effect = effects[1];
      break;
    case value <= 79:
      effect = effects[2];
      break;
    default:
      effect = effects[3];
  }
  return effect;
};

const changeTempTextColor = () => {
  const colors = ['green', 'yellow', 'orange', 'red'];
  const color = getEffectByTempRange(colors);
  temperature.style.color = color;
};

const changeLandscape = () => {
  const imgs = [
    './assets/winter.jpg',
    './assets/fall.jpg',
    './assets/spring.jpg',
    './assets/summer.jpg',
  ];
  const img = getEffectByTempRange(imgs);
  landscape.style.backgroundImage = `url(${img})`;
};

const decreaseButton = document.querySelector('#temp-down');
decreaseButton.addEventListener('click', () => {
  let value = parseInt(temperature.innerText);
  temperature.innerText = value - 1;
  changeTempTextColor();
  changeLandscape();
});

const increaseButton = document.querySelector('#temp-up');
increaseButton.addEventListener('click', () => {
  let value = parseInt(temperature.innerText);
  temperature.innerText = value + 1;
  changeTempTextColor();
  changeLandscape();
});
