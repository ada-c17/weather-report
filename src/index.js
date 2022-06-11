const temperatureColor = (temperature) => {
  if (temperature >= 80) {
    return 'red';
  } else if (temperature >= 70) {
    return 'orange';
  } else if (temperature >= 60) {
    return 'yellow';
  } else if (temperature >= 50) {
    return 'green';
  } else {
    return 'teal;';
  }
};

const temperatureArt = (temperature) => {
  if (temperature >= 80) {
    return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70) {
    return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60) {
    return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const setTemperature = (temperature) => {
  document.getElementById('temperature-reading').innerText = temperature;
  document.getElementById('temperature-reading').style.color =
    temperatureColor(temperature);
  document.getElementById('temperature-garden').innerText =
    temperatureArt(temperature);
};

document.addEventListener('DOMContentLoaded', () => {
  let temperature = 70;
  setTemperature(temperature);

  document.getElementById('temperature-up').addEventListener('click', () => {
    temperature += 1;
    setTemperature(temperature);
  });

  document.getElementById('temperature-down').addEventListener('click', () => {
    temperature -= 1;
    setTemperature(temperature);
  });
});

// wave 3
const updateCityName = () => {
  const cityElement = document.getElementById('chosen-city');
  const cityName = document.querySelector('#input-city').value;
  cityElement.innerText = cityName;

  setCity(cityName);
};

document.addEventListener('DOMContentLoaded', () => {
  const enterCityButton = document.getElementById('enter-city-button');

  enterCityButton.addEventListener('click', () => {
    updateCityName();
  });
});

// wave 4
const setCity = (city) => {
  axios
    .get('http://localhost:5000/location', {
      params: {
        q: city,
        format: 'json',
      },
    })
    .then((response) => {
      const searchResult = response.data[0];
      console.log(`lat ${searchResult.lat} lon ${searchResult.lon}`);
      return { lat: searchResult.lat, lon: searchResult.lon };
    })
    .then((coords) => {
      return axios.get('http://localhost:5000/weather', {
        params: {
          lat: coords.lat,
          lon: coords.lon,
        },
      });
    })
    .then((response) => {
      console.log('weather response', response.data);

      // Convert to fahrenheit from kelvin
      const temp = Math.round(1.8 * (response.data.current.temp - 273) + 32);
      setTemperature(temp);
    })
    .catch((error) => {
      console.log('error!', error.response.data);
    });
};

//wave 5
const skyArt = (sky) => {
  if (sky == 'Sunny') {
    return '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (sky == 'Cloudy') {
    return '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (sky == 'Rainy') {
    return '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else {
    return '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  let sky = 'Sunny';
  document.getElementById('sky-garden').innerHTML = skyArt(sky);

  document.getElementById('sky-select').addEventListener('change', () => {
    const skyElement = document.getElementById('sky-select').value;
    document.getElementById('sky-garden').innerHTML = skyArt(skyElement);
  });
});

//wave 6
document.addEventListener('DOMContentLoaded', () => {
  const resetCityButton = document.getElementById('resetCitybutton');
  setCity('Seattle');

  resetCityButton.addEventListener('click', () => {
    const defaultCity = 'Seattle';
    document.querySelector('#input-city').value = defaultCity;
    document.getElementById('chosen-city').innerText = defaultCity;
    setCity(defaultCity);
  });
});
