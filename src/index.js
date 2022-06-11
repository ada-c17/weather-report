const state = {
  temp: 70,
  color: document.getElementById('mid--color'),
  skyCondition: document.getElementById('sky'),
  landscape: document.getElementById('landscape'),
  location: '',
  lat: 0,
  lon: 0,
};

// change sky
const changeSky = () => {
  if (document.getElementById('select-sky-box').value === 'sunny') {
    state.skyCondition.style.background =
      "url('/assets/sky/sunny 1920x360.jpg')";
  } else if (document.getElementById('select-sky-box').value === 'rainy') {
    state.skyCondition.style.background =
      "url('/assets/sky/rainy 1920x360.jpg')";
  } else if (document.getElementById('select-sky-box').value === 'cloudy') {
    state.skyCondition.style.background =
      "url('/assets/sky/cloudy 1920x360.jpg')";
  } else if (document.getElementById('select-sky-box').value === 'snowy') {
    state.skyCondition.style.background =
      "url('/assets/sky/snowy 1920x360.jpg')";
  }
};
// change temp
const incTemp = () => {
  state.temp++;
  const tempContainer = document.getElementById('temperature');
  tempContainer.textContent = `${state.temp}°`;
};
const decTemp = () => {
  state.temp--;
  const tempContainer = document.getElementById('temperature');
  tempContainer.textContent = `${state.temp}°`;
};

// change colors based on temp
const changeColorTemp = () => {
  if (state.temp >= 80) {
    state.color.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/80 plus 1920x360.jpg')";
  } else if (state.temp >= 70) {
    state.color.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/70 to 79 1920x360.jpg')";
  } else if (state.temp >= 60) {
    state.color.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/60 to 69  1920x360.jpg')";
  } else if (state.temp >= 50) {
    state.color.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/50 to below 1920x360.jpg')";
  } else {
    state.color.style.backgroundColor = 'rgba(0, 255, 255, 0.5)';
  }
};

// get location info
const getLatLon = () => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
      params: {
        q: state.location,
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
      console.log('getLocationWeather');
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getLocationName = () => {
  state.location = document.getElementById('location-name').value;
  getLatLon();
};

const registerEventHandlers = () => {
  // change sky
  const makeSkyChange = document.getElementById('select-sky-box');
  makeSkyChange.addEventListener('change', changeSky);
  // increase temp
  const tempInc = document.getElementById('arrow-increase');
  tempInc.addEventListener('click', incTemp);
  tempInc.addEventListener('click', changeColorTemp);
  // decrease temp
  const tempDec = document.getElementById('arrow-decrease');
  tempDec.addEventListener('click', decTemp);
  tempDec.addEventListener('click', changeColorTemp);
  // change city
  const locationInput = document.getElementById('location-name');
  const locationSubmit = document.getElementById('location-submit');
  locationSubmit.addEventListener('click', getLocationName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
