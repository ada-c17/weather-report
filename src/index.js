const dropBar = document.querySelector('#sky-selector');
const getSelectedSky = (backgrounds) => {
  const sky = dropBar.options[dropBar.selectedIndex].text;
  let background;
  switch (true) {
    default:
      background = backgrounds[0];
      break;
    case sky === 'Sunny':
      background = backgrounds[1];
      break;
    case sky === 'Cloudy':
      background = backgrounds[2];
      break;
    case sky === 'Rainy':
      background = backgrounds[3];
      break;
    case sky === 'Snowy':
      background = backgrounds[4];
      break;
    case sky === 'Windy':
      background = backgrounds[5];
  }
  return background;
};

const skyBackground = document.querySelector('#sky-box');
const changeSkyBackground = () => {
  const imgs = [
    '/assets/defaultSky.jpeg',
    '/assets/sunny.jpeg',
    '/assets/cloudy.jpeg',
    '/assets/rainy.jpeg',
    '/assets/snowy.jpeg',
    '/assets/windy.jpeg',
  ];
  const img = getSelectedSky(imgs);
  skyBackground.style.backgroundImage = `url(${img})`;
};

const temperature = document.querySelector('#temp-value');
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

const landscape = document.querySelector('#temp-display');
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
  const value = parseInt(temperature.innerText);
  temperature.innerText = value - 1;
  changeTempTextColor();
  changeLandscape();
});

const increaseButton = document.querySelector('#temp-up');
increaseButton.addEventListener('click', () => {
  const value = parseInt(temperature.innerText);
  temperature.innerText = value + 1;
  changeTempTextColor();
  changeLandscape();
});
