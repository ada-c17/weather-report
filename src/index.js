const temp = {
  fahrenheit: 55,
  emojis: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
};

const tempCheck = (element) => {
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

const emojiCheck = (element) => {
  if (element.textContent >= 80) {
    temp.emojis = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (element.textContent >= 70) {
    temp.emojis = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (element.textContent >= 60) {
    temp.emojis = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    temp.emojis = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  return temp.emojis;
};

const findLatAndLong = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: temp.city,
      },
    })
    .then((response) => {
      console.log(response.data);
      temp.lat = response.data[0].lat;
      temp.long = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log('Error finding the latitude and longitude:', error.response);
    });
};


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
  // load temp number
  const tempUl = document.getElementById('tempDisplay');
  const tempLi = document.createElement('li');
  tempLi.textContent = temp.fahrenheit;
  tempUl.appendChild(tempLi);
  tempCheck(tempLi);

  findLatAndLong();
  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', findLatAndLong);

  const cityInput = document.getElementById('cityInput');
  cityInput.addEventListener('input', () => {
    cityHead.textContent = cityInput.value;
  });

  // update the sky emojis
  updateSky();
  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', updateSky);

  // load weather garden
  const emojiUl = document.getElementById('weatherGarden');
  const emojiLi = document.createElement('li');
  emojiLi.textContent = temp.emojis;
  emojiUl.appendChild(emojiLi);

  // load city name
  const citySec = document.getElementById('cityName');
  const cityHead = document.createElement('h3');
  cityHead.textContent = temp.city;
  citySec.appendChild(cityHead);

 // add reset button event listener
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    cityInput.value = '';
    cityHead.textContent = temp.city;
  })

  const loadTempButtons = () => {
    const upUl = document.getElementById('increaseTempButton');
    const upLi = document.createElement('li');
    upLi.textContent = '⬆️';
    upLi.addEventListener('click', () => {
      tempLi.textContent = temp.fahrenheit += 1;
      tempCheck(tempLi);
      emojiLi.textContent = emojiCheck(tempLi);
    });
    upUl.appendChild(upLi);

    const downUl = document.getElementById('decreaseTempButton');
    const downLi = document.createElement('li');
    downLi.textContent = '⬇️';
    downLi.addEventListener('click', () => {
      tempLi.textContent = temp.fahrenheit -= 1;
      tempCheck(tempLi);
      emojiLi.textContent = emojiCheck(tempLi);
    });
    downUl.appendChild(downLi);
  };

  loadTempButtons();
};

if (document.readyState !== 'loading') {
  loadElements();
} else {
  document.addEventListener('DOMContentLoaded', loadElements);
}
