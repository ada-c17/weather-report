console.log('Hello, World!');

const state = {
  temp: parseInt(document.getElementById('display-temp').innerHTML),
};

const changeTempColor = () => {
  const currentTemp = document.getElementById('display-temp');
  if (state.temp >= 80) {
    currentTemp.style.color = 'red';
  } else if (state.temp >= 70) {
    currentTemp.style.color = 'orange';
  } else if (state.temp >= 60) {
    currentTemp.style.color = 'yellow';
  } else if (state.temp >= 50) {
    currentTemp.style.color = 'green';
  } else if (state.temp <= 49) {
    currentTemp.style.color = 'teal';
  }
};

const changeTemp = () => {
  const currentTemp = document.getElementById('display-temp');
  const arrowUpButton = document.getElementById('arrow-up');
  const arrowDownButton = document.getElementById('arrow-down');
  arrowUpButton.addEventListener('click', () => {
    state.temp += 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
    changeLandscape();
  });
  arrowDownButton.addEventListener('click', () => {
    state.temp -= 1;
    currentTemp.textContent = state.temp;
    changeTempColor();
    changeLandscape();
  });
};

// Logic to change landscape based on temperature input

const changeLandscape = () => {
  const currentTemp = document.getElementById('display-temp');
  const currentLandscape = document.getElementById('landscape-container');
  const winterDog = document.getElementById('winter-dog');
  const hotDog = document.getElementById('hot-dog');
  const autumnDog = document.getElementById('autumn-dog');
  const springDog = document.getElementById('spring-dog');
  // currentLandscape.style.display = 'none';
  if (state.temp >= 80) {
    hotDog.style.display = 'block';
    springDog.style.display = 'none';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'none';
  } else if (state.temp >= 70) {
    hotDog.style.display = 'none';
    springDog.style.display = 'block';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'none';
  } else if (state.temp >= 60) {
    hotDog.style.display = 'none';
    springDog.style.display = 'none';
    autumnDog.style.display = 'block';
    winterDog.style.display = 'none';
  } else if (state.temp <= 50) {
    hotDog.style.display = 'none';
    springDog.style.display = 'none';
    autumnDog.style.display = 'none';
    winterDog.style.display = 'block';
  }
};

const changeCityName = () => {
  const currentCity = document.querySelector("#current-city");
  const cityInput = document.querySelector("#input-city");
  const resetButton = document.querySelector(".reset-button");
  cityInput.addEventListener('input', (e) => {
    currentCity.textContent = e.target.value;
  })
  resetButton.addEventListener('click', () => {
    currentCity.textContent = "Seattle, WA";
    cityInput.value = ""
  })
}; 

document.addEventListener('DOMContentLoaded', changeTemp);
document.addEventListener('DOMContentLoaded', changeLandscape);
document.addEventListener('DOMContentLoaded', changeCityName);