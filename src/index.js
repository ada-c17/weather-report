"use strict";


const state = {
    tempDegrees: 50,
    city: 'Anchorage',
    sky: 'snowy',
};

// increase temperature 
const increaseTemp = () => {
    state.tempDegrees += 1;
    const tempContainer = document.getElementById('temp-number');
    tempContainer.textContent = state.tempDegrees;
    changesByTemp();
};

// decrease temperature
const decreaseTemp = () => {
    state.tempDegrees -= 1;
    const tempContainer = document.getElementById('temp-number');
    tempContainer.textContent = state.tempDegrees;
    changesByTemp();
};

// change temperature display color & ground weather garden by temperature number
const changesByTemp = () => {
    const tempContainer = document.getElementById('temp-number');
    const gardenContainer = document.getElementById('ground-garden')
    tempContainer.textContent = state.tempDegrees;
    if(state.tempDegrees >= 80) {
        tempContainer.style.color = '#d04123';
        gardenContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    } else if(state.tempDegrees >= 70 && state.tempDegrees <= 79) {
        tempContainer.style.color = '#f29f4e';
        gardenContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
    } else if(state.tempDegrees >= 60 && state.tempDegrees <= 69) {
        tempContainer.style.color = '#f1d42d';
        gardenContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
    } else if(state.tempDegrees >= 50 && state.tempDegrees <= 59) {
        tempContainer.style.color = '#7caf4e';
        gardenContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    } else if(state.tempDegrees <= 49) {
        tempContainer.style.color = '#73a3bb';
        gardenContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    }
};

// changes the sky element
const changeSky = () => {
    let currentSky = document.getElementById('skys').value;
    let skyContainer = document.getElementById('sky-garden');
    state.sky = currentSky;
    if(state.sky === 'cloudy') {
        skyContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️'
    } else if(state.sky === 'sunny') {
        skyContainer.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️'
    } else if(state.sky === 'rainy') {
        skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧'
    } else if(state.sky === 'snowy') {
        skyContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
    }
};

// changes city name according to text input
const changeCityName = () => {
    const cityInput = document.getElementById('city-input').value;
    const currentCityName = document.getElementById('city-name');
    currentCityName.textContent = cityInput;
    state.city = cityInput;
};

// reset city name to the default
const resetCityName = () => {
    const cityContainer = document.getElementById('city-input');
    const currentCityName = document.getElementById('city-name');
    state.city = 'Anchorage';
    cityContainer.value = state.city;
    currentCityName.textContent = state.city;
}; 

// converts given degrees kelvin to fahrenheit
const convertTemp = (degreesKelvin) => {
    let degreesFahrenheit = Math.round(1.8*(degreesKelvin -273) + 32);
    return degreesFahrenheit;
};

// gets latitiude and longitude for current city inputted
const getLatitudeAndLongitude = () => {
    axios
        .get('http://127.0.0.1:5000/location', {
        params: {
            q: state.city
        },
    })
    .then((response) => {
        let latitude = response.data[0].lat;
        let longitude = response.data[0].lon;
        getTemperature(latitude, longitude);
    })
    .catch((error) => {
        console.log('error with getting lat & lon!', error.response.data);
    });
}

// gets current real time temperature using latitude and longitude
const getTemperature = (latitude, longitude) => {
    axios
        .get('http://127.0.0.1:5000/weather', {
        params: {
            lat: latitude,
            lon: longitude,
        },
    })
    .then((response) => {
        const degreesKelvin = response.data.current.temp;
        let currentTemp = convertTemp(degreesKelvin);
        state.tempDegrees = currentTemp;
        changesByTemp();
    })
    .catch((error) => {
        console.log('error with getting temp!', error.response.data);
    });
}

const registerEventHandlers = () => {
    const increaseTempButton = document.querySelector('#increase-temp-button');
    increaseTempButton.addEventListener('click', increaseTemp);

    const decreaseTempButton = document.querySelector('#decrease-temp-button');
    decreaseTempButton.addEventListener('click', decreaseTemp);

    const cityInput = document.getElementById('city-input');
    cityInput.addEventListener('input', changeCityName);

    const getRealTemp = document.getElementById('real-temp-button');
    getRealTemp.addEventListener('click', getLatitudeAndLongitude);

    const changeCurrentSky = document.getElementById('skys');
    changeCurrentSky.addEventListener('change', changeSky);

    const resetCity = document.getElementById('reset-city-button');
    resetCity.addEventListener('click', resetCityName);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);