let description = '';
let currTemp = 0;
let openWeatherIcon = '';

const convertToFarenheit = temp => {
  let newTemp = 0;
  newTemp = Math.floor(1.8 * (temp - 273) + 32);
  return newTemp;
};

const setColor = temp => {
  let color = 'orange';

  if (temp <= 49) {
    color = 'teal';
  } else if (temp >= 50 && temp <= 59) {
    color = 'darkblue';
  } else if (temp >= 60 &&  temp <= 69) {
    color = 'gold';
  } else if (temp >= 70 &&  temp <= 79) {
    color = 'orange';
  } else if (temp >= 80) {
    color = 'red';
  }
  
  return color;
};

const setLandscape = temp => {
  let landscape = '';

  if (temp <= 59) {
    landscape = '️🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp >= 60 && temp <= 69) {
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 70 &&  temp <= 79) {
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 80) {
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
  
  return landscape;
};

const state = {
  tempCount: 0
};

const changeCityHeader = () => {
  const city = document.querySelector("#city").value;
  let newGreeting = document.createElement("h1");
  greeting.appendChild(newGreeting);
  greeting.innerHTML = `Weather Report for ${city}`;
}

const resetHeader = () => {
  let newGreeting = document.createElement("h1");
  
  greeting.appendChild(newGreeting);
  greeting.innerHTML = `Weather Report for San Diego`;
  
  document.querySelector("#city").value = '';
}

const searchCity = () => {
  const city = document.querySelector("#city").value;

  axios
    .get("http://localhost:5000/location", {
      params: {
      q: city,
  }
    })
.then(response => {
  const lat = response.data[0].lat
  const lon = response.data[0].lon
  // const lat = 33.1247
  // const lon = -117.0808
  updateWeather(lat, lon)
});
};

const updateWeather = (lat, lon) => {
  axios
    .get("http://localhost:5000/weather", {
      params: {
      lat: lat,
      lon: lon
    }
  })
  .then(response => {
    description = response.data.current.weather[0].description;
    currTemp = response.data.current.temp;
    farenheitTemp = convertToFarenheit(currTemp);    

    document.querySelector("#weatherData").innerHTML = `<h2>${description}: ${farenheitTemp}</h2>`;
  });
};

const lowerTemp = event => {
  let temp = document.querySelector("#tempDisplay").innerHTML;
  state.tempCount = parseInt(temp, 10) - 1;

  const displayCounter = document.querySelector("#tempDisplay");
  let tempColor = setColor(state.tempCount)
  displayCounter.className = tempColor;
  displayCounter.textContent = `${state.tempCount}`;

  const landscape = document.querySelector("#landscape");
  let tempLandscape = setLandscape(state.tempCount)
  landscape.textContent = `${tempLandscape}`;  
};

const raiseTemp = event => {
  let temp = document.querySelector("#tempDisplay").innerHTML;
  state.tempCount = parseInt(temp, 10) + 1;

  const displayCounter = document.querySelector("#tempDisplay");
  let tempColor = setColor(state.tempCount)
  displayCounter.className = tempColor;
  displayCounter.textContent = `${state.tempCount}`;

  const landscape = document.querySelector("#landscape");
  let tempLandscape = setLandscape(state.tempCount)
  landscape.textContent = `${tempLandscape}`;  
};

const setSky = () => {
  const newSky = document.getElementById("skySelector");
  const currSky = newSky.options[newSky.selectedIndex].text;
  let sky = ''

  if (currSky === 'Sunny') {
    sky = 'sunny';
  } else if (currSky === 'Cloudy') {
    sky = 'cloudy';
  } else if (currSky === 'Rainy') {
    sky = 'rainy';
  } else if (currSky === 'Snowy') {
    sky = 'snowy';
  };

  const garden = document.querySelector("#gardenBox");
  garden.className = sky;
};

const registerEventHandlers = (event) => {
  const leftArrow = document.querySelector("#leftArrow");
  leftArrow.addEventListener("click", lowerTemp);    

  const rightArrow = document.querySelector("#rightArrow");
  rightArrow.addEventListener("click", raiseTemp); 

  const city = document.querySelector("#city");
  city.addEventListener("keyup", changeCityHeader);

  const resetButton = document.querySelector("#resetButton");
  resetButton.addEventListener("click", resetHeader);

  const skySelector = document.querySelector("#skySelector");
  skySelector.addEventListener("change", setSky);

  const realTempButton = document.querySelector('#realTempButton');
  realTempButton.addEventListener("click", searchCity)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);