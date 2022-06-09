'use strict';

// 2. Change temperature by clicking on an arrow

const state = {
  temp: 55,
};
let flagFahrenheit = true;

const increaseTemp = () => {
  state.temp += 1;
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  if (state.temp < 50) {
    tempContainer.className = 'teal';
  } else if (state.temp < 60) {
    tempContainer.className = 'green';
  } else if (state.temp < 70) {
    tempContainer.className = 'yellow';
  } else if (state.temp < 80) {
    tempContainer.className = 'orange';
  } else {
    tempContainer.className = 'red';
  }
  tempContainer.textContent = flagFahrenheit
    ? `${Math.trunc(state.temp)}°F`
    : `${Math.trunc(state.temp)}°C`;
  changeBackground(state.temp);
};

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlers);

const decreaseTemp = () => {
  state.temp -= 1;
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  if (state.temp < 50) {
    tempContainer.className = 'teal';
  } else if (state.temp < 60) {
    tempContainer.className = 'green';
  } else if (state.temp < 70) {
    tempContainer.className = 'yellow';
  } else if (state.temp < 80) {
    tempContainer.className = 'orange';
  } else {
    tempContainer.className = 'red';
  }
  tempContainer.textContent = flagFahrenheit
    ? `${Math.trunc(state.temp)}°F`
    : `${Math.trunc(state.temp)}°C`;
  changeBackground(state.temp);
};

const registerEventHandlersDecrease = () => {
  const increaseTempButton = document.getElementById('decreaseTempButton');
  increaseTempButton.addEventListener('click', decreaseTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersDecrease);

// Temperature Ranges Change Landscape

const changeBackground = (temp) => {
  const element = document.getElementById('main__intro__right');
  if (!flagFahrenheit) {
    temp = (9 / 5) * temp + 32;
  }
  if (temp >= 80) {
    element.classList.remove(element.className);
    element.classList.add('summer');
  } else if (temp < 80 && temp >= 70) {
    element.classList.remove(element.className);
    element.classList.add('spring');
  } else if (temp < 70 && temp >= 60) {
    element.classList.remove(element.className);
    element.classList.add('autumn');
  } else {
    element.classList.remove(element.className);
    element.classList.add('winter');
  }
};

// 3. Naming the City
//! used different syntax here

const message = document.getElementById('enter_city');
const result = document.getElementById('city_name');
message.addEventListener('input', function () {
  result.textContent = this.value;
});

// 4. idk what it's called

const getRealTemp = () => {
  let coords;
  axios.get('http://127.0.0.1:5000', {
    params: {
      q: document.getElementById('enter_city').value
    }
    })
  .then((response) => {
    coords = [response.data[0].lat, response.data[0].lon]
    console.log('success!', response.data);  
  })
  .catch((error) => {
    console.log('error!', error.response);
  });

}

const registerEventHandlersReal = () => {
  const getRealTempBtn = document.getElementById('get__real__temp');
  getRealTempBtn.addEventListener('click', getRealTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersReal);


// 5. Selection Changes Sky Background

const changeModeSky = (event) => {
  const skyMode = document.getElementById('sky-select');
  const skyText = skyMode.options[skyMode.selectedIndex].text;
  const element = document.querySelector('#block__right__name > h4');
  if (skyText == 'Sunny') {
    element.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyText == 'Cloudy') {
    element.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyText == 'Rainy') {
    element.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyText == 'Snowy') {
    element.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
  } else {
    element.textContent = 'Weather Garden';
  };
}

const registerEventHandlersSky = () => {
  const skyMode = document.getElementById('sky-select');
  skyMode.addEventListener('change', changeModeSky);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersSky);

// 6.Resetting the City Name

const ResetCity = () => {
  const nameContainer = document.getElementById('city_name');
  nameContainer.textContent = 'default name';
};

const registerEventHandlersReset = () => {
  const form = document.querySelector('#form');
  form.addEventListener('reset', ResetCity);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersReset);

// 7. convert the temperature between Celsius and Fahrenheit

const changeMetricForTemp = () => {
  flagFahrenheit = !flagFahrenheit;
  if (!flagFahrenheit) {
    state.temp = (5 / 9) * (state.temp - 32);
  } else {
    state.temp = (9 / 5) * state.temp + 32;
  }
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = flagFahrenheit
    ? `${Math.trunc(state.temp)}°F`
    : `${Math.trunc(state.temp)}°C`;
  changeBackground(state.temp);
};

const registerEventHandlersFarenheit = () => {
  const switchFC = document.getElementById('switchBtnFC');
  switchFC.addEventListener('click', changeMetricForTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersFarenheit);
