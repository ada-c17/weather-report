const state = {
    temp: 70,
    city: 'Seattle',
};

const tempInfo = document.getElementById('tempInfo');
const tempUp = document.getElementById('tempUp');
const tempDown = document.getElementById('tempDown');
const landScape = document.getElementById("landScape");
const cityInput = document.getElementById('cityInput');
const cityValue = document.getElementById('cityInput').value;
const currentCity = document.getElementById('currentCity');
const realTemp = document.getElementById('getTemp');
const skySelect = document.getElementById('skies');
const sky = document.getElementById('sky').value;
const resetCity = document.getElementById('resetCity')

const updateWeather = () => {
    tempInfo.textContent = state.temp
};

const increaseWeather = () => {
    state.temp += 1;
    updateWeather();
    updatelandScape();
};

const decreaseWeather = () => {
    state.temp -= 1;
    updateWeather();
    updatelandScape();
};

const updatecityInput = () => {
    const updatedCity = document.getElementById('cityInput').value;
    const currentCity = document.getElementById('currentCity');
    state.city = updatedCity;
    currentCity.textContent = state.city;
};

const updateresetCity = () => {
    const updatedCity = document.getElementById('cityInput');
    const currentCity = document.getElementById('currentCity');
    state.city = "Seattle";
    currentCity.textContent = state.city;
    updatedCity.value = state.city;
};

const updateSky = () => {
    const sky = document.getElementById('sky');
    const skyValue = document.getElementById('skies').value;
    if (skyValue === 'sunny') {
        sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️'
    } else if (skyValue === 'cloudy') {
        sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️'
    } else if (skyValue === 'rainy') {
        sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧'
    } else if (skyValue === 'snowy') {
        sky.textContent = '❄️☃️❄️☃️❄️☃️❄️☃️❄️☃️❄️☃️❄️'
    }
};


const updatelandScape = () => {
    const sky = document.getElementById('sky');
    if (state.temp > 80) {
        tempInfo.style.color = 'red'
        sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️'
        landScape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    } else if (state.temp > 70) {
        tempInfo.style.color = 'orange'
        sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️'
        landScape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
    } else if (state.temp > 60) {
        tempInfo.style.color = 'yellow'
        sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️'
        landScape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
    } else if (state.temp > 50) {
        tempInfo.style.color = 'green'
        sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧'
        landScape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    } else if(state.temp < 49) {
        tempInfo.style.color = 'teal'
        landScape.textContent = '❄️☃️❄️☃️❄️☃️❄️☃️❄️☃️❄️☃️❄️'
    }
};

const findLatitudeAndLongitude = () => {
    let latitude, longitude;
    axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
        params: {
        q: state.city,
        },
    })
    .then((response) => {
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;

        // make the next API call here!
        findTemperature(latitude, longitude);
    })
    .catch((error) => {
        console.log('error in findLatitudeAndLongitude!');
    });
};

const findTemperature = (latitude, longitude) => {
    axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
        params: {
        lat: latitude,
        lon: longitude,
        },
    })
    .then((response) => {
        const kelvin = response.data['current']['temp'];
        state.temp = convertKelvinToFahrenheit(kelvin);
        updateWeather();
    })
    .catch((error) => {
        console.log('error in weather info!');
    });
};

const convertKelvinToFahrenheit = (kelvin) => {
    let fahrenheit;
    fahrenheit = parseInt(1.8 * (kelvin - 273) + 32);
    return fahrenheit;
};


const registerEventHandlers = () => {
    updatelandScape();
    tempUp.addEventListener('click', increaseWeather);
    tempDown.addEventListener('click', decreaseWeather);
    cityInput.addEventListener('input', updatecityInput);
    realTemp.addEventListener('click', findLatitudeAndLongitude);
    skySelect.addEventListener('change', updateSky);
    resetCity.addEventListener('click', updateresetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Generally we would register event handlers after the event
// DOMContentLoaded but this does not work on codesandbox
// document.addEventListener("DOMContentLoaded", registerEventHandlers);

// registerEventHandlers();
// console.log("loaded");
