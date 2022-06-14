'use strict';

const state = {
  temperature: 0,
  coordinates: [],
  currentColor: 'black',
  currentLandscape: 'summer',
  currentCity: 'Chicago',
  currentSky: 'sunny',
};

// increase temperature
const increaseTemperature = () => {
  const temperatureContainer = document.getElementById('temperature');
  state.temperature += 1;

  temperatureContainer.textContent = `${state.temperature}° F`;

  changeTemperatureColor();
  changeLandscape();
  changeSky();
};

// decrease temperature
const decreaseTemperature = () => {
  const temperatureContainer = document.getElementById('temperature');
  state.temperature -= 1;

  temperatureContainer.textContent = `${state.temperature}° F`;

  changeTemperatureColor();
  changeLandscape();
  changeSky();
};

// helper function to change temperature text color
const changeTemperatureColor = () => {
  const temperatureContainer = document.getElementById('temperature');

  if (state.temperature >= 80) {
    state.currentColor = 'coral';
  } else if (state.temperature >= 60 && state.temperature <= 79) {
    state.currentColor = '#f5b942';
  } else if (state.temperature >= 40 && state.temperature <= 59) {
    state.currentColor = 'teal';
  } else if (state.temperature >= 20 && state.temperature <= 39) {
    state.currentColor = '#1a557d';
  } else {
    state.currentColor = '#67686b';
  }

  temperatureContainer.style.color = state.currentColor;
};

// helper function to change landscape based on temp
const changeLandscape = () => {
  const landscapeImage = document.getElementById('landscape-image');
  const landscapeCaption = document.getElementById('landscape-caption');

  if (state.temperature >= 80) {
    landscapeImage.src = 'assets/marissa-rodriguez-summer.jpg';
    landscapeImage.alt = 'Crystal clear turquoise water in a pool or sea';
    landscapeCaption.textContent = 'Photo by Marissa Rodriguez';
  } else if (state.temperature >= 60 && state.temperature <= 79) {
    landscapeImage.src = 'assets/laura-adai-spring.jpg';
    landscapeImage.alt = 'A close up image of a branch with pink flowers';
    landscapeCaption.textContent = 'Photo by Laura Adai';
  } else if (state.temperature >= 40 && state.temperature <= 59) {
    landscapeImage.src = 'assets/janmesh-shah-fall.jpg';
    landscapeImage.alt = 'A tree full of golden leaves';
    landscapeCaption.textContent = 'Photo by Janmesh Shah';
  } else {
    landscapeImage.src = 'assets/donnie-rosie-winter.jpg';
    landscapeImage.alt =
      'A forest with tall, snowcapped trees above a bed of snow';
    landscapeCaption.textContent = 'Photo by Donnie Rosie';
  }
};

// helper function to change sky based on temp
const changeSky = () => {
  const skyImage = document.getElementById('sky-image');
  const skyCaption = document.getElementById('sky-caption');

  if (state.temperature >= 80) {
    skyImage.src = 'assets/sky/grooveland-designs-sunny.jpg';
    skyImage.alt =
      'The sun, off in the distance, surrounded by bright blue sky';
    skyCaption.textContent = 'Photo by Grooveland Designs';
  } else if (state.temperature >= 60 && state.temperature <= 79) {
    skyImage.src = 'assets/sky/brandon-morgan-lightning.jpg';
    skyImage.alt =
      'A dark sky with one big bolt of lightning stretching toward the ground';
    skyCaption.textContent = 'Photo by Brandon Morgan';
  } else if (state.temperature >= 40 && state.temperature <= 59) {
    skyImage.src = 'assets/sky/daoudi-aissa-cloudy.jpg';
    skyImage.alt = 'An overcast sky full of fluffy clouds, some ominous';
    skyCaption.textContent = 'Photo by Daoudi Aissa';
  } else {
    skyImage.src = 'assets/sky/jessica-fadel-snowing.jpg';
    skyImage.alt =
      'A snow flurry against a dark background, as though it is nighttime';
    skyCaption.textContent = 'Photo by Jessica Fadel';
  }
};

// manually change sky using dropdown
const manuallyChangeSky = () => {
  const skyImage = document.getElementById('sky-image');
  const skyCaption = document.getElementById('sky-caption');
  const selectedSky = document.getElementById('sky-dropdown').value;

  state.currentSky = selectedSky;

  if (selectedSky === 'sunny') {
    skyImage.src = 'assets/sky/grooveland-designs-sunny.jpg';
    skyImage.alt =
      'The sun, off in the distance, surrounded by bright blue sky';
    skyCaption.textContent = 'Photo by Grooveland Designs';
  } else if (selectedSky === 'cloudy') {
    skyImage.src = 'assets/sky/daoudi-aissa-cloudy.jpg';
    skyImage.alt = 'An overcast sky full of fluffy clouds, some ominous';
    skyCaption.textContent = 'Photo by Daoudi Aissa';
  } else if (selectedSky === 'stormy') {
    skyImage.src = 'assets/sky/brandon-morgan-lightning.jpg';
    skyImage.alt =
      'A dark sky with one big bolt of lightning stretching toward the ground';
    skyCaption.textContent = 'Photo by Brandon Morgan';
  } else if (selectedSky === 'snowy') {
    skyImage.src = 'assets/sky/jessica-fadel-snowing.jpg';
    skyImage.alt =
      'A snow flurry against a dark background, as though it is nighttime';
    skyCaption.textContent = 'Photo by Jessica Fadel';
  }
};

// update display city based on user input
const updateDisplayCity = () => {
  const displayCity = document.getElementById('display-city');
  const userInputCity = document.getElementById('input-city').value;

  const capitalizedCity =
    userInputCity.charAt(0).toUpperCase() +
    userInputCity.slice(1).toLowerCase();

  // update display city text content
  state.currentCity = capitalizedCity;
  displayCity.textContent = state.currentCity;

  // update display temperature
  showCurrentTemp();
};

// function to display real time temperature
const showCurrentTemp = () => {
  const currentTemp = document.getElementById('temperature');

  getCurrentTemp().then(() => {
    currentTemp.textContent = `${state.temperature}° F`;
    console.log('made it to showCurrentTemp');

    changeTemperatureColor();
    changeLandscape();
    changeSky();
  });
};

// reset display city
const resetDisplayCity = () => {
  const displayCity = document.getElementById('display-city');

  document.getElementById('input-city').value = '';
  displayCity.textContent = 'Chicago';
  state.currentCity = displayCity.textContent;

  showCurrentTemp();
};

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('increase-temp');
  increaseTempButton.addEventListener('click', increaseTemperature);

  const decreaseTempButton = document.getElementById('decrease-temp');
  decreaseTempButton.addEventListener('click', decreaseTemperature);

  const changeCityButton = document.getElementById('change-city-button');
  changeCityButton.addEventListener('click', updateDisplayCity);

  const currentTempButton = document.getElementById('current-temp-button');
  currentTempButton.addEventListener('click', showCurrentTemp);

  const resetCityButton = document.getElementById('reset-city-button');
  resetCityButton.addEventListener('click', resetDisplayCity);

  const skyDropdown = document.getElementById('sky-dropdown');
  skyDropdown.addEventListener('change', manuallyChangeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// endpoints to retrieve real time weather

const getCurrentTemp = () => {
  // get latitude and longitude of current city
  return (
    axios
      .get('http://127.0.0.1:5000/location', {
        params: {
          q: state.currentCity,
        },
      })
      .then((response) => {
        const lat = response.data[0]['lat'];
        const lon = response.data[0]['lon'];

        return [lat, lon];
      })
      // get current temp of current city
      .then((response) => {
        return axios
          .get('http://127.0.0.1:5000/weather', {
            params: {
              lat: response[0],
              lon: response[1],
            },
          })
          .then((response) => {
            const tempInK = response.data.current.temp;
            const tempInF = Math.floor(1.8 * (tempInK - 273) + 32);

            state.temperature = tempInF;
            console.log(state.temperature);

            return tempInF;
          })
          .catch(() => {
            console.log('Error retrieving current weather');
          });
      })
      .catch(() => {
        console.log('Error retrieving latitude and longitude');
      })
  );
};
