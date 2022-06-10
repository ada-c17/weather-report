let state = {
  temp: 75,
  city: 'Seattle',
};

const updateCity = () => {
  const cityInput = document.getElementById('city-input').value;
  const headerCity = document.getElementById('header-city');
  state.city = cityInput;
  headerCity.textContent = `For the city of ${state.city}`;
};

const changeColor = () => {
  const tempColor = document.getElementById('temp');
  const gardenLandscape = document.getElementById('landscape');
  const landscape = [
    '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
    '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
    '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
    '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  ];

  console.log('hello world');
  if (state.temp > 79) {
    tempColor.className = 'temp-80';
    console.log(tempColor.className);
    gardenLandscape.textContent = `${landscape[0]}`;
  } else if (state.temp > 69) {
    tempColor.className = 'temp-70';
    gardenLandscape.textContent = `${landscape[1]}`;
  } else if (state.temp > 59) {
    tempColor.className = 'temp-60';
    gardenLandscape.textContent = `${landscape[2]}`;
  } else if (state.temp > 49) {
    tempColor.className = 'temp-50';
    gardenLandscape.textContent = `${landscape[3]}`;
  } else {
    tempColor.className = 'temp-49';
    gardenLandscape.textContent = `${landscape[3]}`;
  }
};

const increaseTemp = (event) => {
  state.temp += 1;
  const increaseTempContainer = document.querySelector('#temp');
  increaseTempContainer.textContent = `${state.temp}`;
  changeColor();
};

const decreaseTemp = (event) => {
  state.temp -= 1;
  const decreaseTempContainer = document.querySelector('#temp');
  decreaseTempContainer.textContent = `${state.temp}`;
  changeColor();
};

const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector('#increase-temp');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const cityInput = document.querySelector('#city-input');
  cityInput.addEventListener('input', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
