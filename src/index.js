const updateTitleCity = () => {
  let titleCity = document.querySelector('#titleCity');
  console.log(cityName.value);
  titleCity.textContent = `${cityName.value}`;
};

const registerEventHandlers = () => {
  const cityInput = document.querySelector('#cityName');
  cityInput.addEventListener('input', updateTitleCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
