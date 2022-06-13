"use strict";

const state = {
  tempValue: 85,
  metric: "C°"
};

document.getElementById('tValue').textContent = state.tempValue;
document.getElementById('toggle').textContent = `to ${state.metric}`;

// get current temperature
const getRealTemp = () => {
  const place = document.querySelector('input').value;

  // axios.get('http://localhost:5000/location', {
  axios.get('https://weather-report-c17-sharkss.herokuapp.com/location', {
    params: {
      'q': place
    }
  })
  .then(response => {
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    // axios.get('http://localhost:5000/weather', {
    axios.get('https://weather-report-c17-sharkss.herokuapp.com/weather', {
      params: {
        'lat': lat,
        'lon': lon
      }
    })
    .then(response => {
      const tempK = response.data.current.temp;
      const tempF = (tempK - 273.15) * 9/5 + 32;
      state.tempValue = Math.floor(tempF);
      console.log(tempF);
      publishTemp();
    })
    .catch(error => {console.log('error!', error);})
  })
  .catch(error => {console.log('error!', error);});
}

// change the color of temperature text, background image, place name, background emoji according to changes of temp
const changeTempColor = () => {
  const temp = document.getElementById("tValue");
  const tempBackground = document.getElementById("tempBack");
  const bodyImg = document.getElementById("body");
  if (temp.textContent >= 80) {
    temp.className = 'red';
    bodyImg.className = 'red1';
    tempBackground.textContent = "🏝🌵🏜";
  } else if (70 <= temp.textContent &&  temp.textContent <= 79) {
    temp.className = 'orange';
    bodyImg.className = 'orange1';
    tempBackground.textContent = "🌻🌻🌻";
  } else if (60 <= temp.textContent &&  temp.textContent <= 69) {
    temp.className = 'yellow';
    bodyImg.className = 'yellow1';
    tempBackground.textContent = "🏔🏔🏔";
  } else if (50 <= temp.textContent && temp.textContent <= 59) {
    temp.className = 'green';
    bodyImg.className = 'green1';
    tempBackground.textContent = "🌳🌳🌳";
  } else if (temp.textContent < 49) {
    temp.className = 'teal';
    bodyImg.className = 'teal1';
    tempBackground.textContent = "☃️☃️☃️";
  }
}

// update tempValue state
const updateTemp = (delta) => {
  state.tempValue += delta;
}

const updateMetric = (metric) => {
  state.metric = metric;
}

// convert temperature to C and back to F
const switchTemp = () => {
  if (state.metric === "F°") {
    state.metric = "C°";
    state.tempValue = Math.floor((state.tempValue * (9/5)) + 35);
  } else if (state.metric === "C°") {
    state.metric = "F°";
    state.tempValue = Math.floor((state.tempValue - 32) * (5/9));
  }

  document.getElementById('tValue').textContent = state.tempValue;
  document.getElementById('toggle').textContent = `to ${state.metric}`;
}

// show temperature and all its changes to screen
const publishTemp = () => {
  const temperature = document.getElementById('tValue');
  temperature.textContent = state.tempValue;
  changeTempColor();
}

// all events
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
      document.getElementById('img').className = 'snowy';
      document.getElementById('img').alt = 'snowy';
    } else if (event.target.value == "sunny") {
      document.getElementById('img').className = 'sunny';
      document.getElementById('img').alt = 'sunny';
    } else if (event.target.value == "rainy") {
      document.getElementById('img').className = 'rainy';
      document.getElementById('img').alt = 'rainy';
    } else if (event.target.value == "cloudy") {
      document.getElementById('img').className = 'cloudy';
      document.getElementById('img').alt = 'cloudy';
    }
  })

  // reset button
  const reset = document.getElementById('reset');
  const resetValue = input.getAttribute('value');
  reset.addEventListener('click', () => {
    input.value = resetValue;
    city.textContent = resetValue;
  })

  // get real temperature of place in the input field
  const getRealT = document.getElementById("realTime");
  getRealT.addEventListener('click', getRealTemp);

  // toggle button C->F anf back
  const toggleBtn = document.getElementById('toggle');
  toggleBtn.addEventListener('click', switchTemp);
};

// attach event to whole document
document.addEventListener('DOMContentLoaded', addEvents);
