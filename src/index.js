'use strict';

const updatecity = (event) => {
  city = document.getElementById('city').value;
  console.log(city);

  let searchparams = {
    q: city,
  };

  axios
    .get('http://127.0.0.1:5000/location', { params: searchparams })

    .then((response) => {
      console.log('success!', response.data[0]['lat'], response.data[0]['lon']);
      document.getElementById(
        'latlon'
      ).textContent += ` success! ${response.data[0]['lat']}, ${response.data[0]['lon']}`;

      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: response.data[0]['lat'],
            lon: response.data[0]['lon'],
          },
        })

        .then((response) => {
          console.log('success!', response.data.current.temp);
          document.getElementById(
            'weather'
          ).textContent += `success! ${response.data.current.temp}`;
        })
        .catch((error) => {
          console.log('error!', error.response.data);
        });
    })
    .catch((error) => {
      console.log('error!', error.response.data);
    });
};

const getWeather = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', { params: { lat: lat, lon: lon } })

    .then((response) => {
      console.log('success!', response.data[0]['current']['temp']);
      document.getElementById(
        'weather'
      ).textContent += `success! ${response.data}`;
    })
    .catch((error) => {
      console.log('error!', error.response.data);
    });
};

const registerEventHandlers = (event) => {
  const cityField = document.querySelector('#cityButton');
  cityField.addEventListener('click', updatecity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
