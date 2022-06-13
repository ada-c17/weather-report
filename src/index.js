const state = {
  city: 'Philadelphia',
  lat: 0,
  lon: 0,
  temp: 70,
};

//set default city name
const cityName = document.getElementById('values');
cityName.textContent = state.city;

//set default temp
const temperature = document.getElementById('tempNum');
temperature.textContent = state.temp;

const resetCityName = () => {
  const cityName = document.getElementById('values');
  cityName.textContent = 'Philadelphia';
};

// event: temp num color changes as temp changes
const tempNumColorSet = () => {
  // let temperature = document.getElementById('tempNum');
  // tempNum = parseInt(temperature.textContent);
  const temperature = document.getElementById('tempNum');
  temperature.textContent = state.temp;
  let Landscape = document.getElementById('img1');
  const weatherPic1 = document.getElementById('weaPic1');
  const weatherPic2 = document.getElementById('weaPic2');
  weatherPic1.src = 'img/rainbow.png';
  weatherPic2.src = 'img/teruteru1.png';

  // crowAndSnow = Landscape.textContent;
  if (state.temp > 80) {
    temperature.style.color = 'red';
    Landscape.src = 'img/red.png';
  } else if (state.temp > 70) {
    temperature.style.color = 'orange';
    Landscape.src = 'img/orange.png';
  } else if (state.temp > 60) {
    temperature.style.color = 'gold';
    Landscape.src = 'img/gold.png';
  } else if (state.temp > 50) {
    temperature.style.color = 'green';
    Landscape.src = 'img/green.png';
  } else {
    temperature.style.color = 'teal';
    if (state.temp > 32) {
      Landscape.src = 'img/teal2.png';
    } else if (state.temp <= 32) {
      Landscape.src = 'img/teal1.png';
    }
  }
};

// event: increase temp num by clicking "up" button
const increaseTemp = () => {
  // let temperature = document.getElementById('tempNum');
  // tempNum = parseInt(temperature.textContent);
  // temperature.textContent = tempNum + 1;
  const temperature = document.getElementById('tempNum');
  temperature.textContent = state.temp;
  state.temp += 1;
  tempNumColorSet();
};

// event:  decrease temp num by clicking "down" button
const decreaseTemp = () => {
  // let temperature = document.getElementById('tempNum');
  // tempNum = parseInt(temperature.textContent);
  // temperature.textContent = tempNum - 1;
  const temperature = document.getElementById('tempNum');
  temperature.textContent = state.temp;
  state.temp -= 1;
  tempNumColorSet();
};

// city input function ??? how to register
// let input = document.querySelector('input');
// const log = document.getElementById('values');
// const getCityName = (e) => {
//   log.textContent = e.target.value;
// };
const getCityInput = () => {
  let input = document.querySelector('input').value;
  const log = document.getElementById('values');
  state.city = input;
  log.textContent = state.city;
};

//using third party API to get lat and lon
const getLatAndLon = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })

    .then((response) => {
      // console.log(response.data)
      state.lat = response.data[0]['lat'];
      state.lon = response.data[0]['lon'];
      console.log(state.lon);
      console.log(state.lat);
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

//using third party API to get weather
const getWeather = () => {
  getLatAndLon();
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      // console.log('getWeather response:',response);
      state.temp = response.data.current.temp;
      state.temp = Math.floor(tempKtoF(state.temp));
      console.log(state.temp);
      const temperature = document.getElementById('tempNum');
      temperature.textContent = state.temp;
      tempNumColorSet();
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

// convert temp from K to F
const tempKtoF = (temp) => {
  return ((temp - 273.15) * 9) / 5 + 32;
};

//sky changes
const changeSkys = () => {
  const skys = document.getElementById('skyOptions').value;
  const pageColor = document.getElementById('container');
  let Landscape = document.getElementById('img1');
  const weatherPic1 = document.getElementById('weaPic1');
  const weatherPic2 = document.getElementById('weaPic2');
  if (skys === 'sunny') {
    pageColor.style.backgroundColor = 'wheat';
    Landscape.src = 'img/red.png';
    weatherPic1.src = 'img/sun.png';
    weatherPic2.src = 'img/sunflower.png';
  } else if (skys === 'cloudy') {
    pageColor.style.backgroundColor = 'grey';
    Landscape.src = 'img/orange.png';
    weatherPic1.src = 'img/topCloudy.png';
    weatherPic2.src = 'img/topCloudy.png';
  } else if (skys === 'rainy') {
    pageColor.style.backgroundColor = 'teal';
    Landscape.src = 'img/rainy.png';
    weatherPic1.src = 'img/rainRain.png';
    weatherPic2.src = 'img/rainUnbr.png';
  } else if (skys === 'snowy') {
    pageColor.style.backgroundColor = 'white';
    Landscape.src = 'img/snowy.png';
    weatherPic1.src = 'img/snowCloud.png';
    weatherPic2.src = 'img/snowTree.png';
  }
};

const registerEventHandlers = () => {
  // register increase temp
  const increaseTempButton = document.getElementById('up');
  increaseTempButton.addEventListener('click', increaseTemp);
  // register decrease temp
  const decreaseTempButton = document.getElementById('down');
  decreaseTempButton.addEventListener('click', decreaseTemp);
  //register input city name
  let input = document.querySelector('input');
  input.addEventListener('input', getCityInput);

  //register real time temp by clicking current temp button
  const currentTempButton = document.getElementById('realTimeTemp');
  currentTempButton.addEventListener('click', getWeather);

  //register sky changes
  const selectSky = document.getElementById('skyOptions');
  selectSky.addEventListener('change', changeSkys);

  //register city reset
  const cityDefault = document.getElementById('resetCity');
  cityDefault.addEventListener('click', resetCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
