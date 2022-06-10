"use strict";

const getRealTemp = () => {
  const place = document.getElementById('reflectCity').textContent;

  axios.get('http://localhost:5000/location', {
    params: {
      'q': place
    }
  })
  .then(response => {
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    axios.get('http://localhost:5000/weather', {
      params: {
        'lat': lat,
        'lon': lon
      }
    })
    .then(response => {
      const tempK = response.data.current.temp;
      const tempF = (tempK - 273.15) * 9/5 + 32;
      console.log(tempF);
      console.log(response);
      state.tempValue = Math.floor(tempF);
      publishTemp();
    })
    .catch(error => {console.log('error!', error);})
  })
  .catch(error => {console.log('error!');});
}

const state = {
  tempValue: 35,
  tempColor: 'green',
  bgrImg: "url('../images/bgrImg.avif')",
};

// change the color of temperature text
const changeTempColor = () => {
  const temp = document.getElementById("tValue");
  const tempBackground = document.getElementById("tempBack");
  const bodyImg = document.getElementsByTagName('body');
  if (temp.textContent >= 80) {
    temp.className = 'red';
    // state.bgrImg = "url('../images/desert.avif')";
    // bodyImg.style.backgroundImage = `${state.bgrImg}`;
    // state.bgrImg = "url(../images/desert.avif)";
    // state.tempColor = 'red';
    tempBackground.textContent = "🏝🌵🏜";
  } else if (70 <= temp.textContent &&  temp.textContent <= 79) {
    temp.className = 'orange';
    state.bgrImg = "url('../images/beach.avif')";
    tempBackground.textContent = "🌻🌻🌻";
  } else if (60 <= temp.textContent &&  temp.textContent <= 69) {
    temp.className = 'yellow';
    state.bgrImg = "url('../images/poppy.avif')";
    tempBackground.textContent = "🏔🏔🏔";
  } else if (50 <= temp.textContent && temp.textContent <= 59) {
    temp.className = 'green';
    state.bgrImg = "url('../images/bgrImg.avif')";
    tempBackground.textContent = "🌳🌳🌳";
  } else if (temp.textContent < 49) {
    temp.className = 'teal';
    state.bgrImg = "url('../images/frozen.avif')";
    tempBackground.textContent = "☃️☃️☃️";
  }
}

const updateTemp = (delta) => {
  state.tempValue += delta;
}

// const updateBgrImg = (imgSourse) => {
//   state.bgrImg = imgSourse;
// }

const publishTemp = () => {
  const temperature = document.getElementById('tValue');
  temperature.textContent = `${state.tempValue}`;
  changeTempColor();
}

// const publishBgrImg = () => {
//   const bodyImg = document.getElementsByTagName('body');
//   bodyImg.style.backgroundImage = `${state.bgrImg}`;
//   changeTempColor;
// }

const addEvents = () => {
  const arrowUp = document.getElementById('increase');
  arrowUp.addEventListener('click', () => {
    updateTemp(1);
    publishTemp();
    // publishBgrImg();
  });

  const arrowDown = document.getElementById('decrease');
  arrowDown.addEventListener('click', () => {
    updateTemp(-1);
    publishTemp();
    // publishBgrImg();
  });

  const input = document.querySelector('input');
  const city = document.getElementById('reflectCity');

  input.addEventListener('input', (e) => {
    city.textContent = e.target.value;
  });

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
  })

  const reset = document.getElementById('reset');
  const resetValue = input.getAttribute('value');
  reset.addEventListener('click', () => {
    input.value = resetValue;
    city.textContent = resetValue;
  })

  const getRealT = document.getElementById("realTime");
  getRealT.addEventListener('click', getRealTemp);
  // getRealT.addEventListener('click', changeTempColor);

};


document.addEventListener('DOMContentLoaded', addEvents);
