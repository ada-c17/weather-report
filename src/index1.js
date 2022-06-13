import axios from 'axios';

const place = document.querySelector('input').value;
// const temp = document.getElementById("tValue");
const tempBackground = document.getElementById("tempBack");
const bodyImg = document.getElementById("body");

const state = {
  tempValue: 85,
  tempColor: 'red',
  tempBgr: "🏝🌵🏜",
  bgrImg: "red1"

};

const getRealTemp = (place) => {
  axios.get('https://weather-report-c17-sharkss.herokuapp.com/location', {
    params: {
      'q': place
    }
  })
  .then(response => {
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    return getWeather(lat, lon);
  })
  .catch(error => {console.log('error!', error);});
}

const getWeather = (lat, lon) => {
  axios.get('https://weather-report-c17-sharkss.herokuapp.com/weather', {
      params: {
        'lat': lat,
        'lon': lon
      }
    })
    .then(response => {
      const tempK = response.data.current.temp;
      const tempF = kelvinToF(tempK);
      state.tempValue = Math.floor(tempF);
    })
    .catch(error => {console.log('error!', error);})
}

const updateTemp = (delta) => {
  state.tempValue += delta;
}

const updateTempColor = (cls) => {
  state.tempColor = cls;
}

const updateTempBgr = (emoj) => {
  state.tempBgr = emoj;
}

const updateBgrImg = (cls) => {
  state.bgrImg = cls;
}

const kelvinToF = kelvin => {const tempF = (kelvin - 273.15) * 9/5 + 32;}


// const state = {
//   tempValue: 85,
//   tempColor: 'red',
//   tempBgr: "🏝🌵🏜",
//   bgrImg: "red1"

// };
const changeTemp = () => {
  const tempr = state.tempValue
  // const tempColor = 'red';
  // const tempBgr = "🏝🌵🏜";
  // const bgrImg =  'red1';

  if (state.tempValue >= 80) {
    updateTempColor('red');
    updateTempBgr("🏝🌵🏜");
    updateBgrImg('red1');
    // state.tempColor = 'red';
    // state.tempBgr = "🏝🌵🏜";
    // state.bgrImg = 'red1';
  } else if (state.tempValue >= 70) {
    updateTempColor('orange');
    updateTempBgr("🌻🌻🌻");
    updateBgrImg('orange1');
    // state.tempColor = 'orange';
    // state.tempBgr = "🌻🌻🌻";
    // state.bgrImg = 'orange1';
  } else if (state.tempValue >= 60) {
    updateTempColor('yellow');
    updateTempBgr("🏔🏔🏔");
    updateBgrImg('yellow1');
    // state.tempColor = 'yellow';
    // state.tempBgr = "🏔🏔🏔";
    // state.bgrImg = 'yellow1';
  } else if (state.tempValue >= 50) {
    updateTempColor('green');
    updateTempBgr("🌳🌳🌳");
    updateBgrImg('green1');
    // state.tempColor = 'green';
    // state.tempBgr = "🌳🌳🌳";
    // state.bgrImg = 'green1';
  } else {
    updateTempColor('teal');
    updateTempBgr("☃️☃️☃️");
    updateBgrImg('teal1');
    // state.tempColor = 'teal';
    // state.tempBgr = "☃️☃️☃️";
    // state.bgrImg = 'teal1';
  }

  const temp = document.getElementById("tValue");
  temp.className = state.tempColor;

  const tempBackground = document.getElementById("tempBack");
  tempBackground.textContent = state.tempBgr;

  const bodyImg = document.getElementById("body");
  bodyImg.className = state.bgrImg;

}

const publishTemp = () => {
  const temperature = document.getElementById('tValue');
  temperature.textContent = state.tempValue;
  changeTemp();
}

const addEvents = () => {
  const arrowUp = document.getElementById('increase');
  arrowUp.addEventListener('click', () => {
    updateTemp(1);
    publishTemp();
  });

  const arrowDown = document.getElementById('decrease');
  arrowDown.addEventListener('click', () => {
    updateTemp(-1);
    publishTemp();
  });

  // get 'input', get 'city', attach event to input, change city as reaction to event 
  const input = document.querySelector('input');
  const city = document.getElementById('reflectCity');
  input.addEventListener('input', (e) => {
    city.textContent = e.target.value;
  });

  // get 'select' element, add event to it, get 'options' of select and change pictures according to options
  const select = document.querySelector('select');
  select.addEventListener('change', (event) => {
    const result = document.querySelector('#skyPic');
    if (event.target.value == "snowy") {
      document.getElementById('img').src = "images/snowy.jpeg";
    } else if (event.target.value == "sunny") {
      document.getElementById('img').src = "images/sunny.png";
    } else if (event.target.value == "rainy") {
      document.getElementById('img').src = "images/rainy.png";
    } else if (event.target.value == "cloudy") {
      document.getElementById('img').src = "images/cloudy.jpeg";
    }
  });

  // reset button
  const reset = document.getElementById('reset');
  const resetValue = input.getAttribute('value');
  reset.addEventListener('click', () => {
    input.value = resetValue;
    city.textContent = resetValue;
  });

  // get real temperature of place in the input field
  const getRealT = document.getElementById("realTime");
  getRealT.addEventListener('click', getRealTemp);
}

// attach event to whole document
document.addEventListener('DOMContentLoaded', addEvents);