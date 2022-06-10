const GARDENSKIES = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const updateTitleCity = () => {
  let titleCity = document.querySelector('#titleCity');
  console.log(cityName.value);
  titleCity.textContent = `${cityName.value}`;
};

const updateWeatherGardenSky = () => {
  let gardenSky = document.querySelector('#gardenSky');
  console.log(`${weatherSelector.value}`);
  gardenSky.textContent = GARDENSKIES[weatherSelector.value];
};

const registerEventHandlers = () => {
  const cityInput = document.querySelector('#cityName');
  cityInput.addEventListener('input', updateTitleCity);

  const weatherSelector = document.querySelector('#weatherSelector');
  weatherSelector.addEventListener('change', updateWeatherGardenSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
