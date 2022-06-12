// temp object to hold all current temp data
const currentTemp = {
  fahrenheit: 55,
  emojis: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  city: 'Seattle',
  lat: 47.6038321,
  lon: -122.3300624,
};

// convert kelvin to fahrenheit
const convertKToF = (temp) => {
  return Math.round((temp - 273.15) * (9 / 5) + 32);
};

// update display temp color based on current temp
const updateTempColor = (element) => {
  if (element.textContent >= 80) {
    element.className = 'veryHot';
  } else if (element.textContent >= 70) {
    element.className = 'hot';
  } else if (element.textContent >= 60) {
    element.className = 'warm';
  } else if (element.textContent >= 50) {
    element.className = 'cool';
  } else {
    element.className = 'cold';
  }
};

// update garden emojis based on current temp
const updateGarden = (element) => {
  if (element.textContent >= 80) {
    currentTemp.emojis = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (element.textContent >= 70) {
    currentTemp.emojis = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (element.textContent >= 60) {
    currentTemp.emojis = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    currentTemp.emojis = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  return currentTemp.emojis;
};

// update sky based on drop down menu selection
const updateSky = () => {
  const inputSky = document.getElementById('skySelect').value;
  const skyContainer = document.getElementById('sky');

  if (inputSky === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (inputSky === 'Sunny') {
    sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
  } else if (inputSky === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (inputSky === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  skyContainer.textContent = sky;
};

const loadElements = () => {
  // get weather for user input location
  const getActual = (location) => {
    // get lat and long of user input location
    const getLatAndLon = (location) => {
      axios
        .get('http://127.0.0.1:5000/location', {
          params: {
            q: location,
          },
        })
        .then((response) => {
          // update temp object
          currentTemp.lat = response.data[0].lat;
          currentTemp.lon = response.data[0].lon;
          currentTemp.city = location;
          getWeather(currentTemp.lat, currentTemp.lon);
        })
        .catch((error) => {
          console.log(
            'Error finding the latitude and longitude:',
            error.response
          );
          reset();
          alert('Please enter a valid city name');
        });
    };

    // get weather based on lat and lon
    const getWeather = (lat, lon) => {
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: lat,
            lon: lon,
          },
        })
        .then((response) => {
          // update temp object and display, weather garden
          currentTemp.fahrenheit = convertKToF(response.data.current.temp);
          tempLi.textContent = currentTemp.fahrenheit;
          emojiLi.textContent = updateGarden(tempLi);
          updateTempColor(tempLi);
        })
        .catch((error) => {
          console.log('Error finding current temperature:', error.response);
          reset();
          alert('Could not find weather for entered location');
        });
    };
    getLatAndLon(location);
  };

  // update the sky emojis
  updateSky();
  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', updateSky);

  // reset temp object to default and update display
  const reset = () => {
    cityInput.value = '';
    currentTemp.city = 'Seattle';
    cityHead.textContent = currentTemp.city;
    currentTemp.fahrenheit = 55;
    tempLi.textContent = currentTemp.fahrenheit;
    currentTemp.lat = 47.6038321;
    currentTemp.lon = -122.3300624;
    currentTemp.emojis = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    emojiLi.textContent = currentTemp.emojis;
    updateTempColor(tempLi);
  };

  // load city name input
  const cityInput = document.getElementById('cityInput');
  cityInput.addEventListener('input', () => {
    cityHead.textContent = cityInput.value;
  });

  // load realtime temp button
  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', () => {
    getActual(cityInput.value);
  });

  // load weather garden
  const emojiUl = document.getElementById('weatherGarden');
  const emojiLi = document.createElement('li');
  emojiLi.textContent = currentTemp.emojis;
  emojiUl.appendChild(emojiLi);

  // load city name
  const citySec = document.getElementById('cityName');
  const cityHead = document.createElement('h3');
  cityHead.textContent = currentTemp.city;
  citySec.appendChild(cityHead);

  // load reset button event listener
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    reset();
  });

  // load temp control buttons and display number
  const tempUl = document.getElementById('tempDisplay');
  const upLi = document.createElement('li');
  upLi.textContent = '⬆️';
  upLi.addEventListener('click', () => {
    tempLi.textContent = currentTemp.fahrenheit += 1;
    updateTempColor(tempLi);
    emojiLi.textContent = updateGarden(tempLi);
  });
  tempUl.appendChild(upLi);

  const tempLi = document.createElement('li');
  tempLi.textContent = currentTemp.fahrenheit;
  tempUl.appendChild(tempLi);
  updateTempColor(tempLi);

  const downLi = document.createElement('li');
  downLi.textContent = '⬇️';
  downLi.addEventListener('click', () => {
    tempLi.textContent = currentTemp.fahrenheit -= 1;
    updateTempColor(tempLi);
    emojiLi.textContent = updateGarden(tempLi);
  });
  tempUl.appendChild(downLi);
};

if (document.readyState !== 'loading') {
  loadElements();
} else {
  document.addEventListener('DOMContentLoaded', loadElements);
}
