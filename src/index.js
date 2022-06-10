'use strict';

// 2. Change temperature by clicking on an arrow

const state = {
  temp: 55,
};
let flagFahrenheit = true;
const today = new Date();

const increaseTemp = () => {
  state.temp += 1;
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = `Current temp: ${state.temp}`;
  tempContainer.textContent = flagFahrenheit
    ? `${Math.trunc(state.temp)}°F`
    : `${Math.trunc(state.temp)}°C`;
  changeColorTemp(state.temp);
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
  tempContainer.textContent = flagFahrenheit
    ? `${Math.trunc(state.temp)}°F`
    : `${Math.trunc(state.temp)}°C`;
  changeColorTemp(state.temp);
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
    element.className = 'summer';
  } else if (temp < 80 && temp >= 70) {
    element.className = 'spring';
  } else if (temp < 70 && temp >= 60) {
    element.className = 'autumn';
  } else {
    element.className = 'winter';
  }
};
// Temperature Ranges Change Temperature

const changeColorTemp = (temp) => {
  const tempContainer = document.getElementById('current_temp');
  if (!flagFahrenheit) {
    temp = (9 / 5) * temp + 32;
  }
  if (temp < 50) {
    tempContainer.className = 'teal';
  } else if (temp >= 50 && temp < 60) {
    tempContainer.className = 'green';
  } else if (temp >= 60 && temp < 70) {
    tempContainer.className = 'yellow';
  } else if (temp >= 70 && temp < 80) {
    tempContainer.className = 'orange';
  } else {
    tempContainer.className = 'red';
  }
};

// 3. Naming the City
//! used different syntax here

const message = document.getElementById('enter_city');
const result = document.getElementById('city_name');
message.addEventListener('input', function () {
  result.textContent = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

// 4. calling APIs LocationIQ and OpenWeather

const getRealTemp = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: document.getElementById('enter_city').value,
      },
    })
    .then((response) => {
      const forecastFor = document.getElementById('forecast');
      forecastFor.textContent = `Forecast for: ${response.data[0].display_name}`;
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: response.data[0].lat,
            lon: response.data[0].lon,
          },
        })
        .then((response) => {
          Forecast(response.data);
        })
        .catch((error) => {
          console.log('error!', error.response);
        });
    })
    .catch((error) => {
      console.log('error!', error.response);
    });
};

const registerEventHandlersReal = () => {
  const getRealTempBtn = document.getElementById('get__real__temp');
  getRealTempBtn.addEventListener('click', getRealTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersReal);

const Forecast = (data) => {
  flagFahrenheit = true;
  state.temp = data.current.temp;
  const tempContainer = document.getElementById('current_temp');
  tempContainer.textContent = `${Math.trunc(state.temp)}°F`;
  changeColorTemp(state.temp);
  changeBackground(state.temp);
  const taskList = document.getElementById('day__forecast');
  taskList.innerHTML = '';
  // forecast for a week
  for (let i = 1; i <= 7; i++) {
    const listItem = document.createElement('li');
    today.setDate(today.getDate() + 1);

    listItem.textContent = today.toDateString();
    listItem.className = 'date';
    taskList.appendChild(listItem);

    const list = document.createElement('ol');
    listItem.appendChild(list);

    const dayTemp = document.createElement('li');
    dayTemp.textContent = `day temp: ${data.daily[i].temp.day}°F`;
    dayTemp.className = 'data';
    list.appendChild(dayTemp);

    const nightTemp = document.createElement('li');
    nightTemp.textContent = `night temp: ${data.daily[i].temp.night}°F`;
    nightTemp.className = 'data';
    list.appendChild(nightTemp);

    const description = document.createElement('li');
    description.textContent = `${data.daily[i]['weather'][0].description}`;
    description.className = 'data';
    list.appendChild(description);
  }
};

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
    element.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  } else {
    element.textContent = 'Weather Garden';
  }
};

const registerEventHandlersSky = () => {
  const skyMode = document.getElementById('sky-select');
  skyMode.addEventListener('change', changeModeSky);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersSky);

const changeModeSkyBackground = (event) => {
  const element = document.body;
  element.className = event.target.value;
};

const registerEventHandlersSkybackground = () => {
  const skyMode = document.getElementById('back-select');
  skyMode.addEventListener('change', changeModeSkyBackground);
};
document.addEventListener(
  'DOMContentLoaded',
  registerEventHandlersSkybackground
);

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
  changeColorTemp(state.temp);
  changeBackground(state.temp);
};

const registerEventHandlersFarenheit = () => {
  const switchFC = document.getElementById('switchBtnFC');
  switchFC.addEventListener('click', changeMetricForTemp);
};
document.addEventListener('DOMContentLoaded', registerEventHandlersFarenheit);
