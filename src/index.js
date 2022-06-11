'use strict';

const state = {
  temp: 78,
  city: 'Seattle, WA',
};

// export { state };

// Changes background color of temp box
const changeColor = () => {
  const tempCityBox = document.getElementById('temp_city_box_grid');
  if (state.temp >= 80) {
    tempCityBox.style.backgroundColor = 'rgba(251, 10, 18, 0.7)';
  } else if (state.temp >= 70) {
    tempCityBox.style.backgroundColor = 'rgba(255, 145, 3, 0.7)';
  } else if (state.temp >= 60) {
    tempCityBox.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
  } else if (state.temp >= 50) {
    tempCityBox.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
  } else if (state.temp >= 50) {
    tempCityBox.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
  } else if (state.temp >= 40) {
    tempCityBox.style.backgroundColor = 'rgba(0, 204, 255, 0.7)';
  } else {
    tempCityBox.style.backgroundColor = 'rgba(59, 87, 158, 0.8)';
  }
};

// Changes background landscape
const changeBgImg = () => {
  if (state.temp >= 80) {
    document.body.style.backgroundImage =
      "url('assets/courtney-cook-HClKQKUodF4-unsplash.jpg')";
  } else if (state.temp >= 70) {
    document.body.style.backgroundImage =
      "url('assets/clement-fusil-Fpqx6GGXfXs-unsplash.jpg')";
  } else if (state.temp >= 60) {
    document.body.style.backgroundImage =
      "url('assets/dedu-adrian-BxT5oqgztNc-unsplash.jpg')";
  } else if (state.temp >= 50) {
    document.body.style.backgroundImage =
      "url('assets/nick-scheerbart-soGoAfesWO8-unsplash.jpg')";
  } else if (state.temp >= 40) {
    document.body.style.backgroundImage =
      "url('assets/james-donovan-kFHz9Xh3PPU-unsplash.jpg')";
  } else {
    document.body.style.backgroundImage =
      "url('assets/fabien-twb-6K_WE8FB3bE-unsplash.jpg')";
  }
};

// Changes temp based on situation (button click or function call)
const changeTemp = (event) => {
  if (event === undefined) {
    ('pass');
  } else if (event.composedPath()[1].id === 'down_arrow_btn') {
    state.temp -= 1;
  } else if (event.composedPath()[1].id === 'up_arrow_btn') {
    state.temp += 1;
  }
  const tempText = document.getElementById('temp');
  tempText.textContent = `${state.temp}°`;
  changeColor();
  changeBgImg();
};

// Makes input box hidden or visible
const controlInputBox = () => {
  const inputBox = document.getElementById('city_input_box');
  if (inputBox.getAttribute('type') === 'hidden') {
    inputBox.setAttribute('type', 'text');
  } else {
    inputBox.setAttribute('type', 'hidden');
  }
};

// Change placeholder text in input box
const changePlaceholderText = () => {
  const openInputBox = document.getElementById('city_input_box');
  console.log(openInputBox);
  const placeholderText = openInputBox.getAttribute('placeholder');
  console.log(placeholderText);
  if (placeholderText === 'Type...') {
    openInputBox.setAttribute(
      'placeholder',
      'Type in a location and press Enter'
    );
  } else {
    openInputBox.setAttribute('placeholder', 'Type...');
  }
};

// Update city in temp box with each keypress
const changeCity = () => {
  state.city = document.getElementById('city_input_box').value;
  document.querySelector('h2').textContent = state.city;
};

const submitCitySearchRequest = () => {
  if (KeyboardEvent.key === 'Enter') {
    console.log('Enter was pushed!');
    getLatAndLong();
  }
};

const updateTemp = (lat, lon) => {
  axios
    .get('http://localhost:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(`Encountered an error: ${error}`);
    });
};

const getLatAndLong = () => {
  const location = state.city;
  console.log(`${location}`);

  let latitude, longitude;
  axios
    .get('http://localhost:5000/location', {
      params: {
        q: location,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log(
        `For ${state.city}, longitude is ${longitude} and latitude is ${latitude}.`
      );
      const coord = { latitude, longitude };
      // console.log({ coord });
      return coord;
    })
    .then((response) => {
      // console.log(response);
      axios
        .get('http://localhost:5000/weather', {
          params: {
            lat: parseFloat(response.latitude),
            lon: parseFloat(response.longitude),
          },
        })
        .then((response) => {
          const tempKelvin = response.data.current.temp;
          state.temp = Math.round((tempKelvin - 273.15) * (9 / 5) + 32);
          console.log(`State.temp is ${state.temp}`);
          changeTemp();
          changeColor();
          changeBgImg();
        })
        .catch((error) => {
          console.log(`Encountered an error: ${error}`);
        });
    })

    .catch((error) => {
      console.log(`Encountered an error with getLatAndLong: ${error}`);
    });
};

const registerEventHandlers = (event) => {
  // Increase temp when click up arrow
  const upArrowBtn = document.getElementById('up_arrow_btn');
  upArrowBtn.addEventListener('click', changeTemp);

  // Decrease temp with down arrow
  const downArrowBtn = document.getElementById('down_arrow_btn');
  downArrowBtn.addEventListener('click', changeTemp);

  // Show input with magnifier
  const magnBtn = document.getElementById('magn_btn');
  magnBtn.addEventListener('click', controlInputBox);

  // On focus/blur, update placeholder
  const openInputBox = document.getElementById('city_input_box');
  openInputBox.addEventListener('focus', changePlaceholderText);
  openInputBox.addEventListener('focusout', changePlaceholderText);

  //On text box keyup, update city name
  openInputBox.addEventListener('keyup', changeCity);

  // Search city name on enter or get real temp btn
  openInputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Enter was pushed!');
      getLatAndLong();
      event.preventDefault();
    }
  });

  //
  const getRealTempBtn = document.getElementById('real_temp_btn');
  getRealTempBtn.addEventListener('click', () => {
    console.log("It's the weekend");
    getLatAndLong();
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', changeColor);
document.addEventListener('DOMContentLoaded', changeBgImg);
