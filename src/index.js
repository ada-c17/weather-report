const convertToFarenheit = temps => {
  let temp = 0;
  let newTemp = 0;
  let tempVals = [];

  for (temp of temps) {
    newTemp = Math.floor(1.8 * (temp - 273) + 32);
    tempVals.push(newTemp);
  }
  return tempVals;
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
  
  document.querySelector("#city").value = 'San Diego';
}

const searchCity = () => {
  const city = document.querySelector("#city").value;

  axios
    .get(" https://weather-report-proxy-server.herokuapp.com/location", {
      params: {
      q: city,
  }
    })
.then(response => {
  const lat = response.data[0].lat
  const lon = response.data[0].lon
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
    let description = response.data.current.weather[0].description;
    let currTemp = response.data.current.temp;
    let minTemp = response.data.daily[0].temp.min;
    let maxTemp = response.data.daily[0].temp.max;
    const temps = [currTemp, minTemp, maxTemp];
    let farenheitTemps = convertToFarenheit(temps);    

    document.querySelector("#weatherData").innerHTML = `<p>Current conditions: ${description} <br> Current temp: ${farenheitTemps[0]}&#x2109; <br> Minimum Temp: ${farenheitTemps[1]}&#x2109; <br> Maximum Temp: ${farenheitTemps[2]}&#x2109; </p>`;
  });
};

const changeTemp = event => {
  let direction = event.target.id;
  let temp = document.querySelector("#tempDisplay").innerHTML;

  if (direction === 'leftArrow') {
    state.tempCount = parseInt(temp, 10) - 1;
  } else {
    state.tempCount = parseInt(temp, 10) + 1;
  };

  const displayCounter = document.querySelector("#tempDisplay");
  let tempColor = setColor(state.tempCount);
  displayCounter.className = tempColor;
  displayCounter.textContent = `${state.tempCount}`;

  const landscape = document.querySelector("#landscape");
  let tempLandscape = setLandscape(state.tempCount);
  landscape.textContent = `${tempLandscape}`;  
};

const setSky = () => {
  const newSky = document.getElementById("skySelector");
  const currSky = newSky.options[newSky.selectedIndex].text;
  let sky = '';

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
  leftArrow.addEventListener("click", changeTemp);    

  const rightArrow = document.querySelector("#rightArrow");
  rightArrow.addEventListener("click", changeTemp); 

  const city = document.querySelector("#city");
  city.addEventListener("keyup", changeCityHeader);

  const resetButton = document.querySelector("#resetButton");
  resetButton.addEventListener("click", resetHeader);

  const skySelector = document.querySelector("#skySelector");
  skySelector.addEventListener("change", setSky);

  const realTempButton = document.querySelector('#realTempButton');
  realTempButton.addEventListener("click", searchCity);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);