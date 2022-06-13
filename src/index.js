//get latitude and longitude of city with the location API
const getLatandLon = (query) => {
  let latitude;
  let longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: query,
      },
    })
    .then((response) => {
      //code that executes with a successful response
      let latitude = response.data[0].lat;
      let longitude = response.data[0].lon;

      getWeather(latitude, longitude);
    });

  document.querySelector('.textBox').value = '';
};
//use the lat and long with Open Weather API to get weather data
const getWeather = (latitude, longitude) => {
  console.log('reached the weather fnction');
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      let temp = response.data.current.temp;
      temp = Math.floor(1.8 * (temp - 273) + 32);
      changeTemp(temp);
    });
};
//change temp
const changeTemp = (temp) => {
  state.currentTemp = temp;
  document.querySelector('#currentTemp').innerHTML = `${state.currentTemp}`;
  changeTempColor();
};

//temperature starting state
const state = {
  currentTemp: 0,
};

//increase temperature behavior
const addTemp = () => {
  state.currentTemp += 1;
  let currentTempContainer = document.querySelector('#currentTemp');
  currentTempContainer.innerHTML = `${state.currentTemp}`;
  changeTempColor();
};

//decrease temperature behavior
const subtractTemp = () => {
  state.currentTemp -= 1;
  let currentTempContainer = document.querySelector('#currentTemp');
  currentTempContainer.innerHTML = `${state.currentTemp}`;
  changeTempColor();
};
//change temperature color
const changeTempColor = () => {
  if (state.currentTemp >= 80) {
    document.querySelector('.temperature').style.background = 'red';
    changeLandScape('#hot');
  } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
    document.querySelector('.temperature').style.background = 'orange';
    changeLandScape('#warm');
  } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
    document.querySelector('.temperature').style.background = 'yellow';
    changeLandScape('#windy');
  } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
    document.querySelector('.temperature').style.background = 'green';
    changeLandScape('#cold');
  } else {
    document.querySelector('.temperature').style.background = 'Teal';
    changeLandScape('#cold');
  }
};

//change the sky
const changeSky = () => {
  let skyOptions = document.querySelector('#skyContainer').children;
  for (let child = 0; child < skyOptions.length; child++) {
    skyOptions[child].style.display = 'none';
  }
  let sky = document.querySelector('#sky-selector');
  let selectedSky = sky.options[sky.selectedIndex].text;
  if (selectedSky === 'Sunny') {
    document.querySelector('#sunemoji').style.display = 'block';
  } else if (selectedSky === 'Rainy') {
    document.querySelector('#rainemoji').style.display = 'block';
  } else if (selectedSky === 'Cloudy') {
    document.querySelector('#cloudemoji').style.display = 'block';
  } else {
    document.querySelector('#snowemoji').style.display = 'block';
  }
};

//change landscape
const changeLandScape = (query) => {
  const weatherChildren = document.querySelector('.weather').children;

  for (let child = 0; child < weatherChildren.length; child++) {
    weatherChildren[child].style.display = 'none';
  }
  document.querySelector(query).style.display = 'inline';
};

//change city display
const cityDisplay = () => {
  let currentCityContainer = document.querySelector('.cityDisplay');
  currentCityContainer.innerHTML = document.querySelector('.textBox').value;
  getLatandLon(document.querySelector('.textBox').value);
};

const refreshCity = () => {
  document.querySelector('.cityDisplay').innerHTML = 'Select a City';
  state.currentTemp = 0;
  document.querySelector('#currentTemp').innerHTML = state.currentTemp;
  changeTempColor();
};

//register events
const registerEventHandlers = () => {
  //retrive from doc
  const upArrow = document.querySelector('#upArrow');
  const downArrow = document.querySelector('#downArrow');
  const searchBtn = document.querySelector('.searchIcon');
  const refreshBtn = document.querySelector('.refreshBtn');
  //skies
  const skySelect = document.querySelector('#sky-selector');

  //attach event
  upArrow.addEventListener('click', addTemp);
  downArrow.addEventListener('click', subtractTemp);
  searchBtn.addEventListener('click', cityDisplay);
  refreshBtn.addEventListener('click', refreshCity);
  //skies
  skySelect.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
