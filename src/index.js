// const { default: axios } = require("axios");

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const state = {
    temp: 78,
    units: '°F',
    city: 'Dallas',
    latitude: 32.7767,
    longitude: -96.7970,
};

const temperature = document.querySelector("#temp");
const currentCity = document.querySelector("#current-city");

const increaseTemp = () => {
    state.temp += 1;
    temperature.textContent = `${state.temp} ${state.units}`;
    changeTempColor();
    currentCity.textContent = `Currently displaying temperature...`;
};

const decreaseTemp = () => {
    state.temp -= 1;
    temperature.textContent = `${state.temp} ${state.units}`;
    changeTempColor();
    currentCity.textContent = `Currently displaying temperature...`;
};

const updateTemp = (newTemp) => {
    state.temp = newTemp;
    temperature.textContent = `${state.temp} ${state.units}`;
    changeTempColor();
    currentCity.textContent = `Currently displaying temperature in ${state.city}`;
};

const changeTempColor = () => {
    const landscape = document.querySelector('#landscape');
    if (state.temp < 40) {
        temperature.className = 'cold';
        landscape.textContent = '❄️ ☃️ ❄️ ☃️ ❄️ ☃️ ❄️';
    } else if (state.temp < 60) {
        temperature.className = 'cool';
        landscape.textContent = '☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️';
    } else if (state.temp < 80) {
        temperature.className = 'pleasant';
        landscape.textContent = '🌤 🌤 🌤 🌤 🌤 🌤 🌤 🌤';
    } else if (state.temp < 100) {
        temperature.className = 'warm';
        landscape.textContent = '☀️ ☀️ ☀️ ☀️ ☀️ ☀️ ☀️ ☀️';
    } else {
        temperature.className = 'hot';
        landscape.textContent = '🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥';
    }
};

const changeSky = () => {
    const selectedSky = document.getElementById('sky').value;
    document.querySelector('body').className = selectedSky;
    background.className = selectedSky;
};

const updateCity = () => {
    currentCity.textContent = `Currently displaying temperature in ${state.city}`;
}

const changeCity = () => {
    const inputCity = document.getElementById("city").value;
    if (inputCity === ''){
        state.city = 'Dallas';
        getCityTemp('32.77', '-96.79');
        currentCity.textContent = `Currently displaying temperature in ${state.city}`;
    } else {
        currentCity.textContent = `Currently loading temperature in ${inputCity}`;
        state.city = inputCity;
        actualTemp();
    }
};

const getCityTemp = () => {
    axios
        .get('http://localhost:5000/weather', {
            params: {
                lat: state.latitude,
                lon: state.longitude,
            },
        })
        .then((response) => {
            console.log(response.data);
            state.sky = response.data['current']['weather'][0]['description'];
            const tempInK = response.data['current']['temp'];
            const tempInF = (tempInK -273) * (9/5) + 32;
            const roundedTemp = Math.round(tempInF);
            console.log(Math.round(tempInF));
            updateTemp(roundedTemp);
        })
};

getCityTemp();

const findCity = () => {
    axios
        .get('http://localhost:5000/location',
            {params: {
            q: state.city,
            },}
        ).then(response => {
            state.latitude = response.data[0]['lat'];
            state.longitude = response.data[0]['lon'];
            console.log(`coordinates are ${state.latitude}, ${state.longitude}`);
            // state.sky = response.data['sky']
            getCityTemp();
        })
};

const actualTemp = () => {
    let promise = Promise.resolve();
    promise = promise.then(() => {
        return findCity();
    }).then(response => {
        state.latitude = response.data[0]['lat'];
        state.longitude = response.data[0]['lon'];
        return getCityTemp(state.latitude, state.longitude);
    }).then((currentTemp) => {
        updateTemp(currentTemp);
    })
};

const reset = () => {
    state.city = 'Dallas';
    // state.latitude = '32.7767';
    // state.longitude = '-96.7970';
    actualTemp();
}

const registerEventHandlers = (event) => {
    const increaseTempButton = document.getElementById("up");
    increaseTempButton.addEventListener("click", increaseTemp);
    const decreaseTempButton = document.getElementById("down");
    decreaseTempButton.addEventListener("click", decreaseTemp);
    const changeSkySelector = document.getElementById("sky");
    changeSkySelector.addEventListener('change', changeSky);
    const changeCityInput = document.getElementById("city");
    changeCityInput.addEventListener('input', changeCity);
    const makeActualTemp = document.getElementById("actual");
    makeActualTemp.addEventListener('click', actualTemp);
    const resetCity = document.getElementById("reset");
    resetCity.addEventListener('click', reset);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);