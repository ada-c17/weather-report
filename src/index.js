const state = {
  temp: 70,
  color: document.getElementById('mid--color'),
  skyCondition: document.getElementById('select-sky-box'),
  skyConditionImage: document.getElementById('sky'),
  landscape: document.getElementById('landscape'),
  location: '',
  lat: 0,
  lon: 0,
};

// change sky
const changeSky = () => {
  console.log('ENTER changeSky');
  if (state.skyCondition.value === 'sunny') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/sunny 1920x360.jpg')";
  } else if (state.skyCondition.value === 'rainy') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/rainy 1920x360.jpg')";
  } else if (state.skyCondition.value === 'cloudy') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/cloudy 1920x360.jpg')";
  } else if (state.skyCondition.value === 'snowy') {
    state.skyConditionImage.style.background =
      "url('/assets/sky/snowy 1920x360.jpg')";
  }
  console.log('EXIT changeSky');
};

// set state.skyCondition
const validateSkyCondition = (condition) => {
  console.log('ENTER validateSkyCondition');
  console.log('state.skyCondition');
  console.log(state.skyCondition);
  console.log('condition');
  console.log(condition);
  if (condition === 'Clear') {
    state.skyCondition.value = 'sunny';
    console.log('changes to SUNNY');
  } else if (
    condition === 'Rain' ||
    condition === 'Drizzle' ||
    condition === 'Thunderstorm'
  ) {
    state.skyCondition.value = 'rainy';
    console.log('changes to RIANY');
  } else if (condition === 'Clouds') {
    state.skyCondition.value = 'cloudy';
    console.log('changes to CLOUDY');
  } else if (condition === 'Snow') {
    state.skyCondition.value = 'snowy';
    console.log('changes to SNOWY');
  }
  console.log(state.skyConditionImage);
  console.log('EXIT validateSkyCondition for changeSky');
  changeSky();
};

// change TEMP
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

// change bottom image and middle color based on temp
const changeColorTemp = () => {
  if (state.temp >= 80) {
    state.color.style.backgroundColor = 'rgba(140,114,89, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/80 plus 1920x360.jpg')";
  } else if (state.temp >= 70) {
    state.color.style.backgroundColor = 'rgba(252,67,29, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/70 to 79 1920x360.jpg')";
  } else if (state.temp >= 60) {
    state.color.style.backgroundColor = 'rgba(238,170,60, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/60 to 69  1920x360.jpg')";
  } else if (state.temp >= 50) {
    state.color.style.backgroundColor = 'rgba(135,160,180, 0.5)';
    document.getElementById('landscape').style.background =
      "url('/assets/temp/50 to below 1920x360.jpg')";
  } else {
    state.color.style.backgroundColor = 'rgba(193,205,215, 0.5)';
  }
};

// const hitReturn = (event) =>{
//   console.log(event.key)
//   if (event.key === "Enter") {
//     console.log("Return was pressed")
//     event.preventDefault();
//     document.getElementById("myBtn").click();
// }

// location NAME UPDATES
const changeLocationName = () => {
  const inputText = document.getElementById('location-input');
  const newLocationName = document.getElementById('location-display-name');
  newLocationName.textContent = inputText.value;
};

// location name updates in REAL TIME
const getLocationName = (event) => {
  if (event.key != 'Enter') {
    state.location = document.getElementById('location-input').value;
    getLatLon();
  }
};
// ********API*********
// get LOCATION info
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

// get WEATHER info
const getLocationWeather = () => {
  console.log('ENTER getLocationWeather');
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      console.log(response);
      condition = response.data.current.weather[0].main;
      console.log(condition);
      console.log('EXIT getLocationWeather for validateSkyCondition');
      validateSkyCondition(condition);
    })
    .catch((error) => {
      console.log(error);
    });
};

// // Changes location after hitting submit
// const changeLocationNameSubmit = () => {
//   const newLocationName = document.getElementById('location-display-name');
//   newLocationName.textContent = state.location;
// };
//changes location as you type

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
  // change locaion
  const locationSubmit = document.getElementById('location-submit');
  locationSubmit.addEventListener('click', getLocationName);
  locationSubmit.addEventListener('keydown', getLocationName);
  // locationSubmit.addEventListener('click', changeLocationNameSubmit);
  // change location name
  const locationInput = document.getElementById('location-input');
  locationInput.addEventListener('keyup', changeLocationName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
