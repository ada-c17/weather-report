
let t = {
    temperature: 60
};

const kelvinToFahrenheit = (t) => {
    tempretureInFahrenhait = 1.8 * (t - 273) + 32;
    return tempretureInFahrenhait;
}

const temperatureColor = () => {
    const temperature = document.querySelector("#temperatureCount");
    switch(true) {
        case (t.temperature >= 80):
            temperature.style.color = 'red';
            break;
        case (t.temperature >= 70):
            temperature.style.color = 'orange';
            break;
        case (t.temperature >= 60):
            temperature.style.color = 'yellow';
            break;
        case (t.temperature >= 50):
            temperature.style.color = 'green';
            break;
        case (t.temperature >= 40):
            temperature.style.color = 'teal';
            break;
    }
};

const changeLandscape = () => {
    const landscape = document.querySelector("#currentLandscape");
    switch(true) {
        case (t.temperature >= 80):
            landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
            break;
        case (t.temperature >= 70):
            landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
            break;
        case (t.temperature >= 60):
            landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
            break;
        case (t.temperature >= 50):
            landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
            break;
    }
};  

const changeSky = () => {
    const sky = document.querySelector('#currentSky');
    const selectedSky = document.getElementById('sky');
    switch(true) {
        case (selectedSky.value === "sunny"):
            sky.textContent = "☁️ ☀️ 🌤 ☀️ ☀️🌤 ☁️";
            break;
        case (selectedSky.value === "cloudy"):
            sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
            break;
        case (selectedSky.value === "rainy"):
            sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
            break;
        case (selectedSky.value === "snowy"):
            sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
            break;
    }
}

const showTemperture = () => {
    const temperatureCount = document.querySelector('#temperatureCount');
    temperatureCount.textContent = `${t.temperature}`;
    temperatureColor();
    changeLandscape();
};

const increaseTemperature = (event) => {
    t.temperature += 1;
    showTemperture();
};

const decreaseTemperature = (event) => {
    t.temperature -= 1;
    showTemperture();
};

const updateCityinHeader = (event) => {
    const log = document.getElementById('cityNameHeader');
    log.textContent = event.target.value;
}

const updateSky = (event) => {
    changeSky()
}

const getRealtimeTemperature = (event) => {
    city = document.querySelector('#cityName')
    axios.get('http://127.0.0.1:5000/location', {
        params: {
            q: city.value
        },
    })
        .then((response) => {
            const searchResult = response.data[0];
            const latitude = searchResult.lat
            const longitude = searchResult.lon
            axios.get('http://127.0.0.1:5000/weather', {
                params:{
                    lat: latitude,
                    lon: longitude,
                    units: 'imperial'
                },
            })
                .then((response) => {
                    const currentTemperature = response.data.current.temp; 
                    t.temperature = currentTemperature;
                    showTemperture();     
                })
                .catch((error) => {
                    console.log('error!', error.response.data);
                })
        })
        .catch((error) => {
            console.log('error!', error.response.data);
    });
}

const resetToDefaultValues = (event) => {
    city = document.querySelector('#cityNameHeader');
    city.textContent = "Happyland";
    cityInput = document.querySelector('#cityName');
    cityInput.value = "enter city name";
}

const registerEventHandlers = (event) => {
    const upButton = document.querySelector("#upButton");
    const downButton = document.querySelector("#downButton");
    upButton.addEventListener('click', increaseTemperature);
    downButton.addEventListener('click', decreaseTemperature);
    const input = document.querySelector('#cityName');
    input.addEventListener('change', updateCityinHeader);
    const selectSky = document.querySelector('#sky');
    selectSky.addEventListener('change', updateSky);
    const realtimeTemperature = document.querySelector('#getRealtimeTemperature');
    realtimeTemperature.addEventListener('click', getRealtimeTemperature);
    const resetButton = document.querySelector('#resetButton');
    resetButton.addEventListener('click', resetToDefaultValues);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
