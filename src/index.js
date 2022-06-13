const state = {
  location: '',
  lat: 0,
  lon: 0,
  temp: 32,
  sky: '',
};

function rangeSlide(event) {
  const value = event.currentTarget.value;
  document.getElementById('rangeValue').textContent = value;
}

const getLonLat = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
      params: {
        q: state.location,
        format: 'json',
      },
    })
    .then((response) => {
      console.log(response);
      state.lon = response.data[0].lon;
      state.lat = response.data[0].lat;
      getLocationWeather();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getLocationWeather = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      condition = response.data.current.weather[0].main;
      validateSkyCondition(condition);
      const kelvin = response.data.current.temp;
      const fTemp = Math.floor(((kelvin - 273.15) * 9) / 5 + 32);
      state.temp = fTemp;
      document.getElementById('rangeValue').textContent = fTemp;
      document.getElementById('range').value = fTemp;
      changeColors();
    })
    .catch((error) => {
      console.log('error');
    });
};

const validateSkyCondition = (condition) => {
  console.log(condition);
  if (condition === 'Clear') {
    state.sky.value = 'sunny';
    document.getElementById('skySelect').value = '#7496C9';
  } else if (
    condition === 'Rain' ||
    condition === 'Drizzle' ||
    condition === 'Thunderstorm'
  ) {
    state.sky.value = 'rainy';
    document.getElementById('skySelect').value = '#356098';
  } else if (condition === 'Clouds' || condition === 'Haze') {
    state.sky.value = 'cloudy';
    document.getElementById('skySelect').value = '#557BB1';
  } else if (condition === 'Snow') {
    state.sky.value = 'snowy';
    document.getElementById('skySelect').value = '#234772';
  }
  skyChange();
};

const changeColors = () => {
  const rangeVal = document.getElementById('range');
  if (rangeVal.value >= 80) {
    document.getElementById('city-circle').style.background = '#EA9A9F';
    document.getElementById('temp-circle').style.background = '#EA9A9F';
    document.getElementById('sky-circle').style.background = '#EA9A9F';
    document.getElementById('weather').style.color = '#EA9A9F';
  } else if (rangeVal.value >= 70) {
    document.getElementById('city-circle').style.background = '#E8BCC3';
    document.getElementById('temp-circle').style.background = '#E8BCC3';
    document.getElementById('sky-circle').style.background = '#E8BCC3';
    document.getElementById('weather').style.color = '#E8BCC3';
  } else if (rangeVal.value >= 60) {
    document.getElementById('city-circle').style.background = '#E5DDE7';
    document.getElementById('temp-circle').style.background = '#E5DDE7';
    document.getElementById('sky-circle').style.background = '#E5DDE7';
    document.getElementById('weather').style.color = '#E5DDE7';
  } else if (rangeVal.value >= 50) {
    document.getElementById('city-circle').style.background = '#CECEE0';
    document.getElementById('temp-circle').style.background = '#CECEE0';
    document.getElementById('sky-circle').style.background = '#CECEE0';
    document.getElementById('weather').style.color = '#CECEE0';
  } else if (rangeVal.value < 50) {
    document.getElementById('city-circle').style.background = '#AEBFDD';
    document.getElementById('temp-circle').style.background = '#AEBFDD';
    document.getElementById('sky-circle').style.background = '#AEBFDD';
  }
};
function clickBtn(event) {
  const city = document.getElementById('city').value;
  state.location = city;
  getLonLat();
}

const inputBox = document.getElementById('city');

inputBox.onkeyup = function () {
  document.getElementById('city-name').innerHTML = inputBox.value;
};
const changeRangeS = () => {
  const input = document.getElementById('range');
  input.addEventListener('input', (event) => {
    if (input.value >= 80) {
      document.getElementById('city-circle').style.background = '#EA9A9F';
      document.getElementById('temp-circle').style.background = '#EA9A9F';
      document.getElementById('sky-circle').style.background = '#EA9A9F';
      document.getElementById('weather').style.color = '#EA9A9F';
    } else if (input.value >= 70) {
      document.getElementById('city-circle').style.background = '#E8BCC3';
      document.getElementById('temp-circle').style.background = '#E8BCC3';
      document.getElementById('sky-circle').style.background = '#E8BCC3';
      document.getElementById('weather').style.color = '#E8BCC3';
    } else if (input.value >= 60) {
      document.getElementById('city-circle').style.background = '#E5DDE7';
      document.getElementById('temp-circle').style.background = '#E5DDE7';
      document.getElementById('sky-circle').style.background = '#E5DDE7';
      document.getElementById('weather').style.color = '#E5DDE7';
    } else if (input.value >= 50) {
      document.getElementById('city-circle').style.background = '#CECEE0';
      document.getElementById('temp-circle').style.background = '#CECEE0';
      document.getElementById('sky-circle').style.background = '#CECEE0';
      document.getElementById('weather').style.color = '#CECEE0';
    } else if (input.value < 50) {
      document.getElementById('city-circle').style.background = '#AEBFDD';
      document.getElementById('temp-circle').style.background = '#AEBFDD';
      document.getElementById('sky-circle').style.background = '#AEBFDD';
    }
  });
};
changeRangeS();

function skyChange() {
  const skyButton = document.getElementById('skyButton');
  document.body.style.backgroundColor =
    document.getElementById('skySelect').value;
}

document.addEventListener('DOMContentLoaded', () => {
  const cityBtn = document.getElementById('cityBtn');
  cityBtn.addEventListener('click', clickBtn);

  const rangeElement = document.getElementById('range');
  rangeElement.addEventListener('input', rangeSlide);

  const skySelector = document.getElementById('skySelect');
  skySelector.addEventListener('change', skyChange);
});
