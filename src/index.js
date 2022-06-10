// Wave 2
let state = {
  temp: 75,
};

const changColor = () => {
  const tempColor = document.getElementById('temp');
  const gardenLandScape = document.getElementById('land-scape');
  const landScaps = [
    '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
    '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
    '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
    '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  ];

  if (state.temp > 79) {
    tempColor.className = 'temp-80';
    console.log(tempColor.className);
    gardenLandScape.textContent = `${landScaps[0]}`;
  } else if (state.temp > 69) {
    tempColor.className = 'temp-70';
    gardenLandScape.textContent = `${landScaps[1]}`;
  } else if (state.temp > 59) {
    tempColor.className = 'temp-60';
    gardenLandScape.textContent = `${landScaps[2]}`;
  } else if (state.temp > 49) {
    tempColor.className = 'temp-50';
    gardenLandScape.textContent = `${landScaps[3]}`;
  } else {
    tempColor.className = 'temp-49';
    gardenLandScape.textContent = `${landScaps[3]}`;
  }
};

const increaseTemp = (event) => {
  state.temp += 1;
  const increaseTempContainer = document.querySelector('#temp');
  increaseTempContainer.textContent = `${state.temp}`;
  changColor();
};

const decreaseTemp = (event) => {
  state.temp -= 1;
  const decreaseTempContainer = document.querySelector('#temp');
  decreaseTempContainer.textContent = `${state.temp}`;
  changColor();
};

const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector('#increase-temp');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const cityName = document.getElementById('city-name');
  cityName.addEventListener('input', getCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Wave 3

const getCityName = () => {
  const cityName = document.getElementById('city-name').value;
  const changeCity = document.getElementById('header-city');
  changeCity.textContent = `for the city of ${cityName}`;
};
