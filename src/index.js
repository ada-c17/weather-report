"use strict";

const state = {
    city: 'San Francisco',
    temperature: 75
  };

  const temperatureDisplay = document.getElementById('temperature');
  const landscape = document.getElementById('landscape')
  const displayCity = document.getElementById('display_city')
  const inputCity = document.getElementById('input_city')

  const displayTemperature = () => {
    temperatureDisplay.textContent = `${state.temperature} °F`;
  };

  const increaseTemperature = () => {
    state.temperature ++;
    displayTemperature();
    changeTemperatureDecor();
  };

  const decreaseTemperature = () => {
    state.temperature --;
    displayTemperature();
    changeTemperatureDecor();
  };

  const changeTemperatureDecor = () => {
;
    if (state.temperature >= 80) {
      temperatureDisplay.className = 'hot_color';
      landscape.className = 'hot';
    } else if (state.temperature >= 70 && state.temperature < 80) {
      temperatureDisplay.className = 'warm_color';
      landscape.className = 'warm';
    } else if (state.temperature >= 60 && state.temperature < 70) {
      temperatureDisplay.className = 'cool_color';
      landscape.className = 'cool';
    } else if (state.temperature >= 50 && state.temperature < 60) {
      temperatureDisplay.className = 'chilly_color';
      landscape.className = 'cold';
    } else {
      temperatureDisplay.className = 'cold_color';
      landscape.className = 'cold';
    }
  };

  const changeCity = () => {
    state.city = inputCity.value;
    displayCity.textContent = state.city;
  };

  const getRealtimeTemperature = async () => {
    const locationData = await axios.get(
      `http://127.0.0.1:5000/location?q=${state.city}`);
    const lat = locationData.data[0].lat;
    const lon = locationData.data[0].lon;
    getWeatherFromLocation(lat, lon);
  };

  const getWeatherFromLocation = async (lat, lon) => {
    const weatherData = await axios.get(
      `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
    );
    const temperatureKelvin = weatherData.data.current.temp;
    state.temperature = Math.floor(1.8 * (temperatureKelvin - 273.15) + 32)
    displayTemperature();
    changeTemperatureDecor();
  };

  const registerEventHandlers = () => {
    const upTemperature = document.getElementById('up_temperature');
    upTemperature.addEventListener('click', increaseTemperature);

    const downTemperature = document.getElementById('down_temperature');
    downTemperature.addEventListener('click', decreaseTemperature);

    const realtimeTemperature = document.getElementById('realtime_temperature');
    realtimeTemperature.addEventListener('click', getRealtimeTemperature);

    inputCity.addEventListener('input', changeCity);
  };

  document.addEventListener('DOMContentLoaded', registerEventHandlers);
