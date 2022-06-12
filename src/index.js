'use strict';

let data = 55;
let header = 'Weather Report';

document.getElementById('root').innerText = data;
document.getElementById('topHeader').innerText = header;

const weatherAPICall = (lat, lon) => {
  const WEATHER_API = 'http://127.0.0.1:5000/weather';

  axios
    .get(`${WEATHER_API}`, {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      let temp = 1.8 * (response.data.current.temp - 273.15) + 32;
      document.getElementById('root').innerText = Math.round(temp);
      changeColor(temp);
      setLandscape(temp);
      changeGarden(temp);

      const rainOptions = ['Thunderstorm', 'Rain', 'Drizzle'];
      let weatherCondition = response.data.current.weather[0].main;
      if (rainOptions.includes(weatherCondition)) {
        skyOption('rainy');
      } else if (weatherCondition === 'Snow') {
        skyOption('snowy');
      } else if (weatherCondition === 'Clear') {
        skyOption('sunny');
      } else if (weatherCondition === 'Clouds') {
        skyOption('cloudy');
      } else {
        skyOption('other');
      }
    })
    .catch((response) => {
      console.log('error in API call');
      console.log(response);
    });
};

const locationAPICall = (city) => {
  const LOCATION_API = 'http://127.0.0.1:5000/location';
  axios
    .get(`${LOCATION_API}`, {
      params: {
        q: city,
      },
    })
    .then((response) => {
      let lat = response.data[0].lat;
      let lon = response.data[0].lon;
      weatherAPICall(lat, lon);
    })
    .catch((response) => {
      console.log('error in API call');
      console.log(response);
    });
};

const cityname = () => {
  let city = document.getElementById('cityName').value;
  let headerWithCity = `Weather Report for City of ✨${city}✨`;
  document.getElementById('topHeader').innerText = headerWithCity;
  locationAPICall(city);
};

const reset = () => {
  let data = 55;
  let header = 'Weather Report';

  document.getElementById('root').innerText = data;
  document.getElementById('topHeader').innerText = header;

  changeColor(data);

  document.getElementById('skydisplay').innerText = ' ';
  document.getElementById('landscape').innerText = ' ';

  document.getElementById('skydropdown').selectedIndex = 0;
  document.getElementById('cityName').value = '';
};

const changeColor = (data) => {
  if (data <= 49) {
    document.getElementById('root').style.color = '#008080';
  } else if (data <= 59) {
    document.getElementById('root').style.color = '#008000';
  } else if (data <= 69) {
    document.getElementById('root').style.color = '#ECD218';
  } else if (data <= 79) {
    document.getElementById('root').style.color = '#FFA500';
  } else {
    document.getElementById('root').style.color = '#FF0000';
  }
};

const increment = () => {
  data = data + 1;
  document.getElementById('root').innerText = data;
  changeColor(data);
  setLandscape(data);
  changeGarden(data);
};

const decrement = () => {
  data = data - 1;
  document.getElementById('root').innerText = data;
  changeColor(data);
  setLandscape(data);
  changeGarden(data);
};

const setLandscape = (data) => {
  if (data <= 59) {
    document.getElementById('landscape').innerText =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (data <= 69) {
    document.getElementById('landscape').innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (data <= 79) {
    document.getElementById('landscape').innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else {
    document.getElementById('landscape').innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

const changeGarden = (data) => {
  if (data <= 49) {
    document.getElementById('garden').style.backgroundColor = '#008080';
  } else if (data <= 59) {
    document.getElementById('garden').style.backgroundColor = '#008000';
  } else if (data <= 69) {
    document.getElementById('garden').style.backgroundColor = '#ECD218';
  } else if (data <= 79) {
    document.getElementById('garden').style.backgroundColor = '#FFA500';
  } else {
    document.getElementById('garden').style.backgroundColor = '#FF0000';
  }
};

const skyOption = (choice) => {
  let option;

  if (typeof choice === 'object') {
    option = choice.value;
  } else {
    option = choice;
  }

  if (option === 'sunny') {
    document.getElementById('skydisplay').innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (option === 'cloudy') {
    document.getElementById('skydisplay').innerText =
      '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (option === 'rainy') {
    document.getElementById('skydisplay').innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (option === 'snowy') {
    document.getElementById('skydisplay').innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  } else if (option === 'other') {
    document.getElementById('skydisplay').innerText = ' 🌫 💨☁️ 🌪 🌋';
  }
};
